import React from 'react'
import { shallow } from 'enzyme'
import mount from '../../../testing/mountWithRouter'
import Join from '../Join'

it('renders shallow', () => {
  shallow(<Join />)
})

it('renders mounted', () => {
  mount(<Join />, '/join')
})
