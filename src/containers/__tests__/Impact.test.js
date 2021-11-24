import React from 'react'
import { shallow } from 'enzyme'
import mount from '../../../testing/mountWithRouter'
import Impact from '../Impact'

it('renders shallow', () => {
  shallow(<Impact />)
})

it('renders mounted', () => {
  mount(<Impact />, '/impact')
})
