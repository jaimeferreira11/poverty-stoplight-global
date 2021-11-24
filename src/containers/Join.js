import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'

import './Join.css'

const converter = new showdown.Converter()

const colors = ['overlay--red', 'overlay--yellow', 'overlay--green', 'overlay--black']
const isBrowser = typeof window !== 'undefined'
const Join = props => {
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
        <div className='join__intro'>
          {content.title_section.map(el => (
            <SbEditable key={el._uid} content={el}>
              {el.component === 'Section Title' && <h2 className='bold'>{el.text}</h2>}
              {el.component === 'Rich Text' && (
                <div
                  className='paragraph--lead'
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(el.markdown),
                  }}
                />
              )}
              {el.component !== 'Rich Text' && el.component !== 'Section Title' && (
                <p className='paragraph--lead'>{el.text}</p>
              )}
            </SbEditable>
          ))}
        </div>
      </div>
      <div className='wrapper wrapper--flex overlay__wrapper'>
        {content.steps.map((el, i) => (
          <SbEditable content={el} key={`${el._uid}-nav-item`}>
            <div className='overlay__container'>
              <a href={`#section-${i}`}>
                <div className='overlay__content'>
                  <h2>{el.nav_text}</h2>
                </div>

                <i className='icon-arrow-circle' />
                <div style={{ backgroundImage: `url(${el.nav_image})` }} alt='' className='join__image' />
                <div className={`overlay ${colors[i % 4]}`} />
              </a>
            </div>
          </SbEditable>
        ))}
      </div>

      {content.steps.map((el, i) => (
        <SbEditable key={el._uid} content={el}>
          <div className='wrapper '>
            <div className='join-section' id={`section-${i}`}>
              <div className='col-1-2'>
                <div className='join-section__title'>{el.title}</div>
                <div style={{ padding: '0 2rem 0 0' }}>
                  <div
                    className='rich-text'
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(el.lead),
                    }}
                  />
                </div>
              </div>
              <div className='col-1-2 join-section__col'>
                <div
                  className='rich-text'
                  dangerouslySetInnerHTML={{
                    __html: converter.makeHtml(el.info),
                  }}
                />
              </div>
            </div>
          </div>
        </SbEditable>
      ))}
      <div className='join__banner-wrapper'>
        {content.banner.map(el => (
          <SbEditable key={el._uid} content={el}>
            <div className='col-1-2'>
              <div className='content'>
                <h2 className='heading--big bold'>
                  {isBrowser ? (sessionStorage.getItem('form') ? content.form[0].thank_you_title : el.heading) : ''}
                </h2>
                <p className='paragraph--sans'>
                  {isBrowser ? (sessionStorage.getItem('form') ? content.form[0].thank_you_text : el.subheading) : ''}
                </p>
              </div>
            </div>

            <div className='join__banner--image' style={{ backgroundImage: `url(${el.image})` }} />
            {/* <div className="join__banner--overlay" /> */}
          </SbEditable>
        ))}
        <div className='col-1-2 form__col' id='form-column'>
          <SbEditable content={content.form[0]}>
            <form
              className='join__form'
              method='post'
              name='join-us-form'
              id='join-us-form'
              action={`https://penguin-utility-server.herokuapp.com/form/user/povertystoplight?redirect=${
                isBrowser ? `${window.location.href}#form-column` : ''
              }`}
              onSubmit={() => (isBrowser ? sessionStorage.setItem('form', 'setForm') : '')}
            >
              <input type='hidden' name='form-name' value='Poverty Stoplight Form' />
              <input
                className='join__form--input'
                type='text'
                placeholder={content.form[0].name_label || 'Name'}
                name='Name'
                required
              />
              <input
                className='join__form--input'
                type='text'
                placeholder={content.form[0].phone_label || 'Phone'}
                name='Phone'
              />
              <input
                className='join__form--input'
                type='email'
                placeholder={content.form[0].email_label || 'E-mail*'}
                name='E-mail'
                required
              />
              <textarea
                className='join__form--message'
                form='join-us-form'
                type='text'
                placeholder={content.form[0].message_label || 'Message'}
                name='Message'
                required
              />
              <button role='none' className='button button--red join__form--submit' type='submit'>
                {content.form[0].send_label || 'SEND'}
              </button>
            </form>
          </SbEditable>
        </div>
      </div>
    </div>
  )
}

export default withRouteData(Join)
