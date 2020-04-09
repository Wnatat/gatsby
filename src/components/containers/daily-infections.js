import { connect } from 'react-redux'
import CovidChart from '../charts/covid-chart'

const mapStateToProps = state => ({
  title: state.graphs.dailyNewInfections.title,
  labels: state.graphs.dailyNewInfections.labels,
  datasets: state.graphs.dailyNewInfections.datasets,
  options: state.graphs.dailyNewInfections.options,
})

export default connect(mapStateToProps)(CovidChart)