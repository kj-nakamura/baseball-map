// MLB league colors
export const mlbLeagueColors = {
  'American League': '#0066CC', // Blue
  'National League': '#CC0000', // Red
  'AL East': '#FF6600',
  'AL Central': '#009900',
  'AL West': '#9900CC',
  'NL East': '#FF0066',
  'NL Central': '#FF9900',
  'NL West': '#006600',
};

// MLB 30 teams data
export const mlbTeams = [
  // American League East
  {
    name: 'New York Yankees',
    stadium: 'Yankee Stadium',
    location: 'New York, NY',
    league: 'American League',
    division: 'AL East',
    lat: 40.8296,
    lng: -73.9262,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/yankees',
  },
  {
    name: 'Boston Red Sox',
    stadium: 'Fenway Park',
    location: 'Boston, MA',
    league: 'American League',
    division: 'AL East',
    lat: 42.3467,
    lng: -71.0972,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/redsox',
  },
  {
    name: 'Tampa Bay Rays',
    stadium: 'Tropicana Field',
    location: 'St. Petersburg, FL',
    league: 'American League',
    division: 'AL East',
    lat: 27.7682,
    lng: -82.6534,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/rays',
  },
  {
    name: 'Toronto Blue Jays',
    stadium: 'Rogers Centre',
    location: 'Toronto, ON',
    league: 'American League',
    division: 'AL East',
    lat: 43.6414,
    lng: -79.3894,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/bluejays',
  },
  {
    name: 'Baltimore Orioles',
    stadium: 'Oriole Park at Camden Yards',
    location: 'Baltimore, MD',
    league: 'American League',
    division: 'AL East',
    lat: 39.284,
    lng: -76.6216,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/orioles',
  },
  // American League Central
  {
    name: 'Cleveland Guardians',
    stadium: 'Progressive Field',
    location: 'Cleveland, OH',
    league: 'American League',
    division: 'AL Central',
    lat: 41.4962,
    lng: -81.6852,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/guardians',
  },
  {
    name: 'Minnesota Twins',
    stadium: 'Target Field',
    location: 'Minneapolis, MN',
    league: 'American League',
    division: 'AL Central',
    lat: 44.9817,
    lng: -93.2777,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/twins',
  },
  {
    name: 'Kansas City Royals',
    stadium: 'Kauffman Stadium',
    location: 'Kansas City, MO',
    league: 'American League',
    division: 'AL Central',
    lat: 39.0517,
    lng: -94.4803,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/royals',
  },
  {
    name: 'Detroit Tigers',
    stadium: 'Comerica Park',
    location: 'Detroit, MI',
    league: 'American League',
    division: 'AL Central',
    lat: 42.339,
    lng: -83.0485,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/tigers',
  },
  {
    name: 'Chicago White Sox',
    stadium: 'Guaranteed Rate Field',
    location: 'Chicago, IL',
    league: 'American League',
    division: 'AL Central',
    lat: 41.83,
    lng: -87.6338,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/whitesox',
  },
  // American League West
  {
    name: 'Houston Astros',
    stadium: 'Minute Maid Park',
    location: 'Houston, TX',
    league: 'American League',
    division: 'AL West',
    lat: 29.757,
    lng: -95.3551,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/astros',
  },
  {
    name: 'Seattle Mariners',
    stadium: 'T-Mobile Park',
    location: 'Seattle, WA',
    league: 'American League',
    division: 'AL West',
    lat: 47.5914,
    lng: -122.3326,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/mariners',
  },
  {
    name: 'Texas Rangers',
    stadium: 'Globe Life Field',
    location: 'Arlington, TX',
    league: 'American League',
    division: 'AL West',
    lat: 32.7473,
    lng: -97.0836,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/rangers',
  },
  {
    name: 'Oakland Athletics',
    stadium: 'Oakland Coliseum',
    location: 'Oakland, CA',
    league: 'American League',
    division: 'AL West',
    lat: 37.7516,
    lng: -122.2008,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/athletics',
  },
  {
    name: 'Los Angeles Angels',
    stadium: 'Angel Stadium',
    location: 'Anaheim, CA',
    league: 'American League',
    division: 'AL West',
    lat: 33.8003,
    lng: -117.8827,
    color: mlbLeagueColors['American League'],
    detailUrl: 'https://www.mlb.com/angels',
  },
  // National League East
  {
    name: 'Atlanta Braves',
    stadium: 'Truist Park',
    location: 'Atlanta, GA',
    league: 'National League',
    division: 'NL East',
    lat: 33.8902,
    lng: -84.4677,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/braves',
  },
  {
    name: 'Philadelphia Phillies',
    stadium: 'Citizens Bank Park',
    location: 'Philadelphia, PA',
    league: 'National League',
    division: 'NL East',
    lat: 39.906,
    lng: -75.1665,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/phillies',
  },
  {
    name: 'New York Mets',
    stadium: 'Citi Field',
    location: 'New York, NY',
    league: 'National League',
    division: 'NL East',
    lat: 40.7571,
    lng: -73.8458,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/mets',
  },
  {
    name: 'Miami Marlins',
    stadium: 'loanDepot park',
    location: 'Miami, FL',
    league: 'National League',
    division: 'NL East',
    lat: 25.7781,
    lng: -80.2197,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/marlins',
  },
  {
    name: 'Washington Nationals',
    stadium: 'Nationals Park',
    location: 'Washington, DC',
    league: 'National League',
    division: 'NL East',
    lat: 38.873,
    lng: -77.0074,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/nationals',
  },
  // National League Central
  {
    name: 'Milwaukee Brewers',
    stadium: 'American Family Field',
    location: 'Milwaukee, WI',
    league: 'National League',
    division: 'NL Central',
    lat: 43.028,
    lng: -87.9712,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/brewers',
  },
  {
    name: 'St. Louis Cardinals',
    stadium: 'Busch Stadium',
    location: 'St. Louis, MO',
    league: 'National League',
    division: 'NL Central',
    lat: 38.6226,
    lng: -90.1928,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/cardinals',
  },
  {
    name: 'Chicago Cubs',
    stadium: 'Wrigley Field',
    location: 'Chicago, IL',
    league: 'National League',
    division: 'NL Central',
    lat: 41.9484,
    lng: -87.6553,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/cubs',
  },
  {
    name: 'Cincinnati Reds',
    stadium: 'Great American Ball Park',
    location: 'Cincinnati, OH',
    league: 'National League',
    division: 'NL Central',
    lat: 39.0974,
    lng: -84.5067,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/reds',
  },
  {
    name: 'Pittsburgh Pirates',
    stadium: 'PNC Park',
    location: 'Pittsburgh, PA',
    league: 'National League',
    division: 'NL Central',
    lat: 40.4469,
    lng: -80.0057,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/pirates',
  },
  // National League West
  {
    name: 'Los Angeles Dodgers',
    stadium: 'Dodger Stadium',
    location: 'Los Angeles, CA',
    league: 'National League',
    division: 'NL West',
    lat: 34.0739,
    lng: -118.24,
    color: mlbLeagueColors['National League'],
    detailUrl: '/mlb/dodgers',
  },
  {
    name: 'San Diego Padres',
    stadium: 'Petco Park',
    location: 'San Diego, CA',
    league: 'National League',
    division: 'NL West',
    lat: 32.7073,
    lng: -117.1566,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/padres',
  },
  {
    name: 'San Francisco Giants',
    stadium: 'Oracle Park',
    location: 'San Francisco, CA',
    league: 'National League',
    division: 'NL West',
    lat: 37.7786,
    lng: -122.3893,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/giants',
  },
  {
    name: 'Arizona Diamondbacks',
    stadium: 'Chase Field',
    location: 'Phoenix, AZ',
    league: 'National League',
    division: 'NL West',
    lat: 33.4453,
    lng: -112.0667,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/dbacks',
  },
  {
    name: 'Colorado Rockies',
    stadium: 'Coors Field',
    location: 'Denver, CO',
    league: 'National League',
    division: 'NL West',
    lat: 39.7559,
    lng: -104.9942,
    color: mlbLeagueColors['National League'],
    detailUrl: 'https://www.mlb.com/rockies',
  },
];

export let map;
export const markers = [];
// eslint-disable-next-line no-unused-vars
let selectedMarker = null;
const defaultCenter = [39.8283, -98.5795];
let defaultZoom = 4;

// For testing purposes
export function setMap(mapInstance) {
  map = mapInstance;
}

// Initialize Leaflet map
export function initMLBMap() {
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768;

  if (isMobile) {
    defaultZoom = 3;
  } else if (isTablet) {
    defaultZoom = 3.5;
  } else {
    defaultZoom = 4;
  }

  map = L.map('map').setView(defaultCenter, defaultZoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  showAllMLBTeams();

  window.addEventListener('resize', () => {
    if (map && map.invalidateSize) {
      map.invalidateSize();
    }
  });
}

// Clear markers
export function clearMLBMarkers() {
  markers.forEach(marker => {
    if (map && map.removeLayer) {
      map.removeLayer(marker);
    }
  });
  markers.length = 0;
}

function translateLeague(league) {
  const translations = window.mlbTranslations || { mlb: { leagues: {} } };
  if (league === 'American League') {
    return translations.mlb.leagues.americanLeague || league;
  } else if (league === 'National League') {
    return translations.mlb.leagues.nationalLeague || league;
  }
  return league;
}

function translateDivision(division) {
  const translations = window.mlbTranslations || { mlb: { divisions: {} } };
  const divisionMap = {
    'AL East': translations.mlb.divisions.alEast || division,
    'AL Central': translations.mlb.divisions.alCentral || division,
    'AL West': translations.mlb.divisions.alWest || division,
    'NL East': translations.mlb.divisions.nlEast || division,
    'NL Central': translations.mlb.divisions.nlCentral || division,
    'NL West': translations.mlb.divisions.nlWest || division,
  };
  return divisionMap[division] || division;
}

function translateTeamName(teamName) {
  const translations = window.mlbTranslations || { mlb: { teams: {} } };
  return translations.mlb.teams?.[teamName] || teamName;
}

function translateStadiumName(stadiumName) {
  const translations = window.mlbTranslations || { mlb: { stadiums: {} } };
  return translations.mlb.stadiums?.[stadiumName] || stadiumName;
}

function translateLocation(location) {
  const translations = window.mlbTranslations || { mlb: { locations: {} } };
  return translations.mlb.locations?.[location] || location;
}

export function getTeamLogoUrl(teamName) {
  const translations = window.mlbTranslations || { mlb: { logos: {} } };
  return translations.mlb.logos?.[teamName] || '';
}

export function createLogoImg(logoUrl, teamName, size = 'medium') {
  const sizeMap = {
    small: '32px',
    medium: '48px',
    large: '64px',
  };

  const imgSize = sizeMap[size] || sizeMap.medium;

  if (!logoUrl) {
    return '';
  }

  return `<img src="${logoUrl}" 
               alt="${teamName} logo" 
               style="width: ${imgSize}; height: ${imgSize}; object-fit: contain; border-radius: 4px; margin-right: 8px;" 
               onerror="this.style.display='none'"
               loading="lazy" />`;
}

// Add marker
export function addMLBMarker(team) {
  const position = [team.lat, team.lng];

  const isMobileDevice = window.innerWidth <= 480;
  const sizeMultiplier = isMobileDevice ? 0.8 : 1;

  const markerIcon = L.divIcon({
    html: `<div style="width: ${20 * sizeMultiplier}px; height: ${20 * sizeMultiplier}px; 
                       background: ${team.color}; border: 3px solid white; 
                       border-radius: 50%;"></div>`,
    className: 'custom-marker',
    iconSize: [20 * sizeMultiplier, 20 * sizeMultiplier],
    iconAnchor: [10 * sizeMultiplier, 10 * sizeMultiplier],
  });

  const marker = L.marker(position, {
    icon: markerIcon,
    teamData: team, // Store team data for later reference
    originalIcon: markerIcon, // Store original icon for reset
  }).addTo(map);

  const isMobileInfo = window.innerWidth <= 480;
  const minWidth = isMobileInfo ? '200px' : '300px';
  const fontSize = isMobileInfo ? '13px' : '15px';

  const translatedTeamName = translateTeamName(team.name);
  const translatedStadium = translateStadiumName(team.stadium);
  const translatedLocation = translateLocation(team.location);
  const translatedLeague = translateLeague(team.league);
  const translatedDivision = translateDivision(team.division);
  const logoUrl = getTeamLogoUrl(team.name);
  const logoImg = createLogoImg(logoUrl, translatedTeamName, 'small');

  const infoContent = `
    <div style="text-align: center; min-width: ${minWidth}; padding: 10px;">
      <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
        ${logoImg}
        <h4 style="margin: 0; color: ${team.color}; font-size: ${isMobileInfo ? '16px' : '18px'}; font-weight: 600;">
          <a href="${team.detailUrl}" target="_blank" style="color: ${team.color}; text-decoration: none;">${translatedTeamName}</a>
        </h4>
      </div>
      <p style="margin: 5px 0; font-size: ${fontSize}; font-weight: 600;"><strong>${translatedStadium}</strong></p>
      <p style="margin: 5px 0; font-size: ${fontSize};">${translatedLocation}</p>
      <p style="margin: 5px 0; font-size: ${fontSize}; color: #666;">${translatedLeague}</p>
      <p style="margin: 5px 0; font-size: ${fontSize}; color: #666;">${translatedDivision}</p>
    </div>
  `;

  marker.on('click', () => {
    marker.bindPopup(infoContent).openPopup();
  });

  markers.push(marker);
}

// Render team list
export function renderTeamList(teams) {
  const teamListElement = document.getElementById('team-list');
  if (!teamListElement) {
    return;
  }

  const translations = window.mlbTranslations || { mlb: { teamInfo: {} } };
  const listTitle = translations.mlb.teamInfo?.teams || 'Teams';
  const teamLabel = translations.mlb.teamInfo?.stadium || 'Stadium';
  const locationLabel = translations.mlb.teamInfo?.location || 'Location';

  let html = `
    <h3>${listTitle} (${teams.length})</h3>
    <div class="table-container">
      <table class="teams-table">
        <thead>
          <tr>
            <th></th>
            <th>${translations.mlb.teamInfo?.team || 'Team'}</th>
            <th>${teamLabel}</th>
            <th>${locationLabel}</th>
          </tr>
        </thead>
        <tbody>
  `;

  teams.forEach(team => {
    const translatedTeamName = translateTeamName(team.name);
    const translatedStadium = translateStadiumName(team.stadium);
    const translatedLocation = translateLocation(team.location);
    const logoUrl = getTeamLogoUrl(team.name);

    const leagueClass =
      team.league === 'American League' ? 'american-league' : 'national-league';

    html += `
      <tr class="team-row ${leagueClass}" onclick="focusOnTeam('${team.name}')">
        <td class="logo-cell">
          <img src="${logoUrl}" 
               alt="${translatedTeamName} logo" 
               class="team-logo-table" 
               style="width: 28px !important; height: 28px !important; max-width: 28px !important; max-height: 28px !important; min-width: 28px !important; min-height: 28px !important; object-fit: contain; display: block; margin: 0 auto; box-sizing: border-box;"
               onerror="this.style.display='none'" 
               loading="lazy" />
        </td>
        <td class="team-name-cell">${translatedTeamName}</td>
        <td class="stadium-cell">${translatedStadium}</td>
        <td class="location-cell">${translatedLocation}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;
  teamListElement.innerHTML = html;

  // Apply table styling after render
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      applyTableStyles(teamListElement);
    }, 100);
  }
}

// Apply comprehensive table styling
function applyTableStyles(teamListElement) {
  if (typeof window === 'undefined') {
    return;
  }
  
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  // Table container styles
  const container = teamListElement.querySelector('.table-container');
  if (container) {
    container.style.border = '2px solid #dee2e6';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
  }

  // Table styles
  const table = teamListElement.querySelector('.teams-table');
  if (table) {
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.backgroundColor = 'white';
    table.style.fontSize = isMobile ? '12px' : '14px';
  }

  // Header styles
  const thead = teamListElement.querySelector('.teams-table thead');
  if (thead) {
    thead.style.backgroundColor = '#f1f3f4';
  }

  const headers = teamListElement.querySelectorAll('.teams-table th');
  headers.forEach((header, index) => {
    header.style.borderBottom = '2px solid #dee2e6';
    header.style.borderRight =
      index < headers.length - 1 ? '1px solid #dee2e6' : 'none';
    header.style.backgroundColor = '#f1f3f4';
    header.style.padding = isMobile ? '8px 6px' : '12px 8px';
    header.style.fontWeight = '600';
    header.style.color = '#2c3e50';
    header.style.textAlign = index === 0 ? 'center' : 'left';
    header.style.fontSize = isMobile ? '12px' : '14px';

    // Hide location column on small mobile
    if (isSmallMobile && index === 3) {
      header.style.display = 'none';
    }
  });

  // Cell styles and responsive columns
  const cells = teamListElement.querySelectorAll('.teams-table td');
  cells.forEach(cell => {
    const row = cell.parentElement;
    const cellsInRow = row.querySelectorAll('td');
    const cellIndex = Array.from(cellsInRow).indexOf(cell);

    cell.style.borderBottom = '1px solid #dee2e6';
    cell.style.borderRight =
      cellIndex < cellsInRow.length - 1 ? '1px solid #dee2e6' : 'none';
    cell.style.padding = isMobile ? '8px 6px' : '10px 8px';
    cell.style.verticalAlign = 'middle';

    // Style specific cell types
    if (cellIndex === 0) {
      // Logo cell
      cell.style.textAlign = 'center';
      cell.style.width = isMobile ? '40px' : '50px';
    } else if (cellIndex === 1) {
      // Team name
      cell.style.fontWeight = '600';
      cell.style.color = '#2c3e50';
    } else if (cellIndex === 2) {
      // Stadium
      cell.style.color = '#495057';
    } else if (cellIndex === 3) {
      // Location
      cell.style.color = '#6c757d';
      cell.style.fontSize = isMobile ? '11px' : '13px';

      // Hide location column on small mobile
      if (isSmallMobile) {
        cell.style.display = 'none';
      }
    }
  });

  // Striped rows and hover effects
  const rows = teamListElement.querySelectorAll('.team-row');
  rows.forEach((row, index) => {
    if (index % 2 === 1) {
      row.style.backgroundColor = '#f8f9fa';
    }

    // Add hover effect
    row.addEventListener('mouseenter', () => {
      row.style.backgroundColor = '#e3f2fd';
    });

    row.addEventListener('mouseleave', () => {
      if (index % 2 === 1) {
        row.style.backgroundColor = '#f8f9fa';
      } else {
        row.style.backgroundColor = '';
      }
    });
  });

  // Logo sizing
  const logos = teamListElement.querySelectorAll('.team-logo-table');
  logos.forEach(logo => {
    const size = isMobile ? '24px' : '28px';
    logo.style.width = size;
    logo.style.height = size;
    logo.style.maxWidth = size;
    logo.style.maxHeight = size;
    logo.style.minWidth = size;
    logo.style.minHeight = size;
    logo.style.objectFit = 'contain';
    logo.style.display = 'block';
    logo.style.margin = '0 auto';
    logo.style.borderRadius = '4px';
  });
}

// Reset all markers to default state
function resetMarkerSelection() {
  markers.forEach(marker => {
    const originalIcon = marker.options.originalIcon;
    if (originalIcon) {
      marker.setIcon(originalIcon);
    }
    marker.setOpacity(1);
  });
  selectedMarker = null;
}

// Highlight selected marker
function highlightMarker(marker) {
  const team = marker.options.teamData;
  if (!team) {
    return;
  }

  const isMobileDevice = window.innerWidth <= 480;
  const sizeMultiplier = isMobileDevice ? 0.8 : 1;
  const highlightSize = 28 * sizeMultiplier;

  const highlightIcon = L.divIcon({
    html: `<div style="width: ${highlightSize}px; height: ${highlightSize}px; 
                       background: ${team.color}; border: 4px solid white; 
                       border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
    className: 'custom-marker highlighted',
    iconSize: [highlightSize, highlightSize],
    iconAnchor: [highlightSize / 2, highlightSize / 2],
  });

  marker.setIcon(highlightIcon);
  marker.setOpacity(1);
}


// Focus on specific team when clicked from list
export function focusOnTeam(teamName) {
  const team = mlbTeams.find(t => t.name === teamName);
  if (team && map && map.setView) {
    // Reset to default zoom and center
    map.setView(defaultCenter, defaultZoom);

    // Reset all markers
    resetMarkerSelection();

    // Find and highlight the selected team marker
    markers.forEach(marker => {
      const markerTeam = marker.options.teamData;
      if (markerTeam && markerTeam.name === teamName) {
        selectedMarker = marker;
        highlightMarker(marker);
        
        // Create and bind popup content (same as in addMLBMarker)
        const isMobileInfo = window.innerWidth <= 480;
        const minWidth = isMobileInfo ? '200px' : '300px';
        const fontSize = isMobileInfo ? '13px' : '15px';

        const translatedTeamName = translateTeamName(team.name);
        const translatedStadium = translateStadiumName(team.stadium);
        const translatedLocation = translateLocation(team.location);
        const translatedLeague = translateLeague(team.league);
        const translatedDivision = translateDivision(team.division);
        const logoUrl = getTeamLogoUrl(team.name);
        const logoImg = createLogoImg(logoUrl, translatedTeamName, 'small');

        const infoContent = `
          <div style="text-align: center; min-width: ${minWidth}; padding: 10px;">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
              ${logoImg}
              <h4 style="margin: 0; color: ${team.color}; font-size: ${isMobileInfo ? '16px' : '18px'}; font-weight: 600;">
                <a href="${team.detailUrl}" target="_blank" style="color: ${team.color}; text-decoration: none;">${translatedTeamName}</a>
              </h4>
            </div>
            <p style="margin: 5px 0; font-size: ${fontSize}; font-weight: 600;"><strong>${translatedStadium}</strong></p>
            <p style="margin: 5px 0; font-size: ${fontSize};">${translatedLocation}</p>
            <p style="margin: 5px 0; font-size: ${fontSize}; color: #666;">${translatedLeague}</p>
            <p style="margin: 5px 0; font-size: ${fontSize}; color: #666;">${translatedDivision}</p>
          </div>
        `;
        
        marker.bindPopup(infoContent).openPopup();
      } else {
        // Make other markers semi-transparent
        marker.setOpacity(0.6);
      }
    });

  }
}

// Show all teams
export function showAllMLBTeams() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  mlbTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(0);
  renderTeamList(mlbTeams);
}

// Show American League
export function showAmericanLeague() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const alTeams = mlbTeams.filter(team => team.league === 'American League');
  alTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(1);
  renderTeamList(alTeams);
}

// Show National League
export function showNationalLeague() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const nlTeams = mlbTeams.filter(team => team.league === 'National League');
  nlTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(2);
  renderTeamList(nlTeams);
}

// Show AL East
export function showALEast() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const alEastTeams = mlbTeams.filter(team => team.division === 'AL East');
  alEastTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(3);
  renderTeamList(alEastTeams);
}

// Show AL Central
export function showALCentral() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const alCentralTeams = mlbTeams.filter(
    team => team.division === 'AL Central'
  );
  alCentralTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(4);
  renderTeamList(alCentralTeams);
}

// Show AL West
export function showALWest() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const alWestTeams = mlbTeams.filter(team => team.division === 'AL West');
  alWestTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(5);
  renderTeamList(alWestTeams);
}

// Show NL East
export function showNLEast() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const nlEastTeams = mlbTeams.filter(team => team.division === 'NL East');
  nlEastTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(6);
  renderTeamList(nlEastTeams);
}

// Show NL Central
export function showNLCentral() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const nlCentralTeams = mlbTeams.filter(
    team => team.division === 'NL Central'
  );
  nlCentralTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(7);
  renderTeamList(nlCentralTeams);
}

// Show NL West
export function showNLWest() {
  clearMLBMarkers();
  selectedMarker = null; // Reset selection
  const nlWestTeams = mlbTeams.filter(team => team.division === 'NL West');
  nlWestTeams.forEach(team => {
    addMLBMarker(team);
  });
  updateMLBActiveButton(8);
  renderTeamList(nlWestTeams);
}

// Update active button
export function updateMLBActiveButton(activeIndex) {
  const buttons = document.querySelectorAll('.league-btn');
  buttons.forEach((btn, index) => {
    if (index === activeIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

if (typeof window !== 'undefined') {
  window.initMLBMap = initMLBMap;
  window.showAllMLBTeams = showAllMLBTeams;
  window.showAmericanLeague = showAmericanLeague;
  window.showNationalLeague = showNationalLeague;
  window.showALEast = showALEast;
  window.showALCentral = showALCentral;
  window.showALWest = showALWest;
  window.showNLEast = showNLEast;
  window.showNLCentral = showNLCentral;
  window.showNLWest = showNLWest;
  window.updateMLBActiveButton = updateMLBActiveButton;
  window.focusOnTeam = focusOnTeam;
  window.renderTeamList = renderTeamList;
  window.mlbTeams = mlbTeams;
}
