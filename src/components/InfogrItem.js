import React from 'react'
import LazyLoad from 'react-lazyload'
import pin from '../images/pin.svg'

// import ScrollAnimation from 'react-animate-on-scroll'
// import 'animate.css'

export default props => (
  <div>
    {/* <ScrollAnimation
      // animateIn="fadeInUp"
      // delay={this.props.delay}
      // animateOnce
      // offset={500}
    > */}
    <div className='infogr__item'>
      <div className='infogr__number'>{props.number}</div>
      <LazyLoad height='200'>
        <img className='infogr__pin' src={pin} alt='' />
        <img className='infogr__image' src={props.src} alt='' />
      </LazyLoad>
      <p className='infogr__paragraph'>{props.p}</p>
    </div>
    {/* </ScrollAnimation> */}
  </div>
)
