// Weather UI Components
import { getWeatherData, getWeatherForecast, getWeatherAdvice, getWeatherEmoji } from './weather.js';

/**
 * 球場の天気ウィジェットを作成
 */
export async function createWeatherWidget(stadium, isIndoorStadium = false) {
  const container = document.createElement('div');
  container.className = 'weather-widget';
  container.innerHTML = '<div class="weather-loading">天気情報を読み込み中...</div>';

  try {
    // 天気データを取得
    const weatherData = await getWeatherData(stadium.lat, stadium.lng, stadium.stadium);
    
    if (!weatherData) {
      container.innerHTML = '<div class="weather-error">天気情報を取得できませんでした</div>';
      return container;
    }

    // 予報データを取得
    const forecastData = await getWeatherForecast(stadium.lat, stadium.lng, stadium.stadium);
    
    // アドバイスを生成
    const advice = getWeatherAdvice(weatherData, isIndoorStadium);

    // UIを構築
    container.innerHTML = `
      <div class="weather-current">
        <div class="weather-icon">${getWeatherEmoji(weatherData.icon)}</div>
        <div class="weather-main">
          <div class="weather-temp">${weatherData.temperature}°C</div>
          <div class="weather-description">${weatherData.description}</div>
        </div>
      </div>
      
      <div class="weather-details">
        <div class="weather-detail">
          <span class="weather-detail-label">体感</span>
          <span class="weather-detail-value">${weatherData.feelsLike}°C</span>
        </div>
        <div class="weather-detail">
          <span class="weather-detail-label">湿度</span>
          <span class="weather-detail-value">${weatherData.humidity}%</span>
        </div>
        <div class="weather-detail">
          <span class="weather-detail-label">風速</span>
          <span class="weather-detail-value">${weatherData.windSpeed.toFixed(1)}m/s</span>
        </div>
        <div class="weather-detail">
          <span class="weather-detail-label">視程</span>
          <span class="weather-detail-value">${weatherData.visibility.toFixed(1)}km</span>
        </div>
      </div>
      
      ${forecastData && forecastData.length > 0 ? createForecastHTML(forecastData) : ''}
      
      ${advice.length > 0 ? createAdviceHTML(advice) : ''}
      
      <div style="text-align: center; margin-top: 1rem; font-size: 0.8rem; opacity: 0.8;">
        最終更新: ${weatherData.timestamp.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
      </div>
    `;

  } catch (error) {
    console.error('Weather widget creation error:', error);
    container.innerHTML = '<div class="weather-error">天気情報の表示中にエラーが発生しました</div>';
  }

  return container;
}

/**
 * 天気予報HTMLを作成
 */
function createForecastHTML(forecastData) {
  const forecastItems = forecastData.map(day => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString('ja-JP', { weekday: 'short' });
    const monthDay = date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
    
    // 代表的な天気アイコンを選択（最も頻繁に出現するもの）
    const iconCounts = {};
    day.forecasts.forEach(f => {
      iconCounts[f.icon] = (iconCounts[f.icon] || 0) + 1;
    });
    const representativeIcon = Object.keys(iconCounts).reduce((a, b) => 
      iconCounts[a] > iconCounts[b] ? a : b
    );

    return `
      <div class="forecast-day">
        <div class="forecast-date">${dayName} ${monthDay}</div>
        <div class="forecast-icon">${getWeatherEmoji(representativeIcon)}</div>
        <div class="forecast-temps">
          <span class="forecast-max">${day.maxTemp}°</span>
          <span class="forecast-min">${day.minTemp}°</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="weather-forecast">
      <div class="forecast-title">3日間予報</div>
      <div class="forecast-days">
        ${forecastItems}
      </div>
    </div>
  `;
}

/**
 * 観戦アドバイスHTMLを作成
 */
function createAdviceHTML(advice) {
  const adviceItems = advice.map(item => 
    `<li class="advice-item">${item}</li>`
  ).join('');

  return `
    <div class="weather-advice">
      <div class="advice-title">
        ⚾ 観戦アドバイス
      </div>
      <ul class="advice-list">
        ${adviceItems}
      </ul>
    </div>
  `;
}


/**
 * 簡易天気情報を作成（チーム情報パネル用）
 */
export async function createCompactWeatherInfo(stadium, isIndoorStadium = false) {
  try {
    const weatherData = await getWeatherData(stadium.lat, stadium.lng, stadium.stadium);
    
    if (!weatherData) {
      return '<p style="color: #666;">天気情報を取得できませんでした</p>';
    }

    const advice = getWeatherAdvice(weatherData, isIndoorStadium);
    const primaryAdvice = advice.length > 0 ? advice[0] : '';

    return `
      <div style="margin: 1rem 0; padding: 0.8rem; background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); border-radius: 8px; color: white;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span style="font-size: 1.5rem;">${getWeatherEmoji(weatherData.icon)}</span>
          <div>
            <div style="font-weight: bold; font-size: 1.1rem;">${weatherData.temperature}°C</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">${weatherData.description}</div>
          </div>
        </div>
        ${primaryAdvice ? `<div style="font-size: 0.8rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 0.5rem;">${primaryAdvice}</div>` : ''}
      </div>
    `;
  } catch (error) {
    console.error('Compact weather info creation error:', error);
    return '<p style="color: #666;">天気情報の取得中にエラーが発生しました</p>';
  }
}

/**
 * InfoWindow用の簡潔な天気情報を作成
 */
export async function createMapWeatherInfo(stadium) {
  try {
    const weatherData = await getWeatherData(stadium.lat, stadium.lng, stadium.stadium);
    
    if (!weatherData) {
      return '';
    }

    // ドーム球場の判定
    const isIndoor = stadium.stadium.includes('ドーム') || 
                     stadium.stadium === '東京ドーム';
    
    const advice = getWeatherAdvice(weatherData, isIndoor);
    const primaryAdvice = advice.length > 0 ? advice[0] : '';

    return `
      <div style="margin: 8px 0; padding: 8px; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 6px; border-left: 3px solid #2196f3;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="font-size: 16px;">${getWeatherEmoji(weatherData.icon)}</span>
          <div>
            <span style="font-weight: bold; font-size: 13px; color: #1976d2;">${weatherData.temperature}°C</span>
            <span style="font-size: 11px; color: #555; margin-left: 6px;">${weatherData.description}</span>
          </div>
        </div>
        ${primaryAdvice ? `<div style="font-size: 10px; color: #666; line-height: 1.3;">${primaryAdvice}</div>` : ''}
      </div>
    `;
  } catch (error) {
    console.error('Map weather info creation error:', error);
    return '';
  }
}

/**
 * 天気情報を手動更新
 */
export function refreshWeatherData() {
  // キャッシュをクリアして再読み込み
  import('./weather.js').then(({ clearWeatherCache }) => {
    clearWeatherCache();
    // 表示中の天気ウィジェットを再読み込み
    const weatherWidgets = document.querySelectorAll('.weather-widget');
    weatherWidgets.forEach(widget => {
      const stadium = widget.dataset.stadium;
      if (stadium) {
        // ウィジェットを再作成（実装は呼び出し元で行う）
        widget.innerHTML = '<div class="weather-loading">天気情報を更新中...</div>';
      }
    });
  });
}