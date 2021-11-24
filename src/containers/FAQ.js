import React from 'react'
import { withRouteData, Link } from 'react-static'
import { Helmet } from 'react-helmet'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'
import LazyLoad from 'react-lazyload'

import CollapsableComponent from '../components/FAQCollapsableComponent.js'
import './FAQ.css'

const converter = new showdown.Converter()

const FAQ = props => {
  const { questions } = props
  const { content } = props.story

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
      <div className='wrapper'>
        <div className='collapsable'>
          {questions.map(question => (
            <CollapsableComponent
              key={question.id}
              triggerText={question.content.contents[0].text}
              content={converter.makeHtml(question.content.contents[1].markdown)}
            />
          ))}
        </div>
      </div>
      <div className='faq__cta'>
        {content.banner.map(el => (
          <div key={el._uid} className='faq__banner'>
            <SbEditable content={el}>
              <div className='faq__banner--content'>
                <div className='wrapper'>
                  <div className='col-3-4'>
                    <div className='heading--small heading--small--bold'>{el.heading}</div>
                  </div>
                  <Link to={el.link[0].link.cached_url}>
                    <div className='button button--white faq__button'>{el.link[0].label} </div>
                  </Link>
                </div>
              </div>
              <LazyLoad height='200'>
                <img src={el.image} className='faq__banner--image' alt='banner_background' />
              </LazyLoad>
              <div className='faq__banner--overlay banner--green' />
            </SbEditable>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withRouteData(FAQ)
