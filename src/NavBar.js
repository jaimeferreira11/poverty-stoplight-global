import React, { Component } from 'react'
import SbEditable from 'storyblok-react'
import { Link } from 'react-static'
import cls from 'classnames'

import psLogo from './images/ps-logo.png'
import './NavBar.css'
import { serverURL } from './config'

export default class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isMobileMenuOpen: false,
      activeDropdownIndex: false,
    }
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this)
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

  render() {
    const headerStory = this.props.headerStory
    const header = headerStory.content.Links
    return (
      <div>
        <header style={{ minHeight: 90 }} className='relative flex justify-between overflow-visible bg-white'>
          <SbEditable content={headerStory.content}>
            <div className='flex items-center md:px-3'>
              <Link to={this.props.lng == 'es' ? '/es' : '/'}>
                <img src={headerStory.content.logo || psLogo} alt='' className='p-2 h-22' />{' '}
              </Link>
            </div>
          </SbEditable>
          <div className='flex md:hidden'>
            <button
              className='pt-2 transition-all duration-100 bg-transparent border-0 border-b-4 border-transparent border-solid hover:border-green-400 group'
              onClick={this.toggleMobileMenu}
            >
              <span className='text-sm font-light'>MENU</span>
              <span style={{ color: '#c8c8c9', fontSize: '0.5rem' }} className='ml-1 icon-caret-down' />
            </button>
          </div>

          <nav className='flex-wrap hidden w-full mr-auto border-0 border-gray-300 border-solid md:flex md:border-l'>
            {header.map(col => {
              if (['Footer Links', 'Auth List Of Links'].includes(col.component)) {
                if (col.component == 'Auth List Of Links' && !this.props.user) {
                  return ''
                }

                return (
                  <SbEditable key={`cal-${col._uid}`} content={col}>
                    <div className='box-border relative flex px-2 pt-2 overflow-visible text-gray-600 border-0 border-b-4 border-transparent border-solid customDropdownParent group hover:border-green-400'>
                      <button className='flex items-center bg-transparent border-none'>
                        <span
                          className={cls('mr-2 text-sm  truncate', {
                            'text-green-500': col.component == 'Auth List Of Links',
                            'text-gray-600': col.component != 'Auth List Of Links',
                          })}
                        >
                          {col.content.filter(el => el.component === 'Section Title')[0].text}
                        </span>
                        <span
                          style={{
                            color: col.component == 'Auth List Of Links' ? '#4ca948' : '#c8c8c9',
                            fontSize: '0.5rem',
                          }}
                          className='ml-1 icon-caret-down'
                        />
                      </button>

                      <div
                        style={{ transform: 'translate(-50%,0%)', left: '50%', top: 'calc(100% + 4px)' }}
                        className='absolute z-10 flex-col hidden customDropdownChild'
                      >
                        {col.content.map(el => {
                          if (el.component == 'Text') {
                          }
                          if (el.component === 'Link') {
                            return el.file ? (
                              <a
                                className='w-full px-6 py-4 text-sm text-white no-underline truncate bg-green-500 hover:bg-green-800'
                                href={el.file}
                                target='_blank'
                                rel='noopener noreferrer'
                                key={`je-${el._uid}`}
                              >
                                {el.label}
                              </a>
                            ) : !el.link.url || !/^http/.test(el.link.url) ? (
                              <Link
                                className='w-full px-6 py-4 text-sm text-white no-underline truncate bg-green-500 hover:bg-green-800'
                                to={`/${el.link.cached_url}`}
                                key={`je-${el._uid}`}
                              >
                                <div>{el.label}</div>
                              </Link>
                            ) : (
                              <a
                                key={`ja-${el._uid}`}
                                className='w-full px-6 py-4 text-sm text-white no-underline truncate bg-green-500 hover:bg-green-800'
                                href={`${el.link.url}`}
                              >
                                <div>{el.label}</div>
                              </a>
                            )
                          } else if (el.component == 'Text' && this.props.user && this.props.user.role == 'admin') {
                            return (
                              <a
                                key={`je-${el._uid}`}
                                className='w-full px-6 py-4 text-sm text-white no-underline truncate bg-green-500 hover:bg-green-800'
                                href={`${serverURL}/users`}
                                target='_blank'
                              >
                                {el.text}
                              </a>
                            )
                          }
                          return ''
                        })}
                      </div>
                    </div>
                  </SbEditable>
                )
              }

              return ''
            })}

            <div className='flex items-center ml-auto border-0 border-gray-300 border-solid lg:border-l'>
              {!this.props.user && (
                <div className='h-full'>
                  {header.map(col => {
                    if (col.component == 'Join Button') {
                      return (
                        <a
                          href={`/${col.link.cached_url}`}
                          className='flex items-center h-full px-5 no-underline text-light '
                        >
                          <span className='text-center text-green-500 text-md'>{col.label}</span>
                        </a>
                      )
                    }
                  })}
                </div>
              )}

              <div className='relative flex items-center h-full ml-3 mr-6 overflow-visible cursor-pointer customDropdownParent'>
                <div className='flex bg-transparent border-none'>
                  <span className='mr-2 text-sm text-gray-600 truncate '>
                    {this.props.lng === 'en' ? 'English' : 'Español'}
                  </span>
                  <span style={{ color: '#c8c8c9', fontSize: '0.5rem' }} className='self-center ml-1 icon-caret-down' />
                </div>

                <button
                  onClick={() => this.props.handleLanguageChange(this.props.lng === 'en' ? 'es' : 'en')}
                  style={{ top: '100%' }}
                  className='absolute z-30 flex justify-center hidden w-full py-6 bg-green-500 border-none customDropdownChild'
                >
                  <span className='text-sm text-white truncate'>{this.props.lng !== 'en' ? 'English' : 'Español'}</span>
                </button>
              </div>
              <div className='relative flex items-center h-full text-center text-white no-underline bg-green-500 cursor-pointer customDropdownParent '>
                {!this.props.user ? (
                  <div onClick={() => this.props.openModal('login')} className='flex items-center w-full h-full px-6'>
                    <span className='mr-3 icon-lock ' />
                    <span className='self-center py-3'>
                      {header.map(col => {
                        if (col.component == 'Sign Button') {
                          return col.label
                        }
                      })}
                    </span>
                  </div>
                ) : (
                  <div className='flex overflow-visible text-white'>
                    <div
                      className={cls('w-12 h-12 ml-5 rounded-full', {
                        'bg-white': !this.props.user.profileImage,
                      })}
                    >
                      <img
                        className={`w-full h-full rounded-full ${
                          this.props.user.profileImage ? '' : 'border border-gray-200'
                        }`}
                        src={this.props.user.profileImage || ''}
                        alt=''
                      />
                    </div>

                    <span style={{ fontSize: '0.8rem' }} className='self-center ml-1 ml-3 mr-5 icon-caret-down' />
                    <div
                      style={{ top: '100%' }}
                      className='absolute z-30 flex flex-col hidden w-full bg-green-500 border-none customDropdownChild'
                    >
                      {/* <button className='py-3 text-white bg-green-500 border-0 hover:bg-green-700'>Profile</button> */}
                      <button
                        onClick={this.props.loggingOut ? undefined : () => this.props.logOut()}
                        className='py-3 text-white bg-green-500 border-0 hover:bg-green-700'
                      >
                        {this.props.loggingOut ? 'Logging Out' : 'Log Out'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>

        {this.state.isMobileMenuOpen ? (
          <div className='flex flex-col md:hidden'>
            <nav className='flex flex-col border-0 border-t border-gray-300 border-solid'>
              {header.map((col, i) => {
                if (['Footer Links', 'Auth List Of Links'].includes(col.component)) {
                  if (col.component == 'Auth List Of Links' && !this.props.user) {
                    return ''
                  }
                  return (
                    <SbEditable key={`footer-${col._uid}`} content={col}>
                      <div className='flex flex-col items-start' onClick={() => this.toggleMobileMenuDropdown(i)}>
                        <button className='flex w-full p-5 bg-transparent border-none'>
                          <span
                            className={cls('self-start mr-2 text-sm', {
                              'text-green-500': col.component == 'Auth List Of Links',
                              'text-gray-600': col.component != 'Auth List Of Links',
                            })}
                          >
                            {col.content.filter(el => el.component === 'Section Title')[0].text}
                          </span>
                          <span
                            style={{
                              color: col.component == 'Auth List Of Links' ? '#4ca948' : '#c8c8c9',
                              fontSize: '0.5rem',
                            }}
                            className='self-center ml-1 icon-caret-down'
                          />
                        </button>

                        <div
                          className={cls('flex flex-col bg-green-500 w-full py-2', {
                            hidden: this.state.activeDropdownIndex !== i,
                          })}
                        >
                          {col.content.map(el => {
                            if (el.component === 'Link') {
                              return !el.link.url || !/^http/.test(el.link.url) ? (
                                <Link
                                  className='w-full px-5 py-4 text-sm text-white no-underline hover:bg-green-800'
                                  onClick={this.toggleMobileMenu}
                                  to={`/${el.link.cached_url}`}
                                  key={`footer-${el._uid}`}
                                >
                                  <div>{el.label}</div>
                                </Link>
                              ) : (
                                <a
                                  key={`footer-${el._uid}`}
                                  className='w-full px-5 py-4 text-sm text-white no-underline hover:bg-green-800'
                                  href={`${el.link.url}`}
                                >
                                  <div>{el.label}</div>
                                </a>
                              )
                            } else if (el.component == 'Text' && this.props.user && this.props.user.role == 'admin') {
                              return (
                                <a
                                  key={`footer-${el._uid}`}
                                  className='w-full px-5 py-4 text-sm text-white no-underline hover:bg-green-800'
                                  href={`${serverURL}/users`}
                                  target='_blank'
                                >
                                  {el.text}
                                </a>
                              )
                            }
                            return ''
                          })}
                        </div>
                      </div>
                    </SbEditable>
                  )
                }

                return ''
              })}
            </nav>
            <nav className='flex flex-col border-0 border-t border-gray-300 border-solid'>
              <div className='flex items-center justify-between'>
                {!this.props.user ? (
                  <div className='flex justify-center w-1/2 h-full '>
                    {header.map(col => {
                      if (col.component == 'Join Button') {
                        return (
                          <a
                            href={`/${col.link.cached_url}`}
                            className='flex items-center justify-center w-full h-full px-5 py-5 no-underline text-light'
                          >
                            <span className='text-center text-green-500 text-md'>{col.label}</span>
                          </a>
                        )
                      }
                    })}
                  </div>
                ) : (
                  <div className='relative flex justify-center w-1/2 py-3 overflow-visible text-white bg-green-700 cursor-pointer customDropdownParent'>
                    <div
                      className={cls('w-12 h-12 ml-5 rounded-full', {
                        'bg-white': !this.props.user.profileImage,
                      })}
                    >
                      <img
                        className={`w-full h-full rounded-full ${
                          this.props.user.profileImage ? '' : 'border border-gray-200'
                        }`}
                        src={this.props.user.profileImage || ''}
                        alt=''
                      />
                    </div>
                    <span style={{ fontSize: '0.8rem' }} className='self-center ml-3 mr-5 icon-caret-down' />
                    <div
                      style={{ top: '100%' }}
                      className='absolute z-30 flex flex-col hidden w-full bg-green-500 border-none customDropdownChild'
                    >
                      {/* <button className='py-3 text-white bg-green-500 border-0 hover:bg-green-700'>Profile</button> */}

                      <button
                        onClick={this.props.loggingOut ? undefined : () => this.props.logOut()}
                        className='py-3 text-white bg-green-500 border-0 hover:bg-green-700'
                      >
                        {this.props.loggingOut ? 'Logging Out' : 'Log Out'}
                      </button>
                    </div>
                  </div>
                )}

                <div className='relative flex justify-center w-1/2 py-5 overflow-visible cursor-pointer customDropdownParent'>
                  <div className='bg-transparent border-none '>
                    <span className='mr-2 text-sm text-gray-600 truncate '>
                      {this.props.lng === 'en' ? 'English' : 'Español'}
                    </span>
                    <span
                      style={{ color: '#c8c8c9', fontSize: '0.5rem' }}
                      className='self-center ml-1 icon-caret-down'
                    />
                  </div>

                  <button
                    onClick={() => this.props.handleLanguageChange(this.props.lng === 'en' ? 'es' : 'en')}
                    style={{ top: '100%' }}
                    className='absolute z-30 flex justify-center hidden w-full py-6 bg-white bg-green-500 border-none customDropdownChild'
                  >
                    <span className='text-sm text-white truncate'>
                      {this.props.lng !== 'en' ? 'English' : 'Español'}
                    </span>
                  </button>
                </div>
              </div>
              {!this.props.user && (
                <button
                  onClick={() => this.props.openModal('login')}
                  className='flex items-center justify-center py-6 text-white bg-transparent bg-green-700 border-0 hover:bg-green-800'
                >
                  <span className='mr-3 icon-lock' />
                  <span className='self-center'>
                    {' '}
                    {header.map(col => {
                      if (col.component == 'Sign Button') {
                        return col.label
                      }
                    })}
                  </span>
                </button>
              )}
            </nav>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}
