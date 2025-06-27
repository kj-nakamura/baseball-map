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
        color: "#e74c3c",
        detailUrl: "https://npb.jp/stadium/detail.html?081"
    },
    {
        name: "阪神タイガース",
        stadium: "阪神甲子園球場",
        location: "兵庫県西宮市",
        league: "セントラル・リーグ",
        lat: 34.7213,
        lng: 135.3619,
        color: "#e74c3c",
        detailUrl: "https://npb.jp/stadium/detail.html?181"
    },
    {
        name: "横浜DeNAベイスターズ",
        stadium: "横浜スタジアム",
        location: "神奈川県横浜市",
        league: "セントラル・リーグ",
        lat: 35.4437,
        lng: 139.6380,
        color: "#e74c3c",
        detailUrl: "https://npb.jp/stadium/detail.html?093"
    },
    {
        name: "広島東洋カープ",
        stadium: "MAZDA Zoom-Zoom スタジアム広島",
        location: "広島県広島市",
        league: "セントラル・リーグ",
        lat: 34.3914,
        lng: 132.4626,
        color: "#e74c3c",
        detailUrl: "https://npb.jp/stadium/detail.html?208"
    },
    {
        name: "東京ヤクルトスワローズ",
        stadium: "明治神宮野球場",
        location: "東京都新宿区",
        league: "セントラル・リーグ",
        lat: 35.6784,
        lng: 139.7170,
        color: "#e74c3c",
        detailUrl: "https://npb.jp/stadium/detail.html?082"
    },
    {
        name: "中日ドラゴンズ",
        stadium: "バンテリンドーム ナゴヤ",
        location: "愛知県名古屋市",
        league: "セントラル・リーグ",
        lat: 35.1855,
        lng: 136.9493,
        color: "#e74c3c",
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
        color: "#3498db",
        detailUrl: "https://npb.jp/stadium/detail.html?245"
    },
    {
        name: "北海道日本ハムファイターズ",
        stadium: "エスコンフィールドＨＯＫＫＡＩＤＯ",
        location: "北海道北広島市",
        league: "パシフィック・リーグ",
        lat: 42.9869,
        lng: 141.5642,
        color: "#3498db",
        detailUrl: "https://npb.jp/stadium/detail.html?290"
    },
    {
        name: "千葉ロッテマリーンズ",
        stadium: "ZOZOマリンスタジアム",
        location: "千葉県千葉市",
        league: "パシフィック・リーグ",
        lat: 35.6470,
        lng: 140.0316,
        color: "#3498db",
        detailUrl: "https://npb.jp/stadium/detail.html?073"
    },
    {
        name: "東北楽天ゴールデンイーグルス",
        stadium: "楽天モバイルパーク宮城",
        location: "宮城県仙台市",
        league: "パシフィック・リーグ",
        lat: 38.2566,
        lng: 140.9015,
        color: "#3498db",
        detailUrl: "https://npb.jp/stadium/detail.html?029"
    },
    {
        name: "オリックス・バファローズ",
        stadium: "京セラドーム大阪",
        location: "大阪府大阪市",
        league: "パシフィック・リーグ",
        lat: 34.6650,
        lng: 135.4755,
        color: "#3498db",
        detailUrl: "https://npb.jp/stadium/detail.html?175"
    },
    {
        name: "埼玉西武ライオンズ",
        stadium: "ベルーナドーム",
        location: "埼玉県所沢市",
        league: "パシフィック・リーグ",
        lat: 35.7651,
        lng: 139.4178,
        color: "#3498db",
        detailUrl: "https://npb.jp/stadium/detail.html?068"
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

// 地図を初期化
function initMap() {
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
    
    // 日本全体が見えるように境界を設定
    const japanBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(24.0, 122.7), // 南西
        new google.maps.LatLng(45.7, 154.0)  // 北東
    );
    map.fitBounds(japanBounds);
    
    // すべての球団マーカーを表示
    showAllTeams();
}

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
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: team.color,
        fillOpacity: 0.8,
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
    const infoContent = `
        <div style="text-align: center; min-width: 200px;">
            <h4 style="margin: 5px 0; color: ${team.color};">
                <a href="${team.detailUrl}" target="_blank" style="color: ${team.color}; text-decoration: none;">${team.name}</a>
            </h4>
            <p style="margin: 3px 0;"><strong>${team.stadium}</strong></p>
            <p style="margin: 3px 0;">${team.location}</p>
            <p style="margin: 3px 0; font-size: 12px; color: #666;">${team.league}</p>
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
function showAllTeams() {
    clearMarkers();
    baseballTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(0);
}

// セ・リーグのみ表示
function showCentralLeague() {
    clearMarkers();
    const centralTeams = baseballTeams.filter(team => team.league === "セントラル・リーグ");
    centralTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(1);
}

// パ・リーグのみ表示
function showPacificLeague() {
    clearMarkers();
    const pacificTeams = baseballTeams.filter(team => team.league === "パシフィック・リーグ");
    pacificTeams.forEach(team => {
        addMarker(team);
    });
    updateActiveButton(2);
}

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