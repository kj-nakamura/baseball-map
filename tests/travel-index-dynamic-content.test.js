import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

// 旅行プラン一覧ページの動的コンテンツテスト
describe('旅行プラン一覧ページ動的コンテンツテスト', () => {
  const travelIndexPath = join(process.cwd(), 'src/pages/travel/index.astro');
  const travelContentDir = join(process.cwd(), 'src/content/travel');

  describe('基本構造確認', () => {
    it('travel/index.astro ファイルが存在する', () => {
      expect(existsSync(travelIndexPath)).toBe(true);
    });

    it('content/travel ディレクトリが存在する', () => {
      expect(existsSync(travelContentDir)).toBe(true);
    });

    it('travel/index.astro が getCollection を使用している', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      expect(content).toContain("getCollection('travel')");
    });
  });

  describe('動的コンテンツ生成確認', () => {
    it('teamInfo マッピングが12球団分定義されている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      const expectedTeams = [
        'tokyo-giants', 'tokyo-swallows', 'yokohama', 'osaka-tigers',
        'nagoya', 'hiroshima', 'hokkaido', 'osaka-2days',
        'saitama', 'chiba-lotte', 'chiba', 'miyagi', 'fukuoka'
      ];
      
      expectedTeams.forEach(team => {
        expect(content).toContain(`'${team}':`);
      });
    });

    it('都道府県情報が適切に設定されている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      const expectedPrefectures = [
        '東京都', '神奈川県', '兵庫県', '愛知県', '広島県',
        '北海道', '大阪府', '埼玉県', '千葉県', '宮城県', '福岡県'
      ];
      
      expectedPrefectures.forEach(prefecture => {
        expect(content).toContain(`prefecture: '${prefecture}'`);
      });
    });

    it('リーグ分類が正しく設定されている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      // セ・リーグチーム
      const centralTeams = ['tokyo-giants', 'tokyo-swallows', 'yokohama', 'osaka-tigers', 'nagoya', 'hiroshima'];
      centralTeams.forEach(team => {
        expect(content).toMatch(new RegExp(`'${team}':[^}]*league: 'central'`));
      });
      
      // パ・リーグチーム
      const pacificTeams = ['hokkaido', 'osaka-2days', 'saitama', 'chiba', 'miyagi', 'fukuoka'];
      pacificTeams.forEach(team => {
        expect(content).toMatch(new RegExp(`'${team}':[^}]*league: 'pacific'`));
      });
    });
  });

  describe('フィルター機能実装確認', () => {
    it('フィルターボタンのHTMLが含まれている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('data-filter="all"');
      expect(content).toContain('data-filter="central"');
      expect(content).toContain('data-filter="pacific"');
      expect(content).toContain('data-duration="all"');
      expect(content).toContain('data-duration="1泊2日"');
      expect(content).toContain('data-duration="2泊3日"');
    });

    it('カードにdata属性が適切に設定されている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('data-league={info.league}');
      expect(content).toContain('data-duration={travel.data.duration}');
    });

    it('フィルタースクリプトが含まれている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('document.addEventListener(\'DOMContentLoaded\'');
      expect(content).toContain('applyFilters');
      expect(content).toContain('updateResultsTitle');
    });
  });

  describe('カード表示内容確認', () => {
    it('カードに必要な情報が動的に表示される', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      // 動的コンテンツの表示確認
      expect(content).toContain('{info.icon}');
      expect(content).toContain('{info.prefecture}');
      expect(content).toContain('{travel.data.title}');
      expect(content).toContain('{info.name}');
      expect(content).toContain('{travel.data.description}');
      expect(content).toContain('{travel.data.duration}');
      expect(content).toContain('{travel.data.cost.budget}');
    });

    it('カードリンクが動的に生成される', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('href={`/travel/${travel.slug}`}');
    });
  });

  describe('CSSとスタイリング確認', () => {
    it('フィルターセクションのスタイルが定義されている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('.filter-section');
      expect(content).toContain('.filter-btn');
      expect(content).toContain('.filter-btn.active');
    });

    it('レスポンシブ対応のメディアクエリが含まれている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('@media (max-width: 768px)');
    });
  });

  describe('実際のトラベルファイルとの整合性', () => {
    it('content/travel ディレクトリに適切なファイルが存在する', () => {
      const files = readdirSync(travelContentDir);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      // 最低限の必要ファイル数を確認
      expect(markdownFiles.length).toBeGreaterThan(20); // 1泊2日と2泊3日の両方があるため
      
      // 重要なファイルの存在確認
      const requiredFiles = [
        'tokyo-giants-2days.md', 'tokyo-giants-3days.md',
        'hokkaido-3days.md', 'osaka-2days.md'
      ];
      
      requiredFiles.forEach(file => {
        expect(markdownFiles).toContain(file);
      });
    });

    it('各トラベルファイルが必要なフロントマターを持つ', () => {
      const files = readdirSync(travelContentDir);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      // サンプルファイルをいくつかチェック
      const sampleFiles = markdownFiles.slice(0, 5);
      
      sampleFiles.forEach(filename => {
        const filePath = join(travelContentDir, filename);
        const content = readFileSync(filePath, 'utf-8');
        
        // フロントマターの必須フィールド確認
        expect(content).toMatch(/^---[\s\S]*?title:/);
        expect(content).toMatch(/duration:/);
        expect(content).toMatch(/cost:/);
        expect(content).toMatch(/budget:/);
      });
    });
  });

  describe('統計情報の動的更新確認', () => {
    it('ヒーローセクションの統計が動的に更新される', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      // プラン数が動的に表示されることを確認
      expect(content).toContain('{sortedTravels.length}');
    });

    it('フィルター結果の件数が動的に更新される仕組みがある', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('updateResultsTitle(count)');
      expect(content).toContain('visibleCount');
    });
  });

  describe('エラーハンドリング確認', () => {
    it('チーム情報が見つからない場合のフォールバック処理がある', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('球団未定');
      expect(content).toContain('⚾'); // デフォルトアイコン
      expect(content).toContain('未定'); // デフォルト都道府県
    });

    it('getTeamInfo 関数が適切に実装されている', () => {
      const content = readFileSync(travelIndexPath, 'utf-8');
      
      expect(content).toContain('function getTeamInfo(slug)');
      expect(content).toContain('sort((a, b) => b.length - a.length)'); // 長いキーから試す
    });
  });
});