import React from 'react'
import './Lightbox.css'

class Lightbox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isViewerOpen: false,
    }

    this.toggleViewer = this.toggleViewer.bind(this)
  }

  toggleViewer(state) {
    this.setState({ isViewerOpen: state })
  }

  forceDownload(blob, filename) {
    const a = document.createElement('a')
    a.download = filename
    a.href = blob
    a.click()
  }

  // Current blob size limit is around 500MB for browsers
  downloadResource = (url, filename) => {
    if (!filename) {
      filename = url.split('\\').pop().split('/').pop()
    }
    url = url.replace('a.storyblok', 's3.amazonaws.com/a.storyblok')
    fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: 'cors',
    })
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = window.URL.createObjectURL(blob)
        this.forceDownload(blobUrl, filename)
      })
      .catch(e => e)
  }

  render() {
    return (
      <div className='content__image' style={{ display: 'inline-block' }}>
        {this.state.isViewerOpen && (
          <div>
            <div className='lightbox__overlay' onClick={() => this.toggleViewer(false)} />
            <div className='center--absolute'>
              <img src={this.props.src} className='lighbox__image ' />
              <button
                className='button button--white button--arrow lightbox__button'
                onClick={() => this.downloadResource(this.props.src)}
                target='_blank'
                download='poverty-stoplight-image'
              >
                DOWNLOAD <span className='icon-button-arrow' />
              </button>
            </div>
          </div>
        )}
        <img
          src={`//img2.storyblok.com/fit-in/300x200/filters:fill(transparent):format(png)${this.props.src.replace(
            '//a.storyblok.com',
            ''
          )}`}
          onClick={() => this.toggleViewer(true)}
        />
      </div>
    )
  }
}

export default Lightbox
