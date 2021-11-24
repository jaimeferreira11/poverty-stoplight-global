import React from 'react'
import { withRouteData, Link } from 'react-static'
import SbEditable from 'storyblok-react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'

import WhatIsPSDimension from '../components/WhatIsPSDimension.js'
import quote from '../images/icon-quotes.svg'
import ReactTabs from '../components/WhatIsItTabs.js'
import './WhatIsIt.css'

const WhatItIs = props => {
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
            <div className='hero__overlay' />
            <div className='wrapper'>
              <SbEditable content={el}>
                <h1 className='hero__title hero--small__title'>{el.title}</h1>
              </SbEditable>
            </div>
          </div>
        ))}
      <div className='wrapper mb-120 '>
        <div className='col-1-2'>
          {content.intro.map(el => {
            switch (el.component) {
              case 'Section Title':
                return (
                  <SbEditable key={el._uid} content={el}>
                    <h2 className='bold heading--big'>{el.text}</h2>
                  </SbEditable>
                )
              case 'Lead Paragraph':
                return (
                  <SbEditable key={el._uid} content={el}>
                    <div className='paragraph--sans'>{el.text}</div>
                  </SbEditable>
                )
              default:
                return ''
            }
          })}
        </div>
        <div className='col-1-2'>
          {content.intro
            .filter(el => el.component === 'Image')
            .map(el => (
              <SbEditable key={el._uid} content={el}>
                <LazyLoad height='200'>
                  <img src={el.file} alt='' className='what-is-ps__image1 center-small' />
                </LazyLoad>
              </SbEditable>
            ))}
        </div>
      </div>
      <div className='background--gray'>
        <div className='wrapper'>
          <div className='dimensions'>
            {content.factors.map(el => (
              <SbEditable key={el._uid} content={el}>
                <div className='dimensions__item'>
                  <WhatIsPSDimension src={el.image} title={el.title} text={el.text} />
                </div>
              </SbEditable>
            ))}
          </div>
        </div>
      </div>
      <div className='what-is-ps'>
        {content.indicators_section.map((el, i) => (
          <SbEditable key={el._uid} content={el}>
            <div className='wrapper what-is__section'>
              {i % 2 === 0 ? (
                <div>
                  <div className='col-7-12 push-right'>
                    <LazyLoad height='200'>
                      <img src={el.image} alt='' className='what-is-ps__image2' />
                    </LazyLoad>
                  </div>
                  <div className='col-5-12'>
                    <div className='paragraph--sans mt-100'>{el.text}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='col-7-12'>
                    <LazyLoad height='200'>
                      <img src={el.image} alt='' className='what-is-ps__image3' />
                    </LazyLoad>
                  </div>
                  <div className='col-5-12'>
                    <div className='paragraph--sans mt-100'>{el.text}</div>
                  </div>
                </div>
              )}
            </div>
          </SbEditable>
        ))}
      </div>
      <div className='section-stoplight background--gray'>
        <div className='stoplight__img'>
          <div className='wrapper'>
            <div className='col-1-3 display-large'>
              <br />
            </div>
            <div className='col-2-3 '>
              {content.traffic_light_section.map(el => {
                switch (el.component) {
                  case 'Lead Paragraph':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <p className='paragraph--lead mt-160'>{el.text}</p>
                      </SbEditable>
                    )

                  case 'Rich Text':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='stoplight__text'>{el.markdown}</div>
                      </SbEditable>
                    )
                  case 'External Video':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <iframe
                          title='video'
                          className='stoplight__video mb-120'
                          width='90%'
                          height='420px'
                          src={el.source}
                          frameBorder='0'
                          allow='autoplay; encrypted-media'
                          allowFullScreen
                        />
                      </SbEditable>
                    )
                  default:
                    return ''
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='wrapper'>
        {content.testimonials.map(el => (
          <SbEditable key={el._uid} content={el}>
            <div className='testimonial mt-160 pb-160'>
              <div className='col-1-6'>
                <img src={quote} alt='' className='quote-icon--big' />
              </div>
              <div className='col-2-3'>
                <div className='quote-text--big'>
                  {el.text}
                  <div className='quote-author--big'> — {el.author} </div>
                </div>
              </div>
            </div>
          </SbEditable>
        ))}
      </div>
      <div className='wrapper'>
        <div className='line' />
      </div>
      <div className='wrapper mb-160'>
        <div className='tabs__intro'>
          {content.how_it_helps_section.map(el => {
            switch (el.component) {
              case 'Section Title':
                return (
                  <SbEditable key={el._uid} content={el}>
                    <div className='bold heading--big'>{el.text}</div>
                  </SbEditable>
                )

              case 'Rich Text':
                return (
                  <SbEditable key={el._uid} content={el}>
                    <p className='paragraph--sans'>{el.markdown}</p>
                  </SbEditable>
                )

              default:
                return ''
            }
          })}
        </div>
        <ReactTabs tabs={content.tabs} />
      </div>
      <div className='wrapper '>
        {content.use_it_section.map(el => {
          switch (el.component) {
            case 'Section Title':
              return (
                <SbEditable key={el._uid} content={el}>
                  <div className='bold heading--big'>{el.text}</div>
                </SbEditable>
              )

            case 'Lead Paragraph':
              return (
                <SbEditable key={el._uid} content={el}>
                  <p className='col-3-4 paragraph--lead'>{el.text}</p>
                </SbEditable>
              )

            case 'Who Can Use It':
              return (
                <SbEditable key={el._uid} content={el}>
                  <div className='col-1-3 who-can-use-it mb-100'>
                    <div className='who-can-use-it__item'>
                      <div style={{ backgroundImage: `url(${el.image})` }} className='who-can-use-it__image' />
                      <h2 className='heading--small bold heading--green'>{el.title}</h2>
                      <p className='paragraph--sans'>{el.description}</p>
                    </div>
                    <Link to={`/${el.button[0].link.cached_url}#${el.section_id}`}>
                      <div className='button button--green'>{el.button[0].label}</div>
                    </Link>
                  </div>
                </SbEditable>
              )
            default:
              return ''
          }
        })}
      </div>
    </div>
  )
}

export default withRouteData(WhatItIs)
