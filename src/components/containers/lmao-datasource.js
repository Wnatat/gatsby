import { connect } from 'react-redux'
import LmaoDatasource from '../charts/datasource'

const mapStateToProps = state => ({
  data: state.graphs.cases.data,
})

export default connect(mapStateToProps)(LmaoDatasource)