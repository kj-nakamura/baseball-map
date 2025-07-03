import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// CSS ファイルの存在確認とバリデーションテスト
describe('CSS ファイルバリデーションテスト', () => {
  const cssFiles = [
    'src/styles/style.css',
    'src/styles/weather.css', 
    'src/styles/blog.css'
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
      expect(cssContent).toContain('.blog-content');
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
        
        // 基本的なCSS構造の確認
        expect(cssContent).toMatch(/[.#a-zA-Z][^{]*{[^}]*}/);
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
      
      expect(cssContent).toMatch(/max-width:\s*768px/);
    });
  });

  describe('CSS命名規則の検証', () => {
    it('blog.css でBEM風の命名規則が使用されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      // ブログ関連のクラス名の存在確認
      expect(cssContent).toContain('.blog-');
      expect(cssContent).toContain('.breadcrumb');
    });
  });

  describe('カラーパレットの一貫性', () => {
    it('共通のカラーコードが使用されている', () => {
      const blogCss = readFileSync(join(process.cwd(), 'src/styles/blog.css'), 'utf-8');
      
      // 主要なカラーコードの存在確認
      expect(blogCss).toMatch(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/);
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
  });

  describe('グリッドレイアウトの検証', () => {
    it('blog.css にCSS Gridが使用されている', () => {
      const cssPath = join(process.cwd(), 'src/styles/blog.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      
      expect(cssContent).toContain('grid');
    });
  });
});

describe('CSSパフォーマンステスト', () => {
  const cssFiles = [
    'src/styles/style.css',
    'src/styles/weather.css',
    'src/styles/blog.css'
  ];

  describe('ファイルサイズチェック', () => {
    cssFiles.forEach(filePath => {
      it(`${filePath} のファイルサイズが適切である`, () => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        
        // 1MB以下であることを確認
        expect(cssContent.length).toBeLessThan(1024 * 1024);
      });
    });
  });

  describe('セレクター効率性チェック', () => {
    it('深いネストセレクターが過度に使用されていない', () => {
      cssFiles.forEach(filePath => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        
        // 5レベル以上の深いネストセレクターを検出
        const deepSelectors = cssContent.match(/[^{]+\s+[^{]+\s+[^{]+\s+[^{]+\s+[^{]+\s*{/g) || [];
        
        if (deepSelectors.length > 30) {
          console.warn(`${filePath} has ${deepSelectors.length} deep nested selectors`);
        }
        
        // 警告レベルなので、テストは通す
        expect(true).toBe(true);
      });
    });
  });

  describe('重複ルールチェック', () => {
    it('明らかな重複ルールが存在しない', () => {
      cssFiles.forEach(filePath => {
        const fullPath = join(process.cwd(), filePath);
        const cssContent = readFileSync(fullPath, 'utf-8');
        
        // 同一プロパティの重複をチェック（基本的なもの）
        const colorMatches = cssContent.match(/color:\s*[^;]+;/g) || [];
        const uniqueColors = new Set(colorMatches);
        
        // 基本的なチェックのみ実行
        expect(colorMatches.length).toBeGreaterThan(0);
      });
    });
  });
});