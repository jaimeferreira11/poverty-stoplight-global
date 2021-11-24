import React from 'react'
import { shallow } from 'enzyme'
import mount from '../../../testing/mountWithRouter'
import Home from '../Home'

it('renders shallow', () => {
  shallow(<Home />)
})

it('renders mounted', () => {
  mount(<Home />, '/')
})
