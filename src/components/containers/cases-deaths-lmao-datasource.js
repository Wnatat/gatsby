import { connect } from 'react-redux'
import CasesDeathsLmaoDatasource from '../charts/datasources/cases-deaths'
import { groupCasesDeathsByCountry, groupCasesDeathsByContinent } from "../actions/index"

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasesDeathsLmaoDatasource)