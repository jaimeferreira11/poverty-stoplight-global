import moment from 'moment'
import React from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import { Link, withRouteData } from 'react-static'
import SbEditable from 'storyblok-react'

import './Home.css'

class Webinars extends React.Component {
  constructor(props) {
    super(props)

    this.playerRef = React.createRef()
    this.newsRef = React.createRef()

    this.state = {
      closePopup: false,
      margin: 0,
      left_arrow_left: 0,
      show_next: false,
      show_prev: false,
      videos: props.story.content.videos_list,
      videoIndex: props.homePageVideoIndex,
      didViewCountUp: false,
    }
  }
  setNewsSlider() {
    const { news } = this.props
    if (this.newsRef.current.offsetWidth < news.length * newsItemWidth) {
      this.setState({ show_next: true })
    }
  }
  handleNewsSlide = dir => {
    const marginDelta = dir === 'next' ? this.state.margin - newsItemWidth : this.state.margin + newsItemWidth

    this.setState({
      margin: marginDelta,
      left_arrow_left:
        dir === 'next' ? this.state.left_arrow_left + newsItemWidth : this.state.left_arrow_left - newsItemWidth,
      show_prev: marginDelta !== 0,
      show_next: -this.newsRef.current.offsetWidth - 20 <= marginDelta,
    })
  }
  render() {
    const { content } = this.props.story

    return (
      <div>
        <Helmet>
          <title>{content && content.top[0].title}</title>
        </Helmet>
        {content &&
          content.top.map(el => (
            <SbEditable key={el._uid} content={el}>
              <div
                className='hero hero--small'
                style={{
                  backgroundImage: `url(${el.image})`,
                  backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
                }}
              >
                <div className='hero__overlay' />
                <div className='wrapper'>
                  <h1 className='hero__title hero--small__title'>{el.title}</h1>
                </div>
              </div>
            </SbEditable>
          ))}

        <div className='wrapper'>
          <SbEditable key={content._uid} content={content}>
            <p className='paragraph--lead content__intro'>{content.description}</p>
          </SbEditable>
        </div>

        <div ref={this.newsRef} className='news pt-120'>
          <div className='news__wrapper' style={{ marginLeft: this.state.margin }}>
            <div className='news__init'>
              {content.events_box.map(el => (
                <SbEditable key={el._uid} content={el}>
                  {el.component === 'Section Title' ? (
                    <div className='news__init--title'>{el.text}</div>
                  ) : (
                    <Link to={`/${el.link.cached_url}`} className='button button--outline button--arrow news__button'>
                      {el.label}
                      <span className='icon-button-arrow' />
                    </Link>
                  )}
                </SbEditable>
              ))}
            </div>
            {content.events
              .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
              .map(item => (
                <a className='news__link' href={item.link.url} key={item.id}>
                  <LazyLoad height='200'>
                    <div
                      style={{
                        backgroundImage: `url(${
                          item.image
                            ? `//img2.storyblok.com/fit-in/400x300/${item.image.replace('//a.storyblok.com', '')}`
                            : ''
                        })`,
                      }}
                      className='news__item'
                    >
                      <div className='news__item__date'>{item.event_date}</div>
                      <div className='news__item__heading'>{item.title ? item.title : ''}</div>
                      <i className='icon-arrow-circle' />
                    </div>
                  </LazyLoad>
                </a>
              ))}
            {this.state.show_prev && (
              <button
                className='news__arrow news__prev'
                style={{ left: this.state.left_arrow_left }}
                onClick={() => this.handleNewsSlide('prev')}
              >
                <i className='icon-nav-arrow-l' />
              </button>
            )}
            {this.state.show_next && (
              <button className='news__arrow news__next' onClick={() => this.handleNewsSlide('next')}>
                <i className='icon-nav-arrow-r' />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(Webinars)
