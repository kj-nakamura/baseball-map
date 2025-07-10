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
});