
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// HTMLとスクリプトを読み込む
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const script = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');

describe('スクリプトの機能テスト', () => {
    let dom;
    let window;
    let document;

    beforeEach(() => {
        dom = new JSDOM(html, {
            runScripts: "dangerously",
            resources: "usable",
            url: "http://localhost"
        });
        window = dom.window;
        document = window.document;

        // script.jsの内容をJSDOM環境で実行
        const scriptEl = document.createElement("script");
        scriptEl.textContent = script;
        document.body.appendChild(scriptEl);

        // Google Maps APIのモック
        window.google = {
            maps: {
                Map: vi.fn(() => ({
                    setCenter: vi.fn(),
                    setZoom: vi.fn(),
                    fitBounds: vi.fn(),
                    addListener: vi.fn()
                })),
                Marker: vi.fn(() => ({
                    setMap: vi.fn(),
                    addListener: vi.fn(),
                    setAnimation: vi.fn()
                })),
                InfoWindow: vi.fn(() => ({
                    setContent: vi.fn(),
                    open: vi.fn(),
                    close: vi.fn()
                })),
                LatLngBounds: vi.fn(),
                LatLng: vi.fn(),
                event: {
                    trigger: vi.fn()
                },
                Animation: {
                    DROP: 'DROP',
                    BOUNCE: 'BOUNCE'
                },
                SymbolPath: {
                    CIRCLE: 'CIRCLE',
                    FORWARD_CLOSED_ARROW: 'FORWARD_CLOSED_ARROW'
                }
            }
        };
        
        // import.meta.envのモック
        window.import = {
            meta: {
                env: {
                    VITE_GOOGLE_MAPS_API_KEY: 'test-api-key'
                }
            }
        };
    });

    it('initMapが地図を正しく初期化する', () => {
        window.initMap();
        expect(window.google.maps.Map).toHaveBeenCalledOnce();
        expect(window.google.maps.Map).toHaveBeenCalledWith(
            document.getElementById('map'),
            expect.any(Object)
        );
    });

    it('clearMarkersがすべてのマーカーを削除する', () => {
        window.initMap();
        window.showAllTeams();
        const initialMarkers = window.markers.length;
        expect(initialMarkers).toBeGreaterThan(0);
        
        window.clearMarkers();
        expect(window.markers).toHaveLength(0);
    });

    it('showTeamInfoがチーム情報を正しく表示する', () => {
        const team = {
            name: "テストチーム",
            stadium: "テスト球場",
            location: "テスト県",
            league: "テストリーグ",
            color: "#ff0000",
            detailUrl: "http://example.com"
        };
        window.showTeamInfo(team);

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
        window.initMap();
        window.showAllTeams();
        expect(window.markers.length).toBe(window.baseballTeams.length);
    });

    it('showCentralLeagueがセ・リーグのチームのみ表示する', () => {
        window.initMap();
        window.showCentralLeague();
        const centralTeams = window.baseballTeams.filter(t => t.league === 'セントラル・リーグ');
        expect(window.markers.length).toBe(centralTeams.length);
    });

    it('updateActiveButtonが指定されたボタンをアクティブにする', () => {
        window.updateActiveButton(1);
        const buttons = document.querySelectorAll('.league-btn');
        expect(buttons[1].classList.contains('active')).toBe(true);
        expect(buttons[0].classList.contains('active')).toBe(false);
    });
});
