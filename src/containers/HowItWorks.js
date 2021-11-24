import React from 'react'
import { withRouteData, Link } from 'react-static'
import SbEditable from 'storyblok-react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import semaforo from '../images/semaforo.gif'

import './HowItWorks.css'
import './CaseStudies.css'

const colors = ['number--red', 'number--yellow', 'number--green', 'number--blue']

const HowItWorks = props => {
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
      <div className='wrapper how__intro'>
        <div className='col-1-2 mb-120'>
          {content.intro.map(el => (
            <SbEditable key={el._uid} content={el}>
              {el.component === 'Section Title' ? (
                <h2 className='bold heading--big'>{el.text}</h2>
              ) : el.component === 'Lead Paragraph' ? (
                <p className='paragraph--lead'>{el.text}</p>
              ) : (
                <p className='paragraph--sans'>{el.text}</p>
              )}
            </SbEditable>
          ))}
        </div>
        <div className='semaforo__wrapper display-large'>
          <LazyLoad height='200'>
            <img className='semaforo' src={semaforo} alt='' />
          </LazyLoad>
        </div>
      </div>
      <div className='background--gray steps-infogr'>
        <div className='wrapper '>
          {/* <div className=" offset-1 col-1-6">
            <img className="steps" src={steps} alt="" />
          </div> */}

          {content.infographic.map((el, i) => (
            <SbEditable key={el._uid} content={el}>
              {el.component === 'Infographic Step' ? (
                <div className='steps-infogr__row'>
                  <div className='steps-infogr__number col-1-6'>
                    <div className={`number ${colors[i % 4]}`}>{i + 1}</div>
                  </div>
                  <div className='steps-infogr__item col-5-6'>
                    <div className='steps-infogr__item--content'>
                      <div className='bold'>{el.Title}</div>
                      <p className='paragraph--sans'>{el.Text}</p>
                    </div>

                    <LazyLoad height='200'>
                      <img className='steps-infogr__item--image' src={el.Image} alt='' />
                    </LazyLoad>
                  </div>
                </div>
              ) : (
                <div className='steps-infogr__row'>
                  <div className='steps-infogr__number col-1-6'>
                    <div className={`number ${colors[i % 4]}`}>{i + 1}</div>
                  </div>
                  <div className='steps-infogr__item col-5-6'>
                    <Tabs>
                      <TabList className='steps-infogr__tablist'>
                        {el.content.map(tab => (
                          <SbEditable key={tab._uid} content={tab}>
                            <Tab className='steps-infogr__tab'>{tab.title}</Tab>{' '}
                          </SbEditable>
                        ))}
                      </TabList>
                      {el.content.map(tab => (
                        <SbEditable key={tab._uid} content={tab}>
                          <TabPanel className='steps-infogr__panel'>
                            <div className='steps-infogr__content'>
                              <div className='bold'>{tab.info_title}</div>
                              <p className='paragraph--sans'>{tab.info}</p>
                              <div className='col-1-2 steps-infogr__content__steps'>
                                <SbEditable content={tab.step_1[0]}>
                                  <h2 className='heading--small heading--green bold'>{tab.step_1[0].text}</h2>
                                </SbEditable>
                                <SbEditable content={tab.step_1[1]}>
                                  <p className='paragraph--sans'>{tab.step_1[1].text}</p>
                                </SbEditable>
                              </div>
                              <div className='col-1-2 steps-infogr__content__steps'>
                                <SbEditable content={tab.step_2[0]}>
                                  <h2 className='heading--small heading--green bold'>{tab.step_2[0].text}</h2>
                                </SbEditable>
                                <SbEditable content={tab.step_2[1]}>
                                  <p className='paragraph--sans'>{tab.step_2[1].text}</p>
                                </SbEditable>
                              </div>
                            </div>
                          </TabPanel>
                        </SbEditable>
                      ))}
                    </Tabs>
                  </div>
                </div>
              )}
            </SbEditable>
          ))}
        </div>
      </div>
      <div className='tech__intro'>
        <div className='wrapper'>
          <div className='col-7-12'>
            {content.technology.map(el => (
              <SbEditable content={el} key={el._uid}>
                {el.component === 'Section Title' ? (
                  <h2 className='bold heading--big'>{el.text}</h2>
                ) : el.component === 'Lead Paragraph' ? (
                  <p className='paragraph--lead'>{el.text}</p>
                ) : (
                  <p className='paragraph--sans'>{el.text}</p>
                )}
              </SbEditable>
            ))}
          </div>
        </div>
      </div>
      <div className='wrapper'>
        <Tabs className='tech__tabs'>
          <TabList className='tech__tablist col-1-2'>
            {content.technology_tabs.map(el => (
              <SbEditable key={el._uid} content={el}>
                <Tab className='tech__tab'>
                  <p className='heading--small heading--green bold'>{el.title}</p>
                  <div className='paragraph--sans'>{el.info}</div>
                </Tab>
              </SbEditable>
            ))}
          </TabList>
          <div className='panel__list col-1-2'>
            {content.technology_tabs.map(el => (
              <SbEditable key={el._uid} content={el}>
                <TabPanel className='tech__panel'>
                  <LazyLoad height='200'>
                    <img className='tech__image' src={el.image} alt='tech' />
                  </LazyLoad>
                </TabPanel>
              </SbEditable>
            ))}
          </div>
        </Tabs>
      </div>

      {content.banner.map(el => (
        <SbEditable key={el._uid} content={el}>
          <div className='banner banner--brown'>
            <LazyLoad height='200'>
              <div className='banner__image display-large' style={{ backgroundImage: `url(${el.image})` }}>
                <br />
              </div>
            </LazyLoad>
            <div className='wrapper'>
              <div className='col-1-3'>
                <h2 className='heading--small bold'>{el.heading}</h2>
                <p className='paragraph--sans banner__text'>{el.subheading}</p>
                <Link to={el.link[0].link.cached_url} className='button button--green'>
                  {el.link[0].label} &nbsp; &nbsp; &nbsp;
                  <span className='icon-arrow-circle' />
                </Link>
              </div>
            </div>
          </div>
        </SbEditable>
      ))}
    </div>
  )
}

export default withRouteData(HowItWorks)
