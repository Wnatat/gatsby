import { connect } from 'react-redux'
import CasesDeathsLmaoDatasource from '../charts/datasources/cases-deaths'
import { groupCasesDeathsByCountry, groupCasesDeathsByContinent, toggleCasesDeathsFilter, toggleCasesDeathsFiltersGroup, topCasesDeaths } from "../actions/index"

const mapStateToProps = state => ({
  data: state.graphs.cases.data,
  title: state.graphs.cases.title,
  type: state.graphs.cases.type,
})

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    groupByCountry: (data) => {
      dispatch(groupCasesDeathsByCountry(data))
    },
    groupByContinent: (data) => {
      dispatch(groupCasesDeathsByContinent(data))
    },
    toggleFilter: (filter) => {
      dispatch(toggleCasesDeathsFilter(filter))
    },
    toggleFiltersGroup: (group) => {
      dispatch(toggleCasesDeathsFiltersGroup(group))
    },
    top: (data, number, dimension) => {
      dispatch(topCasesDeaths(data, number, dimension))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasesDeathsLmaoDatasource)