import React from 'react'
import SbEditable from 'storyblok-react'
import LazyLoad from 'react-lazyload'

export default class SuccessStory extends React.Component {
  render() {
    return (
      <div>
        <div className='success__item'>
          <div className='success__top'>
            <div className='success__image'>
              <LazyLoad height='200'>
                <img
                  src={`//img2.storyblok.com/fit-in/360x240/filters:fill(transparent):format(jpg)${this.props.image.replace(
                    '//a.storyblok.com',
                    ''
                  )}`}
                  alt=''
                />
              </LazyLoad>
            </div>
            <div className='heading--small bold sucess__heading'>{this.props.title}</div>
          </div>

          <div className='success__content'>
            <p className='paragraph--sans'>{this.props.text}</p>
            <SbEditable content={this.props.read_more}>
              <a href={this.props.link} className='button button--green button--arrow'>
                {this.props.read_more.text || 'READ MORE'}
                <span className='icon-button-arrow' />
              </a>
            </SbEditable>
          </div>
        </div>
      </div>
    )
  }
}
