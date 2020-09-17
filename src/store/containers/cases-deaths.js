import { connect } from 'react-redux'
import CovidChart from '../charts/covid-chart'

const mapStateToProps = state => ({
  title: state.graphs.cases.title,
  type: state.graphs.cases.type,
  labels: state.graphs.cases.labels,
  datasets: state.graphs.cases.datasets,
  options: state.graphs.cases.options,
})

export default connect(mapStateToProps)(CovidChart)