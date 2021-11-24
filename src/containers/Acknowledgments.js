import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import SbEditable from 'storyblok-react'

import './WhoOwnsPoverty.css'
import download from '../images/download.png'
import preview from '../images/preview.png'
import share from '../images/share.png'

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

        <div className='documentsPart'>
          {content &&
            content.map_section.map(el => {
              if (el.component === 'Section Title') {
                return (
                  <SbEditable key={el._uid} content={el}>
                    <h2 className='DocumentsTitleMain'>{el.text}</h2>
                  </SbEditable>
                )
              }

              if (el.component === 'Page Subtitle') {
                return (
                  <SbEditable key={el._uid} content={el}>
                    <p className='DocumentsTitleSecondary'>{el.text}</p>
                  </SbEditable>
                )
              }
            })}
          <div className='documentsListList'>
            {content &&
              content.map_section.map(el => {
                if (el.component === 'Document') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <div className='DocumentsList'>
                        <div className='firstPartDocList'>
                          <p className='DocumentTitle'>{el.title}</p>
                          <p className='DocumentAuthor'>{el.author}</p>
                        </div>
                        <div className='DocumentsListActions'>
                          <a href={el.file} rel='noopener noreferrer' target='_blank'>
                            <div className='assetContainer'>
                              <img className='assetShare' src={preview} alt='share PDF' />
                            </div>
                          </a>

                          <a href={el.file} download target='blank'>
                            <div className='assetContainer'>
                              <img className='assetShare' src={download} alt='share PDF' />
                            </div>
                          </a>

                          <a href={el.file} download target='blank'>
                            <div className='assetContainer'>
                              <img className='assetShare' src={share} alt='share PDF' />
                            </div>
                          </a>
                        </div>
                      </div>
                    </SbEditable>
                  )
                }
              })}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(Acknowledgments)
