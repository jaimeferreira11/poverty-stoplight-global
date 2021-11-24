import React from 'react'
import showdown from 'showdown'
import LazyLoad from 'react-lazyload'

import inIcon from '../images/in-icon.png'
import twIcon from '../images/tw-icon.png'
import close from '../images/close.svg'
import './StaffMember.css'

const converter = new showdown.Converter()

const TeamMemberPopup = props => (
  <div className='popup'>
    <img className='closeIcon' src={close} alt='' onClick={props.closePopup} onKeyDown={props.closePopup} />
    <div className='col-custom-image'>
      <div
        className='popup__image'
        style={{
          backgroundImage: `url(//img2.storyblok.com/fit-in/300x300${props.src.replace('//a.storyblok.com', '')})`,
        }}
      />
    </div>
    <div className='col-custom-text sm:overflow-auto'>
      <div className='popup__name'>{props.name}</div>
      <div className='staff__title popup__title'>{props.title}</div>
      <div
        className='rich-text popup__bio'
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(props.bio),
        }}
      />
    </div>
  </div>
)

// class TeamMemberPopup extends React.Component {
//   constructor(props) {
//     super(props)
//     this.modalCover = React.createRef()
//     this.escFunction = this.escFunction.bind(this)
//   }
//   escFunction = event => {
//     if (event.keyCode === 27) {
//       this.close()
//     }
//   }

//   render() {
//     return (
//       <div
//         className={`z-20  transition-all duration-300 fixed bg-black top-0 bottom-0 left-0 right-0 ${
//           this.props.show ? 'visible opacity-100 pointer-events-auto' : 'opacity-0 invisible'
//         } flex items-center justify-center`}
//         onClick={e => {
//           e.target === this.modalCover.current ? this.props.closePopup() : null
//         }}
//         style={{ overScrollBehavior: 'none', backgroundColor: 'rgba(0,0,0,0.7) ' }}
//         ref={this.modalCover}
//       >
//         <div className='relative m-4 overflow-auto bg-white rounded-lg md:max-w-2xl lg:max-w-5xl lg:w-full'>
//           <div className='flex flex-col px-8 py-6 pointer-events-auto'>
//             <img
//               className='closeIcon'
//               src={close}
//               alt=''
//               onClick={this.props.closePopup}
//               onKeyDown={this.props.closePopup}
//             />
//             <div className='col-custom-image'>
//               <div
//                 className='popup__image'
//                 style={{
//                   backgroundImage: `url(//img2.storyblok.com/fit-in/300x300${this.props.src.replace(
//                     '//a.storyblok.com',
//                     ''
//                   )})`,
//                 }}
//               />
//             </div>
//             <div className='text-left col-custom-text'>
//               <div className='popup__name'>{this.props.name}</div>
//               <div className='staff__title popup__title'>{this.props.title}</div>
//               <div
//                 className='rich-text popup__bio'
//                 dangerouslySetInnerHTML={{
//                   __html: converter.makeHtml(this.props.bio),
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

export default class StaffMember extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPopupOpen: false,
    }
  }
  openPopup = () => {
    this.setState({ isPopupOpen: true })
  }

  closePopup = () => {
    this.setState({ isPopupOpen: false })
  }
  render() {
    const { isPopupOpen } = this.state
    return (
      <div className='staff'>
        {isPopupOpen && (
          <TeamMemberPopup
            name={this.props.name}
            closePopup={this.closePopup}
            title={this.props.title}
            bio={this.props.bio}
            src={this.props.src}
          />
        )}
        <LazyLoad height='200'>
          <div
            className='staff__image'
            style={{
              backgroundImage: `url(//img2.storyblok.com/fit-in/300x300${this.props.src.replace(
                '//a.storyblok.com',
                ''
              )})`,
            }}
            onClick={this.openPopup}
          />
          <div className='staff__name'>{this.props.name}</div>
          <div className='staff__title'>{this.props.title}</div>

          {this.props.linkedIn && (
            <a href={this.props.linkedIn} target='_blank' rel='noopener noreferrer'>
              <img className='staff__icon inIcon-border' src={inIcon} alt='' />
            </a>
          )}
          {this.props.twitter && (
            <a href={this.props.twitter} target='_blank' rel='noopener noreferrer'>
              <img className='staff__icon twIcon-border' src={twIcon} alt='' />
            </a>
          )}
        </LazyLoad>
      </div>
    )
  }
}
