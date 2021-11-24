import React from 'react'
import { shallow } from 'enzyme'
import mount from '../../../testing/mountWithRouter'
import Partners from '../Partners'

it('renders shallow', () => {
  shallow(<Partners />)
})

it('renders mounted', () => {
  mount(<Partners />, '/partners')
})
