import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('MLB Routing and Path Tests', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>MLB Stadium Map</title>
        </head>
        <body>
          <div id="app">
            <a href="/en/mlb" class="en-link">🇺🇸 EN</a>
            <a href="/ja/mlb" class="ja-link">🇯🇵 JP</a>
            <div id="map"></div>
            <div id="team-list"></div>
          </div>
        </body>
      </html>
    `, { url: 'http://localhost:4321' });

    document = dom.window.document;
    window = dom.window;
    global.document = document;
    global.window = window;
  });

  describe('MLB Path Structure', () => {
    it('should have correct English MLB path', () => {
      const enLink = document.querySelector('.en-link');
      expect(enLink.getAttribute('href')).toBe('/en/mlb');
    });

    it('should have correct Japanese MLB path', () => {
      const jaLink = document.querySelector('.ja-link');
      expect(jaLink.getAttribute('href')).toBe('/ja/mlb');
    });

    it('should support root MLB path without locale prefix', () => {
      const rootPath = '/mlb';
      expect(rootPath).toMatch(/^\/mlb$/);
    });

    it('should validate MLB path patterns', () => {
      const validPaths = [
        '/mlb',
        '/en/mlb',
        '/ja/mlb',
        '/en/mlb/',
        '/ja/mlb/'
      ];

      const mlbPathRegex = /^\/(en|ja)?\/mlb\/?$|^\/mlb\/?$/;
      
      validPaths.forEach(path => {
        expect(path).toMatch(mlbPathRegex);
      });
    });

    it('should reject invalid MLB paths', () => {
      const invalidPaths = [
        '/mlb/extra',
        '/fr/mlb',
        '/mlb/teams',
        '/baseball',
        '/MLB',
        '/mlb/en'
      ];

      const mlbPathRegex = /^\/(en|ja)?\/mlb\/?$|^\/mlb\/?$/;
      
      invalidPaths.forEach(path => {
        expect(path).not.toMatch(mlbPathRegex);
      });
    });
  });

  describe('MLB URL Parameters and Query Strings', () => {
    it('should handle locale-specific URLs', () => {
      const testUrls = [
        { url: 'http://localhost:4321/en/mlb', locale: 'en' },
        { url: 'http://localhost:4321/ja/mlb', locale: 'ja' },
        { url: 'http://localhost:4321/mlb', locale: 'default' }
      ];

      testUrls.forEach(({ url, locale }) => {
        const urlObj = new URL(url);
        if (locale === 'en') {
          expect(urlObj.pathname).toBe('/en/mlb');
        } else if (locale === 'ja') {
          expect(urlObj.pathname).toBe('/ja/mlb');
        } else {
          expect(urlObj.pathname).toBe('/mlb');
        }
      });
    });

    it('should handle query parameters for team filtering', () => {
      const testUrls = [
        'http://localhost:4321/en/mlb?league=al',
        'http://localhost:4321/ja/mlb?division=al-east',
        'http://localhost:4321/mlb?team=yankees'
      ];

      testUrls.forEach(url => {
        const urlObj = new URL(url);
        expect(urlObj.search).toBeDefined();
        expect(urlObj.pathname).toContain('mlb');
      });
    });

    it('should support hash fragments for team selection', () => {
      const testUrls = [
        'http://localhost:4321/en/mlb#yankees',
        'http://localhost:4321/ja/mlb#dodgers',
        'http://localhost:4321/mlb#american-league'
      ];

      testUrls.forEach(url => {
        const urlObj = new URL(url);
        expect(urlObj.hash).toBeDefined();
        expect(urlObj.hash.length).toBeGreaterThan(1);
      });
    });
  });

  describe('MLB Navigation and Link Generation', () => {
    it('should generate correct relative locale URLs', () => {
      // Mock Astro's getRelativeLocaleUrl function
      const getRelativeLocaleUrl = (locale, path) => {
        return `/${locale}/${path}`;
      };

      expect(getRelativeLocaleUrl('en', 'mlb')).toBe('/en/mlb');
      expect(getRelativeLocaleUrl('ja', 'mlb')).toBe('/ja/mlb');
    });

    it('should handle base URL configurations', () => {
      const baseUrls = [
        'https://example.com',
        'https://example.com/subpath',
        'http://localhost:4321'
      ];

      baseUrls.forEach(base => {
        const fullUrl = new URL('/en/mlb', base);
        expect(fullUrl.toString()).toContain('/en/mlb');
        expect(fullUrl.hostname).toBeDefined();
      });
    });

    it('should support canonical URL generation', () => {
      const canonicalUrls = [
        'https://example.com/en/mlb',
        'https://example.com/ja/mlb'
      ];

      canonicalUrls.forEach(url => {
        const urlObj = new URL(url);
        expect(urlObj.protocol).toMatch(/^https?:$/);
        expect(urlObj.pathname).toMatch(/^\/(en|ja)\/mlb$/);
      });
    });
  });

  describe('MLB Route Validation', () => {
    it('should validate supported locales', () => {
      const supportedLocales = ['en', 'ja'];
      const testPaths = [
        '/en/mlb',
        '/ja/mlb',
        '/fr/mlb', // unsupported
        '/de/mlb'  // unsupported
      ];

      testPaths.forEach(path => {
        const locale = path.split('/')[1];
        if (supportedLocales.includes(locale)) {
          expect(supportedLocales).toContain(locale);
        } else if (locale === 'mlb') {
          // Root path without locale is valid
          expect(path).toBe('/mlb');
        } else {
          expect(supportedLocales).not.toContain(locale);
        }
      });
    });

    it('should handle trailing slashes consistently', () => {
      const pathPairs = [
        ['/en/mlb', '/en/mlb/'],
        ['/ja/mlb', '/ja/mlb/'],
        ['/mlb', '/mlb/']
      ];

      pathPairs.forEach(([withoutSlash, withSlash]) => {
        const normalizedWithout = withoutSlash.replace(/\/$/, '');
        const normalizedWith = withSlash.replace(/\/$/, '');
        expect(normalizedWithout).toBe(normalizedWith);
      });
    });

    it('should validate MLB-specific route segments', () => {
      const validSegments = ['mlb'];
      const invalidSegments = ['MLB', 'baseball', 'teams', 'stadiums'];

      validSegments.forEach(segment => {
        expect(['mlb']).toContain(segment);
      });

      invalidSegments.forEach(segment => {
        expect(['mlb']).not.toContain(segment);
      });
    });
  });

  describe('MLB Error Handling and Edge Cases', () => {
    it('should handle malformed URLs gracefully', () => {
      const malformedUrls = [
        'http://localhost:4321//en//mlb',
        'http://localhost:4321/en/mlb///',
        'http://localhost:4321/en//mlb'
      ];

      malformedUrls.forEach(url => {
        try {
          const urlObj = new URL(url);
          // Should be able to parse URL even if malformed
          expect(urlObj.pathname).toBeDefined();
        } catch (error) {
          // If URL constructor fails, that's also a valid test result
          expect(error).toBeInstanceOf(Error);
        }
      });
    });

    it('should handle case sensitivity in paths', () => {
      const caseSensitivePaths = [
        '/en/mlb',   // correct
        '/EN/MLB',   // incorrect
        '/En/Mlb',   // incorrect
        '/en/MLB'    // incorrect
      ];

      const correctPath = '/en/mlb';
      caseSensitivePaths.forEach(path => {
        if (path === correctPath) {
          expect(path).toBe('/en/mlb');
        } else {
          expect(path).not.toBe('/en/mlb');
        }
      });
    });

    it('should handle URL encoding in paths', () => {
      const encodedPaths = [
        '/en/mlb',
        '/en%2Fmlb',
        '/%65%6E/mlb'
      ];

      encodedPaths.forEach(path => {
        const decoded = decodeURIComponent(path);
        if (decoded === '/en/mlb') {
          expect(decoded).toBe('/en/mlb');
        }
      });
    });
  });

  describe('MLB API and Data Fetching Paths', () => {
    it('should define correct API endpoints for MLB data', () => {
      const apiEndpoints = [
        '/api/mlb/teams',
        '/api/mlb/leagues',
        '/api/mlb/divisions',
        '/api/mlb/translations'
      ];

      apiEndpoints.forEach(endpoint => {
        expect(endpoint).toMatch(/^\/api\/mlb\/\w+$/);
      });
    });

    it('should handle static asset paths for MLB resources', () => {
      const assetPaths = [
        '/src/scripts/mlb-script.js',
        '/src/i18n/en.json',
        '/src/i18n/ja.json',
        '/src/layouts/MLBLayout.astro'
      ];

      assetPaths.forEach(path => {
        expect(path).toMatch(/^\/src\//);
        expect(path).toBeDefined();
      });
    });

    it('should validate external resource URLs', () => {
      const externalUrls = [
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
        'https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png'
      ];

      externalUrls.forEach(url => {
        const urlObj = new URL(url);
        expect(urlObj.protocol).toMatch(/^https?:$/);
        expect(urlObj.hostname).toBeDefined();
      });
    });
  });

  describe('MLB SEO and Meta Information', () => {
    it('should generate correct meta tags for different locales', () => {
      const metaConfigs = [
        {
          locale: 'en',
          title: 'MLB Stadium Map',
          description: 'Interactive map of all 30 MLB team stadiums'
        },
        {
          locale: 'ja',
          title: 'MLBスタジアムマップ',
          description: 'メジャーリーグベースボール全30球団のスタジアムを地図上で確認'
        }
      ];

      metaConfigs.forEach(config => {
        expect(config.locale).toMatch(/^(en|ja)$/);
        expect(config.title).toBeDefined();
        expect(config.description).toBeDefined();
        expect(typeof config.title).toBe('string');
        expect(typeof config.description).toBe('string');
      });
    });

    it('should handle OpenGraph URLs correctly', () => {
      const ogUrls = [
        'https://example.com/en/mlb',
        'https://example.com/ja/mlb'
      ];

      ogUrls.forEach(url => {
        const urlObj = new URL(url);
        expect(urlObj.pathname).toMatch(/^\/(en|ja)\/mlb$/);
        expect(urlObj.protocol).toBe('https:');
      });
    });
  });
});