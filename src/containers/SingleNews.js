import React from 'react'
import { withRouteData, Link } from 'react-static'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import moment from 'moment'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'

import './SingleNews.css'
import fbIcon from '../images/fb-icon.png'
import twIcon from '../images/tw-icon.png'
import ArrowWhite from '../images/link-arrow-white.svg'

const converter = new showdown.Converter()

let domain
if (typeof window !== 'undefined') {
  domain = `${window.location.origin}/`
}

const NewsItem = props => {
  const { data, latest } = props

  return data.content ? (
    <div>
      <Helmet>
        <title>{data.content.top ? data.content.top[0].title : ''}</title>
        <meta property='og:image' content={data.content.top[0].image} />
      </Helmet>
      <div>
        {data.content.top &&
          data.content.top.map(el => (
            <SbEditable key={el._uid} content={el}>
              <div
                className='hero hero--big hero--blog'
                style={{
                  backgroundImage: `url(${el.image})`,
                  backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
                }}
              >
                <div className='hero__overlay' />
                <div className='news__title'>
                  <div className='wrapper'>
                    <div className='offset-1'>
                      <p className='hero__category'>{data.content.category || ''}</p>
                      <h1 className='hero__title'>{el.title}</h1>
                      <p className='date'>{moment(data.content.date).format('ll')}</p>
                      <SbEditable content={data.content}>
                        <p className='hero__author'>
                          {data.content.article_by || 'Article by'} {data.content.author}
                        </p>
                      </SbEditable>
                    </div>
                  </div>
                </div>
              </div>
            </SbEditable>
          ))}
      </div>

      <div className='wrapper'>
        <div className='col-1-12'>
          <div className='share'>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${(domain || '') + data.full_slug}`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <img className='share__item' src={fbIcon} alt='' />
            </a>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://twitter.com/intent/tweet?text=${(domain || '') + data.full_slug}`}
            >
              <img className='share__item' src={twIcon} alt='' />
            </a>
          </div>
        </div>
        <div className='col-7-12'>
          <div className='offset-1 newscontent'>
            {data.content.content &&
              data.content.content.map(el => (
                <SbEditable key={el._uid} content={el}>
                  <div
                    className='rich-text'
                    dangerouslySetInnerHTML={{
                      __html: converter.makeHtml(el.markdown),
                    }}
                  />
                </SbEditable>
              ))}
            {data.tag_list.length > 0 && (
              <div className='tags'>
                <div className='tags__heading'>Tags </div>
                {data.tag_list.map(tag => (
                  <div className='tags__item' key={tag}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
            <SbEditable content={data.content}>
              <Link
                to={props.lng === 'es' ? `/${props.lng}/all-news` : `/${props.lng}/news`}
                className='button button--green news__button '
              >
                <img className='news__button--arrow' src={ArrowWhite} alt='' />
                {data.content.back_to_all_news || 'Back to all news'}
              </Link>
            </SbEditable>
          </div>
        </div>
        <div className='col-1-3'>
          <div className='most_recent'>
            <SbEditable content={data.content}>
              <div className='most_recent__heading'>{data.content.most_recent || 'Most Recent'}</div>
            </SbEditable>

            {latest.map(item => (
              <Link to={`/${item.full_slug}`} key={item.id} className='most_recent__item'>
                <div className='most_recent__image'>
                  <img src={item.content.top ? item.content.top[0].image : ''} alt='' />
                </div>

                <div className='most_recent__text'>
                  <div className='most_recent__title'>{item.content.top ? item.content.top[0].title : ''}</div>
                  <p className='most_recent__date'>{moment(item.content.date).format('ll')}</p>
                </div>

                <div className='line' />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default withRouteData(
  connect(({ lng }) => ({
    lng,
  }))(NewsItem)
)
