import React from 'react'
import SbEditable from 'storyblok-react'
import Blog from './Blog.js'
import arrow_white from '../images/link-arrow-white.svg'
import './BlogComponent.css'

class BlogComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, button, posts } = this.props

    return (
      <div className='blog'>
        <div className='wrapper'>
          <SbEditable content={title}>
            <div className='heading--small text--white'>{title.text}</div>
          </SbEditable>
          <div className='blog__holder'>
            {posts.map((item, i) => {
              if (i <= 5) {
                return <Blog key={i} date={item.pubDate} title={item.title} text={item.content} link={item.guid} />
              }
            })}
          </div>
        </div>
        <div className='wrapper'>
          <SbEditable content={button}>
            <a
              href={button.link}
              target='_blank'
              rel='noopener noreferrer'
              className='button button--green button--arrow'
            >
              {button.label || 'READ MORE'}
              <span className='icon-button-arrow' />
            </a>
          </SbEditable>
        </div>
      </div>
    )
  }
}

export default BlogComponent
