import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * MLB レイアウトシステムテスト
 * このテストは、MLB関連のレイアウトファイルが正しく設定されていることを検証します
 */

describe('MLB Layout System Tests', () => {
  
  describe('Layout Files Structure', () => {
    it('should have MapLayout.astro in layouts/mlb/', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      expect(() => readFileSync(mapLayoutPath, 'utf-8')).not.toThrow();
    });

    it('should have TeamLayout.astro in layouts/mlb/', () => {
      const teamLayoutPath = join(process.cwd(), 'src/layouts/mlb/TeamLayout.astro');
      expect(() => readFileSync(teamLayoutPath, 'utf-8')).not.toThrow();
    });

    it('should have MapLayout importing BaseLayout', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      expect(content).toContain('import BaseLayout from \'../BaseLayout.astro\'');
    });

    it('should have TeamLayout importing BaseLayout', () => {
      const teamLayoutPath = join(process.cwd(), 'src/layouts/mlb/TeamLayout.astro');
      const content = readFileSync(teamLayoutPath, 'utf-8');
      expect(content).toContain('import BaseLayout from \'../BaseLayout.astro\'');
    });
  });

  describe('MapLayout Content', () => {
    it('should contain map-specific elements', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      
      expect(content).toContain('map-container');
      expect(content).toContain('league-toggle');
      expect(content).toContain('team-list');
      expect(content).toContain('id="map"');
    });

    it('should include language switcher', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      
      expect(content).toContain('language-switcher');
      expect(content).toContain('getRelativeLocaleUrl');
    });

    it('should include Leaflet CSS and JS', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      
      expect(content).toContain('leaflet@1.9.4/dist/leaflet.css');
      expect(content).toContain('leaflet@1.9.4/dist/leaflet.js');
    });

    it('should include MLB script', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      
      expect(content).toContain('/src/scripts/mlb-script.js');
    });
  });

  describe('TeamLayout Content', () => {
    it('should be simple wrapper with header and slot', () => {
      const teamLayoutPath = join(process.cwd(), 'src/layouts/mlb/TeamLayout.astro');
      const content = readFileSync(teamLayoutPath, 'utf-8');
      
      expect(content).toContain('MLBHeader');
      expect(content).toContain('<slot />');
      expect(content).not.toContain('map-container');
      expect(content).not.toContain('league-toggle');
    });

    it('should import MLBHeader component', () => {
      const teamLayoutPath = join(process.cwd(), 'src/layouts/mlb/TeamLayout.astro');
      const content = readFileSync(teamLayoutPath, 'utf-8');
      
      expect(content).toContain('import MLBHeader from \'../../components/MLBHeader.astro\'');
    });
  });

  describe('Page Integration', () => {
    it('should have ja/mlb.astro using MapLayout', () => {
      const jaMLBPath = join(process.cwd(), 'src/pages/ja/mlb.astro');
      const content = readFileSync(jaMLBPath, 'utf-8');
      
      expect(content).toContain('import MapLayout from \'../../layouts/mlb/MapLayout.astro\'');
      expect(content).toContain('<MapLayout');
    });

    it('should have mlb/[slug].astro using TeamLayout', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('import TeamLayout from \'../../layouts/mlb/TeamLayout.astro\'');
      expect(content).toContain('<TeamLayout');
      expect(content).toContain('</TeamLayout>');
    });

    it('should have mlb/[slug].astro with Amazon affiliate section', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('amazon-affiliate');
      expect(content).toContain('amazon-button');
      expect(content).toContain('entry.data.amazonLink || \'https://amzn.to/40PfMmv\'');
    });
  });

  describe('Amazon Links Configuration', () => {
    it('should have default Amazon link fallback', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('https://amzn.to/40PfMmv');
    });

    it('should have Dodgers with custom Amazon link', () => {
      const dodgersPath = join(process.cwd(), 'src/content/mlb/dodgers.md');
      const content = readFileSync(dodgersPath, 'utf-8');
      
      expect(content).toContain('amazonLink: "https://amzn.to/4eRJ6yM"');
    });

    it('should have other teams with empty Amazon links', () => {
      const yankeesPath = join(process.cwd(), 'src/content/mlb/yankees.md');
      const content = readFileSync(yankeesPath, 'utf-8');
      
      expect(content).toContain('amazonLink: ""');
    });
  });

  describe('MLB Script Integration', () => {
    it('should have team list click handler using focusOnTeam', () => {
      const scriptPath = join(process.cwd(), 'src/scripts/mlb-script.js');
      const content = readFileSync(scriptPath, 'utf-8');
      
      expect(content).toContain('onclick="focusOnTeam(\'${team.name}\')"');
      expect(content).not.toContain('window.location.href');
    });

    it('should have focusOnTeam function defined', () => {
      const scriptPath = join(process.cwd(), 'src/scripts/mlb-script.js');
      const content = readFileSync(scriptPath, 'utf-8');
      
      expect(content).toContain('function focusOnTeam');
      expect(content).toContain('window.focusOnTeam = focusOnTeam');
    });

    it('should have renderTeamList function', () => {
      const scriptPath = join(process.cwd(), 'src/scripts/mlb-script.js');
      const content = readFileSync(scriptPath, 'utf-8');
      
      expect(content).toContain('function renderTeamList');
      expect(content).toContain('window.renderTeamList = renderTeamList');
    });
  });

  describe('MLBHeader Component', () => {
    it('should have MLBHeader component file', () => {
      const headerPath = join(process.cwd(), 'src/components/MLBHeader.astro');
      expect(() => readFileSync(headerPath, 'utf-8')).not.toThrow();
    });

    it('should have MLBHeader linking to /ja/mlb', () => {
      const headerPath = join(process.cwd(), 'src/components/MLBHeader.astro');
      const content = readFileSync(headerPath, 'utf-8');
      
      expect(content).toContain('href="/ja/mlb"');
      expect(content).toContain('MLBマップ');
    });

    it('should have proper styling classes', () => {
      const headerPath = join(process.cwd(), 'src/components/MLBHeader.astro');
      const content = readFileSync(headerPath, 'utf-8');
      
      expect(content).toContain('mlb-header');
      expect(content).toContain('mlb-header__logo');
      expect(content).toContain('mlb-header__logo-title');
    });
  });

  describe('Content Management', () => {
    it('should have all 30 team content files', () => {
      const teams = [
        'dodgers', 'yankees', 'mariners', 'angels', 'red-sox', 'rangers', 'cubs',
        'mets', 'padres', 'blue-jays', 'giants', 'brewers', 'royals', 'astros',
        'marlins', 'orioles', 'rays', 'guardians', 'twins', 'tigers', 'white-sox',
        'athletics', 'braves', 'phillies', 'nationals', 'cardinals', 'reds',
        'pirates', 'diamondbacks', 'rockies'
      ];

      teams.forEach(team => {
        const teamPath = join(process.cwd(), `src/content/mlb/${team}.md`);
        expect(() => readFileSync(teamPath, 'utf-8')).not.toThrow();
      });
    });

    it('should have proper frontmatter structure in team files', () => {
      const dodgersPath = join(process.cwd(), 'src/content/mlb/dodgers.md');
      const content = readFileSync(dodgersPath, 'utf-8');
      
      expect(content).toContain('title:');
      expect(content).toContain('team:');
      expect(content).toContain('stadium:');
      expect(content).toContain('location:');
      expect(content).toContain('league:');
      expect(content).toContain('division:');
      expect(content).toContain('amazonLink:');
    });
  });

  describe('Styling and Assets', () => {
    it('should have team page specific styles', () => {
      const stylesPath = join(process.cwd(), 'src/pages/mlb/_slug.css');
      expect(() => readFileSync(stylesPath, 'utf-8')).not.toThrow();
    });

    it('should have Amazon button styles', () => {
      const stylesPath = join(process.cwd(), 'src/pages/mlb/_slug.css');
      const content = readFileSync(stylesPath, 'utf-8');
      
      expect(content).toContain('amazon-button');
      expect(content).toContain('amazon-affiliate');
    });
  });

  describe('Error Handling', () => {
    it('should handle missing Amazon links gracefully', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      // OR演算子を使用してデフォルト値を設定
      expect(content).toContain('entry.data.amazonLink || \'https://amzn.to/40PfMmv\'');
    });

    it('should have proper error handling in script', () => {
      const scriptPath = join(process.cwd(), 'src/scripts/mlb-script.js');
      const content = readFileSync(scriptPath, 'utf-8');
      
      expect(content).toContain('typeof');
      expect(content).toContain('undefined');
    });
  });

  describe('Internationalization', () => {
    it('should have i18n imports in MapLayout', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      
      expect(content).toContain('enTranslations');
      expect(content).toContain('jaTranslations');
    });

    it('should have locale handling', () => {
      const mapLayoutPath = join(process.cwd(), 'src/layouts/mlb/MapLayout.astro');
      const content = readFileSync(mapLayoutPath, 'utf-8');
      
      expect(content).toContain('locale === \'ja\'');
      expect(content).toContain('translations.mlb');
    });
  });
});