import React from 'react'
import { mount } from 'enzyme'
import { Router, Route } from 'react-static'

export default (children, path) =>
  mount(
    <Router>
      <Route path={path}>{children}</Route>
    </Router>,
  )
