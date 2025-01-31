import { map } from "lodash"

const labelColoursYaxes1 = [
  '#95FF8F',
  '#EBC64D',
  '#FF8575',
  '#955FE8',
  '#69F6FF',
]

const labelColoursYaxes2 = [
  '#96FF90',
  '#EBD798',
  '#FFCDC6',
  '#C2A9E8',
  '#BAFBFF',
]

const labelColoursYaxes3 = [
  '#E9FFE0',
  '#EADCB4',
  '#FFCDC7',
  '#D6C5E8',
  '#BAEFFF',
]

const getDatasets = (data, type, callback) => {
  let colours = labelColoursYaxes1
  let borderDash = []
  let pointStyle = 'circle'
  let showLine = true

  if (type === 'deaths') {
    colours = labelColoursYaxes2
    borderDash = [5, 10]
    pointStyle = 'rect'
    showLine = false
  } else if(type === 'recovered') {
    colours = labelColoursYaxes3
    pointStyle = 'rect'
  }

  return map(data, (country, key) => {
    return {
      label: country.country + ' ' + type,
      borderColor: colours[key],
      backgroundColor: colours[key],
      borderDash: borderDash,
      showLine: showLine,
      pointStyle: pointStyle,
      fill: false,
      data : callback(country.timeline[type]),
      yAxisID: 'y-axis-' + type,
    }
  })
}

export default getDatasets