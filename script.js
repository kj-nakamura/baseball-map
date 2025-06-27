// リーグ色の定義
const leagueColors = {
    "セントラル・リーグ": "#e74c3c",      // 赤
    "パシフィック・リーグ": "#3498db",    // 青
    "イースタン・リーグ": "#f39c12",      // オレンジ
    "ウエスタン・リーグ": "#27ae60"       // 緑
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
    
    // Google Map を初期化
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: japanCenter,
        styles: japaneseMapStyle,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        gestureHandling: 'cooperative'
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
    
    // カスタムマーカーアイコンを作成
    const markerIcon = {
        path: team.type === 'farm' ? google.maps.SymbolPath.FORWARD_CLOSED_ARROW : google.maps.SymbolPath.CIRCLE,
        scale: team.type === 'farm' ? 10 : 12,
        fillColor: team.color,
        fillOpacity: team.type === 'farm' ? 0.6 : 0.8,
        strokeColor: '#ffffff',
        strokeWeight: 3
    };
    
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: team.name,
        icon: markerIcon,
        animation: google.maps.Animation.DROP
    });
    
    // InfoWindow のコンテンツ
    const teamType = team.type === 'farm' ? '（ファーム）' : '';
    const infoContent = `
        <div style="text-align: center; min-width: 200px;">
            <h4 style="margin: 5px 0; color: ${team.color};">
                <a href="${team.detailUrl}" target="_blank" style="color: ${team.color}; text-decoration: none;">${team.name}</a>
            </h4>
            <p style="margin: 3px 0;"><strong>${team.stadium}</strong></p>
            <p style="margin: 3px 0;">${team.location}</p>
            <p style="margin: 3px 0; font-size: 12px; color: #666;">${team.league}${teamType}</p>
            <p style="margin: 5px 0; font-size: 11px; color: #999;">球団名をクリックで詳細ページへ</p>
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
    updateActiveButton(3);
};

// パ・リーグのみ表示
window.showPacificLeague = function() {
    clearMarkers();
    const pacificTeams = baseballTeams.filter(team => team.league === "パシフィック・リーグ");
    pacificTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(4);
};

// イースタン・リーグのみ表示
window.showEasternLeague = function() {
    clearMarkers();
    const easternTeams = baseballTeams.filter(team => team.league === "イースタン・リーグ");
    easternTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(5);
};

// ウエスタン・リーグのみ表示
window.showWesternLeague = function() {
    clearMarkers();
    const westernTeams = baseballTeams.filter(team => team.league === "ウエスタン・リーグ");
    westernTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(6);
};

// 1軍のみ表示
window.showMainTeams = function() {
    clearMarkers();
    const mainTeams = baseballTeams.filter(team => team.type !== 'farm');
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