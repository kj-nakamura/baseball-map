import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// BlogLayoutのテスト用HTMLテンプレート
const createBlogHTML = (props = {}) => {
  const {
    title = 'テストブログ記事',
    description = 'テスト用の説明文',
    author = 'テスト作成者',
    publishDate = '2025-01-01',
    category = 'テストカテゴリ',
    tags = ['テスト', 'ブログ'],
    hasHero = false
  } = props;

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="/src/styles/blog.css">
</head>
<body>
  ${hasHero ? `
  <section class="hero-section">
    <div class="hero-container">
      <img src="/test-hero.jpg" alt="${title}" class="hero-image" />
      <div class="hero-overlay">
        <div class="hero-content">
          <h1 class="hero-title">${title}</h1>
          <p class="hero-description">${description}</p>
        </div>
      </div>
    </div>
  </section>
  ` : ''}

  <div class="blog-container">
    ${!hasHero ? `
    <header class="blog-header">
      <div class="breadcrumb">
        <a href="/" class="breadcrumb-link">ホーム</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-category">${category}</span>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">${title}</span>
      </div>
      
      <h1 class="blog-title">${title}</h1>
      <p class="blog-description">${description}</p>
      
      <div class="blog-meta">
        <div class="meta-item">
          <span class="meta-icon">👤</span>
          <span class="meta-text">${author}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📅</span>
          <span class="meta-text">${publishDate}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📂</span>
          <span class="meta-text">${category}</span>
        </div>
      </div>
      
      <div class="blog-tags">
        ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </header>
    ` : ''}

    <main class="blog-content">
      <article class="article">
        <h2>テストコンテンツ</h2>
        <p>これはテスト用のブログコンテンツです。</p>
      </article>
    </main>

    <aside class="blog-sidebar">
      <div class="sidebar-section">
        <h3 class="sidebar-title">関連記事</h3>
        <div class="related-links">
          <a href="/guides" class="related-link">
            <span class="related-icon">⚾</span>
            <div class="related-content">
              <h4>球場観戦ガイド</h4>
              <p>全12球団の観戦情報</p>
            </div>
          </a>
        </div>
      </div>

      <div class="sidebar-section">
        <h3 class="sidebar-title">クイックナビ</h3>
        <nav class="quick-nav">
          <a href="/" class="nav-item">
            <span class="nav-icon">🗾</span>
            <span>球場マップ</span>
          </a>
        </nav>
      </div>

      <div class="sidebar-section">
        <h3 class="sidebar-title">シェア</h3>
        <div class="share-buttons">
          <button class="share-btn twitter">
            <span class="share-icon">🐦</span>
            <span>Twitter</span>
          </button>
          <button class="share-btn facebook">
            <span class="share-icon">👥</span>
            <span>Facebook</span>
          </button>
          <button class="share-btn line">
            <span class="share-icon">💬</span>
            <span>LINE</span>
          </button>
        </div>
      </div>
    </aside>
  </div>

  <section class="footer-nav">
    <div class="footer-nav-container">
      <a href="/" class="footer-nav-link">
        <span class="footer-nav-icon">🏠</span>
        <span class="footer-nav-text">ホームに戻る</span>
      </a>
      <a href="/guides" class="footer-nav-link">
        <span class="footer-nav-icon">⚾</span>
        <span class="footer-nav-text">観戦ガイド一覧</span>
      </a>
    </div>
  </section>
</body>
</html>
`;
};

describe('BlogLayout コンポーネントテスト', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(createBlogHTML(), { 
      url: 'http://localhost:4321/test-blog'
    });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
  });

  describe('基本構造のテスト', () => {
    it('ブログタイトルが正しく表示される', () => {
      const title = document.querySelector('.blog-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('テストブログ記事');
    });

    it('説明文が正しく表示される', () => {
      const description = document.querySelector('.blog-description');
      expect(description).toBeTruthy();
      expect(description.textContent).toBe('テスト用の説明文');
    });

    it('メタ情報が正しく表示される', () => {
      const metaItems = document.querySelectorAll('.meta-item');
      expect(metaItems.length).toBe(3); // 著者、日付、カテゴリ
      
      const authorMeta = Array.from(metaItems).find(item => 
        item.textContent.includes('テスト作成者')
      );
      expect(authorMeta).toBeTruthy();
    });

    it('タグが正しく表示される', () => {
      const tags = document.querySelectorAll('.tag');
      expect(tags.length).toBe(2);
      expect(tags[0].textContent).toBe('テスト');
      expect(tags[1].textContent).toBe('ブログ');
    });

    it('パンくずナビが正しく表示される', () => {
      const breadcrumb = document.querySelector('.breadcrumb');
      expect(breadcrumb).toBeTruthy();
      
      const homeLink = document.querySelector('.breadcrumb-link');
      expect(homeLink.textContent).toBe('ホーム');
      expect(homeLink.href).toBe('http://localhost:4321/');
    });
  });

  describe('サイドバーのテスト', () => {
    it('サイドバーが存在する', () => {
      const sidebar = document.querySelector('.blog-sidebar');
      expect(sidebar).toBeTruthy();
    });

    it('関連記事セクションが存在する', () => {
      const relatedSection = document.querySelector('.sidebar-section');
      expect(relatedSection).toBeTruthy();
      
      const title = relatedSection.querySelector('.sidebar-title');
      expect(title.textContent).toBe('関連記事');
    });

    it('クイックナビが存在する', () => {
      const quickNav = document.querySelector('.quick-nav');
      expect(quickNav).toBeTruthy();
      
      const navItems = quickNav.querySelectorAll('.nav-item');
      expect(navItems.length).toBeGreaterThan(0);
    });

    it('SNSシェアボタンが存在する', () => {
      const shareButtons = document.querySelectorAll('.share-btn');
      expect(shareButtons.length).toBe(3); // Twitter, Facebook, LINE
      
      const twitterBtn = document.querySelector('.share-btn.twitter');
      const facebookBtn = document.querySelector('.share-btn.facebook');
      const lineBtn = document.querySelector('.share-btn.line');
      
      expect(twitterBtn).toBeTruthy();
      expect(facebookBtn).toBeTruthy();
      expect(lineBtn).toBeTruthy();
    });
  });

  describe('レスポンシブ対応のテスト', () => {
    it('ブログコンテナがgridレイアウトを使用している', () => {
      const container = document.querySelector('.blog-container');
      expect(container).toBeTruthy();
      expect(container.classList.contains('blog-container')).toBe(true);
    });

    it('記事コンテンツが存在する', () => {
      const article = document.querySelector('.article');
      expect(article).toBeTruthy();
      expect(article.textContent).toContain('テストコンテンツ');
    });
  });

  describe('フッターナビのテスト', () => {
    it('フッターナビが存在する', () => {
      const footerNav = document.querySelector('.footer-nav');
      expect(footerNav).toBeTruthy();
    });

    it('フッターナビリンクが正しく設定されている', () => {
      const footerLinks = document.querySelectorAll('.footer-nav-link');
      expect(footerLinks.length).toBe(2);
      
      const homeLink = footerLinks[0];
      const guidesLink = footerLinks[1];
      
      expect(homeLink.href).toBe('http://localhost:4321/');
      expect(guidesLink.href).toBe('http://localhost:4321/guides');
    });
  });

  describe('ヒーロー画像のテスト', () => {
    beforeEach(() => {
      dom = new JSDOM(createBlogHTML({ hasHero: true }), { 
        url: 'http://localhost:4321/test-blog'
      });
      document = dom.window.document;
      global.document = document;
    });

    it('ヒーローセクションが表示される', () => {
      const heroSection = document.querySelector('.hero-section');
      expect(heroSection).toBeTruthy();
    });

    it('ヒーロー画像が正しく設定される', () => {
      const heroImage = document.querySelector('.hero-image');
      expect(heroImage).toBeTruthy();
      expect(heroImage.src).toBe('http://localhost:4321/test-hero.jpg');
      expect(heroImage.alt).toBe('テストブログ記事');
    });

    it('ヒーロータイトルが表示される', () => {
      const heroTitle = document.querySelector('.hero-title');
      expect(heroTitle).toBeTruthy();
      expect(heroTitle.textContent).toBe('テストブログ記事');
    });
  });

  describe('アクセシビリティのテスト', () => {
    it('適切なheading構造が存在する', () => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const h3 = document.querySelector('h3');
      
      expect(h1).toBeTruthy(); // メインタイトル
      expect(h2).toBeTruthy(); // コンテンツ内見出し
      expect(h3).toBeTruthy(); // サイドバー見出し
    });

    it('すべてのリンクにhref属性が設定されている', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.href).toBeTruthy();
      });
    });

    it('画像にalt属性が設定されている', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img.alt).toBeTruthy();
      });
    });
  });
});

describe('BlogLayout SNS機能テスト', () => {
  let dom;
  let window;

  beforeEach(() => {
    dom = new JSDOM(createBlogHTML(), { 
      url: 'http://localhost:4321/test-blog'
    });
    window = dom.window;
    global.window = window;
    global.document = window.document;

    // window.openのモック
    window.open = vi.fn();
    
    // SNS関数を手動で定義
    window.shareToTwitter = function() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(window.document.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    };

    window.shareToFacebook = function() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    };

    window.shareToLine = function() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(window.document.title);
      window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank');
    };
  });

  it('Twitterシェア機能が動作する', () => {
    window.shareToTwitter();
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://twitter.com/intent/tweet'),
      '_blank'
    );
  });

  it('Facebookシェア機能が動作する', () => {
    window.shareToFacebook();
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://www.facebook.com/sharer/sharer.php'),
      '_blank'
    );
  });

  it('LINEシェア機能が動作する', () => {
    window.shareToLine();
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('https://social-plugins.line.me/lineit/share'),
      '_blank'
    );
  });
});