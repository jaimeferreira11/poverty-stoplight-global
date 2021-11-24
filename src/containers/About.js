import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'

import './About.css'
import StaffMember from '../components/StaffMember'
import logo from '../images/logo_fp_transparent.png'

const converter = new showdown.Converter()

const About = props => {
  const { content } = props.story

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
        <div className='about__intro'>
          {content.intro.map(el => (
            <SbEditable key={el._uid} content={el}>
              {el.component === 'Lead Paragraph' ? (
                <div className='col-2-3 offset-2'>
                  <p className='paragraph--lead'>{el.text}</p>
                </div>
              ) : (
                <div className='col-2-3 offset-2'>
                  <p className='paragraph--sans'>{el.text}</p>
                </div>
              )}
            </SbEditable>
          ))}
        </div>
      </div>
      <div className='background--gray'>
        <div className='wrapper'>
          <div className='team__intro'>
            {content.team_intro.map(el => (
              <SbEditable key={el._uid} content={el}>
                {el.component === 'Section Title' ? (
                  <p className='heading--small'>{el.text}</p>
                ) : (
                  <p className='paragraph--sans'>{el.text}</p>
                )}
              </SbEditable>
            ))}
          </div>
        </div>

        <div className='wrapper wrapper--flex staff__container '>
          {content.team.map(el => (
            <SbEditable key={el._uid} content={el}>
              <StaffMember
                src={el.picture}
                name={el.name}
                title={el.position}
                bio={el.bio}
                linkedIn={el.linkedin_profile}
                twitter={el.twitter_profile}
              />
            </SbEditable>
          ))}
        </div>
      </div>
      <div className='part-of-fp'>
        <div className='wrapper'>
          <div className='col-1-2'>
            {content.part_of
              .filter(el => el.component === 'Text')
              .map(el => (
                <SbEditable key={el._uid} content={el}>
                  <div className='heading--small'>{el.text}</div>
                </SbEditable>
              ))}

            <img className='part-of-fp__logo' src={logo} alt='' />
          </div>
          <div className='col-1-2 '>
            {content.part_of.map(el => {
              switch (el.component) {
                case 'Rich Text':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <div
                        className='rich-text paragraph--sans'
                        dangerouslySetInnerHTML={{
                          __html: converter.makeHtml(el.markdown),
                        }}
                      />
                    </SbEditable>
                  )
                case 'Link':
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={el.link.cached_url}
                        className='button button--white part-of-fp__button'
                      >
                        {el.label}
                      </a>
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
  )
}

export default withRouteData(About)
