import { drawCountries, dataByCountries, numbersSiplify } from './drawCountries.js';
import { onCLickAtControllElementsInCountriesList } from './main.js';

const periodSwitcher = document.querySelectorAll('.all-day-switcher');
const unitSwitcher = document.querySelectorAll('.absolut-switcher');
const diseasedCaseBtns = document.querySelectorAll('.case-diseased');
const recoveredCaseBtns = document.querySelectorAll('.case-recovered');
const totalByWorldCaseBtns = document.querySelectorAll('.case-world');
const deathCaseBtns = document.querySelectorAll('.case-dead');
const resizeCountriesListBtn = document.querySelector('.full_window_button_countries_list');
const blockWrapper = document.querySelector('.wrapper_cases_by_region');
const wrapperMap = document.querySelector('.map_section_wrapper');
const wrapperInfo = document.querySelector('.wrapper_info');
const wrapperGraph = document.querySelector('.wrapper_graph');
const KK = 100000;

let typeOfCase = 'item_case-diseased';
let period = false;
let unit = false;

// Switchers buttons
periodSwitcher.forEach((item) => {
  item.addEventListener('click', () => {
    periodSwitcher.forEach((item) => {
      item.classList.toggle('list_nav-switcher-active');
    });
    periodSwitcher.forEach((item) => {
      item.classList.toggle('list_nav-switcher-inactive');
    });

    if (period) {
      period = false;
      drawCountries(dataByCountries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed));
      numbersSiplify();
    } else {
      period = true;
      drawCountries(dataByCountries.sort((a, b) => b.NewConfirmed - a.NewConfirmed));
      numbersSiplify();
    }

    if (unit) {
      switchUnitCase();
    }

    onCLickAtControllElementsInCountriesList(undefined, 'Confirmed', period, unit);
    caseSwitch(typeOfCase);
  });
});

unitSwitcher.forEach((item) => {
  item.addEventListener('click', () => {
    unitSwitcher.forEach((item) => {
      item.classList.toggle('list_nav-switcher-active');
    });

    unitSwitcher.forEach((item) => {
      item.classList.toggle('list_nav-switcher-inactive');
    });

    if (unit) {
      drawCountries(dataByCountries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed));
      numbersSiplify();
      unit = false;
    } else {
      switchUnitCase();
      unit = true;
    }
    onCLickAtControllElementsInCountriesList(undefined, 'Confirmed', period, unit);
    caseSwitch(typeOfCase);
  });
});

// Cases buttons
diseasedCaseBtns.forEach((item) => {
  item.addEventListener('click', () => {
    typeOfCase = 'item_case-diseased';
    diseasedSortDraw();
    numbersSiplify();
    caseSwitch('item_case-diseased');
    onCLickAtControllElementsInCountriesList(undefined, 'Confirmed', period, unit);
    diseasedCaseBtns.forEach((item) => {
      item.classList.add('list_nav_case-active');
    });
    deathCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    recoveredCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    totalByWorldCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
  });
});

recoveredCaseBtns.forEach((item) => {
  item.addEventListener('click', () => {
    typeOfCase = 'item_case-recovered';
    recoveredSortDraw();
    numbersSiplify();
    caseSwitch('item_case-recovered');
    onCLickAtControllElementsInCountriesList(undefined, 'Recovered', period, unit);
    recoveredCaseBtns.forEach((item) => {
      item.classList.add('list_nav_case-active');
    });
    deathCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    diseasedCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    totalByWorldCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
  });
});

deathCaseBtns.forEach((item) => {
  item.addEventListener('click', () => {
    typeOfCase = 'item_case-dead';
    deadSortDraw();
    numbersSiplify();
    caseSwitch('item_case-dead');
    onCLickAtControllElementsInCountriesList(undefined, 'Deaths', period, unit);
    deathCaseBtns.forEach((item) => {
      item.classList.add('list_nav_case-active');
    });
    recoveredCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    diseasedCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    totalByWorldCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
  });
});

totalByWorldCaseBtns.forEach((item) => {
  item.addEventListener('click', () => {
    typeOfCase = 'item_case-world';
    caseSwitch('item_case-world');
    onCLickAtControllElementsInCountriesList(undefined, 'Global', period, unit);
    deathCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    recoveredCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    diseasedCaseBtns.forEach((item) => {
      item.classList.remove('list_nav_case-active');
    });
    totalByWorldCaseBtns.forEach((item) => {
      item.classList.add('list_nav_case-active');
    });
  });
});

// resizeCountriesListBtn
resizeCountriesListBtn.addEventListener('click', () => {
  blockWrapper.classList.toggle('wrapper_item-fullscreen');
  wrapperMap.classList.toggle('hide_interface_item');
  wrapperInfo.classList.toggle('hide_interface_item');
  wrapperGraph.classList.toggle('hide_interface_item');
});

// switch units function
function switchUnitCase() {
  if (period) {
    drawCountries(dataByCountries.sort((a, b) => (b.NewConfirmed * KK / b.population) - (a.NewConfirmed * KK / a.population)));
    numbersSiplify();
  } else {
    drawCountries(dataByCountries.sort((a, b) => (b.TotalConfirmed * KK / b.population) - (a.TotalConfirmed * KK / a.population)));
    numbersSiplify();
  }
}

// sort-draw functions for all case buttons
function diseasedSortDraw() {
  if (period) {
    if (unit) {
      drawCountries(dataByCountries.sort((a, b) => (b.NewConfirmed * KK / b.population) - (a.NewConfirmed * KK / a.population)));
      switchAllUnitsFromAbsTo100k();
    } else {
      drawCountries(dataByCountries.sort((a, b) => b.NewConfirmed - a.NewConfirmed));
    }
  } else if (unit) {
    drawCountries(dataByCountries.sort((a, b) => (b.TotalConfirmed * KK / b.population) - (a.TotalConfirmed * KK / a.population)));
    switchAllUnitsFromAbsTo100k();
  } else {
    drawCountries(dataByCountries.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed));
  }
}

function recoveredSortDraw() {
  if (period) {
    if (unit) {
      drawCountries(dataByCountries.sort((a, b) => (b.NewRecovered * KK / b.population) - (a.NewRecovered * KK / a.population)));
      switchAllUnitsFromAbsTo100k();
    } else {
      drawCountries(dataByCountries.sort((a, b) => b.NewRecovered - a.NewRecovered));
    }
  } else if (unit) {
    drawCountries(dataByCountries.sort((a, b) => (b.TotalRecovered * KK / b.population) - (a.TotalRecovered * KK / a.population)));
    switchAllUnitsFromAbsTo100k();
  } else {
    drawCountries(dataByCountries.sort((a, b) => b.TotalRecovered - a.TotalRecovered));
  }
}

function deadSortDraw() {
  if (period) {
    if (unit) {
      drawCountries(dataByCountries.sort((a, b) => (b.NewDeaths * KK / b.population) - (a.NewDeaths * KK / a.population)));
      switchAllUnitsFromAbsTo100k();
    } else {
      drawCountries(dataByCountries.sort((a, b) => b.NewDeaths - a.NewDeaths));
    }
  } else if (unit) {
    drawCountries(dataByCountries.sort((a, b) => (b.TotalDeaths * KK / b.population) - (a.TotalDeaths * KK / a.population)));
    switchAllUnitsFromAbsTo100k();
  } else {
    drawCountries(dataByCountries.sort((a, b) => b.TotalDeaths - a.TotalDeaths));
  }
}
// case switch function
function caseSwitch(caseClass) {
  const cases = document.querySelectorAll('.item_case');
  for (let i = 0; i < cases.length; i++) {
    if (cases[i].classList.contains(caseClass)) {
      cases[i].classList.add('item_case-active');
    } else {
      cases[i].classList.remove('item_case-active');
    }
  }
  if (caseClass === 'item_case-diseased') {
    diseasedCaseBtns[0].click();
  }
  if (caseClass === 'item_case-recovered') {
    recoveredCaseBtns[0].click();
  }
  if (caseClass === 'item_case-dead') {
    deathCaseBtns[0].click();
  }
  if (caseClass === 'item_case-world') {
    totalByWorldCaseBtns[0].click();
  }
}

// unit switch function
function switchAllUnitsFromAbsTo100k() {
  const listItems = document.querySelectorAll('.list_item');

  listItems.forEach((item) => {
    const pop = item.childNodes[0].childNodes[3].attributes[1].value;
    const diseased = parseFloat(item.childNodes[2].innerText);
    const recovered = parseFloat(item.childNodes[4].innerText);
    const dead = parseFloat(item.childNodes[6].innerText);

    item.childNodes[2].innerText = `${(diseased * KK / pop).toFixed(2)}`;
    item.childNodes[4].innerText = `${(recovered * KK / pop).toFixed(2)}`;
    item.childNodes[6].innerText = `${(dead * KK / pop).toFixed(2)}`;
  });
}

export {
  periodSwitcher, unitSwitcher, period, unit, diseasedCaseBtns, recoveredCaseBtns, deathCaseBtns, blockWrapper, wrapperMap, wrapperInfo, wrapperGraph, typeOfCase,
};
