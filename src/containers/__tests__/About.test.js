import React from 'react'
import { shallow } from 'enzyme'

import mount from '../../../testing/mountWithRouter'
import About from '../About'

it('renders shallow', () => {
  shallow(<About />)
})

it('renders mounted', () => {
  mount(<About />, '/about')
})
