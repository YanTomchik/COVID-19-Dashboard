"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawDefaultGraph = drawDefaultGraph;
exports.myChart = void 0;

var _synchGraph = require("./synchGraph.js");

var myChart;
exports.myChart = myChart;
var caseBtns = document.querySelectorAll('.list_nav_case');

function drawDefaultGraph() {
  var MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var ctx = document.getElementById('myChart').getContext('2d');
  var totalConfimedInWorldDefault = [];
  var datesInWorld = [];
  var formatedDatesInWorld = [];
  var totalRecoveredInWorld = [];
  var totalDeathInWorld = [];
  var dates = [];

  function checkCountry() {
    if (_synchGraph.countryMemory !== 'Global') {
      return;
    }
  }

  function destroyGraph() {
    if (myChart != undefined) {
      myChart.destroy();
    }
  }

  function fetchDataForTotalCases() {
    totalConfimedInWorldDefault = [], datesInWorld = [], formatedDatesInWorld = [], totalRecoveredInWorld = [], totalDeathInWorld = [];
    fetch('https://covid19-api.org/api/timeline').then(function (response) {
      return response.json();
    }).then(function (data) {
      dates = Object.keys(data);
      dates.forEach(function (date) {
        var DATA = data[date];
        totalConfimedInWorldDefault.push(DATA.total_cases);
        datesInWorld.push(DATA.last_update);
        totalRecoveredInWorld.push(DATA.total_recovered);
        totalDeathInWorld.push(DATA.total_deaths);
      });
      updateDatesByWorld();
      drawGraphTotalByWorld();
      onCaseBtnClick();
    })["catch"](function (err) {
      console.error(err);
    });
  }

  function drawGraphTotalByWorld() {
    checkCountry();
    destroyGraph();
    exports.myChart = myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [{
          label: 'TotalByWorld',
          data: totalConfimedInWorldDefault,
          fill: true,
          borderColor: '#fff',
          backgroundColor: '#fff'
        }],
        labels: formatedDatesInWorld
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  function drawGraphRecoveredByWorld() {
    checkCountry();
    destroyGraph();
    exports.myChart = myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [{
          label: 'TotalRecovered',
          data: totalRecoveredInWorld,
          fill: true,
          borderColor: 'green',
          backgroundColor: 'green'
        }],
        labels: formatedDatesInWorld
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  function drawGraphDeathByWorld() {
    checkCountry();
    destroyGraph();
    exports.myChart = myChart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        datasets: [{
          label: 'TotalDeath',
          data: totalDeathInWorld,
          fill: true,
          borderColor: 'red',
          backgroundColor: 'red'
        }],
        labels: formatedDatesInWorld
      },
      // Configuration options go here
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  function updateDatesByWorld() {
    datesInWorld.forEach(function (date) {
      return formatedDatesInWorld.push(formatDatesByWorld(date));
    });
  }

  function formatDatesByWorld(dateString) {
    var date = new Date(dateString);
    return "".concat(date.getDate(), " ").concat(MONTH_NAME[date.getMonth()]);
  }

  function onCaseBtnClick() {
    var _loop = function _loop(i) {
      caseBtns[i].addEventListener('click', function () {
        if (caseBtns[i].classList.contains('case-diseased')) {
          drawDefaultGraph();
        } else if (caseBtns[i].classList.contains('case-recovered')) {
          drawGraphRecoveredByWorld();
        } else if (caseBtns[i].classList.contains('case-dead')) {
          drawGraphDeathByWorld();
        }
      });
    };

    for (var i = 0; i < caseBtns.length; i++) {
      _loop(i);
    }
  }

  fetchDataForTotalCases();
}