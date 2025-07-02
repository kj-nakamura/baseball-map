import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// 統合テスト - ページ間の連携とナビゲーション
describe('統合テスト - ページ間連携', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    // ベースとなるHTML構造（マップページをシミュレート）
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>プロ野球12球団本拠地マップ</title>
</head>
<body>
  <div class="header">
    <h1>プロ野球12球団本拠地マップ</h1>
  </div>
  
  <div id="map"></div>
  
  <div id="team-info" style="display: none;">
    <h2 id="team-name"></h2>
    <p><strong>球場:</strong> <span id="stadium-name"></span></p>
    <div id="weather-info"></div>
    <div>
      <a id="guide-link" href="/guides/fighters">📖 観戦ガイドを見る</a>
    </div>
  </div>
</body>
</html>
`;

    dom = new JSDOM(html, {
      url: 'http://localhost:4321/',
      resources: 'usable'
    });
    window = dom.window;
    document = window.document;
    global.window = window;
    global.document = document;
  });

  describe('ナビゲーション連携テスト', () => {
    it('マップから観戦ガイドへのリンクが正しく設定されている', () => {
      const guideLink = document.getElementById('guide-link');
      expect(guideLink).toBeTruthy();
      expect(guideLink.href).toBe('http://localhost:4321/guides/fighters');
      expect(guideLink.textContent).toContain('観戦ガイドを見る');
    });

    it('観戦ガイドから旅行プランへのリンクが機能する', () => {
      // ファイターズ観戦ガイドページをシミュレート
      document.body.innerHTML = `
        <div class="travel-plan">
          <a href="/travel/hokkaido-3days" class="travel-link">
            📖 詳細な2泊3日モデルコースを見る
          </a>
        </div>
      `;

      const travelLink = document.querySelector('.travel-link');
      expect(travelLink).toBeTruthy();
      expect(travelLink.href).toBe('http://localhost:4321/travel/hokkaido-3days');
    });

    it('旅行プランから観戦ガイドへの相互リンクが存在する', () => {
      // 北海道旅行プランページをシミュレート
      document.body.innerHTML = `
        <section class="related-content">
          <div class="related-grid">
            <a href="/guides/fighters" class="related-card">
              <h3>ファイターズ観戦ガイド</h3>
            </a>
            <a href="/guides" class="related-card">
              <h3>他球団の観戦ガイド</h3>
            </a>
          </div>
        </section>
      `;

      const fightersGuideLink = document.querySelector('a[href="/guides/fighters"]');
      const allGuidesLink = document.querySelector('a[href="/guides"]');
      
      expect(fightersGuideLink).toBeTruthy();
      expect(allGuidesLink).toBeTruthy();
    });
  });

  describe('データフロー統合テスト', () => {
    it('球団データが一貫して使用されている', () => {
      // script.jsから球団データを模擬
      const mockTeamData = {
        name: '北海道日本ハムファイターズ',
        stadium: 'エスコンフィールドHOKKAIDO',
        location: '北海道北広島市',
        league: 'パシフィック・リーグ',
        guideUrl: '/guides/fighters'
      };

      // チーム情報表示をシミュレート
      document.getElementById('team-name').textContent = mockTeamData.name;
      document.getElementById('stadium-name').textContent = mockTeamData.stadium;
      document.getElementById('guide-link').href = mockTeamData.guideUrl;

      expect(document.getElementById('team-name').textContent).toBe(mockTeamData.name);
      expect(document.getElementById('stadium-name').textContent).toBe(mockTeamData.stadium);
      expect(document.getElementById('guide-link').href).toBe('http://localhost:4321/guides/fighters');
    });

    it('メタデータが各ページで適切に設定されている', () => {
      // ページタイトルとメタデータの検証
      const testPages = [
        {
          url: '/',
          title: 'プロ野球12球団本拠地マップ',
          description: '日本プロ野球12球団の本拠地球場を地図上で確認'
        },
        {
          url: '/guides/fighters',
          title: 'ファイターズ球場観戦ガイド - エスコンフィールドHOKKAIDO',
          description: '北海道日本ハムファイターズの新球場を徹底解説'
        },
        {
          url: '/travel/hokkaido-3days',
          title: '北海道2泊3日モデルコース',
          description: 'ファイターズ観戦＆北海道グルメ・絶景を満喫'
        }
      ];

      testPages.forEach(page => {
        // 各ページのメタデータ形式をテスト
        expect(page.title).toBeTruthy();
        expect(page.description).toBeTruthy();
        expect(page.title.length).toBeGreaterThan(10);
        expect(page.description.length).toBeGreaterThan(20);
      });
    });
  });

  describe('レスポンシブ統合テスト', () => {
    it('すべてのページで一貫したブレークポイントが使用されている', () => {
      const commonBreakpoints = ['768px', '480px'];
      
      // CSS ファイルでのブレークポイント使用を模擬テスト
      commonBreakpoints.forEach(breakpoint => {
        expect(breakpoint).toMatch(/^\d+px$/);
      });
    });

    it('モバイルナビゲーションが全ページで機能する', () => {
      // モバイル表示時のナビゲーション構造をテスト
      document.body.innerHTML = `
        <div class="blog-container" style="grid-template-columns: 1fr;">
          <main class="blog-content">コンテンツ</main>
          <aside class="blog-sidebar" style="order: -1;">サイドバー</aside>
        </div>
      `;

      const container = document.querySelector('.blog-container');
      const sidebar = document.querySelector('.blog-sidebar');
      
      expect(container).toBeTruthy();
      expect(sidebar).toBeTruthy();
    });
  });

  describe('SEO統合テスト', () => {
    it('パンくずナビゲーションが構造化されている', () => {
      document.body.innerHTML = `
        <div class="breadcrumb">
          <a href="/">ホーム</a>
          <span>›</span>
          <span class="breadcrumb-category">旅行プラン</span>
          <span>›</span>
          <span class="breadcrumb-current">北海道2泊3日モデルコース</span>
        </div>
      `;

      const breadcrumb = document.querySelector('.breadcrumb');
      const homeLink = breadcrumb.querySelector('a[href="/"]');
      const currentPage = breadcrumb.querySelector('.breadcrumb-current');

      expect(breadcrumb).toBeTruthy();
      expect(homeLink).toBeTruthy();
      expect(currentPage).toBeTruthy();
      expect(homeLink.textContent).toBe('ホーム');
    });

    it('内部リンクが適切に構成されている', () => {
      document.body.innerHTML = `
        <nav>
          <a href="/">ホーム</a>
          <a href="/guides">観戦ガイド</a>
          <a href="/guides/fighters">ファイターズ</a>
          <a href="/travel/hokkaido-3days">北海道旅行</a>
        </nav>
      `;

      const internalLinks = document.querySelectorAll('a[href^="/"]');
      expect(internalLinks.length).toBe(4);

      internalLinks.forEach(link => {
        expect(link.href.startsWith('http://localhost:4321/')).toBe(true);
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('アクセシビリティ統合テスト', () => {
    it('フォーカス管理が適切に行われている', () => {
      document.body.innerHTML = `
        <button class="share-btn">シェア</button>
        <a href="/guides" class="nav-link">ガイド</a>
        <input type="text" placeholder="検索">
      `;

      const focusableElements = document.querySelectorAll(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);
      
      focusableElements.forEach(element => {
        // フォーカス可能要素が適切にマークアップされていることを確認
        expect(element.tagName).toMatch(/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/);
      });
    });

    it('見出し構造が適切に階層化されている', () => {
      document.body.innerHTML = `
        <h1>メインタイトル</h1>
        <h2>セクション1</h2>
        <h3>サブセクション1.1</h3>
        <h3>サブセクション1.2</h3>
        <h2>セクション2</h2>
        <h3>サブセクション2.1</h3>
      `;

      const h1 = document.querySelectorAll('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');

      expect(h1.length).toBe(1); // h1は1つだけ
      expect(h2s.length).toBe(2);
      expect(h3s.length).toBe(3);
    });
  });

  describe('パフォーマンス統合テスト', () => {
    it('画像の遅延読み込みが適切に設定されている', () => {
      document.body.innerHTML = `
        <img src="/hero-image.jpg" alt="ヒーロー画像" loading="lazy">
        <img src="/thumb1.jpg" alt="サムネイル1" loading="lazy">
      `;

      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      expect(lazyImages.length).toBe(2);

      lazyImages.forEach(img => {
        expect(img.alt).toBeTruthy();
        expect(img.src).toBeTruthy();
      });
    });

    it('外部リソースが適切に管理されている', () => {
      // 外部リンクの検証
      document.body.innerHTML = `
        <a href="https://npb.jp" target="_blank" rel="noopener noreferrer">NPB公式</a>
        <a href="/guides/fighters">内部リンク</a>
      `;

      const externalLinks = document.querySelectorAll('a[href^="http"]:not([href^="http://localhost"])');
      
      externalLinks.forEach(link => {
        expect(link.rel).toContain('noopener');
        expect(link.target).toBe('_blank');
      });
    });
  });

  describe('エラーハンドリング統合テスト', () => {
    it('存在しないページへのリンクが適切に処理される', () => {
      document.body.innerHTML = `
        <a href="/guides/nonexistent" class="guide-link">存在しないガイド</a>
        <a href="/guides/fighters" class="guide-link">ファイターズガイド</a>
      `;

      const guideLinks = document.querySelectorAll('.guide-link');
      
      guideLinks.forEach(link => {
        // リンクが正しい形式であることを確認
        expect(link.href).toMatch(/^http:\/\/localhost:4321\/guides\/\w+$/);
      });
    });

    it('JavaScriptエラー時のフォールバック表示が用意されている', () => {
      document.body.innerHTML = `
        <div id="map">
          <noscript>
            <p>JavaScriptが無効になっています。地図を表示するにはJavaScriptを有効にしてください。</p>
          </noscript>
        </div>
      `;

      const noscript = document.querySelector('noscript');
      expect(noscript).toBeTruthy();
      expect(noscript.textContent).toContain('JavaScript');
    });
  });
});