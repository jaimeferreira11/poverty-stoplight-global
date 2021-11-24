import { combineReducers } from 'redux'

const lng = (state = 'en', action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.lng
    default:
      return state
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    default:
      return state
  }
}

const homePageVideoIndex = (state = 0, action) => {
  switch (action.type) {
    case 'SET_INDEX':
      return action.index
    default:
      return state
  }
}

const reducers = combineReducers({
  homePageVideoIndex,
  lng,
  user,
})

export default reducers
