import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// 旅行プラン一覧ページのフィルター機能テスト
describe('旅行プラン一覧ページフィルター機能テスト', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // 実際の旅行一覧ページのHTMLを読み込む（簡略版）
    const mockHTML = `
      <!DOCTYPE html>
      <html>
        <head><title>Travel Plans</title></head>
        <body>
          <div class="filter-section">
            <div class="filter-container">
              <h3 class="filter-title">🔍 プランを絞り込む</h3>
              <div class="filter-groups">
                <div class="filter-group">
                  <label class="filter-label">リーグ</label>
                  <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">すべて</button>
                    <button class="filter-btn" data-filter="central">セ・リーグ</button>
                    <button class="filter-btn" data-filter="pacific">パ・リーグ</button>
                  </div>
                </div>
                <div class="filter-group">
                  <label class="filter-label">宿泊日数</label>
                  <div class="filter-buttons">
                    <button class="filter-btn active" data-duration="all">すべて</button>
                    <button class="filter-btn" data-duration="1泊2日">1泊2日</button>
                    <button class="filter-btn" data-duration="2泊3日">2泊3日</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="all-plans-section">
            <div class="league-header">
              <h2 class="league-title" id="results-title">📋 全プラン一覧</h2>
              <p class="league-description" id="results-description">すべての野球観戦旅行プランを一覧でご確認いただけます</p>
            </div>
            
            <div class="course-grid" id="filtered-results">
              <article class="course-card central-league" data-league="central" data-duration="1泊2日">
                <h3>東京王道観光コース</h3>
                <p>読売ジャイアンツ</p>
              </article>
              <article class="course-card central-league" data-league="central" data-duration="2泊3日">
                <h3>東京王道観光コース（3日間）</h3>
                <p>読売ジャイアンツ</p>
              </article>
              <article class="course-card pacific-league" data-league="pacific" data-duration="1泊2日">
                <h3>北海道大自然コース</h3>
                <p>北海道日本ハムファイターズ</p>
              </article>
              <article class="course-card pacific-league" data-league="pacific" data-duration="2泊3日">
                <h3>北海道大自然満喫コース</h3>
                <p>北海道日本ハムファイターズ</p>
              </article>
              <article class="course-card central-league" data-league="central" data-duration="1泊2日">
                <h3>横浜みなとみらいコース</h3>
                <p>横浜DeNAベイスターズ</p>
              </article>
              <article class="course-card central-league" data-league="central" data-duration="2泊3日">
                <h3>横浜みなとみらいコース（3日間）</h3>
                <p>横浜DeNAベイスターズ</p>
              </article>
            </div>
          </div>
        </body>
      </html>
    `;

    dom = new JSDOM(mockHTML);
    document = dom.window.document;
    window = dom.window;
    
    // DOMContentLoadedイベントをモック
    global.document = document;
    global.window = window;
  });

  describe('フィルターUI要素の存在確認', () => {
    it('フィルターセクションが存在する', () => {
      const filterSection = document.querySelector('.filter-section');
      expect(filterSection).toBeTruthy();
    });

    it('リーグフィルターボタンが3つ存在する', () => {
      const leagueButtons = document.querySelectorAll('[data-filter]');
      expect(leagueButtons.length).toBe(3);
      
      const buttonTexts = Array.from(leagueButtons).map(btn => btn.textContent);
      expect(buttonTexts).toContain('すべて');
      expect(buttonTexts).toContain('セ・リーグ');
      expect(buttonTexts).toContain('パ・リーグ');
    });

    it('宿泊日数フィルターボタンが3つ存在する', () => {
      const durationButtons = document.querySelectorAll('[data-duration]');
      expect(durationButtons.length).toBeGreaterThanOrEqual(3);
      
      const buttonTexts = Array.from(durationButtons).map(btn => btn.textContent);
      expect(buttonTexts).toContain('すべて');
      expect(buttonTexts).toContain('1泊2日');
      expect(buttonTexts).toContain('2泊3日');
    });

    it('初期状態で「すべて」ボタンがアクティブになっている', () => {
      const activeLeagueBtn = document.querySelector('[data-filter="all"]');
      const activeDurationBtn = document.querySelector('[data-duration="all"]');
      
      expect(activeLeagueBtn.classList.contains('active')).toBe(true);
      expect(activeDurationBtn.classList.contains('active')).toBe(true);
    });
  });

  describe('コースカードのデータ属性確認', () => {
    it('全てのコースカードが適切なdata-league属性を持つ', () => {
      const cards = document.querySelectorAll('.course-card');
      expect(cards.length).toBe(6);
      
      cards.forEach(card => {
        const league = card.dataset.league;
        expect(['central', 'pacific'].includes(league)).toBe(true);
      });
    });

    it('全てのコースカードが適切なdata-duration属性を持つ', () => {
      const cards = document.querySelectorAll('.course-card');
      
      cards.forEach(card => {
        const duration = card.dataset.duration;
        expect(['1泊2日', '2泊3日'].includes(duration)).toBe(true);
      });
    });

    it('セ・リーグとパ・リーグのカードが適切に分類されている', () => {
      const centralCards = document.querySelectorAll('[data-league="central"]');
      const pacificCards = document.querySelectorAll('[data-league="pacific"]');
      
      expect(centralCards.length).toBe(4); // 東京×2、横浜×2
      expect(pacificCards.length).toBe(2); // 北海道×2
    });

    it('1泊2日と2泊3日のカードが適切に分類されている', () => {
      const shortStayCards = document.querySelectorAll('[data-duration="1泊2日"]');
      const longStayCards = document.querySelectorAll('[data-duration="2泊3日"]');
      
      expect(shortStayCards.length).toBeGreaterThanOrEqual(3);
      expect(longStayCards.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('フィルター機能のロジックテスト', () => {
    // フィルター機能をシミュレートする関数
    function simulateFilter(leagueFilter, durationFilter) {
      const cards = document.querySelectorAll('.course-card');
      let visibleCount = 0;
      
      cards.forEach(card => {
        const cardLeague = card.dataset.league;
        const cardDuration = card.dataset.duration;
        
        const leagueMatch = leagueFilter === 'all' || cardLeague === leagueFilter;
        const durationMatch = durationFilter === 'all' || cardDuration === durationFilter;
        
        if (leagueMatch && durationMatch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      return visibleCount;
    }

    it('「すべて」フィルターで全カードが表示される', () => {
      const visibleCount = simulateFilter('all', 'all');
      expect(visibleCount).toBe(6);
    });

    it('セ・リーグフィルターで適切にフィルタリングされる', () => {
      const visibleCount = simulateFilter('central', 'all');
      expect(visibleCount).toBe(4);
      
      const visibleCards = Array.from(document.querySelectorAll('.course-card'))
        .filter(card => card.style.display !== 'none');
      
      visibleCards.forEach(card => {
        expect(card.dataset.league).toBe('central');
      });
    });

    it('パ・リーグフィルターで適切にフィルタリングされる', () => {
      const visibleCount = simulateFilter('pacific', 'all');
      expect(visibleCount).toBe(2);
      
      const visibleCards = Array.from(document.querySelectorAll('.course-card'))
        .filter(card => card.style.display !== 'none');
      
      visibleCards.forEach(card => {
        expect(card.dataset.league).toBe('pacific');
      });
    });

    it('1泊2日フィルターで適切にフィルタリングされる', () => {
      const visibleCount = simulateFilter('all', '1泊2日');
      expect(visibleCount).toBe(3);
      
      const visibleCards = Array.from(document.querySelectorAll('.course-card'))
        .filter(card => card.style.display !== 'none');
      
      visibleCards.forEach(card => {
        expect(card.dataset.duration).toBe('1泊2日');
      });
    });

    it('2泊3日フィルターで適切にフィルタリングされる', () => {
      const visibleCount = simulateFilter('all', '2泊3日');
      expect(visibleCount).toBe(3);
      
      const visibleCards = Array.from(document.querySelectorAll('.course-card'))
        .filter(card => card.style.display !== 'none');
      
      visibleCards.forEach(card => {
        expect(card.dataset.duration).toBe('2泊3日');
      });
    });

    it('複合フィルター（セ・リーグ + 1泊2日）が正しく動作する', () => {
      const visibleCount = simulateFilter('central', '1泊2日');
      expect(visibleCount).toBe(2);
      
      const visibleCards = Array.from(document.querySelectorAll('.course-card'))
        .filter(card => card.style.display !== 'none');
      
      visibleCards.forEach(card => {
        expect(card.dataset.league).toBe('central');
        expect(card.dataset.duration).toBe('1泊2日');
      });
    });

    it('複合フィルター（パ・リーグ + 2泊3日）が正しく動作する', () => {
      const visibleCount = simulateFilter('pacific', '2泊3日');
      expect(visibleCount).toBe(1);
      
      const visibleCards = Array.from(document.querySelectorAll('.course-card'))
        .filter(card => card.style.display !== 'none');
      
      visibleCards.forEach(card => {
        expect(card.dataset.league).toBe('pacific');
        expect(card.dataset.duration).toBe('2泊3日');
      });
    });
  });

  describe('タイトル更新機能テスト', () => {
    function simulateTitleUpdate(leagueFilter, durationFilter, expectedCount) {
      const resultsTitle = document.getElementById('results-title');
      const resultsDescription = document.getElementById('results-description');
      
      let title = '📋 ';
      let description = '';
      
      if (leagueFilter === 'all' && durationFilter === 'all') {
        title += '全プラン一覧';
        description = 'すべての野球観戦旅行プランを一覧でご確認いただけます';
      } else {
        const leagueText = leagueFilter === 'central' ? 'セ・リーグ' : 
          leagueFilter === 'pacific' ? 'パ・リーグ' : '';
        const durationText = durationFilter !== 'all' ? durationFilter : '';
        
        const filterTexts = [leagueText, durationText].filter(text => text).join(' ');
        title += `${filterTexts} プラン一覧`;
        description = `${filterTexts}の野球観戦旅行プラン（${expectedCount}件）`;
      }
      
      resultsTitle.textContent = title;
      resultsDescription.textContent = description;
      
      return { title: resultsTitle.textContent, description: resultsDescription.textContent };
    }

    it('初期状態のタイトルが正しい', () => {
      const result = simulateTitleUpdate('all', 'all', 6);
      expect(result.title).toBe('📋 全プラン一覧');
      expect(result.description).toBe('すべての野球観戦旅行プランを一覧でご確認いただけます');
    });

    it('セ・リーグフィルター時のタイトルが正しい', () => {
      const result = simulateTitleUpdate('central', 'all', 4);
      expect(result.title).toBe('📋 セ・リーグ プラン一覧');
      expect(result.description).toBe('セ・リーグの野球観戦旅行プラン（4件）');
    });

    it('1泊2日フィルター時のタイトルが正しい', () => {
      const result = simulateTitleUpdate('all', '1泊2日', 3);
      expect(result.title).toBe('📋 1泊2日 プラン一覧');
      expect(result.description).toBe('1泊2日の野球観戦旅行プラン（3件）');
    });

    it('複合フィルター時のタイトルが正しい', () => {
      const result = simulateTitleUpdate('pacific', '2泊3日', 1);
      expect(result.title).toBe('📋 パ・リーグ 2泊3日 プラン一覧');
      expect(result.description).toBe('パ・リーグ 2泊3日の野球観戦旅行プラン（1件）');
    });
  });
});