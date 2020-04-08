import normalise from "./lmao-datasource"
import labels from './chart/labels'
import datasets from './chart/datasets'
import options from './chart/options'
import filters from './chart/filters'

export default (state = {}, action) => {
  return Object.assign({}, state, {
    graphs: {
      cases: {
        data: normalise(state.graphs.cases.data, action),
        title: state.graphs.cases.title,
        filters: filters(state.graphs.cases.filters, action),
        labels: labels(state.graphs.cases.labels, action),
        datasets: datasets(state.graphs.cases.datasets, action),
        options: options(state.graphs.cases.options, action),
      },
    }
  })
}