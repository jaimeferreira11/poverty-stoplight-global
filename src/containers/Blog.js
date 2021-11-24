import React from 'react'
import { Helmet } from 'react-helmet'
import { withRouteData } from 'react-static'
import SbEditable from 'storyblok-react'

import './Blog.css'
import NewsComponent from '../components/NewsComponent.js'

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page_number: 1,
      selected_category: props.story.content.categories[1].text,
      filteredPosts: props.posts,
    }
  }

  pagesArray() {
    const temp = []

    for (let i = 0; i < Math.ceil(this.state.filteredPosts.length / 6); i += 1) {
      temp.push(i)
    }

    return temp
  }

  chooseCategory = category => {
    if (category === this.props.story.content.categories[1].text) {
      this.setState({
        filteredPosts: this.props.posts,
      })
    } else {
      this.setState({
        filteredPosts: this.props.posts.filter(
          item => item.content.categories && item.content.categories.indexOf(category) > -1
        ),
      })
    }
    this.setState({ selected_category: category, page_number: 1 })
  }

  selectPage = page => {
    if (page > 0 && page <= Math.ceil(this.state.filteredPosts.length / 6)) {
      this.setState({ page_number: page })
    }
  }

  render() {
    const { categories } = this.props
    const { selected_category, filteredPosts, page_number } = this.state
    const { content } = this.props.story

    const pagesArray = this.pagesArray()

    return (
      <div>
        <Helmet>
          <title>{content && content.top[0].title}</title>
        </Helmet>
        {content &&
          content.top.map(el => (
            <div
              key={el._uid}
              className='hero hero--small'
              style={{
                backgroundImage: `url(${el.image})`,
                backgroundPosition: `center ${el.image_offset ? `${el.image_offset}%` : '50%'}`,
              }}
            >
              <div className='hero__overlay' />
              <div className='wrapper'>
                <SbEditable content={el}>
                  <h1 className='hero__title hero--small__title'>{el.title}</h1>
                </SbEditable>
              </div>
            </div>
          ))}
        <div className='wrapper'>
          <div className='col-1-3'>
            <div className='category__wrapper '>
              <SbEditable content={content.categories[0]}>
                <div className='category__header'>{content.categories[0].text || 'Categories'}</div>
              </SbEditable>
              <div className='category'>
                <SbEditable content={content.categories[1]}>
                  {[...[{ id: '1', name: content.categories[1].text }], ...categories].map(category => (
                    <div
                      key={category.id}
                      className={`category__item ${
                        selected_category === category.name ? 'category__item--active' : ''
                      }`}
                      onClick={() => this.chooseCategory(category.name)}
                      onKeyPress={() => this.chooseCategory(category.name)}
                    >
                      {category.name}
                    </div>
                  ))}
                </SbEditable>
              </div>
            </div>
          </div>
          <div className='col-2-3'>
            <SbEditable content={this.props.story.content}>
              {categories.map(category => {
                if (selected_category && category.name === selected_category) {
                  if (filteredPosts.length === 0) {
                    return (
                      <div key={category.id}>
                        <SbEditable content={this.props.story}>
                          <div className='category_description paragraph--lead'>{content.no_posts_available}</div>
                        </SbEditable>
                      </div>
                    )
                  }
                  return (
                    <div key={category.id} className='category_description paragraph--lead'>
                      {category.value}
                    </div>
                  )
                }
              })}
              <div className='news-wrapper'>
                {filteredPosts
                  .sort((a, b) => new Date(b.content.date) - new Date(a.content.date))
                  .slice((page_number - 1) * 6, (page_number - 1) * 6 + 6)
                  .map(item => (
                    <NewsComponent
                      key={item.id}
                      date={item.content.date}
                      title={item.content.top ? item.content.top[0].title : ''}
                      description={item.content.description}
                      image={item.content.top ? item.content.top[0].image : ''}
                      author={item.content.author}
                      slug={item.slug}
                      more={content.read_more}
                    />
                  ))}
              </div>
            </SbEditable>
          </div>
        </div>
        <div className='wrapper'>
          <div className='pagination__wrapper'>
            {Math.ceil(filteredPosts.length / 6) > 1 ? (
              <div className='pagination'>
                <SbEditable content={content.navigation_labels[0]}>
                  <button
                    className='pagination__item'
                    onClick={() => this.selectPage(page_number - 1)}
                    onKeyPress={() => this.selectPage(page_number - 1)}
                  >
                    {content.navigation_labels[0].text}
                  </button>
                </SbEditable>
                {pagesArray.map((item, i) => (
                  <span
                    key={`posts-${i}`}
                    className={`pagination__item ${i + 1 === page_number ? 'pagination__item--active' : ''}`}
                    onClick={() => this.selectPage(i + 1)}
                    onKeyPress={() => this.selectPage(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
                <SbEditable content={content.navigation_labels[1]}>
                  <button
                    onClick={() => this.selectPage(page_number + 1)}
                    onKeyPress={() => this.selectPage(page_number + 1)}
                    className='pagination__item'
                  >
                    {content.navigation_labels[1].text}
                  </button>
                </SbEditable>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouteData(Blog)
