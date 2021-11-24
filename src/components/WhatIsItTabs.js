import React from 'react'
import SbEditable from 'storyblok-react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import greenArrow from '../images/arrow-green.svg'

class ReactTabs extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tabs } = this.props

    return (
      <Tabs>
        <TabList>
          {tabs.map(tab => (
            <Tab key={`${tab._uid}-title`} className='what-it-is__tab'>
              {tab.Title}
            </Tab>
          ))}
        </TabList>

        {tabs.map(tab => (
          <SbEditable key={tab._uid} content={tab}>
            <TabPanel className='what-it-is__panel'>
              <div className='wrapper'>
                <div className='col-1-2'>
                  <h2 className='bold heading--big heading--green heading--tab'>{tab.Subtitle}</h2>
                </div>
                <div className='col-1-2'>
                  <div className='paragraph--lead'>
                    <ul className='tabs__ul'>
                      {tab.List.map((item, i) => (
                        <SbEditable key={tab._uid + i} content={item}>
                          <li className='tabs__li wrapper'>
                            <img className='tabs__arrow' src={greenArrow} alt='' />
                            <p>{item.text}</p>
                          </li>
                        </SbEditable>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabPanel>
          </SbEditable>
        ))}
      </Tabs>
    )
  }
}

export default ReactTabs
