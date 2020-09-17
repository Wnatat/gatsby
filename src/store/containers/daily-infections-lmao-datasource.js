import { connect } from 'react-redux'
import DailyInfectionsLmaoDatasource from '../charts/datasources/daily-infections'
import { groupDailyInfectionsByCountry, groupDailyInfectionsByContinent, toggleDailyInfectionsFilter, toggleDailyInfectionsFiltersGroup, topDailyInfections } from "../actions/index"

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
    toggleFilter: (filter) => {
      dispatch(toggleDailyInfectionsFilter(filter))
    },
    toggleFiltersGroup: (group) => {
      dispatch(toggleDailyInfectionsFiltersGroup(group))
    },
    top: (data, number, dimension) => {
      dispatch(topDailyInfections(data, number, dimension))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyInfectionsLmaoDatasource)