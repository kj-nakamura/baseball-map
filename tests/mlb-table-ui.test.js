import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock MLB data for testing
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

describe('MLB Table UI Tests', () => {
  let dom;
  let document;
  let window;
  let renderTeamList;

  beforeEach(async () => {
    // Setup JSDOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="team-list" class="team-list"></div>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    window = dom.window;

    // Setup global objects
    global.document = document;
    global.window = window;
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock translations
    window.mlbTranslations = {
      mlb: {
        teamInfo: {
          teams: 'Teams',
          team: 'Team',
          stadium: 'Stadium',
          location: 'Location'
        }
      }
    };

    // Mock translation functions
    global.translateTeamName = (name) => name;
    global.translateStadiumName = (stadium) => stadium;
    global.translateLocation = (location) => location;
    global.getTeamLogoUrl = (teamName) => `https://example.com/logo/${teamName.replace(/\s+/g, '_')}.png`;

    // Import the function to test
    const module = await import('../src/scripts/mlb-script.js');
    renderTeamList = module.renderTeamList;
  });

  it('should render table with correct structure', () => {
    renderTeamList(mockMLBTeams);
    
    const teamListElement = document.getElementById('team-list');
    expect(teamListElement).toBeTruthy();
    
    const table = teamListElement.querySelector('.teams-table');
    expect(table).toBeTruthy();
    
    const thead = table.querySelector('thead');
    expect(thead).toBeTruthy();
    
    const tbody = table.querySelector('tbody');
    expect(tbody).toBeTruthy();
  });

  it('should render correct number of team rows', () => {
    renderTeamList(mockMLBTeams);
    
    const teamRows = document.querySelectorAll('.team-row');
    expect(teamRows.length).toBe(2);
  });

  it('should render team logos with correct attributes', () => {
    renderTeamList(mockMLBTeams);
    
    const logos = document.querySelectorAll('.team-logo-table');
    expect(logos.length).toBe(2);
    
    logos.forEach(logo => {
      expect(logo.tagName).toBe('IMG');
      expect(logo.src).toContain('https://example.com/logo/');
      expect(logo.alt).toContain('logo');
      expect(logo.className).toBe('team-logo-table');
    });
  });

  it('should apply league-specific CSS classes', () => {
    renderTeamList(mockMLBTeams);
    
    const rows = document.querySelectorAll('.team-row');
    expect(rows[0].classList.contains('american-league')).toBe(true);
    expect(rows[1].classList.contains('national-league')).toBe(true);
  });

  it('should render correct table headers', () => {
    renderTeamList(mockMLBTeams);
    
    const headers = document.querySelectorAll('.teams-table th');
    expect(headers.length).toBe(4);
    expect(headers[1].textContent).toBe('Team');
    expect(headers[2].textContent).toBe('Stadium');
    expect(headers[3].textContent).toBe('Location');
  });

  it('should render team information correctly', () => {
    renderTeamList(mockMLBTeams);
    
    const rows = document.querySelectorAll('.team-row');
    
    // Check first team (Yankees)
    const yankeesRow = rows[0];
    const yankeesCells = yankeesRow.querySelectorAll('td');
    expect(yankeesCells[1].textContent).toBe('New York Yankees');
    expect(yankeesCells[2].textContent).toBe('Yankee Stadium');
    expect(yankeesCells[3].textContent).toBe('New York, NY');
    
    // Check second team (Dodgers)
    const dodgersRow = rows[1];
    const dodgersCells = dodgersRow.querySelectorAll('td');
    expect(dodgersCells[1].textContent).toBe('Los Angeles Dodgers');
    expect(dodgersCells[2].textContent).toBe('Dodger Stadium');
    expect(dodgersCells[3].textContent).toBe('Los Angeles, CA');
  });

  it('should add click handlers to team rows', () => {
    // Mock focusOnTeam function
    global.focusOnTeam = vi.fn();
    
    renderTeamList(mockMLBTeams);
    
    const rows = document.querySelectorAll('.team-row');
    expect(rows[0].onclick).toBeTruthy();
    expect(rows[1].onclick).toBeTruthy();
  });

  it('should handle mobile responsive layout', () => {
    // Set mobile width
    Object.defineProperty(window, 'innerWidth', {
      value: 480,
    });
    
    renderTeamList(mockMLBTeams);
    
    const teamListElement = document.getElementById('team-list');
    expect(teamListElement).toBeTruthy();
    
    // Table should still be rendered even on mobile
    const table = teamListElement.querySelector('.teams-table');
    expect(table).toBeTruthy();
  });

  it('should display team count in title', () => {
    renderTeamList(mockMLBTeams);
    
    const title = document.querySelector('h3');
    expect(title.textContent).toContain('Teams (2)');
  });

  it('should handle empty team list', () => {
    renderTeamList([]);
    
    const title = document.querySelector('h3');
    expect(title.textContent).toContain('Teams (0)');
    
    const rows = document.querySelectorAll('.team-row');
    expect(rows.length).toBe(0);
  });

  it('should render logo with correct inline styles', () => {
    renderTeamList(mockMLBTeams);
    
    const logos = document.querySelectorAll('.team-logo-table');
    logos.forEach(logo => {
      expect(logo.style.width).toBe('28px');
      expect(logo.style.height).toBe('28px');
      expect(logo.style.objectFit).toBe('contain');
      expect(logo.style.display).toBe('block');
      expect(logo.style.margin).toBe('0px auto');
    });
  });
});