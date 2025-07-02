import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
// import fs from 'fs';
// import path from 'path';
import * as script from '../src/scripts/script.js';
import { markers } from '../src/scripts/script.js';

// HTMLテンプレートを作成（index.htmlは存在しないため）
const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>テスト用HTML</title>
</head>
<body>
  <div class="league-toggle">
    <button class="league-btn">全球場</button>
    <button class="league-btn active">1軍のみ</button>
    <button class="league-btn">ファームのみ</button>
    <button class="league-btn regional">地方開催</button>
  </div>
  <div id="map"></div>
  <div id="team-info" style="display: none;">
    <h2 id="team-name"></h2>
    <p><strong>球場:</strong> <span id="stadium-name"></span></p>
    <p><strong>所在地:</strong> <span id="location"></span></p>
    <p><strong>リーグ:</strong> <span id="league"></span></p>
    <div id="weather-info"></div>
  </div>
</body>
</html>
`;

describe('スクリプトの機能テスト', () => {
  beforeEach(() => {
    const dom = new JSDOM(html, { 
      runScripts: 'dangerously',
      url: 'http://localhost'
    });
    global.window = dom.window;
    global.document = dom.window.document;

    // script.jsでエクスポートされた変数をグローバルスコープに設定
    window.baseballTeams = script.baseballTeams;

    // Google Maps APIのモック
    global.google = {
      maps: {
        Map: vi.fn(() => ({
          setCenter: vi.fn(),
          setZoom: vi.fn(),
          fitBounds: vi.fn(),
          addListener: vi.fn(),
        })),
        Marker: vi.fn(() => ({
          setMap: vi.fn(),
          addListener: vi.fn(),
          setAnimation: vi.fn(),
        })),
        InfoWindow: vi.fn(() => ({
          setContent: vi.fn(),
          open: vi.fn(),
          close: vi.fn(),
        })),
        LatLngBounds: vi.fn(),
        LatLng: vi.fn(),
        event: {
          trigger: vi.fn(),
        },
        Animation: {
          DROP: 'DROP',
          BOUNCE: 'BOUNCE',
        },
        SymbolPath: {
          CIRCLE: 'CIRCLE',
          FORWARD_CLOSED_ARROW: 'FORWARD_CLOSED_ARROW',
        },
      },
    };
  });

  it('initMapが地図を正しく初期化する', () => {
    script.initMap();
    expect(google.maps.Map).toHaveBeenCalledOnce();
    expect(google.maps.Map).toHaveBeenCalledWith(
      document.getElementById('map'),
      expect.any(Object)
    );
  });

  it('clearMarkersがすべてのマーカーを削除する', () => {
    script.initMap();
    script.showAllTeams();
    const initialMarkers = markers.length;
    expect(initialMarkers).toBeGreaterThan(0);

    script.clearMarkers();
    expect(markers).toHaveLength(0);
  });

  it('showTeamInfoがチーム情報を正しく表示する', () => {
    const team = {
      name: 'テストチーム',
      stadium: 'テスト球場',
      location: 'テスト県',
      league: 'テストリーグ',
      color: '#ff0000',
      detailUrl: 'http://example.com'
    };
    script.showTeamInfo(team);

    const teamName = document.getElementById('team-name').textContent;
    const stadiumName = document.getElementById('stadium-name').textContent;
    const location = document.getElementById('location').textContent;
    const league = document.getElementById('league').textContent;

    expect(teamName).toBe('テストチーム');
    expect(stadiumName).toBe('テスト球場');
    expect(location).toBe('テスト県');
    expect(league).toBe('テストリーグ');
    expect(document.getElementById('team-info').style.display).toBe('block');
  });

  it('showAllTeamsがすべてのチームのマーカーを表示する', () => {
    script.initMap();
    script.showAllTeams();
    expect(markers.length).toBe(script.baseballTeams.length);
  });

  it('showCentralLeagueがセ・リーグのチームのみ表示する', () => {
    script.initMap();
    script.showCentralLeague();
    const centralTeams = script.baseballTeams.filter(t => t.league === 'セントラル・リーグ');
    expect(markers.length).toBe(centralTeams.length);
  });

  it('updateActiveButtonが指定されたボタンをアクティブにする', () => {
    script.updateActiveButton(1);
    const buttons = document.querySelectorAll('.league-btn');
    expect(buttons[1].classList.contains('active')).toBe(true);
    expect(buttons[0].classList.contains('active')).toBe(false);
  });
});
