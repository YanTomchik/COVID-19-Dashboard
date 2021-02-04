const totalConfimedInWorld = [];
const newConfimedInWorld = [];
const totalRecoveredInWorld = [];
const totalDeathsInWorld = [];
let dates = [];

const total_cases_element_world = document.querySelector('.total-cases .value');
const recovered_element_world = document.querySelector('.recovered .value');
const new_confimed_element_world = document.querySelector('.new_confimed .value ');
const deaths_element_world = document.querySelector('.deaths .value');

function fetchDataForTotalCases() {
  fetch('https://api.covid19api.com/summary')
    .then((response) => response.json())
    .then((data) => {
      dates = Object.keys(data);
      dates.forEach((date) => {
        const DATA = data[date];
        totalConfimedInWorld.push(DATA.TotalConfirmed);
        newConfimedInWorld.push(DATA.NewConfirmed);
        totalRecoveredInWorld.push(DATA.TotalRecovered);
        totalDeathsInWorld.push(DATA.TotalDeaths);
        updateStatsByWorld();
      });
    });
}

function updateStatsByWorld() {
  const totalCasesInWorld = totalConfimedInWorld[1];
  const newConfimedCasesInWorld = newConfimedInWorld[1];
  const totalCasesRecoveredInWorld = totalRecoveredInWorld[1];
  const totalCasesDeathsInWorld = totalDeathsInWorld[1];

  deaths_element_world.innerHTML = totalCasesDeathsInWorld;
  recovered_element_world.innerHTML = totalCasesRecoveredInWorld;
  total_cases_element_world.innerHTML = totalCasesInWorld;
  new_confimed_element_world.innerHTML = newConfimedCasesInWorld;
}

export { fetchDataForTotalCases };
// fetchDataForTotalCases();
