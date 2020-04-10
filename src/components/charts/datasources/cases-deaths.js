import LmaoDatasource from "../lmao-datasource"
import { setLabelsCasesDeaths, setDatasetsCases, setDatasetsDeaths, setOptions } from '../../actions/chart'

export default class CasesDeathsDatasource extends LmaoDatasource {
  componentWillMount() {
    this.props.dispatch(setLabelsCasesDeaths(this.props.data.original))
    this.props.dispatch(setDatasetsCases(this.props.data.original))
    this.props.dispatch(setDatasetsDeaths(this.props.data.original))
    this.props.dispatch(setOptions(this.defaultOptions))
  }

  componentDidUpdate() {
    this.props.dispatch(setLabelsCasesDeaths(this.props.data.transformed))
    this.props.dispatch(setDatasetsCases(this.props.data.transformed))
    this.props.dispatch(setDatasetsDeaths(this.props.data.transformed))
    this.props.dispatch(setOptions(this.defaultOptions))
  }
}