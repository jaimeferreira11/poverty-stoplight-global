import React from 'react'
import { withRouteData, Link } from 'react-static'
import { connect } from 'react-redux'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'
import LazyLoad from 'react-lazyload'

import fpLogo from './images/logo_fp.png'

import './footer.css'

const converter = new showdown.Converter()

const Footer = props => {
  const footerStory = props.footer || { content: { Links: [] } }
  const footer = footerStory.content.Links

  return (
    <footer className='footer'>
      <div className='wrapper'>
        <div className='footer__follow'>
          {footer.map(col => {
            switch (col.component) {
              case 'Footer Social Links':
                return (
                  <SbEditable key={col._uid} content={col}>
                    <a href={col.link} target='_blank' rel='noopener noreferrer'>
                      <LazyLoad height='200'>
                        <img src={col.icon} alt='' className={`footer__icon ${col.name}-border`} />
                      </LazyLoad>
                    </a>
                  </SbEditable>
                )
              case 'Paragraph':
                return (
                  <SbEditable key={col._uid} content={col}>
                    <div className='footer__title' key={col._uid}>
                      {col.text}
                    </div>
                  </SbEditable>
                )
              default:
                return ''
            }
          })}
        </div>
      </div>
      <div className='wrapper'>
        <div className='line' />
      </div>
      <div className='wrapper'>
        <div className='footer__content'>
          {footer.map(col => {
            switch (col.component) {
              case 'Footer Links':
                return (
                  <div className='footer__links' key={col._uid}>
                    {col.content.map(el => {
                      switch (el.component) {
                        case 'Section Title':
                          return (
                            <SbEditable key={el._uid} content={el}>
                              <div className='footer__title'>{el.text}</div>
                            </SbEditable>
                          )
                        case 'Link':
                          return (
                            <SbEditable key={el._uid} content={el}>
                              {!el.link.url || !/^http/.test(el.link.url) ? (
                                <Link className='footer__link' to={`/${el.link.cached_url}`}>
                                  <div>{el.label}</div>
                                </Link>
                              ) : (
                                <a
                                  className='footer__link'
                                  rel='noopener noreferrer'
                                  target='_blank'
                                  href={`${el.link.url}`}
                                >
                                  <div>{el.label}</div>
                                </a>
                              )}
                            </SbEditable>
                          )

                        default:
                          return ''
                      }
                    })}
                  </div>
                )
              case 'Footer Contacts':
                return (
                  <div className='footer__contacts' key={col._uid}>
                    <SbEditable key={col._uid} content={col}>
                      <div className='footer__title'> {col.Title} </div>
                      <p className='footer__paragraph'>
                        <span className='icon-phone' />
                        <span className='footer__phone'> {col.Phone}</span>
                        <span className='footer__phone footer__title'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <Link to={col.Email}>
                          <span className='icon-mail' />
                        </Link>
                        <br />
                      </p>
                      <SbEditable key={col._uid} content={col}>
                        <div
                          className='footer__paragraph rich-text'
                          dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(col.Address),
                          }}
                        />
                      </SbEditable>
                      <SbEditable content={footerStory.content}>
                        <div className='footer__title'>{footerStory.content.powered_by || 'POWERED BY'}</div>
                      </SbEditable>
                      <LazyLoad height='200'>
                        <img src={fpLogo} alt='' className='fpLogo' />
                      </LazyLoad>
                    </SbEditable>
                  </div>
                )
              default:
                return ''
            }
          })}
        </div>
      </div>
      <div className='wrapper'>
        <div className='footer__meta'>
          <p className='footer__copyright'>© Copyright 2020 — Fundación Paraguaya</p>
          <SbEditable content={footerStory.content}>
            <p className='footer__bragging'>
              {footerStory.content.made_with || 'Made with love by'}
              <a href='http://penguin.digital'>Penguin Digital</a>
            </p>
          </SbEditable>
        </div>
      </div>
    </footer>
  )
}

export default withRouteData(
  connect(({ lng }) => ({
    lng,
  }))(Footer)
)
