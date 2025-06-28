// リーグ色の定義
const leagueColors = {
    "セントラル・リーグ": "#e74c3c",      // 赤
    "パシフィック・リーグ": "#3498db",    // 青
    "イースタン・リーグ": "#f39c12",      // オレンジ
    "ウエスタン・リーグ": "#27ae60",      // 緑
    "地方開催球場": "#9b59b6"             // 紫
};

// プロ野球12球団のデータ
const baseballTeams = [
    // セントラル・リーグ
    {
        name: "読売ジャイアンツ",
        stadium: "東京ドーム",
        location: "東京都文京区",
        league: "セントラル・リーグ",
        lat: 35.7056,
        lng: 139.7519,
        color: leagueColors["セントラル・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?081"
    },
    {
        name: "阪神タイガース",
        stadium: "阪神甲子園球場",
        location: "兵庫県西宮市",
        league: "セントラル・リーグ",
        lat: 34.7213,
        lng: 135.3619,
        color: leagueColors["セントラル・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?181"
    },
    {
        name: "横浜DeNAベイスターズ",
        stadium: "横浜スタジアム",
        location: "神奈川県横浜市",
        league: "セントラル・リーグ",
        lat: 35.4437,
        lng: 139.6380,
        color: leagueColors["セントラル・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?093"
    },
    {
        name: "広島東洋カープ",
        stadium: "MAZDA Zoom-Zoom スタジアム広島",
        location: "広島県広島市",
        league: "セントラル・リーグ",
        lat: 34.3914,
        lng: 132.4626,
        color: leagueColors["セントラル・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?208"
    },
    {
        name: "東京ヤクルトスワローズ",
        stadium: "明治神宮野球場",
        location: "東京都新宿区",
        league: "セントラル・リーグ",
        lat: 35.6784,
        lng: 139.7170,
        color: leagueColors["セントラル・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?082"
    },
    {
        name: "中日ドラゴンズ",
        stadium: "バンテリンドーム ナゴヤ",
        location: "愛知県名古屋市",
        league: "セントラル・リーグ",
        lat: 35.1855,
        lng: 136.9493,
        color: leagueColors["セントラル・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?151"
    },
    // パシフィック・リーグ
    {
        name: "福岡ソフトバンクホークス",
        stadium: "みずほPayPayドーム福岡",
        location: "福岡県福岡市",
        league: "パシフィック・リーグ",
        lat: 33.5957,
        lng: 130.3619,
        color: leagueColors["パシフィック・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?245"
    },
    {
        name: "北海道日本ハムファイターズ",
        stadium: "エスコンフィールドＨＯＫＫＡＩＤＯ",
        location: "北海道北広島市",
        league: "パシフィック・リーグ",
        lat: 42.9869,
        lng: 141.5642,
        color: leagueColors["パシフィック・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?290"
    },
    {
        name: "千葉ロッテマリーンズ",
        stadium: "ZOZOマリンスタジアム",
        location: "千葉県千葉市",
        league: "パシフィック・リーグ",
        lat: 35.6470,
        lng: 140.0316,
        color: leagueColors["パシフィック・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?073"
    },
    {
        name: "東北楽天ゴールデンイーグルス",
        stadium: "楽天モバイルパーク宮城",
        location: "宮城県仙台市",
        league: "パシフィック・リーグ",
        lat: 38.2566,
        lng: 140.9015,
        color: leagueColors["パシフィック・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?029"
    },
    {
        name: "オリックス・バファローズ",
        stadium: "京セラドーム大阪",
        location: "大阪府大阪市",
        league: "パシフィック・リーグ",
        lat: 34.6650,
        lng: 135.4755,
        color: leagueColors["パシフィック・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?175"
    },
    {
        name: "埼玉西武ライオンズ",
        stadium: "ベルーナドーム",
        location: "埼玉県所沢市",
        league: "パシフィック・リーグ",
        lat: 35.7651,
        lng: 139.4178,
        color: leagueColors["パシフィック・リーグ"],
        detailUrl: "https://npb.jp/stadium/detail.html?068"
    },
    // ファーム（2軍）球場
    {
        name: "読売ジャイアンツ（ファーム）",
        stadium: "ジャイアンツタウンスタジアム",
        location: "東京都稲城市",
        league: "イースタン・リーグ",
        lat: 35.6389,
        lng: 139.5047,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.giants.jp/",
        type: "farm"
    },
    {
        name: "阪神タイガース（ファーム）",
        stadium: "日鉄鋼板 SGLスタジアム 尼崎",
        location: "兵庫県尼崎市",
        league: "ウエスタン・リーグ",
        lat: 34.7353,
        lng: 135.4061,
        color: leagueColors["ウエスタン・リーグ"],
        detailUrl: "https://hanshintigers.jp/",
        type: "farm"
    },
    {
        name: "横浜DeNAベイスターズ（ファーム）",
        stadium: "横須賀スタジアム",
        location: "神奈川県横須賀市",
        league: "イースタン・リーグ",
        lat: 35.2839,
        lng: 139.6714,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.baystars.co.jp/",
        type: "farm"
    },
    {
        name: "広島東洋カープ（ファーム）",
        stadium: "由宇練習場",
        location: "山口県岩国市",
        league: "ウエスタン・リーグ",
        lat: 34.1467,
        lng: 132.2206,
        color: leagueColors["ウエスタン・リーグ"],
        detailUrl: "https://www.carp.co.jp/",
        type: "farm"
    },
    {
        name: "東京ヤクルトスワローズ（ファーム）",
        stadium: "ヤクルト戸田球場",
        location: "埼玉県戸田市",
        league: "イースタン・リーグ",
        lat: 35.8197,
        lng: 139.6881,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.yakult-swallows.co.jp/",
        type: "farm"
    },
    {
        name: "中日ドラゴンズ（ファーム）",
        stadium: "ナゴヤ球場",
        location: "愛知県名古屋市",
        league: "ウエスタン・リーグ",
        lat: 35.1814,
        lng: 136.9308,
        color: leagueColors["ウエスタン・リーグ"],
        detailUrl: "https://dragons.jp/",
        type: "farm"
    },
    {
        name: "福岡ソフトバンクホークス（ファーム）",
        stadium: "HAWKSベースボールパーク筑後",
        location: "福岡県筑後市",
        league: "ウエスタン・リーグ",
        lat: 33.2167,
        lng: 130.5833,
        color: leagueColors["ウエスタン・リーグ"],
        detailUrl: "https://www.softbankhawks.co.jp/",
        type: "farm"
    },
    {
        name: "北海道日本ハムファイターズ（ファーム）",
        stadium: "ファイターズスタジアム",
        location: "千葉県鎌ヶ谷市",
        league: "イースタン・リーグ",
        lat: 35.7697,
        lng: 140.0031,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.fighters.co.jp/",
        type: "farm"
    },
    {
        name: "千葉ロッテマリーンズ（ファーム）",
        stadium: "ロッテ浦和球場",
        location: "埼玉県さいたま市",
        league: "イースタン・リーグ",
        lat: 35.8617,
        lng: 139.6456,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.marines.co.jp/",
        type: "farm"
    },
    {
        name: "東北楽天ゴールデンイーグルス（ファーム）",
        stadium: "利府町中央公園野球場",
        location: "宮城県宮城郡利府町",
        league: "イースタン・リーグ",
        lat: 38.3344,
        lng: 141.0133,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.rakuteneagles.jp/",
        type: "farm"
    },
    {
        name: "オリックス・バファローズ（ファーム）",
        stadium: "神戸総合運動公園サブ球場",
        location: "兵庫県神戸市",
        league: "ウエスタン・リーグ",
        lat: 34.6847,
        lng: 135.1711,
        color: leagueColors["ウエスタン・リーグ"],
        detailUrl: "https://www.buffaloes.co.jp/",
        type: "farm"
    },
    {
        name: "埼玉西武ライオンズ（ファーム）",
        stadium: "西武第二球場",
        location: "埼玉県所沢市",
        league: "イースタン・リーグ",
        lat: 35.7658,
        lng: 139.4172,
        color: leagueColors["イースタン・リーグ"],
        detailUrl: "https://www.seibulions.jp/",
        type: "farm"
    },
    // 地方開催球場（2025年1軍公式戦）
    {
        name: "ヨーク開成山スタジアム",
        stadium: "ヨーク開成山スタジアム（開成山野球場）",
        location: "福島県郡山市",
        league: "地方開催球場",
        lat: 37.39867,
        lng: 140.35899,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?046",
        type: "regional",
        capacity: 18220,
        games2025: 1
    },
    {
        name: "こまちスタジアム",
        stadium: "こまちスタジアム（秋田県立野球場）",
        location: "秋田県秋田市",
        league: "地方開催球場",
        lat: 39.72377,
        lng: 140.06837,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?031",
        type: "regional",
        capacity: 25000,
        games2025: 1
    },
    {
        name: "富山市民球場アルペンスタジアム",
        stadium: "富山市民球場アルペンスタジアム",
        location: "富山県富山市",
        league: "地方開催球場",
        lat: 36.73069,
        lng: 137.26193,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?052",
        type: "regional",
        capacity: 25000,
        games2025: 1
    },
    {
        name: "ほっともっとフィールド神戸",
        stadium: "ほっともっとフィールド神戸",
        location: "兵庫県神戸市",
        league: "地方開催球場",
        lat: 34.6847,
        lng: 135.1711,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?185",
        type: "regional",
        capacity: 35000,
        games2025: 5
    },
    {
        name: "沖縄セルラースタジアム那覇",
        stadium: "沖縄セルラースタジアム那覇",
        location: "沖縄県那覇市",
        league: "地方開催球場",
        lat: 26.2124,
        lng: 127.6792,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?287",
        type: "regional",
        capacity: 20000,
        games2025: 2
    },
    {
        name: "きらやかスタジアム",
        stadium: "きらやかスタジアム",
        location: "山形県山形市",
        league: "地方開催球場",
        lat: 38.2414,
        lng: 140.3633,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?025",
        type: "regional",
        capacity: 12272,
        games2025: 1
    },
    {
        name: "県営あづま球場",
        stadium: "県営あづま球場",
        location: "福島県福島市",
        league: "地方開催球場",
        lat: 37.7608,
        lng: 140.4747,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?048",
        type: "regional",
        capacity: 30000,
        games2025: 1
    },
    {
        name: "静岡草薙球場",
        stadium: "静岡草薙球場",
        location: "静岡県静岡市",
        league: "地方開催球場",
        lat: 34.9756,
        lng: 138.3925,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?137",
        type: "regional",
        capacity: 21656,
        games2025: 1
    },
    {
        name: "はるか夢球場",
        stadium: "はるか夢球場（弘前市運動公園野球場）",
        location: "青森県弘前市",
        league: "地方開催球場",
        lat: 40.5906,
        lng: 140.4747,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?021",
        type: "regional",
        capacity: 15050,
        games2025: 1
    },
    {
        name: "石川県立野球場",
        stadium: "石川県立野球場",
        location: "石川県金沢市",
        league: "地方開催球場",
        lat: 36.5944,
        lng: 136.6256,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?061",
        type: "regional",
        capacity: 25000,
        games2025: 1
    },
    {
        name: "長良川球場",
        stadium: "ぎふしん長良川球場",
        location: "岐阜県岐阜市",
        league: "地方開催球場",
        lat: 35.4178,
        lng: 136.7625,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?086",
        type: "regional",
        capacity: 30000,
        games2025: 1
    },
    {
        name: "倉敷マスカットスタジアム",
        stadium: "倉敷マスカットスタジアム",
        location: "岡山県倉敷市",
        league: "地方開催球場",
        lat: 34.5833,
        lng: 133.7500,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?194",
        type: "regional",
        capacity: 30670,
        games2025: 1
    },
    {
        name: "HARD OFF ECOスタジアム新潟",
        stadium: "HARD OFF ECOスタジアム新潟",
        location: "新潟県新潟市",
        league: "地方開催球場",
        lat: 37.9167,
        lng: 139.0333,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?099",
        type: "regional",
        capacity: 25025,
        games2025: 1
    },
    {
        name: "上毛新聞敷島球場",
        stadium: "上毛新聞敷島球場",
        location: "群馬県前橋市",
        league: "地方開催球場",
        lat: 36.3667,
        lng: 139.0500,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?065",
        type: "regional",
        capacity: 17000,
        games2025: 1
    },
    {
        name: "北九州市民球場",
        stadium: "北九州市民球場",
        location: "福岡県北九州市",
        league: "地方開催球場",
        lat: 33.8833,
        lng: 130.8833,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?244",
        type: "regional",
        capacity: 15000,
        games2025: 1
    },
    {
        name: "ヤマリョースタジアム山形",
        stadium: "ヤマリョースタジアム山形",
        location: "山形県中山町",
        league: "地方開催球場",
        lat: 38.3667,
        lng: 140.1833,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?026",
        type: "regional",
        capacity: 25000,
        games2025: 1
    },
    {
        name: "いわきグリーンスタジアム",
        stadium: "ヨークいわきスタジアム（いわきグリーンスタジアム）",
        location: "福島県いわき市",
        league: "地方開催球場",
        lat: 37.017,
        lng: 140.860,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?047",
        type: "regional",
        capacity: 30000,
        games2025: 1
    },
    {
        name: "青森県営野球場",
        stadium: "青森県営野球場",
        location: "青森県青森市",
        league: "地方開催球場",
        lat: 40.8244,
        lng: 140.7406,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?022",
        type: "regional",
        capacity: 25000,
        games2025: 1
    },
    {
        name: "岩手県営野球場",
        stadium: "岩手県営野球場",
        location: "岩手県盛岡市",
        league: "地方開催球場",
        lat: 39.7036,
        lng: 141.1528,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?023",
        type: "regional",
        capacity: 25000,
        games2025: 1
    },
    {
        name: "県営宮城球場",
        stadium: "県営宮城球場",
        location: "宮城県仙台市",
        league: "地方開催球場",
        lat: 38.3150,
        lng: 140.9022,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?027",
        type: "regional",
        capacity: 23000,
        games2025: 1
    },
    {
        name: "坊っちゃんスタジアム",
        stadium: "坊っちゃんスタジアム（松山中央公園野球場）",
        location: "愛媛県松山市",
        league: "地方開催球場",
        lat: 33.8033,
        lng: 132.7392,
        color: leagueColors["地方開催球場"],
        detailUrl: "https://npb.jp/stadium/detail.html?230",
        type: "regional",
        capacity: 30000,
        games2025: 1
    }
];

let map;
let markers = [];
let infoWindow;

// Google Maps用のカスタムスタイル（日本風）
const japaneseMapStyle = [
    {
        "featureType": "all",
        "stylers": [
            { "saturation": -20 }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            { "color": "#a4d4e6" }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            { "color": "#f0f8e8" }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            { "visibility": "simplified" }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            { "visibility": "off" }
        ]
    }
];

// 環境変数からAPIキーを取得
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// 地図を初期化（グローバルスコープに公開）
window.initMap = function() {
    // 日本の中心座標
    const japanCenter = { lat: 36.2048, lng: 138.2529 };
    
    // レスポンシブ対応: デバイスサイズに応じて初期ズームレベルを調整
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768;
    let initialZoom = 6;
    
    if (isMobile) {
        initialZoom = 5;
    } else if (isTablet) {
        initialZoom = 5.5;
    }
    
    // Google Map を初期化
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: initialZoom,
        center: japanCenter,
        styles: japaneseMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: !isMobile, // モバイルではフルスクリーンボタンを非表示
        zoomControl: true,
        gestureHandling: isMobile ? 'greedy' : 'cooperative' // モバイルでは単指操作を有効
    });
    
    // InfoWindow を初期化
    infoWindow = new google.maps.InfoWindow();
    
    // 日本全体が見えるように境界を設定（より狭い範囲で大きく表示）
    const japanBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(30.0, 128.0), // 南西（沖縄を含む）
        new google.maps.LatLng(46.0, 146.0)  // 北東（北海道を含む）
    );
    map.fitBounds(japanBounds);
    
    // パディングを追加してマーカーが端に来すぎないように調整
    map.fitBounds(japanBounds, {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    });
    
    // すべての球団マーカーを表示
    showAllTeams();
    
    // ウィンドウリサイズ時に地図を再描画
    window.addEventListener('resize', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(japanCenter);
    });
};

// マーカーをクリアする
function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
}

// 球団情報を表示する
function showTeamInfo(team) {
    const teamNameElement = document.getElementById('team-name');
    teamNameElement.innerHTML = `<a href="${team.detailUrl}" target="_blank" style="color: ${team.color}; text-decoration: none;">${team.name}</a>`;
    document.getElementById('stadium-name').textContent = team.stadium;
    document.getElementById('location').textContent = team.location;
    document.getElementById('league').textContent = team.league;
    document.getElementById('team-info').style.display = 'block';
}

// Google Maps用のマーカーを作成
function addMarker(team) {
    const position = { lat: team.lat, lng: team.lng };
    
    // レスポンシブ対応: デバイスサイズに応じてマーカーサイズを調整
    const isMobileDevice = window.innerWidth <= 480;
    const sizeMultiplier = isMobileDevice ? 0.8 : 1;
    
    // カスタムマーカーアイコンを作成
    let markerIcon;
    if (team.type === 'regional') {
        // 地方開催球場用ダイヤモンドマーカー
        markerIcon = {
            path: 'M 0,-10 L 7,0 L 0,10 L -7,0 Z',  // ダイヤモンド形状
            scale: 1.2 * sizeMultiplier,
            fillColor: team.color,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: isMobileDevice ? 1.5 : 2
        };
    } else if (team.type === 'farm') {
        // ファーム球場用矢印マーカー
        markerIcon = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 10 * sizeMultiplier,
            fillColor: team.color,
            fillOpacity: 0.6,
            strokeColor: '#ffffff',
            strokeWeight: isMobileDevice ? 2 : 3
        };
    } else {
        // 1軍本拠地用円マーカー
        markerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12 * sizeMultiplier,
            fillColor: team.color,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: isMobileDevice ? 2 : 3
        };
    }
    
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: team.name,
        icon: markerIcon,
        animation: google.maps.Animation.DROP
    });
    
    // InfoWindow のコンテンツ
    let teamType = '';
    let additionalInfo = '';
    
    if (team.type === 'farm') {
        teamType = '（ファーム）';
    } else if (team.type === 'regional') {
        teamType = '（地方開催）';
        if (team.capacity) {
            additionalInfo += `<p style="margin: 3px 0; font-size: 12px;">収容人数: ${team.capacity.toLocaleString()}人</p>`;
        }
        if (team.games2025) {
            additionalInfo += `<p style="margin: 3px 0; font-size: 12px;">2025年開催: ${team.games2025}試合</p>`;
        }
    }
    
    // レスポンシブ対応: モバイルでInfoWindowのサイズを調整
    const isMobileInfo = window.innerWidth <= 480;
    const minWidth = isMobileInfo ? '150px' : '200px';
    const fontSize = isMobileInfo ? '11px' : '12px';
    const smallFontSize = isMobileInfo ? '9px' : '11px';
    
    const infoContent = `
        <div style="text-align: center; min-width: ${minWidth};">
            <h4 style="margin: 5px 0; color: ${team.color}; font-size: ${isMobileInfo ? '12px' : '14px'};">
                <a href="${team.detailUrl}" target="_blank" style="color: ${team.color}; text-decoration: none;">${team.name}</a>
            </h4>
            <p style="margin: 3px 0; font-size: ${fontSize};"><strong>${team.stadium}</strong></p>
            <p style="margin: 3px 0; font-size: ${fontSize};">${team.location}</p>
            <p style="margin: 3px 0; font-size: ${fontSize}; color: #666;">${team.league}${teamType}</p>
            ${additionalInfo}
            <p style="margin: 5px 0; font-size: ${smallFontSize}; color: #999;">球場名をクリックで詳細ページへ</p>
        </div>
    `;
    
    // クリックイベントを追加
    marker.addListener('click', () => {
        infoWindow.setContent(infoContent);
        infoWindow.open(map, marker);
        showTeamInfo(team);
        
        // マーカーをバウンスアニメーション
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 2000);
    });
    
    markers.push(marker);
}

// すべての球団を表示
window.showAllTeams = function() {
    clearMarkers();
    baseballTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(0);
};

// セ・リーグのみ表示
window.showCentralLeague = function() {
    clearMarkers();
    const centralTeams = baseballTeams.filter(team => team.league === "セントラル・リーグ");
    centralTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(4);
};

// パ・リーグのみ表示
window.showPacificLeague = function() {
    clearMarkers();
    const pacificTeams = baseballTeams.filter(team => team.league === "パシフィック・リーグ");
    pacificTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(5);
};

// イースタン・リーグのみ表示
window.showEasternLeague = function() {
    clearMarkers();
    const easternTeams = baseballTeams.filter(team => team.league === "イースタン・リーグ");
    easternTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(6);
};

// ウエスタン・リーグのみ表示
window.showWesternLeague = function() {
    clearMarkers();
    const westernTeams = baseballTeams.filter(team => team.league === "ウエスタン・リーグ");
    westernTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(7);
};

// 1軍のみ表示
window.showMainTeams = function() {
    clearMarkers();
    const mainTeams = baseballTeams.filter(team => !team.type || team.type === undefined);
    mainTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(1);
};

// ファーム（2軍）のみ表示
window.showFarmTeams = function() {
    clearMarkers();
    const farmTeams = baseballTeams.filter(team => team.type === 'farm');
    farmTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(2);
};

// 地方開催球場のみ表示
window.showRegionalStadiums = function() {
    clearMarkers();
    const regionalTeams = baseballTeams.filter(team => team.type === 'regional');
    regionalTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(3);
};

// アクティブなボタンを更新
function updateActiveButton(activeIndex) {
    const buttons = document.querySelectorAll('.league-btn');
    buttons.forEach((btn, index) => {
        if (index === activeIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// DOMContentLoaded は不要（Google Maps API コールバックで初期化）