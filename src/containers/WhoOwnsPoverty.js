import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData, withSiteData } from 'react-static'
import SbEditable from 'storyblok-react'

import './WhoOwnsPoverty.css'
import close from '../images/close2.svg'
import left from '../images/nav-arrow-l2.svg'
import right from '../images/nav-arrow-r2.svg'

class WhoOwnsPoverty extends React.Component {
  state = {
    showPopUp: false,
    page: 0,
  }
  render() {
    const { content } = this.props.story || { content: {} }
    const paragraphList = []

    if (content.join_banner !== 'undefined') {
      content.join_banner.forEach(e => {
        if (e.component === 'Paragraph') {
          paragraphList.push(e.text)
        }
      })
    }
    function chunk(arr, chunkSize) {
      const R = []
      for (let i = 0, len = arr.length; i < len; i += chunkSize) R.push(arr.slice(i, i + chunkSize))
      return R
    }
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
        <div className='whoOwnsPovertyIntroContainer'>
          <div className='introImgBookContainer'>
            <div className='card middle' onClick={() => this.setState({ showPopUp: true })}>
              {content &&
                content.intro.map(el => {
                  if (el.component === 'Image') {
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='front'>
                          <img className='introImgBook' src={el.file} alt='navigation item' />
                        </div>
                      </SbEditable>
                    )
                  }
                  if (el.component === 'Images') {
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='back'>
                          <img className='introImgBookBack' src={el.image} alt='navigation item' />
                        </div>
                      </SbEditable>
                    )
                  }
                })}
            </div>
          </div>
          <div className='whoOwnPovertyRightText'>
            {content &&
              content.intro.map(el => {
                if (el.component === 'Section Title') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <div className='SectionTitleContainerWhoOwnsPoverty'>
                        <h2 className='sectionTitleWhoOwnsPoverty'>{el.text}</h2>
                      </div>
                    </SbEditable>
                  )
                }

                if (el.component === 'Page Subtitle') {
                  return (
                    <SbEditable key={el._uid} content={el}>
                      <div className='PageSubtitleContainerWhoOwnsPoverty'>
                        <p className='PageSubtitleWhoOwnsPoverty'>{el.text}</p>
                      </div>
                    </SbEditable>
                  )
                }
              })}
            <div className='paraContainer'>
              {content &&
                content.intro.map(el => {
                  if (el.component === 'Paragraph') {
                    return (
                      <SbEditable key={el._uid} content={el}>
                        <div className='ParagraphContainerWhoOwnsPoverty'>
                          <p className='ParagraphWhoOwnsPoverty'>{el.text}</p>
                        </div>
                      </SbEditable>
                    )
                  }
                })}
            </div>

            <div className='preorderButton'>
              {content &&
                content.success_stories.map(el => (
                  <SbEditable key={el._uid} content={el}>
                    <a href={el.link} target='_blank' rel='noopener noreferrer' className='green-button-new'>
                      {el.label}
                      <span className='icon-button-arrow' />
                    </a>
                  </SbEditable>
                ))}
            </div>
          </div>
        </div>

        {this.state.showPopUp ? (
          <React.Fragment>
            <div className='whoOwnsPovertyPopUp' />
            <div className='phoneWidthbook'>
              <div className='whoOwnsPovertyPopUpCover'>
                <img
                  src={left}
                  style={{
                    marginRight: '0.5rem',
                    cursor: 'pointer',
                    zIndex: 1000,
                  }}
                  alt='Book cover'
                  onClick={() =>
                    this.setState({
                      page: this.state.page !== 0 ? this.state.page - 1 : 0,
                    })
                  }
                />

                <div className='leftPageContent'>
                  {this.state.page === 0 ? (
                    <React.Fragment>
                      {content &&
                        content.join_banner.map(el => {
                          if (el.component === 'Page Title') {
                            return <div className='bookPageTitle'> {el.text}</div>
                          }
                        })}
                    </React.Fragment>
                  ) : null}

                  {paragraphList.map((e, i) => {
                    if (this.state.page === i) {
                      return <div>{e}</div>
                    }
                  })}
                </div>

                <img
                  src={right}
                  onClick={() =>
                    this.setState({
                      page: paragraphList.length - 1 === this.state.page ? this.state.page : this.state.page + 1,
                    })
                  }
                  alt='Book cover back'
                  style={{
                    marginLeft: '0.5rem',
                    cursor: 'pointer',
                    zIndex: 1000,
                  }}
                />
                <img src={close} onClick={() => this.setState({ showPopUp: false })} className='closeButton2' />
              </div>
            </div>

            <div className='pcWidthbook'>
              <div className='whoOwnsPovertyPopUpCover'>
                <img
                  src={left}
                  style={{
                    marginRight: '1rem',
                    cursor: 'pointer',
                    zIndex: 1000,
                  }}
                  alt='Book cover'
                  onClick={() =>
                    this.setState({
                      page: this.state.page !== 0 ? this.state.page - 1 : 0,
                    })
                  }
                />

                <div className='leftPageContent'>
                  {this.state.page === 0 ? (
                    <React.Fragment>
                      {content &&
                        content.join_banner.map(el => {
                          if (el.component === 'Page Title') {
                            return <div className='bookPageTitle'> {el.text}</div>
                          }
                        })}
                    </React.Fragment>
                  ) : null}

                  {chunk(paragraphList, 2).map((e, i) => {
                    if (this.state.page === i) {
                      return <div>{e[0]}</div>
                    }
                  })}
                </div>

                <div className='rightPageContent'>
                  {chunk(paragraphList, 2).map((e, i) => {
                    if (this.state.page === i) {
                      return <div>{e[1]}</div>
                    }
                  })}
                </div>

                <img
                  src={right}
                  onClick={() =>
                    this.setState({
                      page:
                        chunk(paragraphList, 2).length - 1 === this.state.page ? this.state.page : this.state.page + 1,
                    })
                  }
                  alt='Book cover back'
                  style={{
                    marginLeft: '1rem',
                    cursor: 'pointer',
                    zIndex: 1000,
                  }}
                />
                <img
                  src={close}
                  onClick={() => this.setState({ showPopUp: false })}
                  alt='x to close the modal'
                  className='closeButton'
                />
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    )
  }
}

export default withRouteData(WhoOwnsPoverty)
