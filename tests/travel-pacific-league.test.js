import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// パ・リーグ旅行記事のテスト用HTMLテンプレート
const createTravelHTML = (team, location, title, description) => `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="/src/styles/blog.css">
  <link rel="stylesheet" href="/src/styles/travel.css">
</head>
<body>
  <div class="blog-container">
    <main class="blog-content">
      <article class="article">
        <!-- イントロダクション -->
        <section class="intro">
          <h2>⚾ 野球観戦＋${location}の魅力を満喫</h2>
          <p>プロ野球観戦を軸とした充実の旅行プランをご紹介します。</p>
          
          <div class="highlight-box">
            <h3>🌟 このプランのポイント</h3>
            <ul>
              <li>プロ野球観戦体験</li>
              <li>地域の名物グルメ</li>
              <li>観光スポット巡り</li>
              <li>地域文化体験</li>
            </ul>
          </div>
        </section>

        <section class="overview">
          <h2>📅 コース概要</h2>
          <div class="overview-grid">
            <div class="overview-item">
              <h3>期間</h3>
              <p>1泊2日</p>
            </div>
            <div class="overview-item">
              <h3>予算目安</h3>
              <p>約5-10万円/人</p>
            </div>
            <div class="overview-item">
              <h3>移動手段</h3>
              <p>電車・バス</p>
            </div>
            <div class="overview-item">
              <h3>ベストシーズン</h3>
              <p>通年</p>
            </div>
          </div>
        </section>

        <section class="itinerary">
          <h2>🗓️ 詳細スケジュール</h2>
          
          <div class="day-section">
            <h3 class="day-title">1日目：観光〜野球観戦</h3>
            <div class="schedule">
              <div class="time-slot">
                <span class="time">10:00</span>
                <div class="activity">
                  <h4>🚄 到着</h4>
                  <p>現地到着、観光開始</p>
                  <small>移動と荷物の整理</small>
                </div>
              </div>
              
              <div class="time-slot">
                <span class="time">18:00</span>
                <div class="activity">
                  <h4>⚾ ${team}試合観戦</h4>
                  <p>本拠地球場での試合観戦</p>
                  <small>試合後は宿泊先へ</small>
                </div>
              </div>
            </div>
          </div>

          <div class="day-section">
            <h3 class="day-title">2日目：観光〜帰路</h3>
            <div class="schedule">
              <div class="time-slot">
                <span class="time">09:00</span>
                <div class="activity">
                  <h4>☕ 朝食</h4>
                  <p>地元の朝食を楽しむ</p>
                </div>
              </div>
              
              <div class="time-slot">
                <span class="time">17:00</span>
                <div class="activity">
                  <h4>🚄 帰路</h4>
                  <p>お土産購入後、帰路に</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="must-eat">
          <h2>🍽️ 絶対食べたい${location}グルメ</h2>
          <div class="food-grid">
            <div class="food-card">
              <h3>🍜 地域名物1</h3>
              <p>代表的な地域グルメ</p>
              <small>老舗店で味わう</small>
            </div>
            <div class="food-card">
              <h3>🍱 地域名物2</h3>
              <p>伝統的な郷土料理</p>
              <small>地元の人気店で</small>
            </div>
            <div class="food-card">
              <h3>🍰 地域名物3</h3>
              <p>有名なお土産スイーツ</p>
              <small>お土産にも最適</small>
            </div>
            <div class="food-card">
              <h3>🍺 地域名物4</h3>
              <p>地域の特産品</p>
              <small>現地でしか味わえない</small>
            </div>
          </div>
        </section>

        <section class="budget">
          <h2>💰 予算内訳（1人当たり）</h2>
          <div class="budget-breakdown">
            <div class="budget-item">
              <span class="category">交通費（往復）</span>
              <span class="amount">¥15,000-35,000</span>
            </div>
            <div class="budget-item">
              <span class="category">宿泊費（1泊）</span>
              <span class="amount">¥8,000-20,000</span>
            </div>
            <div class="budget-item">
              <span class="category">野球観戦チケット</span>
              <span class="amount">¥2,000-8,000</span>
            </div>
            <div class="budget-item">
              <span class="category">食事・観光・お土産</span>
              <span class="amount">¥10,000-20,000</span>
            </div>
            <div class="budget-total">
              <span class="category">合計</span>
              <span class="amount">¥35,000-83,000</span>
            </div>
          </div>
        </section>

        <section class="tips">
          <h2>💡 旅行のコツ</h2>
          <div class="tips-grid">
            <div class="tip-card">
              <h3>🚇 交通について</h3>
              <p>効率的な移動方法と1日乗車券の活用方法。</p>
            </div>
            <div class="tip-card">
              <h3>🎫 野球チケット</h3>
              <p>人気カードは早めの予約を。天候による変更もあり。</p>
            </div>
            <div class="tip-card">
              <h3>🍽️ グルメ</h3>
              <p>地域の名物料理とおすすめの老舗店情報。</p>
            </div>
            <div class="tip-card">
              <h3>🛍️ お土産</h3>
              <p>地域限定商品と購入できる場所の情報。</p>
            </div>
          </div>
        </section>

        <!-- 関連リンク -->
        <section class="related-content">
          <h2>🔗 関連情報</h2>
          <div class="related-grid">
            <a href="/guides/${team.toLowerCase()}" class="related-card">
              <div class="card-icon">⚾</div>
              <h3>${team}観戦ガイド</h3>
              <p>球場の詳細な観戦情報</p>
            </a>
            
            <a href="/guides" class="related-card">
              <div class="card-icon">🏟️</div>
              <h3>他球団の観戦ガイド</h3>
              <p>全12球団の球場情報をチェック</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  </div>
</body>
</html>
`;

describe('パ・リーグ旅行記事テスト', () => {
  // テストデータ
  const teams = [
    {
      name: 'バファローズ',
      location: '大阪',
      title: '大阪1泊2日モデルコース',
      description: 'バファローズ観戦＆大阪グルメ・名所を満喫する充実の旅行プラン',
      url: '/travel/osaka-2days'
    },
    {
      name: 'ライオンズ',
      location: '埼玉',
      title: '埼玉1泊2日モデルコース',
      description: 'ライオンズ観戦＆埼玉・東京観光を満喫する充実の旅行プラン',
      url: '/travel/saitama-2days'
    },
    {
      name: 'マリーンズ',
      location: '千葉',
      title: '千葉1泊2日モデルコース',
      description: 'マリーンズ観戦＆千葉・東京ベイエリアを満喫する充実の旅行プラン',
      url: '/travel/chiba-2days'
    },
    {
      name: 'イーグルス',
      location: '宮城',
      title: '宮城1泊2日モデルコース',
      description: 'イーグルス観戦＆仙台・松島の魅力を満喫する充実の旅行プラン',
      url: '/travel/miyagi-2days'
    },
    {
      name: 'ホークス',
      location: '福岡',
      title: '福岡1泊2日モデルコース',
      description: 'ホークス観戦＆福岡グルメ・観光を満喫する充実の旅行プラン',
      url: '/travel/fukuoka-2days'
    }
  ];

  teams.forEach(team => {
    describe(`${team.name}（${team.location}）旅行記事テスト`, () => {
      let dom;
      let document;

      beforeEach(() => {
        dom = new JSDOM(createTravelHTML(team.name, team.location, team.title, team.description), {
          url: `http://localhost:4321${team.url}`
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
          expect(heading.textContent).toContain(`野球観戦＋${team.location}の魅力`);
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
          expect(periods.textContent).toContain('1泊2日');
        });
      });

      describe('スケジュールセクションのテスト', () => {
        it('2日間のスケジュールが存在する', () => {
          const daySections = document.querySelectorAll('.day-section');
          expect(daySections.length).toBe(2);
          
          const day1 = daySections[0];
          const day1Title = day1.querySelector('.day-title');
          expect(day1Title.textContent).toContain('1日目');
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

        it('野球観戦の活動が含まれている', () => {
          const activities = document.querySelectorAll('.activity');
          const baseballActivity = Array.from(activities).find(activity =>
            activity.textContent.includes(team.name) && activity.textContent.includes('試合観戦')
          );
          
          expect(baseballActivity).toBeTruthy();
        });
      });

      describe('グルメセクションのテスト', () => {
        it('グルメセクションが存在する', () => {
          const mustEat = document.querySelector('.must-eat');
          expect(mustEat).toBeTruthy();
          
          const heading = mustEat.querySelector('h2');
          expect(heading.textContent).toContain(`絶対食べたい${team.location}グルメ`);
        });

        it('グルメカードが4つ存在する', () => {
          const foodCards = document.querySelectorAll('.food-card');
          expect(foodCards.length).toBe(4);
          
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
          expect(budgetItems.length).toBe(4); // 交通費、宿泊費、チケット、食事等
          
          budgetItems.forEach(item => {
            const category = item.querySelector('.category');
            const amount = item.querySelector('.amount');
            
            expect(category).toBeTruthy();
            expect(amount).toBeTruthy();
            expect(amount.textContent).toMatch(/¥[\d,\-]+/);
          });
        });

        it('合計金額が表示される', () => {
          const budgetTotal = document.querySelector('.budget-total');
          expect(budgetTotal).toBeTruthy();
          expect(budgetTotal.textContent).toContain('合計');
          expect(budgetTotal.textContent).toContain('¥');
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

        it('球団観戦ガイドへのリンクが存在する', () => {
          const teamLink = document.querySelector(`a[href="/guides/${team.name.toLowerCase()}"]`);
          expect(teamLink).toBeTruthy();
          expect(teamLink.textContent).toContain(`${team.name}観戦ガイド`);
        });

        it('他球団ガイドへのリンクが存在する', () => {
          const guidesLink = document.querySelector('a[href="/guides"]');
          expect(guidesLink).toBeTruthy();
          expect(guidesLink.textContent).toContain('他球団の観戦ガイド');
        });
      });

      describe('データ検証のテスト', () => {
        it('時間が正しいフォーマットで表示されている', () => {
          const times = document.querySelectorAll('.time');
          expect(times.length).toBeGreaterThan(0);
          
          times.forEach(time => {
            expect(time.textContent).toMatch(/^\d{2}:\d{2}$/);
          });
        });

        it('内部リンクが正しく設定されている', () => {
          const internalLinks = document.querySelectorAll('a[href^="/"]');
          expect(internalLinks.length).toBeGreaterThan(0);
          
          internalLinks.forEach(link => {
            expect(link.href).toBeTruthy();
            expect(link.href.startsWith('http://localhost:4321/')).toBe(true);
          });
        });
      });

      describe('アクセシビリティのテスト', () => {
        it('見出しが階層的に構成されている', () => {
          const h2s = document.querySelectorAll('h2');
          const h3s = document.querySelectorAll('h3');
          
          expect(h2s.length).toBeGreaterThan(0);
          expect(h3s.length).toBeGreaterThan(0);
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
  });
});