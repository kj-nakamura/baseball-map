import { describe, it, expect } from 'vitest';
import { baseballTeams } from '../src/scripts/script.js';

// 野球チームデータのテスト（script.jsからインポート）
describe('Baseball Teams Data Tests', () => {
  it('should have correct number of teams', () => {
    expect(baseballTeams.length).toBeGreaterThanOrEqual(12);
  });

  it('should have correct guide URLs format', () => {
    baseballTeams.forEach(team => {
      if (team.guideUrl && !team.guideUrl.includes('farm')) {
        expect(team.guideUrl).toMatch(/^\/guides\/\w+$/);
      }
    });
  });
});

// 既存のテストデータは削除（未使用のため）

describe('野球チームデータのテスト', () => {
  it('12球団のデータが存在する', () => {
    const mainTeams = baseballTeams.filter(team => !team.type);
    expect(mainTeams).toHaveLength(12);
  });

  it('セ・リーグのチームが6球団ある', () => {
    const centralTeams = baseballTeams.filter(team => team.league === 'セントラル・リーグ');
    expect(centralTeams).toHaveLength(6);
  });

  it('パ・リーグのチームが6球団ある', () => {
    const pacificTeams = baseballTeams.filter(team => team.league === 'パシフィック・リーグ');
    expect(pacificTeams).toHaveLength(6);
  });

  it('すべてのチームに必要なプロパティが存在する', () => {
    baseballTeams.forEach(team => {
      expect(team).toHaveProperty('name');
      expect(team).toHaveProperty('stadium');
      expect(team).toHaveProperty('location');
      expect(team).toHaveProperty('league');
      expect(team).toHaveProperty('lat');
      expect(team).toHaveProperty('lng');
      expect(team).toHaveProperty('color');
      expect(team).toHaveProperty('detailUrl');
    });
  });

  it('緯度経度が有効な範囲内にある', () => {
    baseballTeams.forEach(team => {
      // 日本の緯度経度範囲
      expect(team.lat).toBeGreaterThan(24); // 沖縄より南
      expect(team.lat).toBeLessThan(46);    // 北海道より北
      expect(team.lng).toBeGreaterThan(123); // 西端より西
      expect(team.lng).toBeLessThan(146);    // 東端より東
    });
  });

  it('URLが正しい形式である', () => {
    baseballTeams.forEach(team => {
      expect(team.detailUrl).toMatch(/^https?:\/\/.+/);
    });
  });

  it('リーグ色が正しく設定されている', () => {
    baseballTeams.forEach(team => {
      if (team.league === 'セントラル・リーグ') {
        expect(team.color).toBe('#e74c3c');
      } else if (team.league === 'パシフィック・リーグ') {
        expect(team.color).toBe('#3498db');
      }
    });
  });
});

describe('データの整合性テスト', () => {
  it('チーム名が重複していない', () => {
    const names = baseballTeams.map(team => team.name);
    const uniqueNames = [...new Set(names)];
    expect(names).toHaveLength(uniqueNames.length);
  });

  it('球場名が重複していない', () => {
    const stadiums = baseballTeams.map(team => team.stadium);
    const uniqueStadiums = [...new Set(stadiums)];
    expect(stadiums).toHaveLength(uniqueStadiums.length);
  });

  it('座標の重複は最小限である', () => {
    const coordinates = baseballTeams.map(team => `${team.lat},${team.lng}`);
    const uniqueCoordinates = [...new Set(coordinates)];
    // 同じ球場複合体内で座標重複は許可するが、過度でないことを確認
    expect(coordinates.length - uniqueCoordinates.length).toBeLessThanOrEqual(2);
  });
});