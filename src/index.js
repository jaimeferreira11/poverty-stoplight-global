import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './assets/output.css'

// Your top level component
import App from './App'

axios.defaults.withCredentials = true
axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if ([401, 403].includes(error.response.status)) {
      window.location = '/'
    } else {
      return Promise.reject(error)
    }
  }
)
// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const render = Comp => {
    ReactDOM.render(<Comp />, document.getElementById('root'))
  }

  // Render!
  render(App)
}
