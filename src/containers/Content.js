import React from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import { withRouteData } from 'react-static'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import showdown from 'showdown'
import SbEditable from 'storyblok-react'

import './Content.css'
import './News.css'
import Lightbox from '../components/Lightbox'
import calendar from '../images/calendar.png'
import arrow_white from '../images/link-arrow-white.svg'
import pdfIcon from '../images/pdf.svg'
// import world from '../images/world.svg'
// import calendar from '../images/calendar.svg'
import world from '../images/world.png'

const converter = new showdown.Converter()

// const isSiteInSpanish = typeof window !== 'undefined' && location.href.includes('/es/')

class Content extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTabIndex: 1,
      activeTab: '',
      page_number: 1,
      pagesArray: [],
      isTabSelected: false,
      selected_category: props.story.content.all_images_category,
      filteredImages: props.story.content.images,
    }
    this.limit = 21
    this.limit2 = 4
  }

  pagesArray(content, index) {
    if (index === 2 || index === 3) {
      const temp = []
      for (
        let i = 0;
        i < Math.ceil(content ? content.length / this.limit2 : this.state.filteredImages.length / this.limit2);
        i += 1
      ) {
        temp.push(i)
      }
      return temp
    }
    const temp = []
    for (
      let i = 0;
      i < Math.ceil(content ? content.length / this.limit : this.state.filteredImages.length / this.limit);
      i += 1
    ) {
      temp.push(i)
    }
    return temp
  }

  selectTab = (id, index) => {
    this.setState({
      activeTabIndex: index,
      pagesArray: this.pagesArray(this.props.story.content[id], index),
      activeTab: id,
      isTabSelected: true,
      page_number: 1,
    })
  }

  selectPage = page => {
    const content = this.props.story.content[this.state.activeTab]

    if (typeof content === 'undefined' || content === null) {
      if (
        page > 0 &&
        page <= Math.ceil(content ? content.length / this.limit : this.state.filteredImages.length / this.limit)
      ) {
        this.setState({ page_number: page })
      }
    } else if (content[0].file) {
      if (
        page > 0 &&
        page <= Math.ceil(content ? content.length / this.limit2 : this.state.filteredImages.length / this.limit2)
      ) {
        this.setState({ page_number: page })
      }
    } else if (
      page > 0 &&
      page <= Math.ceil(content ? content.length / this.limit : this.state.filteredImages.length / this.limit)
    ) {
      this.setState({ page_number: page })
    } else if (page > 0 && page <= Math.ceil(content.length / this.limit2)) {
      if (!!content[0].author) {
        this.setState({ page_number: page })
      }
    }
  }

  chooseCategory = category => {
    if (category === this.props.story.content.all_images_category) {
      this.setState({
        filteredImages: this.props.story.content.images,
      })
    } else {
      this.setState({
        filteredImages: this.props.story.content.images.filter(
          item => item.category && item.category.indexOf(category) > -1
        ),
      })
    }

    setTimeout(() => {
      this.setState({
        selected_category: category,
        page_number: 1,
        pagesArray: this.pagesArray(),
      })
    }, 100)
  }

  render() {
    const { content } = this.props.story
    const { filteredImages, pagesArray, page_number } = this.state

    return (
      <div>
        <Helmet>
          <title>{content && content.top[0].title}</title>
        </Helmet>
        {content &&
          content.top.map(el => (
            <SbEditable key={el._uid} content={el}>
              <div
                className='hero hero--small'
                style={{
                  backgroundImage: `url(${el.image})`,
                  backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
                }}
              >
                <div className='hero__overlay' />
                <div className='wrapper'>
                  <h1 className='hero__title hero--small__title'>{el.title}</h1>
                </div>
              </div>
            </SbEditable>
          ))}
        {this.state.isTabSelected ? (
          <div className='wrapper'>
            <Tabs defaultIndex={this.state.activeTabIndex}>
              <div className='col-1-4 tablist__col'>
                <TabList className='content__tablist'>
                  {content.navigation.map((el, i) => (
                    <Tab
                      key={el.id}
                      className='content__tab'
                      onClick={() => this.selectTab(el.id, i)}
                      onKeyPress={() => this.selectTab(el.id, i)}
                    >
                      {el.title}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <div className='col-3-4 content__col'>
                <TabPanel>
                  <div>
                    {this.props.categories && (
                      <div className='pagination content__pagination'>
                        {[
                          ...[
                            {
                              id: '1',
                              name: this.props.story.content.all_images_category,
                            },
                          ],
                          ...this.props.categories,
                        ].map(category => (
                          <div
                            key={category.id}
                            className={`pagination__item ${
                              this.state.selected_category === category.name ? 'pagination__item--active' : ''
                            }`}
                            onClick={() => this.chooseCategory(category.name)}
                            onKeyPress={() => this.chooseCategory(category.name)}
                          >
                            {category.name}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='content__imageholder'>
                      {filteredImages
                        .slice((page_number - 1) * this.limit, (page_number - 1) * this.limit + this.limit)
                        .map(item => (
                          <SbEditable key={item._uid} content={item}>
                            <Lightbox src={item.file} />
                          </SbEditable>
                        ))}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div>
                    {content.videos.map((el, i) => {
                      if (Math.ceil((i + 1) / this.limit) === page_number) {
                        return (
                          <SbEditable key={el._uid} content={el}>
                            <div
                              className='content__video'
                              dangerouslySetInnerHTML={{
                                __html: el.source,
                              }}
                            />
                            <div className='content__video-info'>
                              <h2 className='content__video-heading'>{el.title}</h2>
                              <p className='paragraph--sans'>{el.description}</p>
                            </div>
                          </SbEditable>
                        )
                      }
                      return <div key={el._uid} />
                    })}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='content__items__main__container'>
                    {content.reports.map((el, i) => {
                      if (Math.ceil((i + 1) / this.limit2) === page_number) {
                        return (
                          <SbEditable key={el._uid} content={el}>
                            <a href={el.file || el.link} className='content__item__reports'>
                              <div>
                                <div
                                  style={{
                                    backgroundImage: `url(${el.image})`,
                                  }}
                                  className='content__item__reports__image'
                                />
                                {el.year ? (
                                  <div className='content__item__reports__yearContainer'>
                                    <div className='content__item__reports__year'>{el.year}</div>
                                  </div>
                                ) : null}
                              </div>
                              <div className='content__item__reports__rightSide'>
                                <p className='content__item__reports__title'>{el.title}</p>
                                {el.author ? <div className='content__item__reports__author'>{el.author}</div> : null}

                                <div className='content__item__reports__description'>{el.description}</div>
                                <div className='content__item__reports__bottomContainer'>
                                  {el.date ? (
                                    <div className='content__item__reports__bottomContainer__itemContainer'>
                                      <div className='content__item__reports__bottomContainer__iconContainer_calendar'>
                                        <img
                                          className='content__item__reports__bottomContainer__icon_calendar'
                                          src={calendar}
                                          alt='calendar'
                                        />
                                      </div>
                                      <div className='content__item__reports__date'>{el.date}</div>
                                    </div>
                                  ) : null}

                                  {el.language ? (
                                    <div className='content__item__reports__bottomContainer__itemContainer'>
                                      <div className='content__item__reports__bottomContainer__iconContainer_world'>
                                        <img
                                          className='content__item__reports__bottomContainer__icon_world'
                                          src={world}
                                          alt='world'
                                        />
                                      </div>
                                      <div className='content__item__reports__language'>{el.language}</div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </a>
                          </SbEditable>
                        )
                      }
                      return <div key={el._uid} />
                    })}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='content__items__main__container'>
                    {content.documents.map((el, i) => {
                      if (Math.ceil((i + 1) / this.limit2) === page_number) {
                        return (
                          <SbEditable key={el._uid} content={el}>
                            <a href={el.file || el.link} className='content__item__reports'>
                              <div>
                                <div
                                  style={{
                                    backgroundImage: `url(${el.image})`,
                                  }}
                                  className='content__item__reports__image'
                                />
                                {el.year ? (
                                  <div className='content__item__reports__yearContainer'>
                                    <div className='content__item__reports__year'>{el.year}</div>
                                  </div>
                                ) : null}
                              </div>
                              <div className='content__item__reports__rightSide'>
                                <p className='content__item__reports__title'>{el.title}</p>
                                {el.author ? <div className='content__item__reports__author'> {el.author}</div> : null}

                                <div className='content__item__reports__description'>{el.description}</div>
                                <div className='content__item__reports__bottomContainer'>
                                  {el.date ? (
                                    <div className='content__item__reports__bottomContainer__itemContainer'>
                                      <div className='content__item__reports__bottomContainer__iconContainer_calendar'>
                                        <img
                                          className='content__item__reports__bottomContainer__icon_calendar'
                                          src={calendar}
                                          alt='calendar'
                                        />
                                      </div>
                                      <div className='content__item__reports__date'>{el.date}</div>
                                    </div>
                                  ) : null}

                                  {el.language ? (
                                    <div className='content__item__reports__bottomContainer__itemContainer'>
                                      <div className='content__item__reports__bottomContainer__iconContainer_world'>
                                        <img
                                          className='content__item__reports__bottomContainer__icon_world'
                                          src={world}
                                          alt='world'
                                        />
                                      </div>
                                      <div className='content__item__reports__language'>{el.language}</div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </a>
                          </SbEditable>
                        )
                      }
                      return <div key={el._uid} />
                    })}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className='asset__holder'>
                    {content.assets.map(el =>
                      el.component === 'Image' ? (
                        <SbEditable key={el._uid} content={el}>
                          <a href={el.file}>
                            <div className='content__asset'>
                              <LazyLoad height='200'>
                                <img className='content__asset-image' src={el.file} alt='company asset' />
                              </LazyLoad>
                            </div>
                          </a>
                        </SbEditable>
                      ) : (
                        <SbEditable key={el._uid} content={el}>
                          <a href={el.file} download rel='noopener noreferrer' target='_blank'>
                            <div className='content__asset'>
                              <img className='content__asset-icon' src={pdfIcon} alt='company PDF' />
                            </div>
                          </a>
                        </SbEditable>
                      )
                    )}
                  </div>
                </TabPanel>
                <div className='pagination__wrapper'>
                  <div className='pagination'>
                    <SbEditable content={content.navigation_labels[0]}>
                      <button className='pagination__item' href='#' onClick={() => this.selectPage(page_number - 1)}>
                        {content.navigation_labels[0].text}
                      </button>
                    </SbEditable>
                    {pagesArray.map((item, i) => (
                      <span
                        key={`news-${i}`}
                        className={`pagination__item ${i + 1 === page_number ? 'pagination__item--active' : ''}`}
                        href='#'
                        onClick={() => this.selectPage(i + 1)}
                        onKeyPress={() => this.selectPage(i + 1)}
                      >
                        {i + 1}
                      </span>
                    ))}
                    <SbEditable content={content.navigation_labels[1]}>
                      <button className='pagination__item' href='#' onClick={() => this.selectPage(page_number + 1)}>
                        {content.navigation_labels[1].text}
                      </button>
                    </SbEditable>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        ) : (
          <div>
            <div className='wrapper'>
              {content.intro.map(el => (
                <SbEditable key={el._uid} content={el}>
                  <p className='paragraph--lead content__intro'>{el.text}</p>
                </SbEditable>
              ))}
            </div>

            <div className='wrapper wrapper--flex mt-60 mb-120'>
              {content.navigation.map((el, i) => (
                <SbEditable key={el._uid} content={el}>
                  <div
                    className='content__nav'
                    onClick={() => this.selectTab(el.id, i)}
                    onKeyPress={() => this.selectTab(el.id, i)}
                  >
                    <LazyLoad height='200'>
                      <img className='content__nav--image' src={el.image} alt='navigation item' />
                    </LazyLoad>
                    <div className=' content__nav--overlay'>
                      <img className='content__nav--arrow' src={arrow_white} alt='navigation arrow' />
                    </div>
                    <div className='bold heading--big content__nav--text'>{el.title}</div>
                  </div>
                </SbEditable>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouteData(Content)
