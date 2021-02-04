import { countryMemory } from './synchGraph.js';

let myChart;
const caseBtns = document.querySelectorAll('.list_nav_case');

function drawDefaultGraph() {

  const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const ctx = document.getElementById('myChart').getContext('2d');

  let totalConfimedInWorldDefault = [];
  let datesInWorld = [];
  let formatedDatesInWorld = [];
  let totalRecoveredInWorld = [];
  let totalDeathInWorld = [];
  let dates = [];

  function checkCountry() {
    if (countryMemory !== 'Global') {
      return;
    }
  }

  function destroyGraph() {
    if (myChart != undefined) {
      myChart.destroy();
    }
  }

  function fetchDataForTotalCases() {
    totalConfimedInWorldDefault = [],
      datesInWorld = [],
      formatedDatesInWorld = [],
      totalRecoveredInWorld = [],
      totalDeathInWorld = [];

    fetch('https://covid19-api.org/api/timeline')
      .then((response) => response.json())
      .then((data) => {
        dates = Object.keys(data);
        dates.forEach((date) => {
          const DATA = data[date];
          totalConfimedInWorldDefault.push(DATA.total_cases);
          datesInWorld.push(DATA.last_update);
          totalRecoveredInWorld.push(DATA.total_recovered);
          totalDeathInWorld.push(DATA.total_deaths);
        });
        updateDatesByWorld();
        drawGraphTotalByWorld();
        onCaseBtnClick();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function drawGraphTotalByWorld() {
    checkCountry();
    destroyGraph();

    myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [
          {
            label: 'TotalByWorld',
            data: totalConfimedInWorldDefault,
            fill: true,
            borderColor: '#fff',
            backgroundColor: '#fff',
          },
        ],
        labels: formatedDatesInWorld,
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  function drawGraphRecoveredByWorld() {
    checkCountry();
    destroyGraph();

    myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [
          {
            label: 'TotalRecovered',
            data: totalRecoveredInWorld,
            fill: true,
            borderColor: 'green',
            backgroundColor: 'green',
          },
        ],
        labels: formatedDatesInWorld,
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  function drawGraphDeathByWorld() {
    checkCountry();
    destroyGraph();

    myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [
          {
            label: 'TotalDeath',
            data: totalDeathInWorld,
            fill: true,
            borderColor: 'red',
            backgroundColor: 'red',
          },
        ],
        labels: formatedDatesInWorld,
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  function updateDatesByWorld() {
    datesInWorld.forEach((date) => formatedDatesInWorld.push(formatDatesByWorld(date)));
  }

  function formatDatesByWorld(dateString) {
    const date = new Date(dateString);

    return `${date.getDate()} ${MONTH_NAME[date.getMonth()]}`;
  }

  function onCaseBtnClick() {
    for (let i = 0; i < caseBtns.length; i++) {
      caseBtns[i].addEventListener('click', () => {
        if (caseBtns[i].classList.contains('case-diseased')) {
          drawDefaultGraph();
        } else if (caseBtns[i].classList.contains('case-recovered')) {
          drawGraphRecoveredByWorld();
        } else if (caseBtns[i].classList.contains('case-dead')) {
          drawGraphDeathByWorld();
        }
      });
    }
  }

  fetchDataForTotalCases();

}



export { drawDefaultGraph, myChart };
