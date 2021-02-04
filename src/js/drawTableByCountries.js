import {
  blockWrapper, wrapperMap, wrapperInfo, wrapperGraph,
} from './list-of-countries.js';
import { myChart } from './drawDefaultGraph.js';

const resizeListBtn = document.querySelector('.full_window_button_list');

let countryMemory = 'Global';
let caseMemory = 'Confirmed';
let periodMemory = false;
let unitMemory = false;
let displayCountry;

resizeListBtn.addEventListener('click', () => {
  blockWrapper.classList.toggle('hide_interface_item');
  wrapperMap.classList.toggle('hide_interface_item');
  wrapperInfo.classList.toggle('wrapper_item-fullscreen');
  wrapperGraph.classList.toggle('hide_interface_item');
});

function drawTableByCountries(currentCountry = countryMemory, currentCase = caseMemory, currentPeriod = periodMemory, currentUnit = unitMemory) {
  if (currentCountry === 'Global') {
    return;
  }

  countryMemory = currentCountry;
  caseMemory = currentCase;
  periodMemory = currentPeriod;
  unitMemory = currentUnit;

  const total_cases_element = document.querySelector('.total-cases .value');
  const recovered_element = document.querySelector('.recovered .value');
  const new_confimed_element = document.querySelector('.new_confimed .value ');
  const deaths_element = document.querySelector('.deaths .value');
  const country_name_element = document.querySelector('.country .value');

  const caseBtns = document.querySelectorAll('.list_nav_case');

  let userCountry = currentCountry;

  let totalCasesList = [];
  let totalRecoveredList = [];
  let totalDeathsList = [];
  let dates = [];

  function fetchDataForCountriesInfo(country) {
    userCountry = country;

    totalCasesList = [],
    totalRecoveredList = [],
    totalDeathsList = [];
    displayCountry,

    fetch(`https://api.covid19api.com/total/country/${country}`)
      .then((response) => response.json())
      .then((data) => {
        dates = Object.keys(data);
        displayCountry = data[0].Country;
        dates.forEach((date) => {
          const DATA = data[date];
          totalCasesList.push(DATA.Confirmed);
          totalRecoveredList.push(DATA.Recovered);
          totalDeathsList.push(DATA.Deaths);
        });
        if (myChart != undefined) {
          myChart.destroy();
        }
        updateStats();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  fetchDataForCountriesInfo(userCountry);

  function updateStats() {
    const totalCases = totalCasesList[totalCasesList.length - 1];
    const lastUpdate = totalCasesList[totalCasesList.length - 1];
    const preLastUpdate = totalCasesList[totalCasesList.length - 2];
    const newConfimed = lastUpdate - preLastUpdate;
    const countryName = displayCountry;
    const totalCasesRecovered = totalRecoveredList[totalRecoveredList.length - 1];
    const totalCasesDeaths = totalDeathsList[totalDeathsList.length - 1];

    deaths_element.innerHTML = totalCasesDeaths;
    recovered_element.innerHTML = totalCasesRecovered;
    total_cases_element.innerHTML = totalCases;
    country_name_element.innerHTML = countryName;
    new_confimed_element.innerHTML = newConfimed;
  }
}

export { drawTableByCountries };
