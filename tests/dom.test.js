import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// DOM環境をセットアップ
const dom = new JSDOM(`
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>プロ野球12球団本拠地マップ</title>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div class="header">
      <h1>プロ野球12球団本拠地マップ</h1>
      <p>日本プロ野球12球団の本拠地球場を地図上で確認できます</p>
    </div>

    <div class="league-toggle">
      <button class="league-btn active" onclick="showAllTeams()">全球場</button>
      <button class="league-btn" onclick="showMainTeams()">1軍のみ</button>
      <button class="league-btn" onclick="showFarmTeams()">ファームのみ</button>
      <button class="league-btn regional" onclick="showRegionalStadiums()">地方開催</button>
    </div>
    
    <div class="league-toggle">
      <button class="league-btn central" onclick="showCentralLeague()">セ・リーグ</button>
      <button class="league-btn pacific" onclick="showPacificLeague()">パ・リーグ</button>
      <button class="league-btn eastern" onclick="showEasternLeague()">イースタン</button>
      <button class="league-btn western" onclick="showWesternLeague()">ウエスタン</button>
    </div>

    <div id="map"></div>

    <div class="legend">
      <h3>凡例</h3>
      <div class="legend-item">
        <span class="legend-color" style="background-color: #e74c3c; border-radius: 50%;"></span>
        セントラル・リーグ（1軍）
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: #3498db; border-radius: 50%;"></span>
        パシフィック・リーグ（1軍）
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: #f39c12; 
              width: 0; height: 0; border-radius: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 16px solid #f39c12;
              display: inline-block; vertical-align: middle;"></span>
        イースタン・リーグ（ファーム）
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: #27ae60;
              width: 0; height: 0; border-radius: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-bottom: 16px solid #27ae60;
              display: inline-block; vertical-align: middle;"></span>
        ウエスタン・リーグ（ファーム）
      </div>
      <div class="legend-item">
        <span class="legend-color" style="background-color: #9b59b6;
              width: 12px; height: 12px; border-radius: 0;
              transform: rotate(45deg);
              display: inline-block; vertical-align: middle;"></span>
        地方開催球場（2025年）
      </div>
    </div>

    <div class="team-info" id="team-info" style="display: none">
      <h3 id="team-name"></h3>
      <p><strong>球場名:</strong> <span id="stadium-name"></span></p>
      <p><strong>所在地:</strong> <span id="location"></span></p>
      <p><strong>リーグ:</strong> <span id="league"></span></p>
    </div>
  </body>
</html>
`, { url: 'http://localhost' });

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

describe('DOM構造のテスト', () => {
    beforeEach(() => {
        // 各テスト前にDOMをリセット
        document.body.innerHTML = dom.window.document.body.innerHTML;
    });

    it('必要なHTML要素が存在する', () => {
        expect(document.querySelector('.header')).toBeTruthy();
        expect(document.querySelector('#map')).toBeTruthy();
        expect(document.querySelector('.legend')).toBeTruthy();
        expect(document.querySelector('#team-info')).toBeTruthy();
    });

    it('ヘッダーに正しいタイトルが表示される', () => {
        const title = document.querySelector('.header h1');
        expect(title.textContent).toBe('プロ野球12球団本拠地マップ');
    });

    it('すべてのリーグボタンが存在する', () => {
        const buttons = document.querySelectorAll('.league-btn');
        expect(buttons).toHaveLength(8);
        
        const buttonTexts = Array.from(buttons).map(btn => btn.textContent);
        expect(buttonTexts).toContain('全球場');
        expect(buttonTexts).toContain('1軍のみ');
        expect(buttonTexts).toContain('ファームのみ');
        expect(buttonTexts).toContain('地方開催');
        expect(buttonTexts).toContain('セ・リーグ');
        expect(buttonTexts).toContain('パ・リーグ');
        expect(buttonTexts).toContain('イースタン');
        expect(buttonTexts).toContain('ウエスタン');
    });

    it('凡例のアイテムが正しく表示される', () => {
        const legendItems = document.querySelectorAll('.legend-item');
        expect(legendItems).toHaveLength(5);
        
        const legendTexts = Array.from(legendItems).map(item => item.textContent.trim());
        expect(legendTexts).toContain('セントラル・リーグ（1軍）');
        expect(legendTexts).toContain('パシフィック・リーグ（1軍）');
        expect(legendTexts).toContain('イースタン・リーグ（ファーム）');
        expect(legendTexts).toContain('ウエスタン・リーグ（ファーム）');
        expect(legendTexts).toContain('地方開催球場（2025年）');
    });

    it('チーム情報エリアの要素が存在する', () => {
        expect(document.querySelector('#team-name')).toBeTruthy();
        expect(document.querySelector('#stadium-name')).toBeTruthy();
        expect(document.querySelector('#location')).toBeTruthy();
        expect(document.querySelector('#league')).toBeTruthy();
    });

    it('初期状態でチーム情報が非表示になっている', () => {
        const teamInfo = document.querySelector('#team-info');
        expect(teamInfo.style.display).toBe('none');
    });

    it('デフォルトで「全球場」ボタンがアクティブになっている', () => {
        const allTeamsBtn = document.querySelector('.league-btn.active');
        expect(allTeamsBtn.textContent).toBe('全球場');
    });
});

describe('アクセシビリティのテスト', () => {
    it('HTMLにlang属性が設定されている', () => {
        expect(document.documentElement.lang).toBe('ja');
    });

    it('メタタグが適切に設定されている', () => {
        const charset = document.querySelector('meta[charset]');
        expect(charset.getAttribute('charset')).toBe('UTF-8');
        
        const viewport = document.querySelector('meta[name="viewport"]');
        expect(viewport.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
    });

    it('ページタイトルが設定されている', () => {
        expect(document.title).toBe('プロ野球12球団本拠地マップ');
    });

    it('ファビコンリンクが設定されている', () => {
        const svgFavicon = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
        const icoFavicon = document.querySelector('link[rel="icon"][type="image/x-icon"]');
        
        expect(svgFavicon).toBeTruthy();
        expect(icoFavicon).toBeTruthy();
        expect(svgFavicon.href).toContain('favicon.svg');
        expect(icoFavicon.href).toContain('favicon.ico');
    });
});