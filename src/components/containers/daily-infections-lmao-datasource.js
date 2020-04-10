import { connect } from 'react-redux'
import DailyInfectionsLmaoDatasource from '../charts/datasources/daily-infections'
import { groupDailyInfectionsByCountry, groupDailyInfectionsByContinent } from "../actions/index"

const mapStateToProps = state => ({
  data: state.graphs.dailyInfections.data,
  title: state.graphs.dailyInfections.title,
  type: state.graphs.dailyInfections.type,
})

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    groupByCountry: (data) => {
      dispatch(groupDailyInfectionsByCountry(data))
    },
    groupByContinent: (data) => {
      dispatch(groupDailyInfectionsByContinent(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyInfectionsLmaoDatasource)