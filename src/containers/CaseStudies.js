import React from 'react'
import { withRouteData, Link } from 'react-static'
import { Helmet } from 'react-helmet'
import showdown from 'showdown'

import SbEditable from 'storyblok-react'

import './CaseStudies.css'

const converter = new showdown.Converter()

const CaseStudies = props => {
  const content = props.data.content

  return (
    <div>
      <Helmet>
        <title>{content && content.top[0].title}</title>
      </Helmet>
      {content &&
        content.top.map(el => (
          <SbEditable content={el} key={el._uid}>
            <div
              className='hero hero--big hero--case'
              style={{
                backgroundImage: `url(${el.image})`,
                backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
              }}
            >
              <div className='hero__overlay' />
              {/* <div className="wrapper">
                <div className="offset-1">
                <div className="wrapper">
                  <div className="hero__category">{el.subtitle}</div>
                  <h2 className="hero__title hero--small__title">{el.title}</h2>
                </div>
              </div>
            </div> */}
              <div className='news__title'>
                <div className='wrapper'>
                  <div className='offset-1'>
                    <p className='hero__category'>{el.subtitle}</p>
                    <h1 className='hero__title'>{el.title}</h1>
                  </div>
                </div>
              </div>
            </div>
          </SbEditable>
        ))}

      <div className='wrapper--small page-contents'>
        {content.content.map(el => (
          <SbEditable key={el._uid} content={el}>
            {el.component === 'Lead Paragraph' ? (
              <p className='paragraph--lead'>{el.text}</p>
            ) : (
              <div
                className='rich-text'
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(el.markdown),
                }}
              />
            )}
          </SbEditable>
        ))}
      </div>
      {content.join_banner.map(el => (
        <SbEditable key={el._uid} content={el}>
          <div className='banner banner--green'>
            <div className='banner__image display-large' style={{ backgroundImage: `url(${el.image})` }}>
              <br />
            </div>
            <div className='wrapper'>
              <div className='col-1-3'>
                <h2 className='heading--small bold'>{el.heading}</h2>
                <p className='paragraph--sans banner__text'>{el.subheading}</p>
                <Link to={el.link[0].link.cached_url} className='button button--white'>
                  {el.link[0].label}
                </Link>
              </div>
            </div>
          </div>
        </SbEditable>
      ))}
    </div>
  )
}

export default withRouteData(CaseStudies)
