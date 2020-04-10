import { connect } from 'react-redux'
import CovidChart from '../charts/covid-chart'

const mapStateToProps = state => ({
  title: state.graphs.dailyInfections.title,
  type: state.graphs.dailyInfections.type,
  labels: state.graphs.dailyInfections.labels,
  datasets: state.graphs.dailyInfections.datasets,
  options: state.graphs.dailyInfections.options,
})

export default connect(mapStateToProps)(CovidChart)