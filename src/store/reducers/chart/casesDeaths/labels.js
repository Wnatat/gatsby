import getMaxSpread from "../max-spread"

export default (state = [], action) => {
  switch (action.type) {
    case 'SET_LABELS_CASES_DEATHS':
      return getMaxSpread(action.data)
    default:
      return state
  }
}
