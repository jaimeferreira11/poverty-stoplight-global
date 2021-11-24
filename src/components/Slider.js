import React from 'react'
import SbEditable from 'storyblok-react'

import './Slider.css'
import quote from '../images/icon-quotes.svg'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slideIndex: 1,
    }

    this.showSlides = this.showSlides.bind(this)
  }

  componentDidMount() {
    this.showSlides()
  }

  showSlides() {
    let i
    const slides = document.getElementsByClassName('mySlides')
    const dots = document.getElementsByClassName('dot')

    for (i = 0; i < slides.length; i += 1) {
      slides[i].style.display = 'none'
      dots[i].className = 'dot'
    }

    if (this.state.slideIndex > slides.length) {
      this.setState({ slideIndex: 1 })
    }

    dots[this.state.slideIndex - 1].className += ' dot--active'
    slides[this.state.slideIndex - 1].style.display = 'block'

    setTimeout(this.showSlides, 5000)

    this.setState({ slideIndex: this.state.slideIndex + 1 })
  }

  render() {
    return (
      <div>
        <div className='slideshow-container'>
          {this.props.content.map(el => (
            <SbEditable key={el._uid} content={el}>
              <div className='wrapper mySlides fade'>
                <div className='testimonial'>
                  <div className='col-1-6'>
                    <img src={quote} alt='' className='quote-icon--big' />
                  </div>
                  <div className='col-2-3'>
                    <div className='quote-text--big'>
                      {el.text}
                      <div className='quote-author--big'> — {el.author} </div>
                      <div className='quote-subheading--big'>{el.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </SbEditable>
          ))}
        </div>
        <br />
        <div className='slider--nav'>
          {this.props.content.map((dot, i) => (
            <span className='dot' key={`${i}-dot`} />
          ))}
        </div>
      </div>
    )
  }
}
