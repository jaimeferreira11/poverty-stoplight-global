import React from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import { Link, withRouteData } from 'react-static'
import SbEditable from 'storyblok-react'

import './Impact.css'
import BlogComponent from '../components/BlogComponent'
import Map from '../components/Map'
import Slider from '../components/Slider.js'
import SuccessStory from '../components/SuccessStory.js'
import arrow from '../images/arrow-green.svg'
import world from '../images/world-img.svg'

const successWidth = 390 // success story item width

class Impact extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      successWrapperWidth: '1000%',
      margin: 0,
      visibleItems: 3,
    }

    this.moveSuccessSlider = this.moveSuccessSlider.bind(this)
  }

  componentWillMount() {
    this.setState({
      successWidth: this.props.story.content.success_stories.length * successWidth,
    })
  }

  componentDidMount() {
    this.calculateVisibleItems()
  }

  calculateVisibleItems() {
    this.setState({
      visibleItems: Math.floor((this.refs.success_wrapper.offsetWidth + 30) / successWidth),
    })
  }

  moveSuccessSlider(dir) {
    this.setState({
      margin: dir === 'left' ? this.state.margin - successWidth : this.state.margin + successWidth,
    })
  }

  render() {
    const { content } = this.props.story
    const { visibleItems, successWrapperWidth, margin } = this.state
    const successStories = this.props.studies
    console.log(content)
    return (
      <div>
        <Helmet>
          <title>{content && content.top[0].title}</title>
        </Helmet>
        {content &&
          content.top.map(el => (
            <div
              className='hero hero--small'
              key={el._uid}
              style={{
                backgroundImage: `url(${el.image})`,
                backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
              }}
            >
              <div className='hero__overlay' />
              <div className='wrapper'>
                <SbEditable content={el}>
                  <h1 className='hero__title hero--small__title'>{el.title}</h1>
                </SbEditable>
              </div>
            </div>
          ))}
        <div className='px-5 -mt-8 md:-mt-16'>
          <Map height='600px' content={content} />
        </div>

        <div className='px-5'>
          <div className='flex flex-col items-start justify-start w-full max-w-6xl m-auto my-16 md:my-24 md:items-center md:flex-row'>
            <div className='flex flex-col mb-4 md:mb-0'>
              {content &&
                content.dashboard_section &&
                content.dashboard_section.map(el => {
                  if (el.component == 'Section Title') {
                    return (
                      <SbEditable content={el}>
                        <h2 className='bold heading--big'>{el.text}</h2>
                      </SbEditable>
                    )
                  }
                })}
              {content &&
                content.dashboard_section &&
                content.dashboard_section.map(el => {
                  if (el.component == 'Lead Paragraph') {
                    return (
                      <SbEditable content={el}>
                        <div className='paragraph--lead rich-text'>{el.text}</div>
                      </SbEditable>
                    )
                  }
                })}
            </div>

            {/* <div
            className='paragraph--sans rich-text'
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(el.markdown),
            }}
          /> */}
            {content &&
              content.dashboard_section &&
              content.dashboard_section.map(el => {
                if (el.component == 'Button') {
                  return (
                    <SbEditable content={el}>
                      <a href={el.link} className='flex h-16 md:ml-auto button button--outline button--arrow'>
                        {el.label}
                        <span className='icon-button-arrow' />
                      </a>
                    </SbEditable>
                  )
                }
              })}
          </div>
        </div>

        <div className='intro'>
          <div className='wrapper'>
            <div className='col-1-2'>
              <div className='intro__left'>
                {content &&
                  content.info_section &&
                  content.info_section.map(el => (
                    <SbEditable key={el._uid} content={el}>
                      {el.component === 'Section Title' ? (
                        <h2 className='bold heading--big'>{el.text}</h2>
                      ) : (
                        <div className='intro__item'>
                          <img className='intro__arrow' src={arrow} alt='' />
                          <p className='intro__number'>{el.numbers}</p>
                          <p className='paragraph--sans intro__text'>{el.info}</p>
                        </div>
                      )}
                    </SbEditable>
                  ))}
              </div>
            </div>
            <div className='col-1-2'>
              <LazyLoad height='200'>
                <img className='intro__map' src={world} alt='' />
              </LazyLoad>
              <div className='intro__right'>
                {content.map_section.map(el => (
                  <SbEditable key={el._uid} content={el}>
                    {el.component === 'Section Title' ? (
                      <p className='intro__number'>{el.text}</p>
                    ) : (
                      <p className='paragraph--sans'>{el.text}</p>
                    )}
                  </SbEditable>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='wrapper learn-more__wrapper'>
          <div className='learn-more'>
            {content.learn_more_section.map(el => {
              switch (el.component) {
                case 'Section Title':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <p className='heading--small'>{el.text}</p>
                    </SbEditable>
                  )
                case 'Lead Paragraph':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <p className='paragraph--sans'>{el.text}</p>
                    </SbEditable>
                  )
                case 'Link':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <Link to={`/${el.link.cached_url}`} className='button button--outline'>
                        {el.label}
                      </Link>
                    </SbEditable>
                  )
                default:
                  return ''
              }
            })}
          </div>
        </div>
        <div className='background--gray success'>
          <div className='wrapper wrapper--overflow'>
            {!!content.success_stories_title && !!content.success_stories_title.length && (
              <SbEditable content={content.success_stories_title[0]}>
                <h1 className='header--big'>{content.success_stories_title[0].text || 'Success Stories'}</h1>
              </SbEditable>
            )}
            <div className='success__wrapper' ref='success_wrapper'>
              <div
                className='success_stories'
                style={{
                  width: successWrapperWidth,
                  marginLeft: margin,
                }}
              >
                {successStories.map(el => (
                  <div className='success__story--wrapper' key={el.id}>
                    <SbEditable content={el}>
                      <SuccessStory
                        title={el.name}
                        read_more={content.success_stories_read_more[0]}
                        link={`/${el.full_slug}`}
                        image={el.content.top[0].image}
                        text={`${el.content.content[0].markdown.substr(0, 150)}...`}
                      />
                    </SbEditable>
                  </div>
                ))}
              </div>
            </div>
            {successStories.length > visibleItems ? (
              <div className='success__nav'>
                <button
                  role='none'
                  className={`icon-nav-arrow-l success__arrow ${margin >= 0 ? 'disabled' : ''}`}
                  onClick={() => this.moveSuccessSlider('right')}
                />

                <button
                  role='none'
                  className={`icon-nav-arrow-r success__arrow ${
                    margin <= -(successStories.length * successWidth - successWidth * visibleItems) ? 'disabled' : ''
                  }`}
                  onClick={() => this.moveSuccessSlider('left')}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='testimonials'>
          <div className='wrapper'>
            {!!content.testimonials_title && !!content.testimonials_title.length && (
              <SbEditable content={content.testimonials_title[0]}>
                <p className='heading--small'>{content.testimonials_title[0].text || 'Testimonials'}</p>
              </SbEditable>
            )}

            <Slider content={content.testimonials} />
          </div>
        </div>
        <div>
          <BlogComponent
            title={content.blog.filter(item => item.component === 'Section Title')[0]}
            button={content.blog.filter(item => item.component === 'Button')[0]}
            posts={[]}
          />
        </div>
      </div>
    )
  }
}

export default withRouteData(Impact)
