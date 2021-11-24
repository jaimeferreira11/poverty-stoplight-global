import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Promise from 'promise-polyfill'
import { Router } from 'react-static'
import { createStore } from 'redux'
import Routes from 'react-static-routes'
import { hot } from 'react-hot-loader'
import Intercom from 'react-intercom'

import './grid.css'
import './app.css'
import reducers from './redux/reducers'
import Header from './Header'
import Footer from './Footer'

if (typeof window !== 'undefined' && !window.Promise) {
  window.Promise = Promise
}

const store = createStore(reducers)

export default hot(module)(
  class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading: true,
      }
    }
    componentDidMount() {
      this.loadingDone()
    }

    loadingDone() {
      this.setState({
        loading: false,
      })
    }

    render() {
      return (
        <div>
          {this.state.loading && <div className='spinner' />}
          <Provider store={store}>
            <Router type='browser'>
              <div className={!this.state.loading ? '' : 'hidden'}>
                <Header />
                <div className='content'>
                  <Routes />
                  <Intercom appID='msjjl81s' />
                </div>
                <Footer />
              </div>
            </Router>
          </Provider>
        </div>
      )
    }
  }
)
