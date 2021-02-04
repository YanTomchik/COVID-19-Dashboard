import { requestForDataOnStart } from './drawCountries.js';
import { synchGraph } from './synchGraph.js';
import { drawTableByCountries } from './drawTableByCountries.js';
import { drawDefaultGraph } from './drawDefaultGraph.js';
import { fetchDataForTotalCases } from './drawTableByWorld.js';

requestForDataOnStart();
drawDefaultGraph();
fetchDataForTotalCases();

function onCLickAtControllElementsInCountriesList(currentCountry, currentCase, currentPeriod, currentUnit) {
  synchGraph(currentCountry, currentCase, currentPeriod, currentUnit);
  drawTableByCountries(currentCountry, currentCase, currentPeriod, currentUnit);
}

export { onCLickAtControllElementsInCountriesList };
