import normalise from "./lmao-datasource"
import labels from './chart/labels'
import datasets from './chart/datasets'
import options from './chart/options'

export default (state = {}, action) => {
  return Object.assign({}, state, {
    graphs: {
      cases: {
        data: normalise(state.data, action),
        title: state.graphs.cases.title,
        labels: labels(state.graphs.cases.labels, action),
        datasets: datasets(state.graphs.cases.datasets, action),
        options: options(state.graphs.cases.options, action),
      },
    }
  })
}