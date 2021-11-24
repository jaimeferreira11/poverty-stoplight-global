import React from 'react'
import { withRouteData } from 'react-static'
import './ComingSoon.css'

export default withRouteData(props => {
  const { content } = props.story

  return (
    <div className='page__wrapper'>
      <h1>{content.title || 'Coming Soon'}</h1>
      <h2>{content.subtitle || 'The website is currently under construction'}</h2>
    </div>
  )
})
