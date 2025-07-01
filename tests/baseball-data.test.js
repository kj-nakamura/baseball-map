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

// 既存のテストデータは参考として残す
const testTeams = [
  // セントラル・リーグ
  {
    name: '読売ジャイアンツ',
    stadium: '東京ドーム',
    location: '東京都文京区',
    league: 'セントラル・リーグ',
    lat: 35.7056,
    lng: 139.7519,
    color: '#e74c3c',
    detailUrl: 'https://npb.jp/stadium/detail.html?081'
  },
  {
    name: '阪神タイガース',
    stadium: '阪神甲子園球場',
    location: '兵庫県西宮市',
    league: 'セントラル・リーグ',
    lat: 34.7213,
    lng: 135.3619,
    color: '#e74c3c',
    detailUrl: 'https://npb.jp/stadium/detail.html?181'
  },
  {
    name: '横浜DeNAベイスターズ',
    stadium: '横浜スタジアム',
    location: '神奈川県横浜市',
    league: 'セントラル・リーグ',
    lat: 35.4437,
    lng: 139.6380,
    color: '#e74c3c',
    detailUrl: 'https://npb.jp/stadium/detail.html?093'
  },
  {
    name: '広島東洋カープ',
    stadium: 'MAZDA Zoom-Zoom スタジアム広島',
    location: '広島県広島市',
    league: 'セントラル・リーグ',
    lat: 34.3914,
    lng: 132.4626,
    color: '#e74c3c',
    detailUrl: 'https://npb.jp/stadium/detail.html?208'
  },
  {
    name: '東京ヤクルトスワローズ',
    stadium: '明治神宮野球場',
    location: '東京都新宿区',
    league: 'セントラル・リーグ',
    lat: 35.6784,
    lng: 139.7170,
    color: '#e74c3c',
    detailUrl: 'https://npb.jp/stadium/detail.html?082'
  },
  {
    name: '中日ドラゴンズ',
    stadium: 'バンテリンドーム ナゴヤ',
    location: '愛知県名古屋市',
    league: 'セントラル・リーグ',
    lat: 35.1855,
    lng: 136.9493,
    color: '#e74c3c',
    detailUrl: 'https://npb.jp/stadium/detail.html?151'
  },
  // パシフィック・リーグ
  {
    name: '福岡ソフトバンクホークス',
    stadium: 'みずほPayPayドーム福岡',
    location: '福岡県福岡市',
    league: 'パシフィック・リーグ',
    lat: 33.5957,
    lng: 130.3619,
    color: '#3498db',
    detailUrl: 'https://npb.jp/stadium/detail.html?245'
  },
  {
    name: '北海道日本ハムファイターズ',
    stadium: 'エスコンフィールドＨＯＫＫＡＩＤＯ',
    location: '北海道北広島市',
    league: 'パシフィック・リーグ',
    lat: 42.9869,
    lng: 141.5642,
    color: '#3498db',
    detailUrl: 'https://npb.jp/stadium/detail.html?290'
  },
  {
    name: '千葉ロッテマリーンズ',
    stadium: 'ZOZOマリンスタジアム',
    location: '千葉県千葉市',
    league: 'パシフィック・リーグ',
    lat: 35.6470,
    lng: 140.0316,
    color: '#3498db',
    detailUrl: 'https://npb.jp/stadium/detail.html?073'
  },
  {
    name: '東北楽天ゴールデンイーグルス',
    stadium: '楽天モバイルパーク宮城',
    location: '宮城県仙台市',
    league: 'パシフィック・リーグ',
    lat: 38.2566,
    lng: 140.9015,
    color: '#3498db',
    detailUrl: 'https://npb.jp/stadium/detail.html?029'
  },
  {
    name: 'オリックス・バファローズ',
    stadium: '京セラドーム大阪',
    location: '大阪府大阪市',
    league: 'パシフィック・リーグ',
    lat: 34.6650,
    lng: 135.4755,
    color: '#3498db',
    detailUrl: 'https://npb.jp/stadium/detail.html?175'
  },
  {
    name: '埼玉西武ライオンズ',
    stadium: 'ベルーナドーム',
    location: '埼玉県所沢市',
    league: 'パシフィック・リーグ',
    lat: 35.7651,
    lng: 139.4178,
    color: '#3498db',
    detailUrl: 'https://npb.jp/stadium/detail.html?068'
  }
];

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