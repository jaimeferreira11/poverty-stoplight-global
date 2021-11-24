import React from 'react'
import { shallow } from 'enzyme'
import mount from '../../../testing/mountWithRouter'
import WhatIsIt from '../WhatIsIt'

it('renders shallow', () => {
  shallow(<WhatIsIt />)
})

it('renders mounted', () => {
  mount(<WhatIsIt />, '/what-it-is')
})
