import {
  blockWrapper, wrapperMap, wrapperInfo, wrapperGraph,
} from './list-of-countries.js';

const resizeMapBtn = document.querySelector('.full_window_button_map');
const smallNumber = document.querySelector('.small');
const mediumNumber = document.querySelector('.medium');
const higheNumber = document.querySelector('.highe');

// Code from https://coderlessons.com/tutorials/veb-razrabotka/uznaite-leafletjs/leafletjs-kratkoe-rukovodstvo

// Creating map options
const mapOptions = {
  center: [17.385044, 78.486671],
  zoom: 2,
};
const map = new L.map('map', mapOptions); // Creating a map object
// Creating a Layer object
const layer = new L.TileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer); // Adding layer to the map
const layerGroup = L.layerGroup().addTo(map);
// End of stolen code =)

// resizeMapBtn
resizeMapBtn.addEventListener('click', () => {
  blockWrapper.classList.toggle('hide_interface_item');
  wrapperMap.classList.toggle('wrapper_item-fullscreen');
  wrapperInfo.classList.toggle('hide_interface_item');
  wrapperGraph.classList.toggle('hide_interface_item');
});

// draw map
function drawMap(arr, unit, period, typeOfCase) {
  layerGroup.clearLayers();
  arr.forEach((item) => {
    const displayValue = setDisplayValue(item, unit, period, typeOfCase);
    const marker = (L.marker(item.latlng, {
      country: `${item.Country}`,
      title: `${item.Country}\n${displayValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}`,
      icon: L.icon({
        iconUrl: setIconURL(typeOfCase),
        iconSize: setCircleRadius(displayValue, typeOfCase, unit, period),
      }),
    })).addEventListener('click', onClickAtMapItem).addTo(layerGroup);
  });
}

function onClickAtMapItem(event) {
  const listOfCountriesItems = document.querySelectorAll('.list_item');
  const currentTargetName = event.target.options.country;

  listOfCountriesItems.forEach((item) => {
    if (item.childNodes[0].childNodes[3].innerText === currentTargetName) {
      item.click();
    }
  });
}

function setDisplayValue(item, unit, period, typeOfCase) {
  let displayValue;

  if (period) {
    switch (typeOfCase) {
      case 'item_case-diseased':
        displayValue = item.NewConfirmed;
        break;
      case 'item_case-recovered':
        displayValue = item.NewRecovered;
        break;
      case 'item_case-dead':
        displayValue = item.NewDeaths;
        break;
    }
  } else {
    switch (typeOfCase) {
      case 'item_case-diseased':
        displayValue = item.TotalConfirmed;
        break;
      case 'item_case-recovered':
        displayValue = item.TotalRecovered;
        break;
      case 'item_case-dead':
        displayValue = item.TotalDeaths;
        break;
    }
  }

  if (unit) {
    displayValue = displayValue * 100000 / item.population;
  }

  return displayValue;
}

function setIconURL(typeOfCase) {
  switch (typeOfCase) {
    case 'item_case-diseased':
      return './assets/icons/yellow_circle.png';
    case 'item_case-recovered':
      return './assets/icons/green_circle.png';
    case 'item_case-dead':
      return './assets/icons/red_circle.png';
  }
}

function setCircleRadius(displayValue, typeOfCase, unit, period) {
  let divider;

  if (period) {
    if (unit) {
      divider = 50;
      if (typeOfCase === 'item_case-dead') {
        divider = 1.5;
      }
    } else {
      divider = 15000;
      if (typeOfCase === 'item_case-dead') {
        divider = 500;
      }
    }
  } else if (unit) {
    divider = 5000;
    if (typeOfCase === 'item_case-dead') {
      divider = 50;
    }
  } else {
    divider = 1000000;
    if (typeOfCase === 'item_case-dead') {
      divider = 50000;
    }
  }

  smallNumber.childNodes[3].innerText = `${divider * 7.5 / 30} and below`;
  mediumNumber.childNodes[3].innerText = `${divider}`;
  higheNumber.childNodes[2].innerText = `${divider * 2} and abowe`;

  displayValue = (displayValue / divider) * 30;
  if (displayValue > 65) {
    return [65, 65];
  } if (displayValue === 0) {
    return [0, 0];
  } if (displayValue < 7.5) {
    return [7.5, 7.5];
  }

  return [displayValue, displayValue];
}

export { map, drawMap };
