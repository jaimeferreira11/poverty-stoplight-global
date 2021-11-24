import React from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import { Link, withRouteData } from 'react-static'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'

import './FAQ.css'
import CollapsableComponent from '../components/FAQCollapsableComponent.js'

const converter = new showdown.Converter()

const LessonPlans = props => {
  const { plans } = props
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
          {plans.map(plan => (
            <CollapsableComponent
              key={plan.id}
              triggerText={plan.content.contents.find(item => item.component === 'Section Title').text}
              content={converter.makeHtml(plan.content.contents.find(item => item.component === 'Rich Text').markdown)}
              pdf={plan.content.contents.find(item => item.component === 'PDF')}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default withRouteData(LessonPlans)
