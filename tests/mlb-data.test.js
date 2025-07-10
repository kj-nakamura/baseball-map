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

  it('should have valid MLB.com URLs', () => {
    mlbTeams.forEach(team => {
      expect(team.detailUrl).toMatch(/^https:\/\/www\.mlb\.com\/\w+$/);
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
});