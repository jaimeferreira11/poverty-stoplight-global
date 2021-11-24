import React from 'react'
import LazyLoad from 'react-lazyload'

class WhatIsPSDimension extends React.Component {
  render() {
    return (
      <div className='ps-dimension'>
        <div className='col-1-3 small'>
          <LazyLoad height='200'>
            <img src={this.props.src} alt='' className='ps-dimension__image' />
          </LazyLoad>
        </div>
        <div className='col-2-3 small'>
          <div className='ps-dimension__text'>
            <h3 className='heading--small bold'>{this.props.title}</h3>
            <p className='paragraph--sans'>{this.props.text}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default WhatIsPSDimension
