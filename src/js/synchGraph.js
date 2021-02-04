import {
  blockWrapper, wrapperMap, wrapperInfo, wrapperGraph,
} from './list-of-countries.js';

// import { myChart as myChart } from './drawDefaultGraph.js'

const resizeGraphBtn = document.querySelector('.full_window_button_graph');
const ctx = document.getElementById('myChart').getContext('2d');

let countryMemory = 'Global';
let caseMemory = 'Confirmed';
let periodMemory = false;
let unitMemory = false;
let myChart;

resizeGraphBtn.addEventListener('click', () => {
  blockWrapper.classList.toggle('hide_interface_item');
  wrapperMap.classList.toggle('hide_interface_item');
  wrapperInfo.classList.toggle('hide_interface_item');
  wrapperGraph.classList.toggle('wrapper_item-fullscreen');
});

function synchGraph(currentCountry = countryMemory, currentCase = caseMemory, currentPeriod = periodMemory, currentUnit = unitMemory) {
  if (currentCountry === 'Global') {
    return;
  }

  const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // const caseBtns = document.querySelectorAll('.list_nav_case');

  let displayCountry;

  countryMemory = currentCountry;
  caseMemory = currentCase;
  periodMemory = currentPeriod;
  unitMemory = currentUnit;

  console.log(currentCountry);
  console.log(currentCase);
  console.log(currentPeriod);
  console.log(currentUnit);

  let userCountry = currentCountry;

  let allDates = [];
  let formatedDates = [];
  let casesList = [];
  let recoveredList = [];
  let deathsList = [];

  function fetchData(country, currentCase) {
    userCountry = country;

    casesList = [],
    recoveredList = [],
    deathsList = [];
    allDates = [],
    formatedDates = [];

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const api_fetch = async (country, currentCase) => {
      switch (currentCase) {
        case 'Confirmed':
          await fetch(
            `https://api.covid19api.com/total/country/${country}/status/confirmed`, requestOptions,
          )
            .then((response) => response.json())
            .then((data) => {
              displayCountry = data[0].Country;
              data.forEach((entry) => {
                allDates.push(entry.Date);
                casesList.push(entry.Cases);
              });
              updateUI(displayCountry);
            })
            .catch((error) => console.log('error', error));
          break;
        case 'Recovered':
          await fetch(
            `https://api.covid19api.com/total/country/${country}/status/recovered`, requestOptions,
          )
            .then((response) => response.json())
            .then((data) => {
              displayCountry = data[0].Country;
              data.forEach((entry) => {
                allDates.push(entry.Date);
                recoveredList.push(entry.Cases);
              });
              updateUI(displayCountry);
            })
            .catch((error) => console.log('error', error));
          break;
        case 'Deaths':
          await fetch(
            `https://api.covid19api.com/total/country/${country}/status/deaths`, requestOptions,
          )
            .then((response) => response.json())
            .then((data) => {
              displayCountry = data[0].Country;
              data.forEach((entry) => {
                allDates.push(entry.Date);
                deathsList.push(entry.Cases);
              });
              updateUI(displayCountry);
            })
            .catch((error) => console.log('error', error));
          break;
      }
    };

    api_fetch(country, currentCase);
  }

  fetchData(userCountry, currentCase);

  function updateUI(displayCountry) {
    updateDates();
    onCountryClick(displayCountry);
  }

  function drawGraphTotal(displayCountry) {
    if (myChart != undefined) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [
          {
            label: 'Confirmed',
            data: casesList,
            fill: true,
            borderColor: '#EFF30A',
            backgroundColor: '#EFF30A',
          },
        ],
        labels: formatedDates,
      },
      // Configuration options go here
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: displayCountry,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  function drawGraphRecovered(displayCountry) {
    if (myChart != undefined) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [
          {
            label: 'Recovered',
            data: recoveredList,
            fill: true,
            borderColor: 'green',
            backgroundColor: 'green',
          },
        ],
        labels: formatedDates,
      },
      // Configuration options go here
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: displayCountry,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  function drawGraphDeaths(displayCountry) {
    if (myChart != undefined) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [
          {
            label: 'Deaths',
            data: deathsList,
            fill: true,
            borderColor: 'red',
            backgroundColor: 'red',
          },
        ],
        labels: formatedDates,
      },
      // Configuration options go here
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: displayCountry,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  function updateDates() {
    allDates.forEach((date) => formatedDates.push(formatDate(date)));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    return `${date.getDate()} ${MONTH_NAME[date.getMonth()]}`;
  }

  function onCountryClick(displayCountry) {
    switch (currentCase) {
      case 'Confirmed':
        if (myChart) {
          myChart.destroy();
        }
        drawGraphTotal(displayCountry);
        break;
      case 'Recovered':
        if (myChart) {
          myChart.destroy();
        }
        drawGraphRecovered(displayCountry);
        break;
      case 'Deaths':
        if (myChart) {
          myChart.destroy();
        }
        drawGraphDeaths(displayCountry);
        break;
      case 'Global':
        console.log('global case');
        if (myChart) {
          myChart.destroy();
        }
        drawGraphTotalByWorld();
        break;
    }
  }
}

export { synchGraph, countryMemory };
