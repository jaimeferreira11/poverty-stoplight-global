import moment from 'moment'
import React from 'react'
import LazyLoad from 'react-lazyload'
import { Link, withRouteData } from 'react-static'

import './NewsComponent.css'

class NewsComponent extends React.Component {
  render() {
    const { date, title, image, author, slug, description, more, match, key } = this.props

    const shorten = (s, l) => {
      if (s && s.length > l) {
        return `${(s.match(new RegExp(`.{${l}}\\S*`)) || [s])[0]}...`
      }
      return s
    }

    return (
      <div className='newsitem'>
        <LazyLoad height='200'>
          <div
            style={{
              backgroundImage: `url(${image})`,
            }}
            alt=''
            className='newsitem-image'
          />
        </LazyLoad>
        <div className='newsitem-content'>
          <div className='date newsitem-date'>{moment(date).format('ll')}</div>
          <div className='newsitem-author'>by {author}</div>
          <div className='newsitem-title'>{shorten(title, 40)}</div>
          <div className='paragraph--sans newsitem-description'>{shorten(description, 120)}</div>
          <Link to={`${match.url}/${slug}`} className='newsitem-readmore'>
            {more || 'Read More'}
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouteData(NewsComponent)
