import normalise from "./lmao-datasource"
import casesDeathsLabels from './chart/casesDeaths/labels'
import dailyInfectionsLabels from './chart/dailyInfections/labels'
import casesDeathsDatasets from './chart/casesDeaths/datasets'
import dailyInfectionsDatasets from './chart/dailyInfections/datasets'
import options from './chart/options'


export default (state = {}, action) => {
  return Object.assign({}, state, {
    graphs: {
      cases: {
        data: normalise(state.graphs.cases.data, action),
        title: state.graphs.cases.title,
        type: state.graphs.cases.type,
        labels: casesDeathsLabels(state.graphs.cases.labels, action),
        datasets: casesDeathsDatasets(state.graphs.cases.datasets, action),
        options: options(state.graphs.cases.options, action),
      },
      dailyInfections: {
        data: normalise(state.graphs.dailyInfections.data, action),
        title: state.graphs.dailyInfections.title,
        type: state.graphs.dailyInfections.type,
        labels: dailyInfectionsLabels(state.graphs.dailyInfections.labels, action),
        datasets: dailyInfectionsDatasets(state.graphs.dailyInfections.datasets, action),
        options: options(state.graphs.dailyInfections.options, action),
      },
    }
  })
}