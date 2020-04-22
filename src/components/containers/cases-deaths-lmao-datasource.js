import { connect } from 'react-redux'
import CasesDeathsLmaoDatasource from '../charts/datasources/cases-deaths'
import { groupCasesDeathsByCountry, groupCasesDeathsByContinent, setCasesDeathsFilters } from "../actions/index"

const mapStateToProps = state => ({
  data: state.graphs.cases.data,
  filters: state.graphs.cases.filters,
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
    setFilters: (filter) => {
      dispatch(setCasesDeathsFilters(filter))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasesDeathsLmaoDatasource)