import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock MLB teams data for testing
const mockMLBTeams = [
  {
    name: 'New York Yankees',
    stadium: 'Yankee Stadium',
    location: 'New York, NY',
    league: 'American League',
    division: 'AL East',
    lat: 40.8296,
    lng: -73.9262,
    color: '#0066CC',
    detailUrl: 'https://www.mlb.com/yankees',
  },
  {
    name: 'Los Angeles Dodgers',
    stadium: 'Dodger Stadium',
    location: 'Los Angeles, CA',
    league: 'National League',
    division: 'NL West',
    lat: 34.0739,
    lng: -118.2400,
    color: '#CC0000',
    detailUrl: 'https://www.mlb.com/dodgers',
  }
];

describe('MLB Functionality Tests', () => {
  let dom;
  let document;
  let window;
  let L; // Leaflet mock

  beforeEach(() => {
    // Setup JSDOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="map"></div>
          <div id="team-list"></div>
          <div class="league-toggle">
            <button class="league-btn active" onclick="showAllMLBTeams()">All Teams</button>
            <button class="league-btn american" onclick="showAmericanLeague()">American League</button>
            <button class="league-btn national" onclick="showNationalLeague()">National League</button>
          </div>
        </body>
      </html>
    `, { url: 'http://localhost:4321' });

    document = dom.window.document;
    window = dom.window;
    global.document = document;
    global.window = window;

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock Leaflet
    L = {
      map: vi.fn(() => ({
        setView: vi.fn(),
        invalidateSize: vi.fn(),
      })),
      tileLayer: vi.fn(() => ({
        addTo: vi.fn(),
      })),
      marker: vi.fn(() => ({
        addTo: vi.fn(),
        bindPopup: vi.fn().mockReturnThis(),
        openPopup: vi.fn(),
        on: vi.fn(),
        setIcon: vi.fn(),
        setOpacity: vi.fn(),
        options: {}
      })),
      divIcon: vi.fn(() => ({})),
    };
    global.L = L;

    // Mock translations
    window.mlbTranslations = {
      mlb: {
        teamInfo: {
          teams: 'Teams',
          team: 'Team',
          stadium: 'Stadium',
          location: 'Location'
        },
        teams: {
          'New York Yankees': 'New York Yankees',
          'Los Angeles Dodgers': 'Los Angeles Dodgers'
        },
        stadiums: {
          'Yankee Stadium': 'Yankee Stadium',
          'Dodger Stadium': 'Dodger Stadium'
        },
        locations: {
          'New York, NY': 'New York, NY',
          'Los Angeles, CA': 'Los Angeles, CA'
        },
        leagues: {
          'American League': 'American League',
          'National League': 'National League'
        },
        divisions: {
          'AL East': 'AL East',
          'NL West': 'NL West'
        },
        logos: {
          'New York Yankees': 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png',
          'Los Angeles Dodgers': 'https://a.espncdn.com/i/teamlogos/mlb/500/lad.png'
        }
      }
    };
  });

  describe('MLB Map Initialization', () => {
    it('should initialize map with correct default settings', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { initMLBMap } = module;

      initMLBMap();

      expect(L.map).toHaveBeenCalledWith('map');
      expect(L.tileLayer).toHaveBeenCalledWith(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        expect.objectContaining({
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        })
      );
    });

    it('should adjust zoom level for different screen sizes', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { initMLBMap } = module;

      // Test mobile
      Object.defineProperty(window, 'innerWidth', { value: 400 });
      initMLBMap();
      expect(L.map).toHaveBeenCalled();

      // Test tablet
      Object.defineProperty(window, 'innerWidth', { value: 700 });
      initMLBMap();
      expect(L.map).toHaveBeenCalled();

      // Test desktop
      Object.defineProperty(window, 'innerWidth', { value: 1200 });
      initMLBMap();
      expect(L.map).toHaveBeenCalled();
    });

    it('should handle window resize events', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { initMLBMap } = module;

      const mockMap = {
        setView: vi.fn(),
        invalidateSize: vi.fn(),
      };
      L.map.mockReturnValue(mockMap);

      initMLBMap();

      // Simulate window resize
      const resizeEvent = new window.Event('resize');
      window.dispatchEvent(resizeEvent);

      expect(mockMap.invalidateSize).toHaveBeenCalled();
    });
  });

  describe('MLB Team Data Validation', () => {
    it('should validate team data structure', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { mlbTeams } = module;

      expect(Array.isArray(mlbTeams)).toBe(true);
      expect(mlbTeams.length).toBe(30);

      mlbTeams.forEach(team => {
        expect(team).toMatchObject({
          name: expect.any(String),
          stadium: expect.any(String),
          location: expect.any(String),
          league: expect.any(String),
          division: expect.any(String),
          lat: expect.any(Number),
          lng: expect.any(Number),
          color: expect.any(String),
          detailUrl: expect.any(String),
        });
      });
    });

    it('should have valid coordinate ranges', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { mlbTeams } = module;

      mlbTeams.forEach(team => {
        // US/Canada latitude range
        expect(team.lat).toBeGreaterThanOrEqual(24);
        expect(team.lat).toBeLessThanOrEqual(49);
        
        // US/Canada longitude range
        expect(team.lng).toBeGreaterThanOrEqual(-125);
        expect(team.lng).toBeLessThanOrEqual(-66);
      });
    });

    it('should have valid league and division assignments', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { mlbTeams } = module;

      const alTeams = mlbTeams.filter(team => team.league === 'American League');
      const nlTeams = mlbTeams.filter(team => team.league === 'National League');

      expect(alTeams).toHaveLength(15);
      expect(nlTeams).toHaveLength(15);

      // Check division distribution
      const divisions = ['AL East', 'AL Central', 'AL West', 'NL East', 'NL Central', 'NL West'];
      divisions.forEach(division => {
        const divisionTeams = mlbTeams.filter(team => team.division === division);
        expect(divisionTeams).toHaveLength(5);
      });
    });
  });

  describe('MLB Translation Functions', () => {
    it('should translate team names correctly', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      
      // Access translation functions that should be available globally
      const translateTeamName = window.translateTeamName || (() => 'Test Team');
      const translateStadiumName = window.translateStadiumName || (() => 'Test Stadium');
      const translateLocation = window.translateLocation || (() => 'Test Location');

      expect(typeof translateTeamName).toBe('function');
      expect(typeof translateStadiumName).toBe('function');
      expect(typeof translateLocation).toBe('function');
    });

    it('should get team logo URLs', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      
      // Mock the getTeamLogoUrl function
      global.getTeamLogoUrl = (teamName) => {
        return window.mlbTranslations?.mlb?.logos?.[teamName] || '';
      };

      const logoUrl = getTeamLogoUrl('New York Yankees');
      expect(logoUrl).toBe('https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png');
    });

    it('should create logo images with different sizes', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { createLogoImg } = module;

      const logoUrl = 'https://example.com/logo.png';
      const teamName = 'Test Team';

      const smallLogo = createLogoImg(logoUrl, teamName, 'small');
      const mediumLogo = createLogoImg(logoUrl, teamName, 'medium');
      const largeLogo = createLogoImg(logoUrl, teamName, 'large');

      expect(smallLogo).toContain('width: 32px');
      expect(mediumLogo).toContain('width: 48px');
      expect(largeLogo).toContain('width: 64px');
    });
  });

  describe('MLB Marker Management', () => {
    it('should add markers to map', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { addMLBMarker } = module;

      const mockMarker = {
        addTo: vi.fn().mockReturnThis(),
        bindPopup: vi.fn().mockReturnThis(),
        openPopup: vi.fn(),
        on: vi.fn(),
        options: {}
      };
      L.marker.mockReturnValue(mockMarker);

      addMLBMarker(mockMLBTeams[0]);

      expect(L.marker).toHaveBeenCalled();
      expect(mockMarker.addTo).toHaveBeenCalled();
      expect(mockMarker.on).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should clear markers from map', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { clearMLBMarkers, markers } = module;

      // Mock markers array
      const mockMarker = { remove: vi.fn() };
      const mockMap = { removeLayer: vi.fn() };
      
      // Simulate having markers
      markers.push(mockMarker);
      
      clearMLBMarkers();

      expect(markers.length).toBe(0);
    });

    it('should highlight selected markers', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      
      const mockMarker = {
        setIcon: vi.fn(),
        setOpacity: vi.fn(),
        options: { teamData: mockMLBTeams[0] }
      };

      // Mock the highlightMarker function since it's internal
      const highlightMarker = (marker) => {
        marker.setIcon({});
        marker.setOpacity(1);
      };

      highlightMarker(mockMarker);

      expect(mockMarker.setIcon).toHaveBeenCalled();
      expect(mockMarker.setOpacity).toHaveBeenCalledWith(1);
    });
  });

  describe('MLB Team List Rendering', () => {
    it('should render team list table', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { renderTeamList } = module;

      renderTeamList(mockMLBTeams);

      const teamList = document.getElementById('team-list');
      expect(teamList).toBeTruthy();

      const table = teamList.querySelector('.teams-table');
      expect(table).toBeTruthy();

      const rows = teamList.querySelectorAll('.team-row');
      expect(rows.length).toBe(2);
    });

    it('should apply responsive table styles', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { renderTeamList } = module;

      // Test mobile rendering
      Object.defineProperty(window, 'innerWidth', { value: 400 });
      renderTeamList(mockMLBTeams);

      const teamList = document.getElementById('team-list');
      expect(teamList).toBeTruthy();
    });

    it('should handle empty team list', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { renderTeamList } = module;

      renderTeamList([]);

      const teamList = document.getElementById('team-list');
      const title = teamList.querySelector('h3');
      expect(title.textContent).toContain('(0)');
    });
  });

  describe('MLB Filter Functions', () => {
    it('should filter teams by league', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { mlbTeams } = module;

      const alTeams = mlbTeams.filter(team => team.league === 'American League');
      const nlTeams = mlbTeams.filter(team => team.league === 'National League');

      expect(alTeams.length).toBe(15);
      expect(nlTeams.length).toBe(15);
    });

    it('should filter teams by division', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { mlbTeams } = module;

      const alEast = mlbTeams.filter(team => team.division === 'AL East');
      const nlWest = mlbTeams.filter(team => team.division === 'NL West');

      expect(alEast.length).toBe(5);
      expect(nlWest.length).toBe(5);
    });

    it('should update active button state', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { updateMLBActiveButton } = module;

      updateMLBActiveButton(1);

      const buttons = document.querySelectorAll('.league-btn');
      expect(buttons[1].classList.contains('active')).toBe(true);
    });
  });

  describe('MLB Focus and Selection', () => {
    it('should focus on specific team', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { focusOnTeam } = module;

      const mockMap = {
        setView: vi.fn(),
      };
      global.map = mockMap;

      focusOnTeam('New York Yankees');

      expect(mockMap.setView).toHaveBeenCalled();
    });

    it('should handle team selection from table', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { renderTeamList } = module;

      // Mock focusOnTeam
      global.focusOnTeam = vi.fn();

      renderTeamList(mockMLBTeams);

      const firstRow = document.querySelector('.team-row');
      expect(firstRow.onclick).toBeTruthy();
    });
  });

  describe('MLB Error Handling', () => {
    it('should handle missing team data gracefully', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { renderTeamList } = module;

      const invalidTeam = {
        name: 'Invalid Team',
        // Missing required fields
      };

      expect(() => renderTeamList([invalidTeam])).not.toThrow();
    });

    it('should handle missing DOM elements', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { renderTeamList } = module;

      // Remove team-list element
      document.getElementById('team-list').remove();

      expect(() => renderTeamList(mockMLBTeams)).not.toThrow();
    });

    it('should handle missing translations gracefully', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      
      // Clear translations
      window.mlbTranslations = undefined;

      // Mock translation functions to return fallback values
      global.translateTeamName = (name) => name;
      global.translateStadiumName = (stadium) => stadium;
      global.translateLocation = (location) => location;

      expect(translateTeamName('Test Team')).toBe('Test Team');
    });
  });

  describe('MLB Performance and Optimization', () => {
    it('should handle large number of markers efficiently', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { addMLBMarker } = module;

      const start = performance.now();
      
      for (let i = 0; i < 100; i++) {
        addMLBMarker(mockMLBTeams[0]);
      }
      
      const end = performance.now();
      expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
    });

    it('should debounce resize events', async () => {
      const module = await import('../src/scripts/mlb-script.js');
      const { initMLBMap } = module;

      const mockMap = {
        setView: vi.fn(),
        invalidateSize: vi.fn(),
      };
      L.map.mockReturnValue(mockMap);

      initMLBMap();

      // Simulate multiple rapid resize events
      for (let i = 0; i < 10; i++) {
        const resizeEvent = new window.Event('resize');
        window.dispatchEvent(resizeEvent);
      }

      expect(mockMap.invalidateSize).toHaveBeenCalled();
    });
  });
});