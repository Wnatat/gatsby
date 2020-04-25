import { map, maxBy } from "lodash"

export default (data) => {
  return data.length === 0 ?
    [] :
    map(
      maxBy(data, (country) => country.timeline.cases.length).timeline.cases,
      'key'
    )
}