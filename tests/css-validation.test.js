import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// CSS ファイルの存在確認とバリデーションテスト
describe('CSS ファイルバリデーションテスト', () => {
  const cssFiles = [
    'src/styles/style.css',
    'src/styles/weather.css', 
    'src/styles/blog.css',
    'src/styles/travel.css'
  ];

  describe('CSS ファイルの存在確認', () => {
    cssFiles.forEach(filePath => {
      it(`${filePath} が存在する`, () => {
        const fullPath = join(process.cwd(), filePath);
        expect(existsSync(fullPath)).toBe(true);
      });
    });
  });

  describe('CSS ファイルの内容検証', () => {
    it('style.css に基本的なスタイルが含まれている', () => {
      const cssPath = join(process.cwd(), 'src/styles/style.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      // 基本的なセレクタの存在確認
      expect(cssContent).toContain('body');
      expect(cssContent).toContain('.header');
      expect(cssContent).toContain('.league-btn');
      expect(cssContent).toContain('#map');
      expect(cssContent).toContain('@media');
    });

    it('weather.css に天気関連のスタイルが含まれている', () => {
      const cssPath = join(process.cwd(), 'src/styles/weather.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('.weather-widget');
      expect(cssContent).toContain('.weather-current');
      expect(cssContent).toContain('.forecast');
      expect(cssContent).toContain('@keyframes');
    });

    it('blog.css にブログレイアウトのスタイルが含まれている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('.blog-container');
      expect(cssContent).toContain('.blog-header');
      expect(cssContent).toContain('.blog-sidebar');
      expect(cssContent).toContain('.article');
      expect(cssContent).toContain('.hero-section');
      expect(cssContent).toContain('.share-btn');
      expect(cssContent).toContain('@media');
    });

    it('travel.css に旅行記事のスタイルが含まれている', () => {
      const cssPath = join(process.cwd(), 'src/styles/travel.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('.intro');
      expect(cssContent).toContain('.highlight-box');
      expect(cssContent).toContain('.day-section');
      expect(cssContent).toContain('.time-slot');
      expect(cssContent).toContain('.budget-breakdown');
      expect(cssContent).toContain('.food-grid');
      expect(cssContent).toContain('@media');
    });
  });

  describe('CSS構文の基本検証', () => {
    cssFiles.forEach(filePath => {
      it(`${filePath} に構文エラーがない`, () => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        
        // 基本的な構文チェック
        const openBraces = (cssContent.match(/{/g) || []).length;
        const closeBraces = (cssContent.match(/}/g) || []).length;
        expect(openBraces).toBe(closeBraces);
        
        // セミコロンの基本チェック（プロパティ行の終端）
        const propertyLines = cssContent
          .split('\n')
          .filter(line => line.trim().includes(':') && !line.trim().startsWith('/*'))
          .filter(line => !line.includes('@media') && !line.includes('@import'));
        
        propertyLines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('{')) {
            // セミコロンで終わっていない、かつブロック開始でもない場合は警告
            console.warn(`Potential missing semicolon: ${trimmed}`);
          }
        });
      });
    });
  });

  describe('レスポンシブデザインの検証', () => {
    it('すべてのCSSファイルにメディアクエリが含まれている', () => {
      cssFiles.forEach(filePath => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        expect(cssContent).toContain('@media');
      });
    });

    it('blog.css に適切なブレークポイントが設定されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('max-width: 768px');
      expect(cssContent).toContain('max-width: 480px');
    });

    it('travel.css にモバイル対応が含まれている', () => {
      const cssPath = join(process.cwd(), 'src/styles/travel.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('max-width: 768px');
      expect(cssContent).toContain('grid-template-columns: 1fr');
    });
  });

  describe('CSS命名規則の検証', () => {
    it('blog.css でBEM風の命名規則が使用されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      // ブログ関連のクラス名の存在確認
      expect(cssContent).toContain('.blog-');
      expect(cssContent).toContain('.sidebar-');
      expect(cssContent).toContain('.footer-nav-');
    });

    it('travel.css で一貫した命名規則が使用されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/travel.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      // 旅行関連のクラス名の存在確認
      expect(cssContent).toContain('.day-');
      expect(cssContent).toContain('.time-');
      expect(cssContent).toContain('.budget-');
      expect(cssContent).toContain('.food-');
    });
  });

  describe('カラーパレットの一貫性', () => {
    it('共通のカラーコードが使用されている', () => {
      const blogCss = readFileSync(join(process.cwd(), 'src/styles/blog.css'), 'utf-8');
      const travelCss = readFileSync(join(process.cwd(), 'src/styles/travel.css'), 'utf-8');
      
      // 主要なカラーコードの存在確認
      const primaryBlue = '#3498db';
      const darkGray = '#2c3e50';
      
      expect(blogCss).toContain(primaryBlue);
      expect(blogCss).toContain(darkGray);
      expect(travelCss).toContain(primaryBlue);
      expect(travelCss).toContain(darkGray);
    });
  });

  describe('アニメーションとトランジション', () => {
    it('weather.css にアニメーションが定義されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/weather.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('@keyframes');
      expect(cssContent).toContain('animation');
    });

    it('blog.css にホバーエフェクトが定義されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain(':hover');
      expect(cssContent).toContain('transition');
    });

    it('travel.css にインタラクティブエフェクトが定義されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/travel.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain(':hover');
      expect(cssContent).toContain('transform');
    });
  });

  describe('グリッドレイアウトの検証', () => {
    it('blog.css にCSS Gridが使用されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('display: grid');
      expect(cssContent).toContain('grid-template-columns');
      expect(cssContent).toContain('gap');
    });

    it('travel.css にフレキシブルなグリッドが定義されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/travel.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('grid-template-columns: repeat(auto-fit');
      expect(cssContent).toContain('minmax(');
    });
  });
});

describe('CSSパフォーマンステスト', () => {
  const cssFiles = [
    'src/styles/style.css',
    'src/styles/weather.css', 
    'src/styles/blog.css',
    'src/styles/travel.css'
  ];

  describe('ファイルサイズチェック', () => {
    cssFiles.forEach(filePath => {
      it(`${filePath} のファイルサイズが適切である`, () => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        const sizeInKB = Buffer.byteLength(cssContent, 'utf8') / 1024;
        
        // CSSファイルのサイズが100KB以下であることを確認
        expect(sizeInKB).toBeLessThan(100);
      });
    });
  });

  describe('セレクター効率性チェック', () => {
    it('深いネストセレクターが過度に使用されていない', () => {
      cssFiles.forEach(filePath => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        
        // 5レベル以上の深いネストセレクターを検出
        const deepSelectors = cssContent.match(/\s+\S+\s+\S+\s+\S+\s+\S+\s+\S+\s*{/g);
        const deepSelectorCount = deepSelectors ? deepSelectors.length : 0;
        
        // 深いネストが多すぎないことを確認（警告レベル）
        if (deepSelectorCount > 10) {
          console.warn(`${filePath} has ${deepSelectorCount} deep nested selectors`);
        }
        expect(deepSelectorCount).toBeLessThan(60); // 極端に多い場合のみエラー
      });
    });
  });

  describe('重複ルールチェック', () => {
    it('明らかな重複ルールが存在しない', () => {
      cssFiles.forEach(filePath => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        
        // 同一プロパティの重複をチェック（基本的なもの）
        const duplicateProps = cssContent.match(/(\w+-?\w*:\s*[^;]+;)\s*\1/g);
        const duplicateCount = duplicateProps ? duplicateProps.length : 0;
        
        // 重複が少ないことを確認
        expect(duplicateCount).toBeLessThan(5);
      });
    });
  });
});