import axios from 'axios'

import { storyblokToken } from './config.json'

// fetch draft content on dev stating or localhost
// and fetch only published content on production
const contentVersion = process.env.ENVIRONMENT === 'production' ? 'published': 'draft';

export const fetchStory = ({ story, id }) =>
  axios
    .get(
      `https://api.storyblok.com/v1/cdn/stories${
        id ? `/${id}` : ''
      }?token=${storyblokToken}&version=${contentVersion}&cv=${Date.now()}${story ? `&starts_with=${story}` : ''}`
    )
    .then(response => (response.data.story || !!response.data.stories.length ? response.data.stories[0] : []))

export const fetchData = story =>
  axios
    .get(
      `https://api.storyblok.com/v1/cdn/stories?token=${storyblokToken}&version=${contentVersion}&starts_with=${story}`
    )
    .then(response => {
      const { contents, ...data } = response.data.stories[0].content
      return data
    })

// fetch multiple stories
export const fetchStories = ({ stories, limit = 100, tags = false, page = 1 }) =>
  tags && !tags.length
    ? false
    : axios
        .get(
          `https://api.storyblok.com/v1/cdn/stories?token=${storyblokToken}&version=${contentVersion}&cv=${Date.now()}&starts_with=${stories}&per_page=${limit}&page=${page}${
            tags.length ? `&with_tag${encodeURI(tags.join(','))}` : ''
          }`
        )
        .then(response => response.data.stories)

// fetch datasources
export const fetchDatasource = ({ source }) =>
  axios
    .get(
      `https://api.storyblok.com/v1/cdn/datasource_entries?token=${storyblokToken}&datasource=${source}&cv=${Date.now()}`
    )
    .then(response => response.data.datasource_entries)
