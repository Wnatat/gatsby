import { connect } from 'react-redux'
import LmaoDatasource from '../charts/datasource'
import { groupByCountry, groupByContinent } from "../actions/index"

const mapStateToProps = state => ({
  data: state.graphs.cases.data,
})

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    groupByCountry: (data) => {
      dispatch(groupByCountry(data))
    },
    groupByContinent: (data) => {
      dispatch(groupByContinent(data))
      // dispatch(setLabels(data))
      // dispatch(setDatasetsCases(data))
      // dispatch(setDatasetsDeaths(data))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LmaoDatasource)