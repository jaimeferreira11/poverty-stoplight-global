import React from 'react'

export default props => {
  const path = props.location.search.match(/path=(.*)&_storyblok=/)
    ? props.location.search.match(/path=(.*)&_storyblok=/)[1]
    : ''

  props.history.push(`/${path}`)
  return <div />
}
