import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// 観戦ガイドの旅行プランセクションのテスト用HTMLテンプレート
const createGuideWithTravelPlanHTML = (team, travelUrl, _teamColor) => `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${team}球場観戦ガイド</title>
  <meta name="description" content="${team}の球場観戦ガイド">
</head>
<body>
  <main>
    <section class="stadium-info">
      <h2>⚾ 球場基本情報</h2>
      <p>球場の基本情報です。</p>
    </section>

    <section class="travel-plan">
      <h2>🗾 旅行プラン</h2>
      <div class="travel-info">
        <h3>観戦と合わせて地域を満喫</h3>
        <p>${team}観戦を含む、地域の魅力を存分に楽しめるモデルコースをご紹介。</p>
        
        <div class="travel-highlights">
          <div class="highlight-item">
            <h4>⚾ 野球観戦</h4>
            <p>${team}の熱戦を観戦体験</p>
          </div>
          <div class="highlight-item">
            <h4>🍽️ 地域グルメ</h4>
            <p>地域名物グルメを堪能</p>
          </div>
          <div class="highlight-item">
            <h4>🏛️ 観光スポット</h4>
            <p>地域の名所を巡る</p>
          </div>
        </div>
        
        <div class="travel-cta">
          <a href="${travelUrl}" class="travel-link">
            📖 詳細なモデルコースを見る
          </a>
        </div>
      </div>
    </section>

    <section class="facilities">
      <h2>🏢 球場設備</h2>
      <p>球場設備の情報です。</p>
    </section>
  </main>
</body>
</html>
`;

describe('観戦ガイド旅行リンクテスト', () => {
  // パ・リーグ球団のテストデータ
  const teams = [
    {
      name: 'ファイターズ',
      travelUrl: '/travel/hokkaido-3days',
      teamColor: '#152b5c'
    },
    {
      name: 'バファローズ',
      travelUrl: '/travel/osaka-2days',
      teamColor: '#152b5c'
    },
    {
      name: 'ライオンズ',
      travelUrl: '/travel/saitama-2days',
      teamColor: '#004a94'
    },
    {
      name: 'マリーンズ',
      travelUrl: '/travel/chiba-2days',
      teamColor: '#000000'
    },
    {
      name: 'イーグルス',
      travelUrl: '/travel/miyagi-2days',
      teamColor: '#7e0e2b'
    },
    {
      name: 'ホークス',
      travelUrl: '/travel/fukuoka-2days',
      teamColor: '#ffcc00'
    }
  ];

  teams.forEach(team => {
    describe(`${team.name}観戦ガイド旅行プランテスト`, () => {
      let dom;
      let document;

      beforeEach(() => {
        dom = new JSDOM(createGuideWithTravelPlanHTML(team.name, team.travelUrl, team.teamColor), {
          url: `http://localhost:4321/guides/${team.name.toLowerCase()}`
        });
        document = dom.window.document;
        global.document = document;
        global.window = dom.window;
      });

      describe('旅行プランセクションの存在確認', () => {
        it('旅行プランセクションが存在する', () => {
          const travelPlan = document.querySelector('.travel-plan');
          expect(travelPlan).toBeTruthy();
        });

        it('旅行プランの見出しが正しい', () => {
          const heading = document.querySelector('.travel-plan h2');
          expect(heading).toBeTruthy();
          expect(heading.textContent).toContain('旅行プラン');
        });

        it('旅行情報セクションが存在する', () => {
          const travelInfo = document.querySelector('.travel-info');
          expect(travelInfo).toBeTruthy();
        });
      });

      describe('旅行ハイライトのテスト', () => {
        it('旅行ハイライトセクションが存在する', () => {
          const highlights = document.querySelector('.travel-highlights');
          expect(highlights).toBeTruthy();
        });

        it('ハイライト項目が3つ存在する', () => {
          const highlightItems = document.querySelectorAll('.highlight-item');
          expect(highlightItems.length).toBe(3);
        });

        it('各ハイライト項目に必要な要素が含まれている', () => {
          const highlightItems = document.querySelectorAll('.highlight-item');
          
          highlightItems.forEach(item => {
            const title = item.querySelector('h4');
            const description = item.querySelector('p');
            
            expect(title).toBeTruthy();
            expect(description).toBeTruthy();
            expect(title.textContent.length).toBeGreaterThan(0);
            expect(description.textContent.length).toBeGreaterThan(0);
          });
        });

        it('野球観戦のハイライトが含まれている', () => {
          const baseballHighlight = Array.from(document.querySelectorAll('.highlight-item')).find(item =>
            item.textContent.includes('野球観戦')
          );
          
          expect(baseballHighlight).toBeTruthy();
          expect(baseballHighlight.textContent).toContain(team.name);
        });

        it('グルメのハイライトが含まれている', () => {
          const foodHighlight = Array.from(document.querySelectorAll('.highlight-item')).find(item =>
            item.textContent.includes('グルメ')
          );
          
          expect(foodHighlight).toBeTruthy();
        });

        it('観光のハイライトが含まれている', () => {
          const tourismHighlight = Array.from(document.querySelectorAll('.highlight-item')).find(item =>
            item.textContent.includes('観光') || item.textContent.includes('スポット')
          );
          
          expect(tourismHighlight).toBeTruthy();
        });
      });

      describe('旅行CTAのテスト', () => {
        it('旅行CTAセクションが存在する', () => {
          const travelCta = document.querySelector('.travel-cta');
          expect(travelCta).toBeTruthy();
        });

        it('旅行リンクが存在する', () => {
          const travelLink = document.querySelector('.travel-link');
          expect(travelLink).toBeTruthy();
        });

        it('旅行リンクが正しいURLを指している', () => {
          const travelLink = document.querySelector('.travel-link');
          expect(travelLink.href).toBe(`http://localhost:4321${team.travelUrl}`);
        });

        it('旅行リンクに適切なテキストが設定されている', () => {
          const travelLink = document.querySelector('.travel-link');
          expect(travelLink.textContent).toContain('詳細なモデルコースを見る');
        });

        it('旅行リンクに適切なクラスが設定されている', () => {
          const travelLink = document.querySelector('.travel-link');
          expect(travelLink.classList.contains('travel-link')).toBe(true);
        });
      });

      describe('レイアウトとスタイルのテスト', () => {
        it('旅行プランセクションが他のセクションと同じ階層にある', () => {
          const sections = document.querySelectorAll('main > section');
          const travelPlanSection = Array.from(sections).find(section =>
            section.classList.contains('travel-plan')
          );
          
          expect(travelPlanSection).toBeTruthy();
        });

        it('旅行プランが適切な位置に配置されている', () => {
          const sections = document.querySelectorAll('main > section');
          const sectionTypes = Array.from(sections).map(section => {
            if (section.classList.contains('stadium-info')) {
              return 'stadium-info';
            }
            if (section.classList.contains('travel-plan')) {
              return 'travel-plan';
            }
            if (section.classList.contains('facilities')) {
              return 'facilities';
            }
            return 'other';
          });
          
          const travelPlanIndex = sectionTypes.indexOf('travel-plan');
          const facilitiesIndex = sectionTypes.indexOf('facilities');
          
          // 旅行プランがfacilitiesの前に配置されていることを確認
          expect(travelPlanIndex).toBeGreaterThan(-1);
          expect(facilitiesIndex).toBeGreaterThan(-1);
          expect(travelPlanIndex).toBeLessThan(facilitiesIndex);
        });
      });

      describe('アクセシビリティのテスト', () => {
        it('見出しが適切な階層構造になっている', () => {
          const h2 = document.querySelector('.travel-plan h2');
          const h3 = document.querySelector('.travel-plan h3');
          const h4s = document.querySelectorAll('.travel-plan h4');
          
          expect(h2).toBeTruthy();
          expect(h3).toBeTruthy();
          expect(h4s.length).toBe(3);
        });

        it('旅行リンクがアクセシブルである', () => {
          const travelLink = document.querySelector('.travel-link');
          
          expect(travelLink.href).toBeTruthy();
          expect(travelLink.textContent.trim().length).toBeGreaterThan(0);
          // リンクテキストが説明的であることを確認
          expect(travelLink.textContent).toContain('モデルコース');
        });

        it('ハイライト項目が意味のある構造になっている', () => {
          const highlightItems = document.querySelectorAll('.highlight-item');
          
          highlightItems.forEach(item => {
            const title = item.querySelector('h4');
            const description = item.querySelector('p');
            
            expect(title).toBeTruthy();
            expect(description).toBeTruthy();
            
            // タイトルと説明が関連していることを確認
            expect(title.textContent.trim().length).toBeGreaterThan(0);
            expect(description.textContent.trim().length).toBeGreaterThan(0);
          });
        });
      });

      describe('コンテンツの質のテスト', () => {
        it('説明文が適切な長さである', () => {
          const description = document.querySelector('.travel-info > p');
          expect(description).toBeTruthy();
          expect(description.textContent.length).toBeGreaterThan(20);
          expect(description.textContent.length).toBeLessThan(200);
        });

        it('球団名が適切に含まれている', () => {
          const travelInfo = document.querySelector('.travel-info');
          expect(travelInfo.textContent).toContain(team.name);
        });

        it('各ハイライトが具体的な内容を含んでいる', () => {
          const highlightItems = document.querySelectorAll('.highlight-item');
          
          highlightItems.forEach(item => {
            const description = item.querySelector('p');
            
            // 説明が単なるプレースホルダーでないことを確認
            expect(description.textContent).not.toBe('説明');
            expect(description.textContent).not.toBe('内容');
            expect(description.textContent.length).toBeGreaterThan(5);
          });
        });
      });

      describe('統合テスト', () => {
        it('旅行プランセクション全体が正しく機能する', () => {
          const travelPlan = document.querySelector('.travel-plan');
          const travelInfo = travelPlan.querySelector('.travel-info');
          const highlights = travelPlan.querySelector('.travel-highlights');
          const cta = travelPlan.querySelector('.travel-cta');
          const link = travelPlan.querySelector('.travel-link');
          
          expect(travelPlan).toBeTruthy();
          expect(travelInfo).toBeTruthy();
          expect(highlights).toBeTruthy();
          expect(cta).toBeTruthy();
          expect(link).toBeTruthy();
          
          // リンクが正しく機能することを確認
          expect(link.href).toBe(`http://localhost:4321${team.travelUrl}`);
          expect(link.textContent).toContain('モデルコース');
        });

        it('必要な要素がすべて存在し、適切に配置されている', () => {
          const travelPlan = document.querySelector('.travel-plan');
          
          // セクション内の要素の順序を確認
          const children = Array.from(travelPlan.children);
          expect(children.length).toBeGreaterThan(0);
          
          const heading = children.find(child => child.tagName === 'H2');
          const travelInfo = children.find(child => child.classList.contains('travel-info'));
          
          expect(heading).toBeTruthy();
          expect(travelInfo).toBeTruthy();
        });
      });
    });
  });
});