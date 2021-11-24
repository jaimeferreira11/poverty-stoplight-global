import React from 'react'
import SbEditable from 'storyblok-react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker, OverlayView } from '@react-google-maps/api'
import { withRouteData, withSiteData } from 'react-static'
import classnames from 'classnames'
import hubs from '../assets/hubs.jpg'
import families from '../assets/families.jpg'
import organizations from '../assets/organizations.jpg'
import people from '../assets/people.jpg'
import surveys from '../assets/surveys.jpg'
import m1 from '../assets/m1.png'
import m2 from '../assets/m2.png'
import m3 from '../assets/m3.png'
import m4 from '../assets/m4.png'
import m5 from '../assets/m5.png'

import './Map.css'

const svgItem = (green, red, yellow) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='85' width='65'%3E%3Ccircle cx='35' cy='20' stroke="white"  r='15' stroke-width='3' fill='%23d54b47' /%3E%3Ctext stroke="white"  font-family='Poppins' x='35' y='20' fill="white" text-anchor='middle' stroke-width='1px' font-size='15' transform='translate(0, 6)' %3E ${red}
   %3C/text%3E%3Ccircle cx='35' cy='45'  r='15' stroke-width='3' fill='%23e3ba17' stroke="white"  /%3E%3Ctext font-family='Poppins'  stroke="white" x='35' y='45' fill="white"  text-anchor='middle' font-size='15' transform='translate(0, 6)' stroke-width='1px' %3E ${yellow}
    %3C/text%3E%3Ccircle cx='35' cy='70' r='15' stroke-width='3' fill='%2350aa47' stroke="white"  /%3E%3Ctext font-family='Poppins' stroke="white" x='35' y='70' fill="white"  text-anchor='middle' font-size='15' transform='translate(0, 6)' stroke-width='1px' %3E ${green} %3C/text%3E%3C/svg%3E`

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      zoom: 5,
      selectedCenter: { lat: -23.442503, lng: -58.443832 },
      showDropdown: false,
      selectedIndicator: { text: 'Income', value: 'income' },
      selectedMapData: this.props.selectedMapData || [],
    }
  }

  overviewCodes = [
    {
      code: 'hubs',
      value: 'hubsCount',
    },
    {
      code: 'organizations',
      value: 'orgsCount',
    },
    {
      code: 'people',
      value: 'peopleCount',
    },
    {
      code: 'families',
      value: 'familyCount',
    },
    {
      code: 'surveys',
      value: 'surveyCount',
    },
  ]

  selectIndicator = indicator => {
    this.setState({
      selectedIndicator: indicator,
      showDropdown: !this.state.showDropdown,
      selectedMapData: this.props.mapData.filter(e => e.indicator == indicator.value),
    })
  }

  calculator = (markers, numStyles) => {
    let val = 0,
      index = 0,
      dv

    markers.forEach(marker => {
      if (marker.icon) {
        const valuesStoplight = marker.icon.url.match(/\s\b(\d+)\b\s/gm)
        val += valuesStoplight.reduce((a, b) => a + Number(b), 0)
      }
    })

    dv = val
    while (dv !== 0) {
      dv = parseInt(dv / 10, 10)
      index++
    }

    index = Math.min(index, numStyles)
    return {
      text: val,
      index: index,
    }
  }

  getOverviewNumber = code => {
    const data = this.overviewCodes.find(el => el.code == code)
    const overviewItemNumber = this.props.overviewData[data.value]
    return overviewItemNumber
  }
  componentDidMount = () => {
    this.setState({ selectedMapData: this.props.mapData.filter(e => e.indicator == 'income') })
  }

  render() {
    const content = this.props.content
    const overviewData = this.props.overviewData
    const indicators =
      (content && content.map_legend && content.map_legend.find(e => e.component == 'Impact Map Legend').text_value) ||
      []

    const { showDropdown, selectedIndicator } = this.state
    const { labels } = this.props

    const options = {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    }

    return (
      <div className='flex flex-col max-w-6xl m-auto md:space-x-4 md:flex-row'>
        <div
          className='flex flex-col justify-center w-full bg-white lg:justify-start lg:items-start lg:w-1/3 '
          style={{ height: 400 }}
        >
          <div className='flex flex-col h-full mt-24 mb-16 text-2xl md:mb-0 md:mt-0'>
            {content.numbers &&
              content.numbers.map((e, i) => {
                if (e.component == 'Section Title') {
                  return (
                    <SbEditable key={i} content={e}>
                      <h3 className='bold heading--big'>{e.text}</h3>
                    </SbEditable>
                  )
                }
              })}
            <div className='mt-auto space-y-4 '>
              {overviewData &&
                content.numbers &&
                content.numbers.map(e => {
                  if (e.component == 'List Of Numbers') {
                    return (
                      e.list &&
                      e.list.map(el => {
                        return (
                          <SbEditable key={el._uid} content={el}>
                            <div className='flex items-center'>
                              <img className='w-12 h-12 mr-4' src={el.icon.filename}></img>
                              <span className='mr-2 text-2xl font-bold text-green-500'>
                                {this.getOverviewNumber(el.code)}
                              </span>
                              <span className='text-2xl'>{el.text}</span>
                            </div>
                          </SbEditable>
                        )
                      })
                    )
                  }
                })}
            </div>
          </div>
        </div>
        <div className='relative w-full mt-6 md:mb-0 md:mt-0 lg:w-2/3'>
          {this.props.match.url !== '/' && (
            <div className='rounded map__nav'>
              <div className='map-dropdown'>
                {content.map_legend &&
                  content.map_legend.map(e => {
                    if (e.component == 'Text') {
                      return (
                        <SbEditable key={e} content={e}>
                          <div className='map__nav__heading'>{e.text}</div>{' '}
                        </SbEditable>
                      )
                    }
                  })}

                <div onClick={() => this.setState({ showDropdown: !showDropdown })} className='map-dropdown__content'>
                  <div className='px-2 cursor-pointer'>{selectedIndicator.text}</div>
                  {showDropdown && (
                    <div className='z-40 h-64 overflow-x-auto overflow-y-auto bg-white shadow'>
                      {indicators &&
                        indicators.map((item, i) => {
                          return (
                            <div
                              key={item.value}
                              className={classnames('px-2 cursor-pointer', {
                                'bg-green-500 text-white': item.value == selectedIndicator.value,
                              })}
                              onClick={() => this.selectIndicator(item)}
                            >
                              {item.text}
                            </div>
                          )
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <LoadScript googleMapsApiKey='AIzaSyBLGYYy86_7QPT-dKgUnFMIJyhUE6AGVwM'>
            <GoogleMap
              options={{ minZoom: 2, maxZoom: 12 }}
              mapContainerStyle={{
                width: '100%',
                height: '400px',
              }}
              center={this.state.selectedCenter}
              zoom={this.state.zoom}
            >
              <MarkerClusterer
                calculator={this.calculator}
                styles={[
                  {
                    url: m1,
                    height: 53,
                    lineHeight: 53,
                    width: 53,
                    textColor: 'white',
                    visibility: 'hidden',
                  },
                  {
                    url: m2,
                    height: 56,
                    lineHeight: 56,
                    width: 56,
                    textColor: 'green',
                    visibility: 'hidden',
                  },
                  {
                    url: m3,
                    height: 66,
                    lineHeight: 66,
                    width: 66,
                    textColor: 'orange',
                    visibility: 'hidden',
                  },
                  {
                    url: m4,
                    height: 78,
                    lineHeight: 78,
                    width: 78,
                    textColor: 'black',
                  },
                  {
                    url: m5,
                    height: 90,
                    lineHeight: 90,
                    width: 90,
                    textColor: 'white',
                  },
                ]}
                options={options}
              >
                {clusterer =>
                  this.state.selectedMapData &&
                  this.state.selectedMapData.map((location, i) => {
                    return (
                      <Marker
                        key={i}
                        position={{ lat: location.latitude, lng: location.longitude }}
                        clusterer={clusterer}
                        icon={{
                          url: svgItem(location.greens, location.reds, location.yellows),
                        }}
                      />
                    )
                  })
                }
              </MarkerClusterer>
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    )
  }
}

export default withSiteData(withRouteData(Map))
