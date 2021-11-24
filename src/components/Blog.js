import React from 'react'
import moment from 'moment'
import LinesEllipsis from 'react-lines-ellipsis'

const ReactMarkdown = require('react-markdown')

export default class Blog extends React.Component {
  render() {
    return (
      <div className='blog__item'>
        <a href={this.props.link} className='blog__tile'>
          <p className='blog__date'>{moment(this.props.date).format('ll')}</p>
          <div className='heading--small bold heading--green'>{this.props.title}</div>
          <div className='paragraph--sans blog__container__text'>
            <ReactMarkdown escapeHtml={false} source={this.props.text} />
          </div>

          <i className='icon-arrow-circle' />
        </a>
      </div>
    )
  }
}
