import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import SbEditable from 'storyblok-react'
import LazyLoad from 'react-lazyload'

import './Partners.css'

const Partners = props => {
  const { content } = props.story

  return (
    <div>
      <Helmet>
        <title>{content && content.top[0].title}</title>
      </Helmet>
      {content &&
        content.top.map(el => (
          <div
            key={el._uid}
            className='hero hero--small'
            style={{
              backgroundImage: `url(${el.image})`,
              backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
            }}
          >
            {' '}
            <div className='hero__overlay' />
            <div className='wrapper'>
              <SbEditable content={el}>
                <h1 className='hero__title hero--small__title'>{el.title}</h1>
              </SbEditable>
            </div>
          </div>
        ))}
      <div className='wrapper'>
        {content.lead.map(el => (
          <SbEditable key={el._uid} content={el}>
            <div className='partners__intro paragraph--lead'>{el.text}</div>
          </SbEditable>
        ))}
      </div>
      <div className='wrapper'>
        <div className='partner'>
          {content.partners_list.map(el => (
            <SbEditable key={el._uid} content={el}>
              <div className='col-1-4'>
                <a href={el.link.url}>
                  <LazyLoad height='200'>
                    <img className='partner__logo' src={el.logo} alt='' />
                  </LazyLoad>
                </a>
              </div>
            </SbEditable>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withRouteData(Partners)
