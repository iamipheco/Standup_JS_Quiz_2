const countriesList = document.querySelector('.countries-list');
const countryDetails = document.querySelector('.country-details');
const itemsPerPage = 20;
let currentPage = 1;
let countriesData = [];

async function fetchCountries() {
  try {
    const response = await fetch('https://disease.sh/v3/covid-19/countries');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function createCountryCard(country) {
  const card = document.createElement('div');
  card.classList.add('country-card');
  card.innerHTML = `
    <img src="${country.countryInfo.flag}" alt="${country.country}">
    <h2>${country.country}</h2>
    <p>Continent: ${country.continent}</p>
  `;
  card.addEventListener('click', () => {
    displayCountryDetails(country);
  });
  return card;
}

function displayCountryDetails(country) {
  countryDetails.innerHTML = `
    <div class="country-de">
        <div id="country-pop">
            <div class="countryPopName">
                <h2>${country.country}</h2>
                <p>Population: ${country.population} People </p>
            </div>
            <div class="countryPopImages">
                <img src="${country.countryInfo.flag}" alt="${country.country}">
            </div>
        </div>
            <p>Today's Reported Cases : ${country.todayCases} People</p>
            <p>Today's Confirmed Deaths : ${country.todayDeaths} People</p>
            <p>Total Infected Cases: ${country.cases} People</p>
            <p>Total Recovered Cases: ${country.recovered} People</p>
            <p>Total Confirmed Deaths: ${country.deaths} People</p>
    </div>
  `;
}

function renderPage(page) {
  countriesList.innerHTML = '';
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageCountries = countriesData.slice(startIndex, endIndex);
  pageCountries.forEach(country => {
    const card = createCountryCard(country);
    countriesList.appendChild(card);
  });
}

function handlePaginationClick(direction) {
  if (direction === 'prev') {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
    }
  } else if (direction === 'next') {
    if (currentPage < Math.ceil(countriesData.length / itemsPerPage)) {
      currentPage++;
      renderPage(currentPage);
    }
  }
}

function updateCurrentDate() {
    const currentDateElement = document.getElementById('current-date');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    currentDateElement.textContent = formattedDate;
  }
  
  async function init() {
    updateCurrentDate();
    countriesData = await fetchCountries();
    renderPage(currentPage);
  }
  
  init();
  
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', () => {
  handlePaginationClick('prev');
});

nextButton.addEventListener('click', () => {
  handlePaginationClick('next');
});
