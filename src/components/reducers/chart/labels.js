import { map, maxBy } from "lodash"

export default (state = [], action) => {
  switch (action.type) {
    case 'SET_LABELS':
      const longestSpread = maxBy(action.data, (country) => country.timeline.cases.length).timeline.cases

      return map(longestSpread, 'key')
    default:
      return state
  }
}
