import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// 2泊3日プランのテスト
describe('2泊3日プランテスト', () => {
  const threeDaysPlans = [
    'hokkaido-2days-3days.md',
    'tokyo-giants-3days.md',
    'yokohama-3days.md',
    'osaka-tigers-3days.md',
    'nagoya-3days.md',
    'hiroshima-3days.md',
    'tokyo-swallows-3days.md',
    'fukuoka-3days.md',
    'chiba-lotte-3days.md',
    'saitama-3days.md',
    'miyagi-3days.md'
  ];

  describe('ファイル存在確認', () => {
    threeDaysPlans.forEach(filename => {
      it(`${filename} が存在する`, () => {
        const fullPath = join(process.cwd(), 'src/content/travel', filename);
        expect(existsSync(fullPath)).toBe(true);
      });
    });
  });

  describe('フロントマター検証', () => {
    threeDaysPlans.forEach(filename => {
      it(`${filename} のフロントマターが正しい`, () => {
        const fullPath = join(process.cwd(), 'src/content/travel', filename);
        const content = readFileSync(fullPath, 'utf-8');
        
        // フロントマター部分を抽出
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        expect(frontmatterMatch).toBeTruthy();
        
        const frontmatter = frontmatterMatch[1];
        
        // 必須フィールドの存在確認
        expect(frontmatter).toContain('title:');
        expect(frontmatter).toContain('description:');
        expect(frontmatter).toContain('destination:');
        expect(frontmatter).toContain('duration:');
        expect(frontmatter).toContain('category:');
        expect(frontmatter).toContain('highlights:');
        expect(frontmatter).toContain('itinerary:');
        expect(frontmatter).toContain('cost:');
        expect(frontmatter).toContain('tips:');
        expect(frontmatter).toContain('publishDate:');
      });
    });
  });

  describe('期間設定検証', () => {
    threeDaysPlans.forEach(filename => {
      it(`${filename} が適切な期間設定になっている`, () => {
        const fullPath = join(process.cwd(), 'src/content/travel', filename);
        const content = readFileSync(fullPath, 'utf-8');
        
        if (filename === 'hokkaido-2days-3days.md') {
          // 北海道は2泊3日
          expect(content).toContain('duration: "2泊3日"');
        } else {
          // その他は2泊3日
          expect(content).toContain('duration: "2泊3日"');
        }
      });
    });
  });

  describe('旅程構造検証', () => {
    threeDaysPlans.forEach(filename => {
      it(`${filename} が適切な日程構造を持つ`, () => {
        const fullPath = join(process.cwd(), 'src/content/travel', filename);
        const content = readFileSync(fullPath, 'utf-8');
        
        // 3日間の旅程があることを確認
        expect(content).toContain('day: 1');
        expect(content).toContain('day: 2');
        expect(content).toContain('day: 3');
        
        // 各日にタイトルとアクティビティがあることを確認
        expect(content.match(/title: ".*"/g).length).toBeGreaterThanOrEqual(3);
        expect(content).toContain('activities:');
      });
    });
  });

  describe('料金設定検証', () => {
    threeDaysPlans.forEach(filename => {
      it(`${filename} が2泊分の料金設定になっている`, () => {
        const fullPath = join(process.cwd(), 'src/content/travel', filename);
        const content = readFileSync(fullPath, 'utf-8');
        
        // 宿泊費が2泊分になっていることを確認
        const accommodationMatch = content.match(/accommodation: ".*2泊.*"/);
        if (filename !== 'hokkaido-2days-3days.md') {
          expect(accommodationMatch).toBeTruthy();
        }
        
        // 予算が妥当な範囲であることを確認
        const budgetMatch = content.match(/budget: "¥(\d+)-(\d+)万円\/人"/);
        expect(budgetMatch).toBeTruthy();
        
        const minBudget = parseInt(budgetMatch[1]);
        const maxBudget = parseInt(budgetMatch[2]);
        expect(minBudget).toBeGreaterThan(0);
        expect(maxBudget).toBeGreaterThan(minBudget);
        expect(maxBudget).toBeLessThan(25); // 最大25万円以下
      });
    });
  });

  describe('コンテンツ品質検証', () => {
    threeDaysPlans.forEach(filename => {
      it(`${filename} に適切なコンテンツが含まれている`, () => {
        const fullPath = join(process.cwd(), 'src/content/travel', filename);
        const content = readFileSync(fullPath, 'utf-8');
        
        // 見出しの存在確認
        expect(content).toContain('# ⚾');
        expect(content).toContain('## 🌟 このプランのポイント');
        
        // 球場名の言及があることを確認
        const stadiumKeywords = [
          'エスコンフィールド', '東京ドーム', '横浜スタジアム', '甲子園',
          'ナゴヤドーム', 'マツダスタジアム', '明治神宮野球場',
          'PayPayドーム', 'ZOZOマリンスタジアム', 'ベルーナドーム',
          '楽天生命パーク'
        ];
        
        const hasStadiumMention = stadiumKeywords.some(keyword => 
          content.includes(keyword)
        );
        expect(hasStadiumMention).toBe(true);
      });
    });
  });
});

// 1泊2日プランとの比較テスト
describe('1泊2日プランとの整合性テスト', () => {
  const planPairs = [
    { short: 'tokyo-giants-2days.md', long: 'tokyo-giants-3days.md' },
    { short: 'yokohama-2days.md', long: 'yokohama-3days.md' },
    { short: 'osaka-tigers-2days.md', long: 'osaka-tigers-3days.md' },
    { short: 'nagoya-2days.md', long: 'nagoya-3days.md' },
    { short: 'hiroshima-2days.md', long: 'hiroshima-3days.md' },
    { short: 'tokyo-swallows-2days.md', long: 'tokyo-swallows-3days.md' },
    { short: 'fukuoka-2days.md', long: 'fukuoka-3days.md' },
    { short: 'chiba-lotte-2days.md', long: 'chiba-lotte-3days.md' },
    { short: 'saitama-2days.md', long: 'saitama-3days.md' },
    { short: 'miyagi-2days.md', long: 'miyagi-3days.md' }
  ];

  describe('球団名の一致確認', () => {
    planPairs.forEach(({ short, long }) => {
      it(`${short} と ${long} が同じ球団のプランである`, () => {
        const shortPath = join(process.cwd(), 'src/content/travel', short);
        const longPath = join(process.cwd(), 'src/content/travel', long);
        
        if (existsSync(shortPath) && existsSync(longPath)) {
          const shortContent = readFileSync(shortPath, 'utf-8');
          const longContent = readFileSync(longPath, 'utf-8');
          
          // 球場名が一致することを確認
          const stadiumKeywords = [
            'エスコンフィールド', '東京ドーム', '横浜スタジアム', '甲子園',
            'ナゴヤドーム', 'マツダスタジアム', '明治神宮野球場',
            'PayPayドーム', 'ZOZOマリンスタジアム', 'ベルーナドーム',
            '楽天生命パーク'
          ];
          
          const shortStadium = stadiumKeywords.find(keyword => shortContent.includes(keyword));
          const longStadium = stadiumKeywords.find(keyword => longContent.includes(keyword));
          
          if (shortStadium && longStadium) {
            expect(shortStadium).toBe(longStadium);
          }
        }
      });
    });
  });

  describe('予算の妥当性確認', () => {
    planPairs.forEach(({ short, long }) => {
      it(`${long} の予算が ${short} より適切に高く設定されている`, () => {
        const shortPath = join(process.cwd(), 'src/content/travel', short);
        const longPath = join(process.cwd(), 'src/content/travel', long);
        
        if (existsSync(shortPath) && existsSync(longPath)) {
          const shortContent = readFileSync(shortPath, 'utf-8');
          const longContent = readFileSync(longPath, 'utf-8');
          
          const shortBudgetMatch = shortContent.match(/budget: "¥(\d+)-(\d+)万円\/人"/);
          const longBudgetMatch = longContent.match(/budget: "¥(\d+)-(\d+)万円\/人"/);
          
          if (shortBudgetMatch && longBudgetMatch) {
            const shortMin = parseInt(shortBudgetMatch[1]);
            const longMin = parseInt(longBudgetMatch[1]);
            
            // 2泊3日プランの方が予算が高いか同等であることを確認
            expect(longMin).toBeGreaterThanOrEqual(shortMin);
          }
        }
      });
    });
  });
});