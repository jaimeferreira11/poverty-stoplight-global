import React from 'react'
import Collapsible from 'react-collapsible'

import greenArrow from '../images/link-arrow-green.svg'

class CollapsableComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='wrapper'>
        <Collapsible
          trigger={
            <div className='bold colapsable__heading wrapper'>
              <img className='collapsable__arrow' src={greenArrow} alt='' />
              {this.props.triggerText}
            </div>
          }
          triggerWhenOpen={
            <div className='bold colapsable__heading wrapper'>
              <img className='collapsable__arrow collapsable__arrow--down' src={greenArrow} alt='' />
              {this.props.triggerText}
            </div>
          }
        >
          <div className='rich-text collapsible__content' dangerouslySetInnerHTML={{ __html: this.props.content }} />

          {this.props.pdf && (
            <a
              href={this.props.pdf.file}
              target='_blank'
              rel='noopener noreferrer'
              className='green-button-new'
              style={{ marginLeft: 50 }}
            >
              Download
              <span className='icon-button-arrow' />
            </a>
          )}
        </Collapsible>
      </div>
    )
  }
}

export default CollapsableComponent
