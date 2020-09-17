import getDatasets from "../datasets"

const callback = (data) => {
  const returned = []
  for (let i = 0; i < data.length; i++) {
    let previousValue = data[i - 1] == null ? data[i].value : data[i - 1].value
    returned.push(data[i].value - previousValue)
  }

  return returned
}

export default (state = [], action) => {
  switch (action.type) {
    case 'SET_DATASETS_DAILY_INFECTIONS':
      return getDatasets(action.data, 'cases', callback)
    default:
      return state
  }
}
