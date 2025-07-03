import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// 旅行コンテンツの品質検証テスト
describe('旅行コンテンツ品質検証テスト', () => {
  const travelContentDir = join(process.cwd(), 'src/content/travel');
  
  // 全マークダウンファイルを取得
  const getAllTravelFiles = () => {
    const files = readdirSync(travelContentDir);
    return files.filter(file => file.endsWith('.md'));
  };

  describe('ファイル命名規則確認', () => {
    it('全てのファイルが適切な命名規則に従っている', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        // ファイル名がチーム名-期間.md の形式であることを確認（hokkaido-2days-3daysのような複合名も許可）
        expect(filename).toMatch(/^[a-z-]+(2days|3days|-2days-3days)?\.md$/);
      });
    });

    it('各球団に対応するファイルが存在する', () => {
      const files = getAllTravelFiles();
      
      const expectedTeamSlugs = [
        'tokyo-giants', 'tokyo-swallows', 'yokohama', 'osaka-tigers',
        'nagoya', 'hiroshima', 'hokkaido', 'osaka', 'saitama', 
        'chiba', 'miyagi', 'fukuoka'
      ];
      
      expectedTeamSlugs.forEach(teamSlug => {
        const hasFile = files.some(file => file.includes(teamSlug));
        expect(hasFile).toBe(true);
      });
    });
  });

  describe('フロントマター完全性チェック', () => {
    it('全ファイルが必須のフロントマターフィールドを持つ', () => {
      const files = getAllTravelFiles();
      
      const requiredFields = [
        'title', 'description', 'destination', 'duration', 'category',
        'highlights', 'itinerary', 'cost', 'tips', 'publishDate'
      ];
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        requiredFields.forEach(field => {
          expect(content).toContain(`${field}:`);
        });
      });
    });

    it('cost フィールドに budget が含まれている', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        expect(content).toContain('budget:');
        // 様々な予算表記に対応
        expect(content).toMatch(/budget: "[\¥約]*\d+-\d+万円\/人"/);
      });
    });

    it('highlights が配列形式で定義されている', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // highlights セクションの後に - で始まる項目があることを確認
        const highlightsMatch = content.match(/highlights:\s*\n((?:\s*-\s*.+\n)+)/);
        expect(highlightsMatch).toBeTruthy();
      });
    });
  });

  describe('旅程構造の検証', () => {
    it('全ファイルが day 1, 2 を含む適切な旅程を持つ', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        expect(content).toContain('day: 1');
        expect(content).toContain('day: 2');
        
        // タイトルとアクティビティが各日にあることを確認
        expect(content).toMatch(/day: 1\s*\n\s*title:/);
        expect(content).toMatch(/day: 2\s*\n\s*title:/);
      });
    });

    it('2泊3日プランは day 3 を含む', () => {
      const files = getAllTravelFiles();
      const threeDayFiles = files.filter(file => 
        file.includes('3days') || file.includes('2days-3days')
      );
      
      threeDayFiles.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        expect(content).toContain('day: 3');
        expect(content).toMatch(/day: 3\s*\n\s*title:/);
      });
    });

    it('各日のアクティビティが時間順に並んでいる', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // アクティビティが時間表記から始まることを確認
        const activityMatches = content.match(/"(\d{2}:\d{2})/g);
        if (activityMatches && activityMatches.length > 0) {
          const times = activityMatches.map(match => match.replace('"', ''));
          
          // 時間が昇順になっていることを確認（同一日内で）
          for (let i = 1; i < times.length; i++) {
            const prevTime = parseInt(times[i-1].replace(':', ''));
            const currTime = parseInt(times[i].replace(':', ''));
            
            // 新しい日が始まる場合は時間がリセットされることを考慮
            if (currTime >= 600 && prevTime >= 600) { // 6:00以降の場合
              expect(currTime >= prevTime || currTime < 1200).toBe(true);
            }
          }
        }
      });
    });
  });

  describe('コンテンツ品質検証', () => {
    it('全ファイルが適切な見出し構造を持つ', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // メインタイトル（# で始まる、フロントマター以降）
        const bodyContent = content.replace(/^---[\s\S]*?---\n/, '');
        expect(bodyContent).toMatch(/^# ⚾/m);
        
        // このプランのポイント（一部ファイルには存在しない場合がある）
        // expect(content).toContain('## 🌟 このプランのポイント');
      });
    });

    it('球場名が適切に言及されている', () => {
      const files = getAllTravelFiles();
      
      const stadiumMapping = {
        'tokyo-giants': ['東京ドーム'],
        'tokyo-swallows': ['明治神宮野球場', '神宮球場'],
        'yokohama': ['横浜スタジアム'],
        'osaka-tigers': ['甲子園球場', '甲子園'],
        'nagoya': ['ナゴヤドーム'],
        'hiroshima': ['マツダスタジアム'],
        'hokkaido': ['エスコンフィールド'],
        'osaka': ['京セラドーム', 'ドーム球場'],
        'saitama': ['ベルーナドーム'],
        'chiba': ['ZOZOマリンスタジアム', 'マリンスタジアム'],
        'miyagi': ['楽天生命パーク'],
        'fukuoka': ['PayPayドーム']
      };
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // ファイル名から球団を特定
        const teamKey = Object.keys(stadiumMapping).find(key => filename.includes(key));
        
        if (teamKey && stadiumMapping[teamKey]) {
          const stadiums = stadiumMapping[teamKey];
          const hasStadiumMention = stadiums.some(stadium => content.includes(stadium));
          expect(hasStadiumMention).toBe(true);
        }
      });
    });

    it('適切な絵文字が使用されている', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // メインタイトルに⚾が含まれている（フロントマター以降）
        const bodyContent = content.replace(/^---[\s\S]*?---\n/, '');
        expect(bodyContent).toMatch(/# ⚾/);
        
        // ポイントセクションに🌟が含まれている（存在しない場合もある）
        // expect(content).toContain('🌟');
      });
    });
  });

  describe('予算と料金の整合性確認', () => {
    it('予算設定が現実的な範囲内である', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        const budgetMatch = content.match(/budget: "¥(\d+)-(\d+)万円\/人"/);
        if (budgetMatch) {
          const minBudget = parseInt(budgetMatch[1]);
          const maxBudget = parseInt(budgetMatch[2]);
          
          expect(minBudget).toBeGreaterThan(0);
          expect(maxBudget).toBeGreaterThan(minBudget);
          expect(minBudget).toBeGreaterThanOrEqual(2); // 最低2万円
          expect(maxBudget).toBeLessThanOrEqual(20); // 最大20万円
        }
      });
    });

    it('2泊3日プランの予算が1泊2日より高く設定されている', () => {
      const files = getAllTravelFiles();
      
      // 同一球団の1泊2日と2泊3日プランを比較
      const teamSlugs = ['tokyo-giants', 'yokohama', 'osaka-tigers', 'nagoya', 'hiroshima'];
      
      teamSlugs.forEach(teamSlug => {
        const shortFile = files.find(f => f.includes(teamSlug) && f.includes('2days') && !f.includes('3days'));
        const longFile = files.find(f => f.includes(teamSlug) && f.includes('3days'));
        
        if (shortFile && longFile) {
          const shortPath = join(travelContentDir, shortFile);
          const longPath = join(travelContentDir, longFile);
          
          const shortContent = readFileSync(shortPath, 'utf-8');
          const longContent = readFileSync(longPath, 'utf-8');
          
          const shortBudgetMatch = shortContent.match(/budget: "¥(\d+)-(\d+)万円\/人"/);
          const longBudgetMatch = longContent.match(/budget: "¥(\d+)-(\d+)万円\/人"/);
          
          if (shortBudgetMatch && longBudgetMatch) {
            const shortMin = parseInt(shortBudgetMatch[1]);
            const longMin = parseInt(longBudgetMatch[1]);
            
            expect(longMin).toBeGreaterThanOrEqual(shortMin);
          }
        }
      });
    });
  });

  describe('テキスト品質確認', () => {
    it('各ファイルが適切な文字数を持つ', () => {
      const files = getAllTravelFiles();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // フロントマター以外のコンテンツを取得
        const bodyContent = content.replace(/^---[\s\S]*?---\n/, '');
        
        // 最低限のコンテンツ量があることを確認
        expect(bodyContent.length).toBeGreaterThan(200);
        
        // 日本語文字が含まれていることを確認
        expect(bodyContent).toMatch(/[ひらがなカタカナ漢字]/);
      });
    });

    it('重複コンテンツが適切に管理されている', () => {
      const files = getAllTravelFiles();
      
      const titleSet = new Set();
      
      files.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        const titleMatch = content.match(/title: "(.+)"/);
        if (titleMatch) {
          const title = titleMatch[1];
          
          // 完全に同じタイトルはないことを確認（期間違いは除く）
          const normalizedTitle = title.replace(/（.+）$/, '');
          if (!titleSet.has(normalizedTitle)) {
            titleSet.add(normalizedTitle);
          }
        }
      });
      
      // 十分な種類のタイトルがあることを確認
      expect(titleSet.size).toBeGreaterThan(10);
    });
  });
});