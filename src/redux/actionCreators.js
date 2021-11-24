export const setLanguage = lng => {
  return {
    type: 'SET_LANGUAGE',
    lng,
  }
}

export const setIndex = index => {
  return {
    type: 'SET_INDEX',
    index,
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    user,
  }
}
