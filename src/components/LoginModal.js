import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouteData } from 'react-static'
import axios from 'axios'
import SbEditable from 'storyblok-react'

import { serverURL } from '../config'
import { setUser } from '../redux/actionCreators'
import { getParameterByName } from '../utils'
import loginImg from '../images/login-img.jpg'

class LoginModal extends React.Component {
  constructor(props) {
    super(props)
    this.modalCover = React.createRef()
    this.escFunction = this.escFunction.bind(this)

    this.state = {
      successMessage: '',
      formInputs: {
        email: '',
        password: '',
        repeatPassword: '',
      },
      formError: '',
      submitting: false,
    }
  }

  formInputsChange = e => {
    this.setState({
      formInputs: {
        ...this.state.formInputs,
        [e.target.id]: e.target.value,
      },
    })
  }

  submitLoginForm = async e => {
    e.preventDefault()

    this.setState({ submitting: true, formError: '', successMessage: '' })

    try {
      const loginResponse = await axios.post(`${serverURL}/login`, {
        email: this.state.formInputs.email,
        password: this.state.formInputs.password,
      })
      if (loginResponse.data.error) {
        this.setState({ formError: loginResponse.data.error })
      } else {
        this.props.history.push('/')
        this.props.dispatch(setUser(loginResponse.data.user))
        this.close()
      }
    } catch (err) {
      this.setState({ formError: err.message })
    }

    this.setState({ submitting: false })
  }
  resetPassword = async e => {
    e.preventDefault()

    this.setState({ submitting: true, formError: '', successMessage: '' })

    if (this.state.formInputs.password != this.state.formInputs.repeatPassword) {
      this.setState({ formError: "Passwords don't match", submitting: false })
    } else {
      try {
        const resetPasswordResponse = await axios.post(`${serverURL}/resetPassword`, {
          password: this.state.formInputs.password,
          id: getParameterByName('id'),
          token: getParameterByName('token'),
        })

        this.setState({
          formError: resetPasswordResponse.data.error,
          successMessage: resetPasswordResponse.data.success,
        })
        if (!resetPasswordResponse.data.error) {
          this.openScreen('login')
        }
      } catch (err) {
        this.setState({ formError: 'Error. Please try again!' })
      }

      this.setState({ submitting: false })
    }
  }

  forgotPassword = async e => {
    e.preventDefault()

    this.setState({ submitting: true, formError: '', successMessage: '' })
    try {
      const forgotPasswordResponse = await axios.post(`${serverURL}/forgotPassword`, {
        email: this.state.formInputs.email,
      })

      if (forgotPasswordResponse.data.error) {
        this.setState({ formError: forgotPasswordResponse.data.error })
      } else {
        this.openScreen('checkYourEmail')
      }
    } catch (err) {
      this.setState({ formError: 'Error. Please try again!' })
    }

    this.setState({ submitting: false })
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      this.close()
    }
  }
  resetState = () => {
    this.setState({
      formError: '',
      submitting: false,
      formInputs: {
        email: '',
        password: '',
        repeatPassword: '',
      },
    })
  }
  openScreen = newScreen => {
    this.props.setScreenPage(newScreen)
    this.resetState()
  }

  close = () => {
    this.props.close()
    this.setState({ successMessage: '' })
    this.resetState()
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  render() {
    const { forgot_password_modal, login_modal, verification_link_modal, reset_password_modal } = this.props.modalStory

    return (
      <div
        className={`z-20  transition-all duration-300 fixed bg-black top-0 bottom-0 left-0 right-0 ${
          this.props.show ? 'visible opacity-100 pointer-events-auto' : 'opacity-0 invisible'
        } flex items-center justify-center`}
        onClick={e => {
          e.target === this.modalCover.current ? this.close() : null
        }}
        style={{ overScrollBehavior: 'none', backgroundColor: 'rgba(0,0,0,0.7) ' }}
        ref={this.modalCover}
      >
        <div className='relative m-4 overflow-auto bg-gray-100 rounded-lg md:max-w-2xl lg:max-w-5xl lg:w-full'>
          <button
            type='button'
            className='absolute z-30 flex p-1 bg-transparent border-none'
            style={{ right: 12, top: 15 }}
            onClick={this.close}
          >
            <svg
              onClick={this.close}
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M21.6953 2.13642L13.0317 10.6109L21.6953 19.0853L19.5112 21.2217L10.8477 12.7473L2.18409 21.2217L0 19.0853L8.66356 10.6109L0 2.13642L2.18409 0L10.8477 8.47446L19.5112 0L21.6953 2.13642Z'
                fill='#6CB864'
              />
            </svg>
          </button>

          <div className='flex pointer-events-auto'>
            {login_modal && (
              <SbEditable key={login_modal[0]._uid} content={login_modal[0]}>
                <div
                  className='w-0 bg-cover lg:w-1/2 '
                  style={{ backgroundImage: `url("${login_modal[0].modal_image.filename}")` }}
                />
              </SbEditable>
            )}
            <div
              style={{ height: 519 }}
              className='relative flex flex-col w-full p-4 md:max-w-2xl sm:px-6 lg:w-1/2 lg:px-10'
            >
              {this.props.screenStatePage === 'login' && login_modal && (
                <SbEditable key={login_modal[0]._uid} content={login_modal[0]}>
                  <div className='m-auto'>
                    <div></div>
                    <h3 className='mb-1 font-medium text-md text-dark '>{login_modal[0].welcome}</h3>
                    <h2 className='mb-3 text-2xl font-semibold leading-none text-dark sm:text-4xl sm:mb-6'>
                      {login_modal[0].title}
                    </h2>
                    <p style={{ color: '#676B70' }} className='mb-4 leading-normal font-work'>
                      {login_modal[0].login_text}
                    </p>
                    <form onSubmit={this.submitLoginForm}>
                      <div className='w-full mb-3 '>
                        <label className='block text-xs sm:text-sm text-dark' htmlFor='email'>
                          {login_modal[0].input_email}
                        </label>
                        <input
                          required
                          id='email'
                          onChange={this.formInputsChange}
                          value={this.state.formInputs.email}
                          type='email'
                          className='block w-full p-1 mb-5 bg-transparent border-b border-black border-none appearance-none md:p-2 focus:outline-none border-solid-b'
                          style={{ borderBottomStyle: 'solid' }}
                        />
                      </div>

                      <div className='relative w-full mb-3'>
                        <label className='block text-xs sm:text-sm text-dark ' htmlFor='password'>
                          {login_modal[0].input_password}
                        </label>
                        <input
                          required
                          onChange={this.formInputsChange}
                          id='password'
                          value={this.state.formInputs.password}
                          type='password'
                          className='block w-full p-1 mb-5 bg-transparent border-b border-black border-none appearance-none md:p-2 focus:outline-none border-solid-b'
                          style={{ borderBottomStyle: 'solid' }}
                        />
                        <div className='flex justify-between'>
                          <button
                            onClick={() => this.openScreen('forgotPassword')}
                            type='button'
                            className='self-end block bg-transparent border-none'
                          >
                            <span className='text-sm underline text-green'>{login_modal[0].input_forgot_password}</span>
                          </button>
                          <button
                            disabled={this.state.submitting}
                            className='px-12 py-2 mb-6 font-bold text-white whitespace-no-wrap border-none rounded-lg outline-none lg:mb-0 focus:outline-none bg-green hover:bg-green-700'
                            type='submit'
                            style={{ transition: 'background-color .15s ease' }}
                          >
                            <span className='text-sm font-normal'>
                              {this.state.submitting ? login_modal[0].logging_in_state : login_modal[0].login_button}
                            </span>
                          </button>
                        </div>

                        <div className='flex flex-col items-center mt-3 mb-6 text-center lg:items-center lg:flex-row'>
                          <span className='ml-3 text-base font-normal font-work text-error '>
                            {this.state.formError}
                          </span>
                          <span className='ml-3 text-base font-normal font-work text-green '>
                            {this.state.successMessage}
                          </span>
                        </div>
                      </div>
                    </form>
                    <div>
                      <p className='inline-flex mb-0 text-sm font-normal leading-normal font-work text-light sm:text-base'>
                        {login_modal[0].loggin_info1}
                      </p>
                      <div className='flex'>
                        <p className='inline-flex mb-3 mr-2 text-sm font-normal leading-normal font-work text-light sm:text-base'>
                          {login_modal[0].loggin_info2}
                        </p>
                        <Link
                          to={`/${this.props.lng}/join`}
                          onClick={this.close}
                          className='inline-flex text-base font-normal font-bold font-work text-green'
                        >
                          {login_modal[0].join}
                        </Link>
                      </div>
                    </div>
                  </div>
                </SbEditable>
              )}

              {this.props.screenStatePage === 'forgotPassword' && forgot_password_modal && (
                <SbEditable key={forgot_password_modal[0]._uid} content={forgot_password_modal[0]}>
                  <div className='m-auto '>
                    <p className='mb-10'>{forgot_password_modal[0].forgot_password_text}</p>
                    <form onSubmit={this.forgotPassword}>
                      <div className='w-full mt-2 '>
                        <label className='block text-xs sm:text-sm text-dark' htmlFor='email'>
                          {forgot_password_modal[0].forgot_password_email}
                        </label>
                        <input
                          required
                          id='email'
                          type='email'
                          onChange={this.formInputsChange}
                          value={this.state.formInputs.email}
                          className='block w-full p-1 mb-5 bg-transparent border-b border-black border-none appearance-none md:p-2 focus:outline-none border-solid-b'
                          style={{ borderBottomStyle: 'solid' }}
                        />
                      </div>
                      <div className='flex flex-col items-center mt-3 mt-20 mb-6 text-center lg:mx-2 lg:items-center lg:flex-row '>
                        <button
                          disabled={this.state.submitting}
                          className='px-12 py-2 font-bold text-white rounded-lg lg:mb-0 focus:outline-none bg-green hover:bg-green-700'
                          type='submit'
                          style={{ transition: 'background-color .15s ease' }}
                        >
                          <span className='text-sm font-normal'>
                            {this.state.submitting
                              ? forgot_password_modal[0].forgot_password_checking_email
                              : forgot_password_modal[0].forgot_password_reset_button}
                          </span>
                        </button>
                        <span className='ml-3 text-base font-normal font-work text-error '>{this.state.formError}</span>
                      </div>
                    </form>
                  </div>
                </SbEditable>
              )}
              {this.props.screenStatePage === 'checkYourEmail' && (
                <div className='flex flex-col m-auto'>
                  {verification_link_modal && (
                    <SbEditable key={verification_link_modal[0]._uid} content={verification_link_modal[0]}>
                      <span>{verification_link_modal[0].verification_text}</span>
                    </SbEditable>
                  )}
                </div>
              )}
              {this.props.screenStatePage === 'resetPassword' && reset_password_modal && (
                <SbEditable key={reset_password_modal[0]._uid} content={reset_password_modal[0]}>
                  <div>
                    <h3 className='mb-2 font-medium text-md text-dark '>{reset_password_modal[0].intro}</h3>
                    <h2 className='mb-3 text-2xl font-semibold leading-none text-dark sm:text-5xl'>
                      {reset_password_modal[0].welcome}
                    </h2>
                    <p className='mt-10'>{reset_password_modal[0].confirm_password_text}</p>
                    <form onSubmit={this.resetPassword}>
                      <label className='block text-xs sm:text-sm text-dark ' htmlFor='password'>
                        {reset_password_modal[0].new_password}
                      </label>
                      <input
                        required
                        onChange={this.formInputsChange}
                        id='password'
                        value={this.state.formInputs.password}
                        type='password'
                        className='block w-full p-1 mb-5 bg-transparent border-b border-black border-none appearance-none md:p-2 focus:outline-none border-solid-b'
                        style={{ borderBottomStyle: 'solid' }}
                      />
                      <label className='block text-xs sm:text-sm text-dark ' htmlFor='password'>
                        {reset_password_modal[0].confirm_password_label}
                      </label>
                      <input
                        required
                        onChange={this.formInputsChange}
                        id='repeatPassword'
                        value={this.state.formInputs.repeatPassword}
                        type='password'
                        className='block w-full p-1 mb-5 bg-transparent border-b border-black border-none appearance-none md:p-2 focus:outline-none border-solid-b'
                        style={{ borderBottomStyle: 'solid' }}
                      />
                      <div className='flex flex-col items-center mt-3 mt-20 mb-6 text-center lg:mx-2 lg:items-center lg:flex-row '>
                        <button
                          className='px-12 py-2 font-bold text-white rounded-lg lg:mb-0 focus:outline-none bg-green hover:bg-green-700'
                          type='submit'
                          disabled={this.state.submitting}
                          style={{ transition: 'background-color .15s ease' }}
                        >
                          <span className='text-sm font-normal'>
                            {this.state.submitting
                              ? reset_password_modal[0].resetting_button_state
                              : reset_password_modal[0].reset_button}
                          </span>
                        </button>
                        <span className='ml-3 text-base font-normal font-work text-error '>{this.state.formError}</span>
                      </div>
                    </form>
                  </div>
                </SbEditable>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(
  connect(({ lng, user }) => ({
    lng,
    user,
  }))(LoginModal)
)
