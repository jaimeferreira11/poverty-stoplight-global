import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouteData, withRouter } from 'react-static'
import axios from 'axios'
import { getParameterByName } from './utils'
import NavBar from './NavBar'
import { serverURL } from './config'
import { setLanguage, setUser } from './redux/actionCreators'
import LoginModal from './components/LoginModal'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      isMobileMenuOpen: false,
      activeDropdownIndex: false,
      showModal: false,
      loggingOut: false,
      screenState: 'login',
    }

    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
  }
  requestUser = async () => {
    try {
      let userResponse = await axios.get(`${serverURL}/user`)
      if (userResponse.data.user) {
        this.props.dispatch(setUser(userResponse.data.user))
      } else {
        let resetPasswordId = getParameterByName('id')
        let resetPasswordToken = getParameterByName('token')
        if (resetPasswordId && resetPasswordToken) {
          this.openModal('resetPassword')
        }
      }
    } catch (err) {
      console.log(err)
    }
    this.setState({ loading: false })
  }

  componentDidMount() {
    this.requestUser()

    if (window.location.pathname.includes('/es/')) {
      this.props.dispatch(setLanguage('es'))
    } else if (window.location.pathname.includes('/en/')) {
      this.props.dispatch(setLanguage('en'))
    }
  }
  handleLanguageChange(lng) {
    this.props.dispatch(setLanguage(lng))

    this.props.history.push(`/${lng}${window.location.pathname.replace(/\/en|\/es/g, '')}`)
  }

  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
  }

  toggleMobileMenuDropdown(index) {
    if (this.state.activeDropdownIndex === index) {
      return this.setState({ activeDropdownIndex: false })
    }
    this.setState({ activeDropdownIndex: index })
  }

  openModal(page) {
    this.setState({ showModal: true, screenState: page })
  }

  closeModal() {
    this.setState({ showModal: false })
  }
  logOut = async () => {
    this.setState({
      loggingOut: true,
    })
    try {
      await axios.post(`${serverURL}/logout`)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    this.setState({
      loggingOut: false,
    })
  }

  render() {
    const headerStory = this.props.header || { content: { Links: [] } }

    return (
      <div>
        {this.state.loading && (
          <div className='relative flex h-22'>
            <div className='spinner' />
          </div>
        )}

        {!this.state.loading && (
          <div>
            <NavBar
              logOut={this.logOut}
              user={this.props.user}
              lng={this.props.lng}
              loggingOut={this.state.loggingOut}
              openModal={screen => this.openModal(screen)}
              headerStory={headerStory}
              handleLanguageChange={lng => this.handleLanguageChange(lng)}
            />
            <LoginModal
              modalStory={!!headerStory.content.Modal && headerStory.content.Modal[0]}
              screenStatePage={this.state.screenState}
              setScreenPage={screen => this.openModal(screen)}
              show={this.state.showModal}
              close={() => this.closeModal()}
            />
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(
  withRouteData(
    connect(({ lng, user }) => ({
      lng,
      user,
    }))(Header)
  )
)
