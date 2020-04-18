import getDatasets from "../datasets"
import { map } from "lodash"

const callback = (data) => map(data, 'value')

export default (state = [], action) => {
  switch (action.type) {
    case 'SET_DATASETS_CASES':
      return getDatasets(action.data, 'cases', callback)
    case 'SET_DATASETS_DEATHS':
      return [
        ...state,
        ...getDatasets(action.data, 'deaths', callback)
      ]
    case 'SET_DATASETS_RECOVERED':
      return [
        ...state,
        ...getDatasets(action.data, 'recovered', callback)
      ]
    default:
      return state
  }
}
