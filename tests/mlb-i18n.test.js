import { describe, it, expect } from 'vitest';

describe('MLB i18n Tests', () => {
  it('should have correct translation files structure', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    // Check required keys exist in both files
    const requiredKeys = [
      'mlb.title',
      'mlb.description',
      'mlb.buttons.allTeams',
      'mlb.buttons.americanLeague',
      'mlb.buttons.nationalLeague',
      'mlb.teamInfo.stadium',
      'mlb.teamInfo.location',
      'mlb.teamInfo.league',
      'common.languageSwitch'
    ];
    
    for (const key of requiredKeys) {
      const keys = key.split('.');
      let enValue = enTranslations.default;
      let jaValue = jaTranslations.default;
      
      for (const k of keys) {
        enValue = enValue[k];
        jaValue = jaValue[k];
      }
      
      expect(enValue).toBeDefined();
      expect(jaValue).toBeDefined();
      expect(typeof enValue).toBe('string');
      expect(typeof jaValue).toBe('string');
    }
  });

  it('should have different translations for English and Japanese', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    expect(enTranslations.default.mlb.title).not.toBe(jaTranslations.default.mlb.title);
    expect(enTranslations.default.mlb.buttons.allTeams).not.toBe(jaTranslations.default.mlb.buttons.allTeams);
    expect(enTranslations.default.mlb.teamInfo.stadium).not.toBe(jaTranslations.default.mlb.teamInfo.stadium);
  });

  it('should have Japanese translations that contain Japanese characters', async () => {
    const jaTranslations = await import('../src/i18n/ja.json');
    
    // Check that Japanese translations contain Japanese characters
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    
    expect(japaneseRegex.test(jaTranslations.default.mlb.title)).toBe(true);
    expect(japaneseRegex.test(jaTranslations.default.mlb.buttons.allTeams)).toBe(true);
    expect(japaneseRegex.test(jaTranslations.default.mlb.teamInfo.stadium)).toBe(true);
  });

  it('should have consistent structure between English and Japanese translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    function getKeys(obj, prefix = '') {
      const keys = [];
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          keys.push(...getKeys(obj[key], fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    }
    
    const enKeys = getKeys(enTranslations.default).sort();
    const jaKeys = getKeys(jaTranslations.default).sort();
    
    expect(enKeys).toEqual(jaKeys);
  });

  it('should have all required MLB division translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const requiredDivisions = ['alEast', 'alCentral', 'alWest', 'nlEast', 'nlCentral', 'nlWest'];
    
    for (const division of requiredDivisions) {
      expect(enTranslations.default.mlb.divisions[division]).toBeDefined();
      expect(jaTranslations.default.mlb.divisions[division]).toBeDefined();
      expect(typeof enTranslations.default.mlb.divisions[division]).toBe('string');
      expect(typeof jaTranslations.default.mlb.divisions[division]).toBe('string');
    }
  });

  it('should have league translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    expect(enTranslations.default.mlb.leagues.americanLeague).toBe('American League');
    expect(enTranslations.default.mlb.leagues.nationalLeague).toBe('National League');
    expect(jaTranslations.default.mlb.leagues.americanLeague).toBe('アメリカンリーグ');
    expect(jaTranslations.default.mlb.leagues.nationalLeague).toBe('ナショナルリーグ');
  });

  it('should have all 30 team translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const requiredTeams = [
      'New York Yankees', 'Boston Red Sox', 'Tampa Bay Rays', 'Toronto Blue Jays', 'Baltimore Orioles',
      'Cleveland Guardians', 'Minnesota Twins', 'Kansas City Royals', 'Detroit Tigers', 'Chicago White Sox',
      'Houston Astros', 'Seattle Mariners', 'Texas Rangers', 'Oakland Athletics', 'Los Angeles Angels',
      'Atlanta Braves', 'Philadelphia Phillies', 'New York Mets', 'Miami Marlins', 'Washington Nationals',
      'Milwaukee Brewers', 'St. Louis Cardinals', 'Chicago Cubs', 'Cincinnati Reds', 'Pittsburgh Pirates',
      'Los Angeles Dodgers', 'San Diego Padres', 'San Francisco Giants', 'Arizona Diamondbacks', 'Colorado Rockies'
    ];

    // Check English translations (should be same as key)
    requiredTeams.forEach(team => {
      expect(enTranslations.default.mlb.teams[team]).toBeDefined();
      expect(typeof enTranslations.default.mlb.teams[team]).toBe('string');
    });

    // Check Japanese translations (should be different from English)
    requiredTeams.forEach(team => {
      expect(jaTranslations.default.mlb.teams[team]).toBeDefined();
      expect(typeof jaTranslations.default.mlb.teams[team]).toBe('string');
      expect(jaTranslations.default.mlb.teams[team]).not.toBe(team);
    });

    // Verify we have exactly 30 team translations
    expect(Object.keys(enTranslations.default.mlb.teams)).toHaveLength(30);
    expect(Object.keys(jaTranslations.default.mlb.teams)).toHaveLength(30);
  });

  it('should have all stadium translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const requiredStadiums = [
      'Yankee Stadium', 'Fenway Park', 'Tropicana Field', 'Rogers Centre', 'Oriole Park at Camden Yards',
      'Progressive Field', 'Target Field', 'Kauffman Stadium', 'Comerica Park', 'Guaranteed Rate Field',
      'Minute Maid Park', 'T-Mobile Park', 'Globe Life Field', 'Oakland Coliseum', 'Angel Stadium',
      'Truist Park', 'Citizens Bank Park', 'Citi Field', 'loanDepot park', 'Nationals Park',
      'American Family Field', 'Busch Stadium', 'Wrigley Field', 'Great American Ball Park', 'PNC Park',
      'Dodger Stadium', 'Petco Park', 'Oracle Park', 'Chase Field', 'Coors Field'
    ];

    requiredStadiums.forEach(stadium => {
      expect(enTranslations.default.mlb.stadiums[stadium]).toBeDefined();
      expect(jaTranslations.default.mlb.stadiums[stadium]).toBeDefined();
      expect(typeof enTranslations.default.mlb.stadiums[stadium]).toBe('string');
      expect(typeof jaTranslations.default.mlb.stadiums[stadium]).toBe('string');
    });

    expect(Object.keys(enTranslations.default.mlb.stadiums)).toHaveLength(30);
    expect(Object.keys(jaTranslations.default.mlb.stadiums)).toHaveLength(30);
  });

  it('should have all location translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const requiredLocations = [
      'New York, NY', 'Boston, MA', 'St. Petersburg, FL', 'Toronto, ON', 'Baltimore, MD',
      'Cleveland, OH', 'Minneapolis, MN', 'Kansas City, MO', 'Detroit, MI', 'Chicago, IL',
      'Houston, TX', 'Seattle, WA', 'Arlington, TX', 'Oakland, CA', 'Anaheim, CA',
      'Atlanta, GA', 'Philadelphia, PA', 'Miami, FL', 'Washington, DC',
      'Milwaukee, WI', 'St. Louis, MO', 'Cincinnati, OH', 'Pittsburgh, PA',
      'Los Angeles, CA', 'San Diego, CA', 'San Francisco, CA', 'Phoenix, AZ', 'Denver, CO'
    ];

    requiredLocations.forEach(location => {
      expect(enTranslations.default.mlb.locations[location]).toBeDefined();
      expect(jaTranslations.default.mlb.locations[location]).toBeDefined();
      expect(typeof enTranslations.default.mlb.locations[location]).toBe('string');
      expect(typeof jaTranslations.default.mlb.locations[location]).toBe('string');
    });
  });

  it('should have all team logo URLs', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const teams = Object.keys(enTranslations.default.mlb.teams);
    
    teams.forEach(team => {
      expect(enTranslations.default.mlb.logos[team]).toBeDefined();
      expect(jaTranslations.default.mlb.logos[team]).toBeDefined();
      
      const logoUrl = enTranslations.default.mlb.logos[team];
      expect(logoUrl).toMatch(/^https:\/\/a\.espncdn\.com\/i\/teamlogos\/mlb\/500\/\w+\.png$/);
      
      // Both locales should have the same logo URLs
      expect(enTranslations.default.mlb.logos[team]).toBe(jaTranslations.default.mlb.logos[team]);
    });

    expect(Object.keys(enTranslations.default.mlb.logos)).toHaveLength(30);
    expect(Object.keys(jaTranslations.default.mlb.logos)).toHaveLength(30);
  });

  it('should validate button translations completeness', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const requiredButtons = [
      'allTeams', 'americanLeague', 'nationalLeague',
      'alEast', 'alCentral', 'alWest',
      'nlEast', 'nlCentral', 'nlWest'
    ];

    requiredButtons.forEach(button => {
      expect(enTranslations.default.mlb.buttons[button]).toBeDefined();
      expect(jaTranslations.default.mlb.buttons[button]).toBeDefined();
      expect(typeof enTranslations.default.mlb.buttons[button]).toBe('string');
      expect(typeof jaTranslations.default.mlb.buttons[button]).toBe('string');
      expect(enTranslations.default.mlb.buttons[button]).not.toBe(jaTranslations.default.mlb.buttons[button]);
    });
  });

  it('should validate teamInfo translations', async () => {
    const enTranslations = await import('../src/i18n/en.json');
    const jaTranslations = await import('../src/i18n/ja.json');
    
    const requiredTeamInfo = ['stadium', 'location', 'league', 'teams', 'team'];

    requiredTeamInfo.forEach(info => {
      expect(enTranslations.default.mlb.teamInfo[info]).toBeDefined();
      expect(jaTranslations.default.mlb.teamInfo[info]).toBeDefined();
      expect(typeof enTranslations.default.mlb.teamInfo[info]).toBe('string');
      expect(typeof jaTranslations.default.mlb.teamInfo[info]).toBe('string');
    });
  });

  it('should have proper Japanese character encoding', async () => {
    const jaTranslations = await import('../src/i18n/ja.json');
    
    // Test specific Japanese translations for proper encoding
    expect(jaTranslations.default.mlb.teams['New York Yankees']).toBe('ニューヨーク・ヤンキース');
    expect(jaTranslations.default.mlb.teams['Los Angeles Dodgers']).toBe('ロサンゼルス・ドジャース');
    expect(jaTranslations.default.mlb.stadiums['Yankee Stadium']).toBe('ヤンキー・スタジアム');
    expect(jaTranslations.default.mlb.locations['New York, NY']).toBe('ニューヨーク州ニューヨーク');
  });
});