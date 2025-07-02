// Weather API service for baseball stadiums using OpenWeatherMap API
const OPENWEATHER_API_KEY = window.OPENWEATHER_API_KEY || '3d403b187a1b8cba7d79fbed4a1d0562';
const CACHE_DURATION = 30 * 60 * 1000; // 30分間キャッシュ

// キャッシュ管理
const weatherCache = new Map();

/**
 * 天気情報を取得（キャッシュ付き）
 */
export async function getWeatherData(lat, lng, locationName = '') {
  const cacheKey = `${lat}-${lng}`;
  const cached = weatherCache.get(cacheKey);
  
  // キャッシュが有効な場合は返す
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
      console.warn('OpenWeatherMap API key not configured, using mock data');
      return getMockWeatherData(locationName);
    }

    // OpenWeatherMap Current Weather API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&lang=ja&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();
    const weatherInfo = parseOpenWeatherData(data, locationName);
    
    // キャッシュに保存
    weatherCache.set(cacheKey, {
      data: weatherInfo,
      timestamp: Date.now()
    });

    return weatherInfo;
  } catch (error) {
    console.error('Weather data fetch error:', error);
    // APIエラーの場合はモックデータを返す
    return getMockWeatherData(locationName);
  }
}

/**
 * 3日間天気予報を取得
 */
export async function getWeatherForecast(lat, lng, locationName = '') {
  const cacheKey = `forecast-${lat}-${lng}`;
  const cached = weatherCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
    return cached.data;
  }

  try {
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'your_openweather_api_key_here') {
      console.warn('OpenWeatherMap API key not configured, using mock forecast data');
      return getMockForecastData();
    }

    // OpenWeatherMap 5-day Forecast API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&lang=ja&units=metric`
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap Forecast API error: ${response.status}`);
    }

    const data = await response.json();
    const forecastInfo = parseOpenWeatherForecastData(data, locationName);
    
    weatherCache.set(cacheKey, {
      data: forecastInfo,
      timestamp: Date.now()
    });

    return forecastInfo;
  } catch (error) {
    console.error('Forecast data fetch error:', error);
    // APIエラーの場合はモック予報データを返す
    return getMockForecastData();
  }
}

/**
 * OpenWeatherMap APIデータをパース
 */
function parseOpenWeatherData(data, locationName) {
  return {
    location: locationName || data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    windSpeed: data.wind?.speed || 0,
    windDirection: data.wind?.deg || 0,
    visibility: data.visibility / 1000, // km
    uvIndex: null,
    timestamp: new Date(data.dt * 1000),
    sunrise: new Date(data.sys.sunrise * 1000),
    sunset: new Date(data.sys.sunset * 1000)
  };
}

/**
 * OpenWeatherMap予報データをパース（3日分）
 */
function parseOpenWeatherForecastData(data, _locationName) {
  const dailyForecasts = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (!dailyForecasts[dateKey]) {
      dailyForecasts[dateKey] = {
        date: dateKey,
        forecasts: []
      };
    }
    
    dailyForecasts[dateKey].forecasts.push({
      time: date.getHours(),
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      rain: item.rain?.['3h'] || 0,
      windSpeed: item.wind?.speed || 0
    });
  });

  // 最初の3日分のみ返す
  const sortedDates = Object.keys(dailyForecasts).sort().slice(0, 3);
  return sortedDates.map(date => ({
    ...dailyForecasts[date],
    maxTemp: Math.max(...dailyForecasts[date].forecasts.map(f => f.temperature)),
    minTemp: Math.min(...dailyForecasts[date].forecasts.map(f => f.temperature)),
    rainProbability: Math.max(...dailyForecasts[date].forecasts.map(f => f.rain))
  }));
}

/**
 * 観戦向け天気アドバイスを生成
 */
export function getWeatherAdvice(weatherData, isIndoorStadium = false) {
  if (!weatherData) {
    return [];
  }

  const advice = [];
  const temp = weatherData.temperature;
  const description = weatherData.description.toLowerCase();

  // ドーム球場の場合
  if (isIndoorStadium) {
    advice.push('🏟️ ドーム球場なので天候の心配はありません');
    if (temp < 15) {
      advice.push('❄️ 外は寒いので球場到着まで防寒着を');
    } else if (temp > 30) {
      advice.push('☀️ 外は暑いので球場到着まで暑さ対策を');
    }
    return advice;
  }

  // 温度に応じたアドバイス
  if (temp >= 30) {
    advice.push('🔥 猛暑注意：帽子・日焼け止め・水分補給必須');
  } else if (temp >= 25) {
    advice.push('☀️ 暑い：帽子と水分補給をお忘れなく');
  } else if (temp <= 10) {
    advice.push('🧥 寒い：防寒着・手袋・カイロがおすすめ');
  } else if (temp <= 15) {
    advice.push('🌡️ 肌寒い：軽い上着があると安心');
  }

  // 天候に応じたアドバイス
  if (description.includes('雨') || description.includes('雷')) {
    advice.push('☔ 雨予報：レインコートまたは傘を持参');
  } else if (description.includes('雪')) {
    advice.push('❄️ 雪予報：滑りにくい靴と防寒具を');
  } else if (description.includes('晴')) {
    advice.push('☀️ 晴天：観戦日和です！');
  }

  // 風に応じたアドバイス
  if (weatherData.windSpeed > 5) {
    advice.push('💨 風が強め：軽い荷物は注意');
  }

  // 湿度に応じたアドバイス
  if (weatherData.humidity > 80) {
    advice.push('💧 湿度高め：汗拭きタオルがあると便利');
  }

  return advice;
}

/**
 * OpenWeatherMapアイコンをemoji形式に変換
 */
export function getWeatherEmoji(iconCode) {
  const iconMap = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '🌨️', '13n': '🌨️',
    '50d': '🌫️', '50n': '🌫️'
  };
  
  return iconMap[iconCode] || '🌤️';
}


/**
 * モック天気データを生成（APIが利用できない場合）
 */
function getMockWeatherData(locationName) {
  const mockConditions = [
    { icon: '01d', description: '晴れ', temp: 22 },
    { icon: '02d', description: '薄曇り', temp: 20 },
    { icon: '10d', description: '小雨', temp: 18 },
    { icon: '04d', description: '曇り', temp: 19 }
  ];
  
  const randomCondition = mockConditions[Math.floor(Math.random() * mockConditions.length)];
  
  return {
    location: locationName,
    temperature: randomCondition.temp,
    feelsLike: randomCondition.temp + 2,
    humidity: 65,
    pressure: 1013,
    description: randomCondition.description,
    icon: randomCondition.icon,
    windSpeed: 3.2,
    windDirection: 180,
    visibility: 10,
    uvIndex: 5,
    timestamp: new Date(),
    sunrise: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6時間後（仮の日の出）
    sunset: new Date(Date.now() + 18 * 60 * 60 * 1000)  // 18時間後（仮の日の入り）
  };
}

/**
 * モック予報データを生成（3日分）
 */
function getMockForecastData() {
  const mockData = [];
  const today = new Date();
  
  for (let i = 0; i < 3; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const dateKey = date.toISOString().split('T')[0];
    
    const baseTemp = 20 + Math.floor(Math.random() * 10);
    const forecasts = [];
    
    // 1日分の時間別予報データを生成
    for (let hour = 0; hour < 24; hour += 3) {
      forecasts.push({
        time: hour,
        temperature: baseTemp + Math.floor(Math.random() * 6) - 3,
        description: ['晴れ', '曇り', '薄曇り'][Math.floor(Math.random() * 3)],
        icon: ['01d', '02d', '04d'][Math.floor(Math.random() * 3)],
        rain: Math.random() * 20,
        windSpeed: Math.random() * 5
      });
    }
    
    mockData.push({
      date: dateKey,
      forecasts: forecasts,
      maxTemp: baseTemp + 3,
      minTemp: baseTemp - 3,
      rainProbability: Math.floor(Math.random() * 40)
    });
  }
  
  return mockData;
}

/**
 * キャッシュをクリア
 */
export function clearWeatherCache() {
  weatherCache.clear();
}