import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import SbEditable from 'storyblok-react'

import './WhoOwnsPoverty.css'

class Acknowledgments extends React.Component {
  render() {
    const { content } = this.props.story || { content: {} }

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

        <div className='DescContainer'>
          <div className='leftTextContainer'>
            {content &&
              content.testimonials.map(el => {
                if (el.component === 'Section Title') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <h2 className='sectionTitleTest'>{el.text}</h2>
                    </SbEditable>
                  )
                }
                if (el.component === 'Page Subtitle') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <p className='PageSubtitleTest'>{el.text}</p>
                    </SbEditable>
                  )
                }
                if (el.component === 'Paragraph') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <p className='ParagraphTitleTest'>{el.text}</p>
                    </SbEditable>
                  )
                }
                if (el.component === 'Hero') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <div className='bgImg' style={{ backgroundImage: `url(${el.image})` }} />
                    </SbEditable>
                  )
                }
              })}
          </div>
          <div className='imgPart'>
            {content &&
              content.testimonials.map(el => {
                if (el.component === 'Image') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <img className='introPersonImgBook' src={el.file} alt='navigation item' />
                    </SbEditable>
                  )
                }
              })}
            <div className='socialList'>
              {content &&
                content.testimonials.map(el => {
                  if (el.component === 'Social Link') {
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <a href={el.link} target='_blank' rel='noopener noreferrer'>
                          <img className='socialLink' src={el.icon} alt='socialLink' />
                        </a>
                      </SbEditable>
                    )
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(Acknowledgments)
