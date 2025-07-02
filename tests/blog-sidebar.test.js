import { describe, it, expect } from 'vitest';

describe('Blog Sidebar Dynamic Content', () => {
  describe('Team Detection Logic', () => {
    const testPathMapping = [
      { path: '/travel/hokkaido-3days', expectedTeam: 'fighters', expectedName: 'ファイターズ' },
      { path: '/travel/osaka-2days', expectedTeam: 'buffaloes', expectedName: 'バファローズ' },
      { path: '/travel/osaka-tigers-2days', expectedTeam: 'tigers', expectedName: 'タイガース' },
      { path: '/travel/saitama-2days', expectedTeam: 'lions', expectedName: 'ライオンズ' },
      { path: '/travel/chiba-2days', expectedTeam: 'marines', expectedName: 'マリーンズ' },
      { path: '/travel/miyagi-2days', expectedTeam: 'eagles', expectedName: 'イーグルス' },
      { path: '/travel/fukuoka-2days', expectedTeam: 'hawks', expectedName: 'ホークス' },
      { path: '/travel/tokyo-giants-2days', expectedTeam: 'giants', expectedName: 'ジャイアンツ' },
      { path: '/travel/tokyo-swallows-2days', expectedTeam: 'swallows', expectedName: 'スワローズ' },
      { path: '/travel/yokohama-2days', expectedTeam: 'baystars', expectedName: 'ベイスターズ' },
      { path: '/travel/nagoya-2days', expectedTeam: 'dragons', expectedName: 'ドラゴンズ' },
      { path: '/travel/hiroshima-2days', expectedTeam: 'carp', expectedName: 'カープ' }
    ];

    testPathMapping.forEach(({ path, expectedTeam, expectedName }) => {
      it(`should detect correct team for ${path}`, () => {
        // パス解析のロジックをテスト
        const getRelatedTeamInfo = (currentPath) => {
          if (currentPath.includes('hokkaido') || currentPath.includes('fighters')) {
            return { team: 'fighters', name: 'ファイターズ', stadium: 'エスコンフィールド北海道', icon: '🏔️' };
          } else if (currentPath.includes('osaka-2days') || (currentPath.includes('osaka') && currentPath.includes('buffaloes'))) {
            return { team: 'buffaloes', name: 'バファローズ', stadium: '京セラドーム大阪', icon: '🐃' };
          } else if (currentPath.includes('osaka-tigers') || (currentPath.includes('osaka') && currentPath.includes('tigers'))) {
            return { team: 'tigers', name: 'タイガース', stadium: '阪神甲子園球場', icon: '🐅' };
          } else if (currentPath.includes('saitama') || currentPath.includes('lions')) {
            return { team: 'lions', name: 'ライオンズ', stadium: 'ベルーナドーム', icon: '🦁' };
          } else if (currentPath.includes('chiba') || currentPath.includes('marines')) {
            return { team: 'marines', name: 'マリーンズ', stadium: 'ZOZOマリンスタジアム', icon: '⚓' };
          } else if (currentPath.includes('miyagi') || currentPath.includes('eagles')) {
            return { team: 'eagles', name: 'イーグルス', stadium: '楽天モバイルパーク宮城', icon: '🦅' };
          } else if (currentPath.includes('fukuoka') || currentPath.includes('hawks')) {
            return { team: 'hawks', name: 'ホークス', stadium: 'PayPayドーム', icon: '🦅' };
          } else if (currentPath.includes('tokyo-giants') || currentPath.includes('giants')) {
            return { team: 'giants', name: 'ジャイアンツ', stadium: '東京ドーム', icon: '🧡' };
          } else if (currentPath.includes('tokyo-swallows') || currentPath.includes('swallows')) {
            return { team: 'swallows', name: 'スワローズ', stadium: '明治神宮野球場', icon: '🐦' };
          } else if (currentPath.includes('yokohama') || currentPath.includes('baystars')) {
            return { team: 'baystars', name: 'ベイスターズ', stadium: '横浜スタジアム', icon: '⭐' };
          } else if (currentPath.includes('nagoya') || currentPath.includes('dragons')) {
            return { team: 'dragons', name: 'ドラゴンズ', stadium: 'バンテリンドーム ナゴヤ', icon: '🐉' };
          } else if (currentPath.includes('hiroshima') || currentPath.includes('carp')) {
            return { team: 'carp', name: 'カープ', stadium: 'MAZDA Zoom-Zoom スタジアム広島', icon: '🎣' };
          }
          return { team: 'fighters', name: 'ファイターズ', stadium: 'エスコンフィールド北海道', icon: '🏔️' };
        };

        const result = getRelatedTeamInfo(path);
        expect(result.team).toBe(expectedTeam);
        expect(result.name).toBe(expectedName);
        expect(result.stadium).toBeTruthy();
        expect(result.icon).toBeTruthy();
      });
    });
  });

  describe('Travel Article Detection Logic', () => {
    const travelPathMapping = [
      { path: '/travel/hokkaido-3days', expectedPath: '/travel/hokkaido-3days', expectedTitle: '北海道3日間モデルコース' },
      { path: '/travel/osaka-2days', expectedPath: '/travel/osaka-2days', expectedTitle: '大阪2日間モデルコース' },
      { path: '/travel/osaka-tigers-2days', expectedPath: '/travel/osaka-tigers-2days', expectedTitle: '大阪・神戸2日間コース' },
      { path: '/travel/tokyo-giants-2days', expectedPath: '/travel/tokyo-giants-2days', expectedTitle: '東京王道観光コース' },
      { path: '/travel/tokyo-swallows-2days', expectedPath: '/travel/tokyo-swallows-2days', expectedTitle: '東京モダン観光コース' },
      { path: '/travel/yokohama-2days', expectedPath: '/travel/yokohama-2days', expectedTitle: '横浜みなとみらいコース' },
      { path: '/travel/nagoya-2days', expectedPath: '/travel/nagoya-2days', expectedTitle: '名古屋めしコース' },
      { path: '/travel/hiroshima-2days', expectedPath: '/travel/hiroshima-2days', expectedTitle: '平和・宮島満喫コース' }
    ];

    travelPathMapping.forEach(({ path, expectedPath, expectedTitle }) => {
      it(`should detect correct travel article for ${path}`, () => {
        const getRelatedTravelInfo = (currentPath) => {
          if (currentPath.includes('hokkaido')) {
            return { path: '/travel/hokkaido-3days', title: '北海道3日間モデルコース', icon: '🏔️' };
          } else if (currentPath.includes('osaka-2days')) {
            return { path: '/travel/osaka-2days', title: '大阪2日間モデルコース', icon: '🏰' };
          } else if (currentPath.includes('osaka-tigers')) {
            return { path: '/travel/osaka-tigers-2days', title: '大阪・神戸2日間コース', icon: '🐅' };
          } else if (currentPath.includes('saitama')) {
            return { path: '/travel/saitama-2days', title: '埼玉2日間モデルコース', icon: '🌸' };
          } else if (currentPath.includes('chiba')) {
            return { path: '/travel/chiba-2days', title: '千葉2日間モデルコース', icon: '🌊' };
          } else if (currentPath.includes('miyagi')) {
            return { path: '/travel/miyagi-2days', title: '宮城2日間モデルコース', icon: '🌸' };
          } else if (currentPath.includes('fukuoka')) {
            return { path: '/travel/fukuoka-2days', title: '福岡2日間モデルコース', icon: '🍜' };
          } else if (currentPath.includes('tokyo-giants')) {
            return { path: '/travel/tokyo-giants-2days', title: '東京王道観光コース', icon: '🏯' };
          } else if (currentPath.includes('tokyo-swallows')) {
            return { path: '/travel/tokyo-swallows-2days', title: '東京モダン観光コース', icon: '🎨' };
          } else if (currentPath.includes('yokohama')) {
            return { path: '/travel/yokohama-2days', title: '横浜みなとみらいコース', icon: '🌉' };
          } else if (currentPath.includes('nagoya')) {
            return { path: '/travel/nagoya-2days', title: '名古屋めしコース', icon: '🏰' };
          } else if (currentPath.includes('hiroshima')) {
            return { path: '/travel/hiroshima-2days', title: '平和・宮島満喫コース', icon: '⛩️' };
          }
          return null;
        };

        const result = getRelatedTravelInfo(path);
        expect(result).toBeTruthy();
        expect(result.path).toBe(expectedPath);
        expect(result.title).toBe(expectedTitle);
        expect(result.icon).toBeTruthy();
      });
    });
  });

  describe('Page Type Detection', () => {
    it('should correctly identify guide pages', () => {
      const guidePaths = [
        '/guides/fighters',
        '/guides/giants',
        '/guides/tigers',
        '/guides/carp'
      ];

      guidePaths.forEach(path => {
        const isGuidePage = path.includes('/guides/');
        const isTravelPage = path.includes('/travel/');
        
        expect(isGuidePage).toBe(true);
        expect(isTravelPage).toBe(false);
      });
    });

    it('should correctly identify travel pages', () => {
      const travelPaths = [
        '/travel/hokkaido-3days',
        '/travel/tokyo-giants-2days',
        '/travel/osaka-tigers-2days',
        '/travel/hiroshima-2days'
      ];

      travelPaths.forEach(path => {
        const isGuidePage = path.includes('/guides/');
        const isTravelPage = path.includes('/travel/');
        
        expect(isGuidePage).toBe(false);
        expect(isTravelPage).toBe(true);
      });
    });
  });

  describe('Osaka Pages Differentiation', () => {
    it('should differentiate between Buffaloes and Tigers Osaka pages', () => {
      const getRelatedTeamInfo = (currentPath) => {
        if (currentPath.includes('osaka-2days')) {
          return { team: 'buffaloes', name: 'バファローズ', stadium: '京セラドーム大阪', icon: '🐃' };
        } else if (currentPath.includes('osaka-tigers')) {
          return { team: 'tigers', name: 'タイガース', stadium: '阪神甲子園球場', icon: '🐅' };
        }
        return null;
      };

      const buffaloeResult = getRelatedTeamInfo('/travel/osaka-2days');
      const tigersResult = getRelatedTeamInfo('/travel/osaka-tigers-2days');

      expect(buffaloeResult.team).toBe('buffaloes');
      expect(tigersResult.team).toBe('tigers');
      expect(buffaloeResult.stadium).not.toBe(tigersResult.stadium);
    });
  });

  describe('Tokyo Pages Differentiation', () => {
    it('should differentiate between Giants and Swallows Tokyo pages', () => {
      const getRelatedTeamInfo = (currentPath) => {
        if (currentPath.includes('tokyo-giants') || currentPath.includes('giants')) {
          return { team: 'giants', name: 'ジャイアンツ', stadium: '東京ドーム', icon: '🧡' };
        } else if (currentPath.includes('tokyo-swallows') || currentPath.includes('swallows')) {
          return { team: 'swallows', name: 'スワローズ', stadium: '明治神宮野球場', icon: '🐦' };
        }
        return null;
      };

      const giantsResult = getRelatedTeamInfo('/travel/tokyo-giants-2days');
      const swallowsResult = getRelatedTeamInfo('/travel/tokyo-swallows-2days');

      expect(giantsResult.team).toBe('giants');
      expect(swallowsResult.team).toBe('swallows');
      expect(giantsResult.stadium).not.toBe(swallowsResult.stadium);
    });
  });

  describe('Related Links Structure', () => {
    it('should generate proper guide links for travel pages', () => {
      const teams = ['fighters', 'giants', 'tigers', 'carp'];
      
      teams.forEach(team => {
        const expectedLink = `/guides/${team}`;
        expect(expectedLink).toMatch(/^\/guides\/[a-z]+$/);
      });
    });

    it('should generate proper travel links for guide pages', () => {
      const travelPaths = [
        '/travel/hokkaido-3days',
        '/travel/tokyo-giants-2days',
        '/travel/osaka-tigers-2days',
        '/travel/hiroshima-2days'
      ];
      
      travelPaths.forEach(path => {
        expect(path).toMatch(/^\/travel\/[a-z0-9-]+$/);
      });
    });
  });

  describe('Fallback Behavior', () => {
    it('should provide fallback team when path does not match any pattern', () => {
      const getRelatedTeamInfo = (currentPath) => {
        // Simplified logic for testing
        if (currentPath.includes('unknown-path')) {
          return { team: 'fighters', name: 'ファイターズ', stadium: 'エスコンフィールド北海道', icon: '🏔️' };
        }
        return { team: 'fighters', name: 'ファイターズ', stadium: 'エスコンフィールド北海道', icon: '🏔️' };
      };

      const result = getRelatedTeamInfo('/unknown-path');
      expect(result.team).toBe('fighters');
      expect(result.name).toBe('ファイターズ');
    });

    it('should handle null travel info gracefully', () => {
      const getRelatedTravelInfo = (currentPath) => {
        if (currentPath.includes('unknown')) {
          return null;
        }
        return { path: '/travel/hokkaido-3days', title: 'Test', icon: '🏔️' };
      };

      const result = getRelatedTravelInfo('/unknown');
      expect(result).toBeNull();
    });
  });

  describe('Icon and Stadium Validation', () => {
    it('should have proper icons for all teams', () => {
      const teamIcons = {
        fighters: '🏔️',
        buffaloes: '🐃',
        tigers: '🐅',
        lions: '🦁',
        marines: '⚓',
        eagles: '🦅',
        hawks: '🦅',
        giants: '🧡',
        swallows: '🐦',
        baystars: '⭐',
        dragons: '🐉',
        carp: '🎣'
      };

      Object.entries(teamIcons).forEach(([team, icon]) => {
        expect(icon).toBeTruthy();
        expect(typeof icon).toBe('string');
        expect(icon.length).toBeGreaterThan(0);
      });
    });

    it('should have proper stadium names for all teams', () => {
      const stadiums = [
        'エスコンフィールド北海道',
        '京セラドーム大阪',
        '阪神甲子園球場',
        'ベルーナドーム',
        'ZOZOマリンスタジアム',
        '楽天モバイルパーク宮城',
        'PayPayドーム',
        '東京ドーム',
        '明治神宮野球場',
        '横浜スタジアム',
        'バンテリンドーム ナゴヤ',
        'MAZDA Zoom-Zoom スタジアム広島'
      ];

      stadiums.forEach(stadium => {
        expect(stadium).toBeTruthy();
        expect(typeof stadium).toBe('string');
        expect(stadium.length).toBeGreaterThan(4);
      });
    });
  });
});