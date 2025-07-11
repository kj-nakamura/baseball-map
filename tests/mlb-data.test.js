import { describe, it, expect } from 'vitest';
import { mlbTeams } from '../src/scripts/mlb-script.js';

describe('MLB Teams Data Tests', () => {
  it('should have exactly 30 teams', () => {
    expect(mlbTeams.length).toBe(30);
  });

  it('should have correct number of American League teams', () => {
    const alTeams = mlbTeams.filter(team => team.league === 'American League');
    expect(alTeams).toHaveLength(15);
  });

  it('should have correct number of National League teams', () => {
    const nlTeams = mlbTeams.filter(team => team.league === 'National League');
    expect(nlTeams).toHaveLength(15);
  });

  it('should have correct number of teams per AL division', () => {
    const alEast = mlbTeams.filter(team => team.division === 'AL East');
    const alCentral = mlbTeams.filter(team => team.division === 'AL Central');
    const alWest = mlbTeams.filter(team => team.division === 'AL West');
    
    expect(alEast).toHaveLength(5);
    expect(alCentral).toHaveLength(5);
    expect(alWest).toHaveLength(5);
  });

  it('should have correct number of teams per NL division', () => {
    const nlEast = mlbTeams.filter(team => team.division === 'NL East');
    const nlCentral = mlbTeams.filter(team => team.division === 'NL Central');
    const nlWest = mlbTeams.filter(team => team.division === 'NL West');
    
    expect(nlEast).toHaveLength(5);
    expect(nlCentral).toHaveLength(5);
    expect(nlWest).toHaveLength(5);
  });

  it('should have all required properties for each team', () => {
    mlbTeams.forEach(team => {
      expect(team).toHaveProperty('name');
      expect(team).toHaveProperty('stadium');
      expect(team).toHaveProperty('location');
      expect(team).toHaveProperty('league');
      expect(team).toHaveProperty('division');
      expect(team).toHaveProperty('lat');
      expect(team).toHaveProperty('lng');
      expect(team).toHaveProperty('color');
      expect(team).toHaveProperty('detailUrl');
    });
  });

  it('should have valid latitude and longitude ranges for US', () => {
    mlbTeams.forEach(team => {
      // US latitude range: approximately 24°N to 49°N
      expect(team.lat).toBeGreaterThanOrEqual(24);
      expect(team.lat).toBeLessThanOrEqual(49);
      
      // US longitude range: approximately -125°W to -66°W
      expect(team.lng).toBeGreaterThanOrEqual(-125);
      expect(team.lng).toBeLessThanOrEqual(-66);
    });
  });

  it('should have valid internal URLs', () => {
    mlbTeams.forEach(team => {
      expect(team.detailUrl).toMatch(/^\/mlb\/[\w-]+$/);
    });
  });

  it('should have valid league names', () => {
    mlbTeams.forEach(team => {
      expect(['American League', 'National League']).toContain(team.league);
    });
  });

  it('should have valid division names', () => {
    const validDivisions = ['AL East', 'AL Central', 'AL West', 'NL East', 'NL Central', 'NL West'];
    mlbTeams.forEach(team => {
      expect(validDivisions).toContain(team.division);
    });
  });

  it('should have unique team names', () => {
    const teamNames = mlbTeams.map(team => team.name);
    const uniqueNames = [...new Set(teamNames)];
    expect(uniqueNames).toHaveLength(teamNames.length);
  });

  it('should have unique stadiums', () => {
    const stadiums = mlbTeams.map(team => team.stadium);
    const uniqueStadiums = [...new Set(stadiums)];
    expect(uniqueStadiums).toHaveLength(stadiums.length);
  });

  it('should have specific key teams', () => {
    const teamNames = mlbTeams.map(team => team.name);
    
    // Check for some well-known teams
    expect(teamNames).toContain('New York Yankees');
    expect(teamNames).toContain('Los Angeles Dodgers');
    expect(teamNames).toContain('Boston Red Sox');
    expect(teamNames).toContain('Chicago Cubs');
    expect(teamNames).toContain('San Francisco Giants');
  });

  it('should have valid team colors', () => {
    mlbTeams.forEach(team => {
      expect(team.color).toBeDefined();
      expect(typeof team.color).toBe('string');
      expect(team.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('should have valid logo functions', async () => {
    // Import the module
    const module = await import('../src/scripts/mlb-script.js');
    const { createLogoImg, getTeamLogoUrl } = module;

    // Mock global translations
    global.window = {
      mlbTranslations: {
        mlb: {
          logos: {
            'New York Yankees': 'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png'
          }
        }
      }
    };

    // Test getTeamLogoUrl function
    const logoUrl = getTeamLogoUrl('New York Yankees');
    expect(logoUrl).toBe('https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png');

    // Test createLogoImg function
    const logoImg = createLogoImg(logoUrl, 'New York Yankees', 'medium');
    expect(logoImg).toContain('width: 48px');
    expect(logoImg).toContain('height: 48px');
    expect(logoImg).toContain('object-fit: contain');
    expect(logoImg).toContain('New York Yankees logo');
  });

  it('should handle different logo sizes', async () => {
    const module = await import('../src/scripts/mlb-script.js');
    const { createLogoImg } = module;

    const logoUrl = 'https://example.com/logo.png';
    const teamName = 'Test Team';

    // Test small size
    const smallLogo = createLogoImg(logoUrl, teamName, 'small');
    expect(smallLogo).toContain('width: 32px');
    expect(smallLogo).toContain('height: 32px');

    // Test medium size (default)
    const mediumLogo = createLogoImg(logoUrl, teamName, 'medium');
    expect(mediumLogo).toContain('width: 48px');
    expect(mediumLogo).toContain('height: 48px');

    // Test large size
    const largeLogo = createLogoImg(logoUrl, teamName, 'large');
    expect(largeLogo).toContain('width: 64px');
    expect(largeLogo).toContain('height: 64px');
  });

  it('should handle missing logo URL', async () => {
    const module = await import('../src/scripts/mlb-script.js');
    const { createLogoImg } = module;

    // Test with empty logo URL
    const emptyLogo = createLogoImg('', 'Test Team', 'medium');
    expect(emptyLogo).toBe('');

    // Test with null logo URL
    const nullLogo = createLogoImg(null, 'Test Team', 'medium');
    expect(nullLogo).toBe('');
  });
});