import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * MLB Amazon アフィリエイトシステムテスト
 * このテストは、Amazonアフィリエイトリンクシステムが正しく設定されていることを検証します
 */

describe('MLB Amazon Affiliate System Tests', () => {

  describe('Amazon Link Configuration', () => {
    it('should have default Amazon link defined', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('https://amzn.to/40PfMmv');
    });

    it('should use OR operator for fallback logic', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('entry.data.amazonLink || \'https://amzn.to/40PfMmv\'');
    });

    it('should always display Amazon affiliate section', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      // 条件付きレンダリングが削除されていることを確認
      expect(content).not.toContain('{entry.data.amazonLink && (');
      expect(content).toContain('<div class="amazon-affiliate">');
    });
  });

  describe('Dodgers Custom Link', () => {
    it('should have Dodgers with custom Amazon link', () => {
      const dodgersPath = join(process.cwd(), 'src/content/mlb/dodgers.md');
      const content = readFileSync(dodgersPath, 'utf-8');
      
      expect(content).toContain('amazonLink: "https://amzn.to/4eRJ6yM"');
    });

    it('should have proper frontmatter structure for Dodgers', () => {
      const dodgersPath = join(process.cwd(), 'src/content/mlb/dodgers.md');
      const content = readFileSync(dodgersPath, 'utf-8');
      
      expect(content).toContain('---');
      expect(content).toContain('title:');
      expect(content).toContain('amazonLink:');
      expect(content).toContain('---');
    });
  });

  describe('Other Teams Default Links', () => {
    const teamsWithDefaultLink = [
      'yankees', 'mariners', 'angels', 'red-sox', 'rangers', 'cubs',
      'mets', 'padres', 'blue-jays', 'giants', 'brewers', 'royals',
      'astros', 'marlins', 'orioles', 'rays', 'guardians', 'twins',
      'tigers', 'white-sox', 'athletics', 'braves', 'phillies',
      'nationals', 'cardinals', 'reds', 'pirates', 'diamondbacks', 'rockies'
    ];

    it('should have all 29 teams with empty Amazon links', () => {
      teamsWithDefaultLink.forEach(team => {
        const teamPath = join(process.cwd(), `src/content/mlb/${team}.md`);
        const content = readFileSync(teamPath, 'utf-8');
        
        expect(content).toContain('amazonLink: ""');
      });
    });

    it('should not have old Amazon links in team files', () => {
      teamsWithDefaultLink.forEach(team => {
        const teamPath = join(process.cwd(), `src/content/mlb/${team}.md`);
        const content = readFileSync(teamPath, 'utf-8');
        
        expect(content).not.toContain('amazonLink: "https://amzn.to/3vHg4jK"');
      });
    });
  });

  describe('Amazon Button Structure', () => {
    it('should have proper Amazon button HTML structure', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('<div class="amazon-affiliate">');
      expect(content).toContain('href={entry.data.amazonLink || \'https://amzn.to/40PfMmv\'}');
      expect(content).toContain('class="amazon-button"');
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener noreferrer"');
    });

    it('should have Amazon button text', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('Amazonで関連商品を見る');
      expect(content).toContain('<span class="button-text">');
    });

    it('should have Amazon button icon', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('<svg');
      expect(content).toContain('width="20"');
      expect(content).toContain('height="20"');
      expect(content).toContain('viewBox="0 0 24 24"');
    });
  });

  describe('Amazon Section Positioning', () => {
    it('should have Amazon section after quick-stats', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      const quickStatsIndex = content.indexOf('</section>');
      const amazonSectionIndex = content.indexOf('<div class="amazon-affiliate">');
      
      expect(amazonSectionIndex).toBeGreaterThan(quickStatsIndex);
    });

    it('should have Amazon section before content', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      const amazonSectionIndex = content.indexOf('</div>');
      const contentIndex = content.indexOf('<article class="content">');
      
      expect(amazonSectionIndex).toBeLessThan(contentIndex);
    });
  });

  describe('CSS Styling', () => {
    it('should have Amazon button CSS styles', () => {
      const stylesPath = join(process.cwd(), 'src/pages/mlb/_slug.css');
      const content = readFileSync(stylesPath, 'utf-8');
      
      expect(content).toContain('.amazon-button');
      expect(content).toContain('.amazon-affiliate');
    });

    it('should have responsive Amazon button styles', () => {
      const stylesPath = join(process.cwd(), 'src/pages/mlb/_slug.css');
      const content = readFileSync(stylesPath, 'utf-8');
      
      expect(content).toContain('transition');
      expect(content).toContain('hover');
    });
  });

  describe('Link Validation', () => {
    it('should have valid Amazon short URLs format', () => {
      const dodgersPath = join(process.cwd(), 'src/content/mlb/dodgers.md');
      const content = readFileSync(dodgersPath, 'utf-8');
      
      // Dodgers custom link format check
      expect(content).toMatch(/amazonLink: "https:\/\/amzn\.to\/[a-zA-Z0-9]+"/);
    });

    it('should have valid default Amazon URL format', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      // Default link format check
      expect(content).toMatch(/https:\/\/amzn\.to\/[a-zA-Z0-9]+/);
    });

    it('should use HTTPS for all Amazon links', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('https://amzn.to/');
      expect(content).not.toContain('http://amzn.to/');
    });
  });

  describe('Security Attributes', () => {
    it('should have proper security attributes', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('target="_blank"');
      expect(content).toContain('rel="noopener noreferrer"');
    });

    it('should open in new tab', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('target="_blank"');
    });
  });

  describe('Content Integration', () => {
    it('should have Amazon section in team page template', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('amazon-affiliate');
      expect(content).toContain('amazon-button');
    });

    it('should be part of main content area', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      const mainStart = content.indexOf('<main class="mlb-detail">');
      const mainEnd = content.indexOf('</main>');
      const amazonSection = content.indexOf('<div class="amazon-affiliate">');
      
      expect(amazonSection).toBeGreaterThan(mainStart);
      expect(amazonSection).toBeLessThan(mainEnd);
    });
  });

  describe('Error Handling', () => {
    it('should handle empty amazonLink gracefully', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      // OR演算子でデフォルト値を設定
      expect(content).toContain('entry.data.amazonLink || \'https://amzn.to/40PfMmv\'');
    });

    it('should not have conditional rendering that might hide button', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).not.toContain('{entry.data.amazonLink && (');
      expect(content).not.toContain('entry.data.amazonLink && (');
    });
  });

  describe('Consistency Checks', () => {
    it('should have consistent button text across all teams', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('Amazonで関連商品を見る');
    });

    it('should have consistent CSS classes', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('class="amazon-affiliate"');
      expect(content).toContain('class="amazon-button"');
      expect(content).toContain('class="button-text"');
    });

    it('should have consistent icon implementation', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      expect(content).toContain('<svg');
      expect(content).toContain('stroke="currentColor"');
      expect(content).toContain('stroke-width="2"');
    });
  });

  describe('Performance Considerations', () => {
    it('should not block page rendering', () => {
      const slugPath = join(process.cwd(), 'src/pages/mlb/[slug].astro');
      const content = readFileSync(slugPath, 'utf-8');
      
      // インラインスタイルや重いリソースがないことを確認
      expect(content).not.toContain('style="display: none"');
      expect(content).not.toContain('visibility: hidden');
    });

    it('should use efficient CSS selectors', () => {
      const stylesPath = join(process.cwd(), 'src/pages/mlb/_slug.css');
      const content = readFileSync(stylesPath, 'utf-8');
      
      expect(content).toContain('.amazon-button');
      expect(content).not.toContain('div > div > div > .amazon-button');
    });
  });
});