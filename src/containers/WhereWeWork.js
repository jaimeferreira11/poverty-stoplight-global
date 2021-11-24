import React, { Component } from 'react'
import { withRouteData, Link } from 'react-static'
import { connect } from 'react-redux'
import SbEditable from 'storyblok-react'
import { Helmet } from 'react-helmet'
import showdown from 'showdown'
import WorldMap from 'grommet/components/WorldMap'
import Box from 'grommet/components/Box'
import 'grommet/grommet.min.css'
import './WhereWeWork.css'
import close from '../images/close.svg'
import green from '../images/green_marker.png'
import yellow from '../images/yellow_marker.png'

const converter = new showdown.Converter()

const SpecialProjectPopupComp = ({ closePopup, project, lng }) => (
  <div className='popup'>
    <img className='closeIcon' src={close} alt='' onClick={closePopup} onKeyPress={closePopup} />
    <h1 className='projectTitle'>{project.name}</h1>
    {project.special_projects.map(el => (
      <div className='project' key={el._uid}>
        {el.logo && <img src={el.logo} alt='project logo' />}
        {el.Organization && (
          <p>
            <span className='projectLabel'>{lng === 'en' ? 'Organization' : 'Organización'}: </span>
            {el.Organization}
          </p>
        )}
        {el.Location && (
          <p>
            <span className='projectLabel'>{lng === 'en' ? 'Location' : 'Ubicación'}: </span>
            {el.Location}
          </p>
        )}
        {el.Objectives && (
          <p>
            <span className='projectLabel'>{lng === 'en' ? 'Objectives' : 'Objetivos'}: </span>
            <div
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(el.Objectives),
              }}
            />
          </p>
        )}
        {el.Started && (
          <p>
            <span className='projectLabel'>{lng === 'en' ? 'Started' : 'Inicio'}: </span>
            {el.Started}
          </p>
        )}
        {el.Contacts && (
          <p>
            <span className='projectLabel'>{lng === 'en' ? 'Contact info' : 'Contacto'}: </span>
            {el.Contacts}
          </p>
        )}
      </div>
    ))}
  </div>
)

const SpecialProjectPopup = connect(({ lng }) => ({
  lng,
}))(SpecialProjectPopupComp)

const Hub = ({ el, selectSpecialProject }) => (
  <div
    style={{ backgroundImage: `url(${el.image})` }}
    className='hubs__item hubs__item--image'
    onClick={() => selectSpecialProject(el)}
    onKeyPress={() => selectSpecialProject(el)}
  >
    <div className='bold heading--big'>{el.name}</div>
    <i className='icon-arrow-circle' />
  </div>
)

class WhereWeWork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hoveredPlace: false,
      selectedSpecialProject: false,
    }
  }
  onClick = place => {
    if (place.special_project) {
      document.getElementById('whatisaspecialproject').scrollIntoView({ behavior: 'smooth' })
    } else if (typeof window !== 'undefined') {
      window.open(place.link, '_blank').focus()
    }
  }
  closePopup = () => {
    this.setState({
      selectedSpecialProject: false,
    })
  }
  selectSpecialProject = project => {
    if (project.special_projects) {
      this.setState({
        selectedSpecialProject: project,
      })
    }
  }
  onHover = (tooltip, place) => {
    this.setState({
      hoveredPlace: tooltip ? place : false,
    })
  }
  render() {
    const { content } = this.props.story
    const { hoveredPlace, selectedSpecialProject } = this.state

    return (
      <div>
        <Helmet>
          <title>{content && content.top[0].title}</title>
        </Helmet>
        {selectedSpecialProject && (
          <SpecialProjectPopup project={selectedSpecialProject} closePopup={this.closePopup} />
        )}
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
        <div className='wrapper'>
          <div className='where-we-work__map'>
            {content.map
              .filter(el => el.component === 'Text')
              .map(el => (
                <SbEditable key={el._uid} content={el}>
                  <p className='heading--small'>{el.text || 'Poverty Stoplight hubs & Special Projects'}</p>
                </SbEditable>
              ))}
            <div className='map-dots'>
              <WorldMap
                colorIndex='unset'
                series={content.map
                  .filter(el => el.component === 'Hubs List')[0]
                  .list.filter(place => place.component === 'Hub' && place.latitude && place.longitude)
                  .map(place => ({
                    place: [place.latitude ? Number(place.latitude) : 0, place.longitude ? Number(place.longitude) : 0],
                    colorIndex: place.special_project ? 'warning' : 'ok',
                    label: place.name,
                    flag: (
                      <Box
                        pad='small'
                        colorIndex='grey-2'
                        style={{
                          opacity: hoveredPlace && hoveredPlace.name === place.name ? '1' : '0',
                        }}
                      >
                        {place.name}
                      </Box>
                    ),
                    onHover: tooltip => this.onHover(tooltip, place),
                    onClick: () => this.onClick(place),
                  }))}
              />
              {content.map
                .filter(el => el.component === 'Map Legend')
                .map(el => (
                  <SbEditable key={el._uid} content={el}>
                    <p className='map_legend'>
                      <img src={green} alt='hub marker' /> <span>{el.hub_label}</span>
                      <img src={yellow} alt='special project marker' /> <span>{el.special_project_label}</span>
                    </p>
                  </SbEditable>
                ))}
            </div>
          </div>
        </div>
        <div className='background--gray'>
          <div className='wrapper wrapper--flex pt-120'>
            {content.map
              .filter(el => el.component === 'Hubs List')[0]
              .list.map(el => {
                switch (el.component) {
                  case 'Hub':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        {el.special_projects ? (
                          <Hub el={el} selectSpecialProject={this.selectSpecialProject} />
                        ) : (
                          <a className='hubs__link' href={el.link} target='_blank' rel='noopener noreferrer'>
                            <Hub el={el} selectSpecialProject={this.selectSpecialProject} />
                          </a>
                        )}
                      </SbEditable>
                    )
                  case 'Become Hub':
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='hubs__item hubs__item--become-hub'>
                          <div className='heading--small bold'>{el.title}</div>
                          <Link
                            to={`/${el.link[0].link.cached_url}#${el.id}`}
                            className='button button--outline button--arrow hubs__button'
                          >
                            <div>{el.link[0].label}</div>
                            <span className='icon-button-arrow' />
                          </Link>
                        </div>
                      </SbEditable>
                    )
                  default:
                    return ''
                }
              })}
          </div>
          <div className='wrapper'>
            <div className='line' />
          </div>
          <div className='partnership'>
            <div className='background--gray'>
              <div className='wrapper'>
                {content.partnership.map(el => {
                  switch (el.component) {
                    case 'Section Title':
                      return (
                        <SbEditable key={el._uid} content={el}>
                          <div className='col-1-3'>
                            <div className='bold heading--big'>{el.text}</div>
                          </div>
                        </SbEditable>
                      )
                    case 'Rich Text':
                      return (
                        <SbEditable key={el._uid} content={el}>
                          <div className='col-2-3'>
                            <div
                              className='paragraph--sans rich-text'
                              dangerouslySetInnerHTML={{
                                __html: converter.makeHtml(el.markdown),
                              }}
                            />
                          </div>
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
      </div>
    )
  }
}

export default withRouteData(WhereWeWork)
