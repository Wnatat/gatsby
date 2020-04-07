export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_OPTIONS':
      return Object.assign({}, action.options, state)
    default:
      return state
  }
}
