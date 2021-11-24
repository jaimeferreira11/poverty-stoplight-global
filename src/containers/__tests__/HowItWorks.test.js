import React from 'react'
import { shallow } from 'enzyme'
import mount from '../../../testing/mountWithRouter'
import HowItWorks from '../HowItWorks'

it('renders shallow', () => {
  shallow(<HowItWorks />)
})

it('renders mounted', () => {
  mount(<HowItWorks />, '/how-it-works')
})
