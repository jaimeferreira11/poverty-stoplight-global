import React from 'react'
import { withRouteData, Link } from 'react-static'
import showdown from 'showdown'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'
import { connect } from 'react-redux'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import SbEditable from 'storyblok-react'
import LazyLoad from 'react-lazyload'
import CountUp, { startAnimation } from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor'
import close2 from '../images/close2.svg'
import { setIndex } from '../redux/actionCreators'

import InfogrItem from '../components/InfogrItem'

import arrowWhite from '../images/link-arrow-white.svg'

import noVideo from '../images/home-hero-image-1.jpg'

import './Home.css'

const converter = new showdown.Converter()

const newsItemWidth = 410

class Home extends React.Component {
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

  componentDidMount() {
    this.setVideoPlayback()
    this.setNewsSlider()
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.videoIndex !== nextState.videoIndex) {
      this.playerRef.current.load()
      this.playerRef.current.play()
    }
  }

  onVisibilityChange = isVisible => {
    if (isVisible) {
      this.setState({ didViewCountUp: true })
    }
  }
  setVideoPlayback() {
    const { videos } = this.state

    const player = this.playerRef.current

    this.props.dispatch(setIndex(this.state.videoIndex >= videos.length - 1 ? 0 : this.state.videoIndex + 1))

    player.addEventListener('ended', () => {
      player.pause()
      this.setState({
        videoIndex: this.state.videoIndex === videos.length - 1 ? 0 : this.state.videoIndex + 1,
      })
    })

    player.play()
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

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    const { content } = this.props.story || { content: {} }
    const { news } = this.props
    const { videos, videoIndex } = this.state
    return (
      <div style={{ position: 'relative' }}>
        {!this.state.closePopup && typeof content.who_own_poverty_popup !== 'undefined' ? (
          <div className='fixedPopUp'>
            <div className='imgContainer'>
              {!!content &&
                content.who_own_poverty_popup.map(e => {
                  if (e.component === 'Image') {
                    return (
                      <SbEditable key={e._uid} content={e}>
                        <img className='popupImage' src={e.file} alt='' />
                      </SbEditable>
                    )
                  }
                })}
            </div>
            <div className='otherTextPopContainer'>
              <div className='upperText'>
                {!!content &&
                  content.who_own_poverty_popup.map(e => {
                    if (e.component === 'Paragraph') {
                      return (
                        <SbEditable key={e._uid} content={e}>
                          <div className='titlePop'>{e.text}</div>
                        </SbEditable>
                      )
                    }

                    if (e.component === 'Text') {
                      return (
                        <SbEditable key={e._uid} content={e}>
                          <div className='buttontitlePop'>{e.text}</div>
                        </SbEditable>
                      )
                    }
                  })}
              </div>

              <div className='buttonLower'>
                {!!content &&
                  content.who_own_poverty_popup.map(e => {
                    if (e.component === 'Link') {
                      return (
                        <SbEditable key={e._uid} content={e}>
                          <Link to={`/${e.link.cached_url}`} className='popContainerStuff'>
                            <div className='subtitlePop'>{e.label}</div>
                          </Link>
                        </SbEditable>
                      )
                    }
                  })}
              </div>

              <img className='closeIconPop' src={close2} alt='' onClick={() => this.setState({ closePopup: true })} />
            </div>
          </div>
        ) : null}
        <Helmet>
          <title>{content.big_hero[0].text}</title>
        </Helmet>
        <div className='home__hero'>
          <div className='video__wrapper'>
            <div className='video__overlay' />
            <video muted playsInline className='video' ref={this.playerRef} poster={videos.length ? '' : noVideo}>
              <track kind='captions' />
              <track kind='description' />
              <source src={videos.length ? videos[videoIndex].source : ''} type='video/mp4' />
            </video>
          </div>
          <div className='wrapper wrapper--text'>
            <div className='video__text'>
              {content.big_hero.map(el => (
                <SbEditable key={el._uid} content={el}>
                  {el.component === 'Page Title' ? (
                    <h1 className='bold heading--video'>{el.text}</h1>
                  ) : (
                    <h2 className='subheading--video'>{el.text}</h2>
                  )}
                </SbEditable>
              ))}
            </div>
          </div>
        </div>

        <div className='wrapper'>
          <div className='video-button__holder'>
            <SbEditable content={content.links[0]}>
              <a href='#1' className='video-button video-button--red'>
                {content.links[0].text || 'What is Poverty Stoplight?'}
                <LazyLoad height='200'>
                  <img className='video-button__arrow' src={arrowWhite} alt='' />
                </LazyLoad>
              </a>
            </SbEditable>
            <SbEditable content={content.links[1]}>
              <a href='#2' className='video-button video-button--yellow'>
                {content.links[1].text || 'Our Mission'}
                <LazyLoad height='200'>
                  <img className='video-button__arrow' src={arrowWhite} alt='' />
                </LazyLoad>
              </a>
            </SbEditable>
            <SbEditable content={content.links[2]}>
              <a href='#3' className='video-button video-button--green'>
                {content.links[2].text || 'In The News'}
                <LazyLoad height='200'>
                  <img className='video-button__arrow' src={arrowWhite} alt='' />
                </LazyLoad>
              </a>
            </SbEditable>
          </div>
        </div>
        <div className='wrapper' id='1'>
          <div className='col-2-3 mt-120 mb-100'>
            {content.infographic_section.map(el => {
              switch (el.component) {
                case 'Section Title':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <h2 className='bold heading--big heading--green'>{el.text}</h2>
                    </SbEditable>
                  )

                case 'Rich Text':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <div
                        className='paragraph--lead rich-text'
                        dangerouslySetInnerHTML={{
                          __html: converter.makeHtml(el.markdown),
                        }}
                      />
                    </SbEditable>
                  )

                default:
                  return ''
              }
            })}
          </div>
        </div>

        <section className='infogr background--gray'>
          <div className='wrapper infogr__wrapper'>
            {content.infograpic.map((el, i) => (
              <SbEditable key={el._uid} content={el}>
                <InfogrItem src={el.image} number={i + 1} p={el.text} />
              </SbEditable>
            ))}
          </div>
          <div className='wrapper'>
            <div className='line' />
          </div>
          <div className='wrapper'>
            <div className='col-1-2'>
              {content.mission_section.map(el => {
                switch (el.component) {
                  case 'External Video':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div
                          className='mission__video'
                          dangerouslySetInnerHTML={{
                            __html: el.source,
                          }}
                        />
                      </SbEditable>
                    )
                  default:
                    return ''
                }
              })}
            </div>
            <div className='col-1-2 pb-120'>
              {content.mission_section.map(el => {
                switch (el.component) {
                  case 'Lead Paragraph':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='paragraph--lead'>{el.text}</div>
                      </SbEditable>
                    )

                  case 'Rich Text':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div
                          className='paragraph--sans rich-text'
                          dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(el.markdown),
                          }}
                        />
                      </SbEditable>
                    )

                  case 'Link':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <Link to={`/${el.link.cached_url}`} className='button button--outline button--arrow'>
                          {el.label}
                          <span className='icon-button-arrow' />
                        </Link>
                      </SbEditable>
                    )

                  default:
                    return ''
                }
              })}
            </div>
          </div>
        </section>
        <section className='wrapper'>
          <VisibilitySensor
            onChange={this.onVisibilityChange}
            offset={{
              top: 50,
            }}
            delayedCall
          >
            <div className='counter_wrapper'>
              {content.counter.map(el => {
                switch (el.component) {
                  case 'Section Title':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='counter_title'>
                          <h2 className='bold heading--big'>{el.text}</h2>
                        </div>
                      </SbEditable>
                    )
                  case 'CounterItem':
                    return (
                      <div key={el._uid} className='counter'>
                        <SbEditable content={el}>
                          <LazyLoad height='100'>
                            <img
                              className='counter_image'
                              src={`//img2.storyblok.com/fit-in/0x500/${el.image.replace('//a.storyblok.com', '')}`}
                              alt=''
                            />
                          </LazyLoad>

                          <h2 className='bold heading--big heading--green'>
                            <CountUp
                              prefix={el.prefix}
                              separator=','
                              duration={el.value > 100 ? 2 : 4}
                              end={this.state.didViewCountUp ? el.value : 0}
                            />
                          </h2>

                          <h2 className='counter_description'>{el.description}</h2>
                        </SbEditable>
                      </div>
                    )
                }
              })}
            </div>
          </VisibilitySensor>

          <div className='wrapper'>
            <div className='line' />
          </div>
        </section>
        <div className='vision' id='2'>
          <div className='wrapper'>
            <div className='vision_text col-1-2'>
              {content.vision_section.map(el => {
                switch (el.component) {
                  case 'Section Title':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <h2 className='bold heading--big'>{el.text}</h2>
                      </SbEditable>
                    )

                  case 'Rich Text':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div
                          className='paragraph--lead rich-text'
                          dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(el.markdown),
                          }}
                        />
                      </SbEditable>
                    )

                  case 'Link':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <Link to={`/${el.link.cached_url}`} className='button button--outline button--arrow'>
                          {el.label}
                          <span className='icon-button-arrow' />
                        </Link>
                      </SbEditable>
                    )
                  default:
                    return ''
                }
              })}
            </div>
            <div className='vision_animation'>
              <ParallaxProvider>
                <Parallax offsetYMin={-80} offsetYMax={40} slowerScrollRate>
                  <SbEditable content={content.vision_section[3]}>
                    <LazyLoad height='200'>
                      <div
                        className='circle1'
                        style={{
                          backgroundImage: `url(//img2.storyblok.com/fit-in/500x500${content.vision_section[3].file.replace(
                            '//a.storyblok.com',
                            ''
                          )})`,
                        }}
                      />
                    </LazyLoad>

                    <div className='circle1--overlay' />
                  </SbEditable>
                </Parallax>
                <Parallax offsetYMin={-20} offsetYMax={30} slowerScrollRate>
                  <SbEditable content={content.vision_section[4]}>
                    <LazyLoad height='200'>
                      <div
                        className='circle2'
                        style={{
                          backgroundImage: `url(//img2.storyblok.com/fit-in/500x500${content.vision_section[4].file.replace(
                            '//a.storyblok.com',
                            ''
                          )})`,
                        }}
                      />
                    </LazyLoad>
                    <div className='circle2--overlay' />
                  </SbEditable>
                </Parallax>
                <Parallax offsetYMin={-120} offsetYMax={20} slowerScrollRate>
                  <SbEditable content={content.vision_section[5]}>
                    <LazyLoad height='200'>
                      <div
                        className='circle3'
                        style={{
                          backgroundImage: `url(//img2.storyblok.com/fit-in/500x500${content.vision_section[5].file.replace(
                            '//a.storyblok.com',
                            ''
                          )})`,
                        }}
                      />
                    </LazyLoad>
                    <div className='circle3--overlay' />
                  </SbEditable>
                </Parallax>
              </ParallaxProvider>
            </div>
          </div>
        </div>
        <section id='3' className='background--gray'>
          <div ref={this.newsRef} className='news pt-120'>
            <div className='news__wrapper' style={{ marginLeft: this.state.margin }}>
              <div className='news__init'>
                {content.news_box.map(el => (
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
              {news
                .sort((a, b) => new Date(b.content.date) - new Date(a.content.date))
                .map(item => (
                  <Link className='news__link' to={`/${item.full_slug}`} key={item.id}>
                    <LazyLoad height='200'>
                      <div
                        style={{
                          backgroundImage: `url(${
                            item.content.top
                              ? `//img2.storyblok.com/fit-in/400x300/${item.content.top[0].image.replace(
                                  '//a.storyblok.com',
                                  ''
                                )}`
                              : ''
                          })`,
                        }}
                        className='news__item'
                      >
                        <div className='news__item__date'>{moment(item.content.date).format('ll')}</div>
                        <div className='news__item__heading'>{item.content.top ? item.content.top[0].title : ''}</div>
                        <i className='icon-arrow-circle' />
                      </div>
                    </LazyLoad>
                  </Link>
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
        </section>

        <div className='cta__holder'>
          <div className='wrapper cta_contentholder'>
            {content.subscribe_form.map(el => (
              <SbEditable key={el._uid} content={el}>
                {el.component === 'Section Title' ? (
                  <p className='cta__heading'>{el.text}</p>
                ) : (
                  <div
                    className='cta__subheading rich-text'
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(el.markdown),
                    }}
                  />
                )}
              </SbEditable>
            ))}
            <form
              action='https://fundacionparaguaya.us9.list-manage.com/subscribe/post?u=cd2ed2a0c81236afcca73da2d&amp;id=149f7ccf90'
              method='post'
              id='mc-embedded-subscribe-form'
              name='mc-embedded-subscribe-form'
              target='_blank'
              noValidate
              className='subscribe-box'
            >
              {content.subscribe_form
                .filter(el => el.component === 'Subscribe Form Labels')
                .map(el => (
                  <SbEditable key={el._uid} content={el}>
                    <input
                      type='email'
                      name='EMAIL'
                      className='subscribe-box__item subscribe-box__input'
                      id='mce-EMAIL'
                      placeholder={el.email}
                    />
                    <input
                      id='mc-embedded-subscribe'
                      type='submit'
                      value={el.subscribe}
                      className='button button--green subscribe-box__item subscribe-box__button'
                    />
                  </SbEditable>
                ))}
            </form>
          </div>

          <div className='cta__imageholder'>
            {content.subscribe_form.map(el => (
              <SbEditable key={el._uid} content={el}>
                {el.file ? (
                  <LazyLoad height='200'>
                    <img
                      src={`//img2.storyblok.com/fit-in/0x500/${el.file.replace('//a.storyblok.com', '')}`}
                      alt=''
                      className='cta__image'
                    />
                  </LazyLoad>
                ) : (
                  <div />
                )}
              </SbEditable>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(
  connect(({ homePageVideoIndex }) => ({
    homePageVideoIndex,
  }))(Home)
)
