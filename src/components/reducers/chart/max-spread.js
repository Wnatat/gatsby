import { map, maxBy } from "lodash"

export default (data) => {
  return map(
    maxBy(data, (country) => country.timeline.cases.length).timeline.cases,
    'key'
  )
}