import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// 北海道旅行記事のテスト用HTMLテンプレート
const createHokkaidoTravelHTML = () => `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>北海道2泊3日モデルコース</title>
  <meta name="description" content="ファイターズ観戦＆北海道グルメ・絶景を満喫する充実の旅行プラン">
  <link rel="stylesheet" href="/src/styles/blog.css">
  <link rel="stylesheet" href="/src/styles/travel.css">
</head>
<body>
  <div class="blog-container">
    <main class="blog-content">
      <article class="article">
        <!-- イントロダクション -->
        <section class="intro">
          <h2>⚾ 野球観戦＋北海道の魅力を3日間で堪能</h2>
          <p>北海道日本ハムファイターズの本拠地・エスコンフィールド北海道での試合観戦を軸に、北海道の絶景・グルメ・温泉を満喫する充実の2泊3日プランをご紹介します。</p>
          
          <div class="highlight-box">
            <h3>🌟 このプランのポイント</h3>
            <ul>
              <li>最新球場エスコンフィールドでのプロ野球観戦</li>
              <li>小樽・洞爺湖・ニセコの定番観光スポット</li>
              <li>北海道の新鮮な海の幸と地元グルメ</li>
              <li>温泉でゆったりリラックス</li>
            </ul>
          </div>
        </section>

        <section class="overview">
          <h2>📅 コース概要</h2>
          <div class="overview-grid">
            <div class="overview-item">
              <h3>期間</h3>
              <p>2泊3日</p>
            </div>
            <div class="overview-item">
              <h3>予算目安</h3>
              <p>約8-12万円/人</p>
            </div>
            <div class="overview-item">
              <h3>移動手段</h3>
              <p>レンタカー推奨</p>
            </div>
            <div class="overview-item">
              <h3>ベストシーズン</h3>
              <p>4月-10月</p>
            </div>
          </div>
        </section>

        <section class="itinerary">
          <h2>🗓️ 詳細スケジュール</h2>
          
          <div class="day-section">
            <h3 class="day-title">1日目：到着〜札幌市内</h3>
            <div class="schedule">
              <div class="time-slot">
                <span class="time">10:00</span>
                <div class="activity">
                  <h4>✈️ 新千歳空港到着</h4>
                  <p>レンタカー受け取り、北海道グルメで腹ごしらえ</p>
                  <small>おすすめ：ロイズチョコレートワールド、きのとやベイク</small>
                </div>
              </div>
              
              <div class="time-slot">
                <span class="time">18:00</span>
                <div class="activity">
                  <h4>⚾ ファイターズ試合観戦</h4>
                  <p>北海道の大自然を背景に野球観戦</p>
                  <small>試合終了後は札幌のホテルに宿泊</small>
                </div>
              </div>
            </div>
          </div>

          <div class="day-section">
            <h3 class="day-title">2日目：小樽〜ニセコ</h3>
            <div class="schedule">
              <div class="time-slot">
                <span class="time">08:00</span>
                <div class="activity">
                  <h4>🍽️ 札幌グルメ朝食</h4>
                  <p>味噌ラーメン、スープカレー、ジンギスカンから選択</p>
                </div>
              </div>
            </div>
          </div>

          <div class="day-section">
            <h3 class="day-title">3日目：洞爺湖〜帰路</h3>
            <div class="schedule">
              <div class="time-slot">
                <span class="time">17:00</span>
                <div class="activity">
                  <h4>✈️ 新千歳空港出発</h4>
                  <p>レンタカー返却、搭乗手続き</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="must-eat">
          <h2>🍽️ 絶対食べたい北海道グルメ</h2>
          <div class="food-grid">
            <div class="food-card">
              <h3>🦀 海鮮グルメ</h3>
              <p>毛ガニ、ウニ、いくら、ホタテ</p>
              <small>小樽の市場や回転寿司で新鮮な海の幸を</small>
            </div>
            <div class="food-card">
              <h3>🥩 ジンギスカン</h3>
              <p>札幌名物の羊肉料理</p>
              <small>だるま本店やサッポロビール園で</small>
            </div>
            <div class="food-card">
              <h3>🍜 札幌ラーメン</h3>
              <p>味噌ラーメン発祥の地</p>
              <small>すすきの横丁で本場の味を</small>
            </div>
            <div class="food-card">
              <h3>🍰 スイーツ</h3>
              <p>白い恋人、ルタオ、ロイズ</p>
              <small>北海道の有名スイーツを制覇</small>
            </div>
          </div>
        </section>

        <section class="budget">
          <h2>💰 予算内訳（1人当たり）</h2>
          <div class="budget-breakdown">
            <div class="budget-item">
              <span class="category">交通費（航空券往復）</span>
              <span class="amount">¥30,000-50,000</span>
            </div>
            <div class="budget-item">
              <span class="category">レンタカー（3日間）</span>
              <span class="amount">¥15,000-20,000</span>
            </div>
            <div class="budget-item">
              <span class="category">宿泊費（2泊）</span>
              <span class="amount">¥20,000-40,000</span>
            </div>
            <div class="budget-item">
              <span class="category">野球観戦チケット</span>
              <span class="amount">¥3,000-8,000</span>
            </div>
            <div class="budget-item">
              <span class="category">食事・観光・お土産</span>
              <span class="amount">¥25,000-35,000</span>
            </div>
            <div class="budget-total">
              <span class="category">合計</span>
              <span class="amount">¥93,000-153,000</span>
            </div>
          </div>
        </section>

        <section class="tips">
          <h2>💡 旅行のコツ</h2>
          <div class="tips-grid">
            <div class="tip-card">
              <h3>🚗 レンタカーについて</h3>
              <p>北海道は広いため、レンタカーが必須。カーナビ設定と給油場所を事前確認。</p>
            </div>
            <div class="tip-card">
              <h3>🎫 野球チケット</h3>
              <p>エスコンフィールドのチケットは人気なので早めの予約を。天候による中止もあり。</p>
            </div>
            <div class="tip-card">
              <h3>🧥 服装</h3>
              <p>北海道は本州より気温が低め。特に夜間の野球観戦は防寒対策を。</p>
            </div>
            <div class="tip-card">
              <h3>📱 アプリ</h3>
              <p>ファイターズ公式アプリで試合情報、北海道観光アプリで観光スポット情報をチェック。</p>
            </div>
          </div>
        </section>

        <!-- 関連リンク -->
        <section class="related-content">
          <h2>🔗 関連情報</h2>
          <div class="related-grid">
            <a href="/guides/fighters" class="related-card">
              <div class="card-icon">⚾</div>
              <h3>ファイターズ観戦ガイド</h3>
              <p>エスコンフィールド北海道の詳細な観戦情報</p>
            </a>
            
            <a href="/guides" class="related-card">
              <div class="card-icon">🏟️</div>
              <h3>他球団の観戦ガイド</h3>
              <p>全12球団の球場情報をチェック</p>
            </a>
          </div>
        </section>
      </article>
    </main>
  </div>
</body>
</html>
`;

describe('北海道旅行記事テスト', () => {
  let dom;
  let document;

  beforeEach(() => {
    dom = new JSDOM(createHokkaidoTravelHTML(), {
      url: 'http://localhost:4321/travel/hokkaido-3days'
    });
    document = dom.window.document;
    global.document = document;
    global.window = dom.window;
  });

  describe('記事構造のテスト', () => {
    it('イントロダクションセクションが存在する', () => {
      const intro = document.querySelector('.intro');
      expect(intro).toBeTruthy();
      
      const heading = intro.querySelector('h2');
      expect(heading.textContent).toContain('野球観戦＋北海道の魅力');
    });

    it('ハイライトボックスが存在する', () => {
      const highlightBox = document.querySelector('.highlight-box');
      expect(highlightBox).toBeTruthy();
      
      const title = highlightBox.querySelector('h3');
      expect(title.textContent).toContain('このプランのポイント');
      
      const listItems = highlightBox.querySelectorAll('li');
      expect(listItems.length).toBe(4);
    });

    it('コース概要セクションが正しく表示される', () => {
      const overview = document.querySelector('.overview');
      expect(overview).toBeTruthy();
      
      const overviewItems = overview.querySelectorAll('.overview-item');
      expect(overviewItems.length).toBe(4);
      
      const periods = Array.from(overviewItems).find(item => 
        item.textContent.includes('期間')
      );
      expect(periods).toBeTruthy();
      expect(periods.textContent).toContain('2泊3日');
    });
  });

  describe('スケジュールセクションのテスト', () => {
    it('3日間のスケジュールが存在する', () => {
      const daySections = document.querySelectorAll('.day-section');
      expect(daySections.length).toBe(3);
      
      const day1 = daySections[0];
      const day1Title = day1.querySelector('.day-title');
      expect(day1Title.textContent).toContain('1日目：到着〜札幌市内');
    });

    it('タイムスロットが正しく構成されている', () => {
      const timeSlots = document.querySelectorAll('.time-slot');
      expect(timeSlots.length).toBeGreaterThan(0);
      
      const firstTimeSlot = timeSlots[0];
      const time = firstTimeSlot.querySelector('.time');
      const activity = firstTimeSlot.querySelector('.activity');
      
      expect(time).toBeTruthy();
      expect(activity).toBeTruthy();
      expect(time.textContent).toBe('10:00');
    });

    it('活動内容が詳細に記載されている', () => {
      const activities = document.querySelectorAll('.activity');
      expect(activities.length).toBeGreaterThan(0);
      
      const firstActivity = activities[0];
      const heading = firstActivity.querySelector('h4');
      const description = firstActivity.querySelector('p');
      const note = firstActivity.querySelector('small');
      
      expect(heading).toBeTruthy();
      expect(description).toBeTruthy();
      expect(note).toBeTruthy();
      expect(heading.textContent).toContain('新千歳空港到着');
    });
  });

  describe('グルメセクションのテスト', () => {
    it('グルメセクションが存在する', () => {
      const mustEat = document.querySelector('.must-eat');
      expect(mustEat).toBeTruthy();
      
      const heading = mustEat.querySelector('h2');
      expect(heading.textContent).toContain('絶対食べたい北海道グルメ');
    });

    it('グルメカードが4つ存在する', () => {
      const foodCards = document.querySelectorAll('.food-card');
      expect(foodCards.length).toBe(4);
      
      const seaFood = Array.from(foodCards).find(card =>
        card.textContent.includes('海鮮グルメ')
      );
      expect(seaFood).toBeTruthy();
      expect(seaFood.textContent).toContain('毛ガニ、ウニ、いくら、ホタテ');
    });

    it('各グルメカードに詳細情報が含まれている', () => {
      const foodCards = document.querySelectorAll('.food-card');
      
      foodCards.forEach(card => {
        const title = card.querySelector('h3');
        const description = card.querySelector('p');
        const note = card.querySelector('small');
        
        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
        expect(note).toBeTruthy();
      });
    });
  });

  describe('予算セクションのテスト', () => {
    it('予算セクションが存在する', () => {
      const budget = document.querySelector('.budget');
      expect(budget).toBeTruthy();
      
      const heading = budget.querySelector('h2');
      expect(heading.textContent).toContain('予算内訳');
    });

    it('予算項目が正しく表示される', () => {
      const budgetItems = document.querySelectorAll('.budget-item');
      expect(budgetItems.length).toBe(5); // 交通費、レンタカー、宿泊費、チケット、食事等
      
      const airfare = Array.from(budgetItems).find(item =>
        item.textContent.includes('交通費（航空券往復）')
      );
      expect(airfare).toBeTruthy();
      expect(airfare.textContent).toContain('¥30,000-50,000');
    });

    it('合計金額が表示される', () => {
      const budgetTotal = document.querySelector('.budget-total');
      expect(budgetTotal).toBeTruthy();
      expect(budgetTotal.textContent).toContain('合計');
      expect(budgetTotal.textContent).toContain('¥93,000-153,000');
    });
  });

  describe('旅行のコツセクションのテスト', () => {
    it('旅行のコツセクションが存在する', () => {
      const tips = document.querySelector('.tips');
      expect(tips).toBeTruthy();
      
      const heading = tips.querySelector('h2');
      expect(heading.textContent).toContain('旅行のコツ');
    });

    it('ヒントカードが4つ存在する', () => {
      const tipCards = document.querySelectorAll('.tip-card');
      expect(tipCards.length).toBe(4);
      
      const rentalCar = Array.from(tipCards).find(card =>
        card.textContent.includes('レンタカーについて')
      );
      expect(rentalCar).toBeTruthy();
    });

    it('各ヒントに具体的なアドバイスが含まれている', () => {
      const tipCards = document.querySelectorAll('.tip-card');
      
      tipCards.forEach(card => {
        const title = card.querySelector('h3');
        const content = card.querySelector('p');
        
        expect(title).toBeTruthy();
        expect(content).toBeTruthy();
        expect(content.textContent.length).toBeGreaterThan(10);
      });
    });
  });

  describe('関連リンクセクションのテスト', () => {
    it('関連リンクセクションが存在する', () => {
      const relatedContent = document.querySelector('.related-content');
      expect(relatedContent).toBeTruthy();
      
      const heading = relatedContent.querySelector('h2');
      expect(heading.textContent).toContain('関連情報');
    });

    it('関連カードが2つ存在する', () => {
      const relatedCards = document.querySelectorAll('.related-card');
      expect(relatedCards.length).toBe(2);
    });

    it('ファイターズ観戦ガイドへのリンクが存在する', () => {
      const fightersLink = document.querySelector('a[href="/guides/fighters"]');
      expect(fightersLink).toBeTruthy();
      expect(fightersLink.textContent).toContain('ファイターズ観戦ガイド');
    });

    it('他球団ガイドへのリンクが存在する', () => {
      const guidesLink = document.querySelector('a[href="/guides"]');
      expect(guidesLink).toBeTruthy();
      expect(guidesLink.textContent).toContain('他球団の観戦ガイド');
    });
  });

  describe('データ検証のテスト', () => {
    it('すべての必要な価格情報が含まれている', () => {
      const amounts = document.querySelectorAll('.amount');
      expect(amounts.length).toBe(6); // 5つの項目 + 合計
      
      amounts.forEach(amount => {
        expect(amount.textContent).toMatch(/¥[\d,\-]+/);
      });
    });

    it('すべての時間が正しいフォーマットで表示されている', () => {
      const times = document.querySelectorAll('.time');
      expect(times.length).toBeGreaterThan(0);
      
      times.forEach(time => {
        expect(time.textContent).toMatch(/^\d{2}:\d{2}$/);
      });
    });

    it('外部リンクが正しく設定されている', () => {
      const externalLinks = document.querySelectorAll('a[href^="/"]');
      expect(externalLinks.length).toBeGreaterThan(0);
      
      externalLinks.forEach(link => {
        expect(link.href).toBeTruthy();
        expect(link.href.startsWith('http://localhost:4321/')).toBe(true);
      });
    });
  });

  describe('アクセシビリティのテスト', () => {
    it('見出しが階層的に構成されている', () => {
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');
      const h4s = document.querySelectorAll('h4');
      
      expect(h2s.length).toBeGreaterThan(0);
      expect(h3s.length).toBeGreaterThan(0);
      expect(h4s.length).toBeGreaterThan(0);
    });

    it('すべてのリンクにhref属性が設定されている', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.href).toBeTruthy();
      });
    });

    it('リストが適切に構造化されている', () => {
      const lists = document.querySelectorAll('ul, ol');
      expect(lists.length).toBeGreaterThan(0);
      
      lists.forEach(list => {
        const items = list.querySelectorAll('li');
        expect(items.length).toBeGreaterThan(0);
      });
    });
  });
});