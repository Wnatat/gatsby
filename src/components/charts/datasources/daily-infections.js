import LmaoDatasource from "../lmao-datasource"
import { setLabelsDailyInfections, setDatasetsDailyInfections, setOptions } from '../../actions/chart'

export default class DailyInfectionsDatasource extends LmaoDatasource {
  componentWillMount() {
    this.props.dispatch(setLabelsDailyInfections(this.props.data.original))
    this.props.dispatch(setDatasetsDailyInfections(this.props.data.original))
    this.props.dispatch(setOptions(this.defaultOptions))
  }

  componentDidUpdate() {
    this.props.dispatch(setLabelsDailyInfections(this.props.data.transformed))
    this.props.dispatch(setDatasetsDailyInfections(this.props.data.original))
    this.props.dispatch(setOptions(this.defaultOptions))
  }
}