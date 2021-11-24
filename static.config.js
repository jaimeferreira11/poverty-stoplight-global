import axios from 'axios'
import React, { Component } from 'react'
import { reloadRoutes } from 'react-static/node'

// import { getMapData } from './psAPI'
import { fetchDatasource, fetchStories, fetchStory } from './storyblok_fetchers'

const env = process.env.ENVIRONMENT == 'production' ?  'https://platform.backend.povertystoplight.org':'https://testing.backend.povertystoplight.org';

const mediumURL = process.env.MEDIUM_URL ? process.env.MEDIUM_URL :'https://medium.com/feed/@PStoplight';

// get medium posts
const fetchMediumPosts = () =>
  axios({
    method: 'get',
    url: `https://api.rss2json.com/v1/api.json?rss_url=${mediumURL}`,
  }).then(
    response =>
      // the response is an object, we make that into an array
      response.data.items
  ).catch(err => console.log(err))
const getMapData = () =>
  axios({
    method: 'get',
    url: `${env}/api/v1/stoplight/impact/geolocation?token=gOiYWgm5v9Tb3xGiLXlTaI1f6aPesZ8rmfdDX0wE`,
  }).then(response => {
    return response.data
  }).catch(err => console.log(err))

const getOverview = () => 
  axios({
    method: 'get',
    url: `${env}/api/v1/stoplight/impact/overview?token=gOiYWgm5v9Tb3xGiLXlTaI1f6aPesZ8rmfdDX0wE`,
  }).then(response => {
    return response.data
  }).catch(err => console.log(err))
export default {
  siteRoot: process.env.ENVIRONMENT === 'production' ? 'https://www.povertystoplight.org':'',
  getSiteData: async () => ({
    title: 'Poverty Stoplight',
  }),

  getRoutes: async () => {
    const footerEn = await fetchStory({ story: 'en/footer' })
    const footerEs = await fetchStory({ story: 'es/footer' })
    const headerEn = await fetchStory({ story: 'en/header' })
    const headerEs = await fetchStory({ story: 'es/header' })
    const newsEn = await fetchStories({ stories: 'en/news' })
    const newsEs = await fetchStories({ stories: 'es/news' })
    const postsEn = await fetchStories({ stories: 'en/posts' })
    const postsEs = await fetchStories({ stories: 'es/posts' })
    const storiesEn = await fetchStories({ stories: 'en/success-stories' })
    const storiesEs = await fetchStories({ stories: 'es/success-stories' })

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        getData: async () => ({
          story: await fetchStory({ story: 'en/home' }),
          news: newsEn,
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: '/editor',
        component: 'src/containers/Editor',
        getData: async () => reloadRoutes(),
      },
      {
        path: '/en',
        component: 'src/containers/Home',
        getData: async () => ({
          story: await fetchStory({ story: 'en/home' }),
          news: newsEn,
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: '/es',
        component: 'src/containers/Home',
        getData: async () => ({
          story: await fetchStory({ story: 'es/home' }),
          news: newsEs,
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: '/en/what-it-is',
        component: 'src/containers/WhatIsIt',
        getData: async () => ({
          story: await fetchStory({ story: 'en/what-it-is' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: '/es/what-it-is',
        component: 'src/containers/WhatIsIt',
        getData: async () => ({
          story: await fetchStory({ story: 'es/what-it-is' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: '/es/kit',
        component: 'src/containers/StopLightKit',
        getData: async () => ({
          categories: await fetchDatasource({ source: 'image-categories' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: '/en/kit',
        component: 'src/containers/StopLightKit',
        getData: async () => ({
          categories: await fetchDatasource({ source: 'image-categories' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/how-it-works',
        component: 'src/containers/HowItWorks',
        getData: async () => ({
          story: await fetchStory({ story: 'en/how-it-works' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/how-it-works',
        component: 'src/containers/HowItWorks',
        getData: async () => ({
          story: await fetchStory({ story: 'es/how-it-works' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/impact',
        component: 'src/containers/Impact',
        getData: async () => ({
          story: await fetchStory({ story: 'en/impact' }),
          studies: storiesEn,
          mapData: await getMapData(),
          posts: [],
          overviewData: await getOverview(),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/partners',
        component: 'src/containers/Partners',
        getData: async () => ({
          story: await fetchStory({ story: 'en/partners' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/about',
        component: 'src/containers/About',
        getData: async () => ({
          story: await fetchStory({ story: 'en/our-team' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/join',
        component: 'src/containers/Join',
        getData: async () => ({
          story: await fetchStory({ story: 'en/join' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/hubs',
        component: 'src/containers/Hubs',
        getData: async () => ({
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/sign-in',
        component: 'src/containers/SignIn',
        getData: async () => ({
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/success-stories',
        getData: async () => ({
          header: headerEn,
          footer: footerEn,
        }),
        children: storiesEn.map(item => ({
          path: item.slug,
          component: 'src/containers/CaseStudies',
          getData: async () => ({
            data: item,
            header: headerEn,
            footer: footerEn,
          }),
        })),
      },
      {
        path: 'en/content',
        component: 'src/containers/Content',
        getData: async () => ({
          story: await fetchStory({ story: 'en/content' }),
          categories: await fetchDatasource({ source: 'image-categories' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/who-owns-poverty',
        component: 'src/containers/WhoOwnsPoverty',
        getData: async () => ({
          story: await fetchStory({ story: 'en/who-owns-poverty' }),
          categories: await fetchDatasource({ source: 'image-categories' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/who-owns-poverty',
        component: 'src/containers/WhoOwnsPoverty',
        getData: async () => ({
          story: await fetchStory({ story: 'es/who-owns-poverty' }),
          categories: await fetchDatasource({ source: 'image-categories' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/faq',
        component: 'src/containers/FAQ',
        getData: async () => ({
          story: await fetchStory({ story: 'en/faq' }),
          questions: await fetchStories({ stories: 'en/q-a' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/news',
        component: 'src/containers/News',
        getData: async () => ({
          story: await fetchStory({ story: 'en/page-news' }),
          news: newsEn,
          categories: await fetchDatasource({ source: 'news-categories' }),
          header: headerEn,
          footer: footerEn,
        }),
        children: newsEn.map(item => ({
          path: item.slug,
          component: 'src/containers/SingleNews',
          getData: () => ({
            data: item,
            latest: newsEn.slice(0, 3),
            header: headerEn,
            footer: footerEn,
          }),
        })),
      },
      {
        path: 'en/where-we-work',
        component: 'src/containers/WhereWeWork',
        getData: async () => ({
          story: await fetchStory({ story: 'en/where-we-work' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/impact',
        component: 'src/containers/Impact',
        getData: async () => ({
          story: await fetchStory({ story: 'es/impact' }),
          studies: storiesEs,
          mapData: await getMapData(),
          overviewData: await getOverview(),
          posts: [],
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/partners',
        component: 'src/containers/Partners',
        getData: async () => ({
          story: await fetchStory({ story: 'es/partners' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/about',
        component: 'src/containers/About',
        getData: async () => ({
          story: await fetchStory({ story: 'es/our-team' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/join',
        component: 'src/containers/Join',
        getData: async () => ({
          story: await fetchStory({ story: 'es/join' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/hubs',
        component: 'src/containers/Hubs',
        getData: async () => ({
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/sign-in',
        component: 'src/containers/SignIn',
        getData: async () => ({
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/success-stories',
        getData: async () => ({
          header: headerEs,
          footer: footerEs,
        }),
        children: storiesEs.map(item => ({
          path: item.slug,
          component: 'src/containers/CaseStudies',
          getData: async () => ({
            data: item,
            header: headerEs,
            footer: footerEs,
          }),
        })),
      },
      {
        path: 'es/content',
        component: 'src/containers/Content',
        getData: async () => ({
          story: await fetchStory({ story: 'es/content' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/faq',
        component: 'src/containers/FAQ',
        getData: async () => ({
          story: await fetchStory({ story: 'es/faq' }),
          questions: await fetchStories({ stories: 'es/q-a' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'es/news',
        component: 'src/containers/News',
        getData: async () => ({
          story: await fetchStory({ story: 'es/page-news' }),
          news: newsEs,
          categories: await fetchDatasource({ source: 'es-news-categories' }),
          header: headerEs,
          footer: footerEs,
        }),
        children: newsEs.map(item => ({
          path: item.slug,
          component: 'src/containers/SingleNews',
          getData: async () => ({
            data: item,
            latest: newsEs.slice(0, 3),
            header: headerEs,
            footer: footerEs,
          }),
        })),
      },
      {
        path: 'es/where-we-work',
        component: 'src/containers/WhereWeWork',
        getData: async () => ({
          story: await fetchStory({ story: 'es/where-we-work' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        is404: true,
        component: 'src/containers/404',
        getData: async () => ({
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'en/webinars',
        component: 'src/containers/Webinars',
        getData: async () => ({
          story: await fetchStory({ story: 'en/webinars' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/webinars',
        component: 'src/containers/Webinars',
        getData: async () => ({
          story: await fetchStory({ story: 'es/webinars' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/coming-soon',
        component: 'src/containers/ComingSoon',
        getData: async () => ({
          story: await fetchStory({ story: 'en/coming-soon' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/coming-soon',
        component: 'src/containers/ComingSoon',
        getData: async () => ({
          story: await fetchStory({ story: 'es/coming-soon' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/acknowledgments',
        component: 'src/containers/Acknowledgments',
        getData: async () => ({
          story: await fetchStory({ story: 'en/acknowledgments' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/acknowledgments',
        component: 'src/containers/Acknowledgments',
        getData: async () => ({
          story: await fetchStory({ story: 'es/acknowledgments' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/about-the-author',
        component: 'src/containers/AboutAuthor',
        getData: async () => ({
          story: await fetchStory({ story: 'en/about-the-author' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/about-the-author',
        component: 'src/containers/AboutAuthor',
        getData: async () => ({
          story: await fetchStory({ story: 'es/about-the-author' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/syllabus',
        component: 'src/containers/ComingSoon',
        getData: async () => ({
          story: await fetchStory({ story: 'en/coming-soon' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/syllabus',
        component: 'src/containers/ComingSoon',
        getData: async () => ({
          story: await fetchStory({ story: 'es/coming-soon' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/endorsements',
        component: 'src/containers/ComingSoon',
        getData: async () => ({
          story: await fetchStory({ story: 'en/coming-soon' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/endorsements',
        component: 'src/containers/ComingSoon',
        getData: async () => ({
          story: await fetchStory({ story: 'es/coming-soon' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/lesson-plans',
        component: 'src/containers/LessonPlans',
        getData: async () => ({
          story: await fetchStory({ story: 'en/lesson-plans' }),
          plans: await fetchStories({ stories: 'en/all-lesson-plans' }),
          header: headerEn,
          footer: footerEn,
        }),
      },
      {
        path: 'es/lesson-plans',
        component: 'src/containers/LessonPlans',
        getData: async () => ({
          story: await fetchStory({ story: 'es/lesson-plans' }),
          plans: await fetchStories({ stories: 'es/all-lesson-plans' }),
          header: headerEs,
          footer: footerEs,
        }),
      },
      {
        path: 'en/blog',
        component: 'src/containers/Blog',
        getData: async () => ({
          story: await fetchStory({ story: 'en/blog' }),
          posts: postsEn,
          categories: await fetchDatasource({ source: 'blog-categories' }),
          header: headerEn,
          footer: footerEn,
        }),
        children: postsEn.map(item => ({
          path: item.slug,
          component: 'src/containers/SinglePost',
          getData: () => ({
            data: item,
            latest: postsEn.slice(0, 3),
            header: headerEn,
            footer: footerEn,
          }),
        })),
      },
      {
        path: 'es/blog',
        component: 'src/containers/Blog',
        getData: async () => ({
          story: await fetchStory({ story: 'es/blog' }),
          posts: postsEs,
          categories: await fetchDatasource({ source: 'es-blog-categories' }),
          header: headerEs,
          footer: footerEs,
        }),
        children: postsEs.map(item => ({
          path: item.slug,
          component: 'src/containers/SinglePost',
          getData: async () => ({
            data: item,
            latest: postsEs.slice(0, 3),
            header: headerEs,
            footer: footerEs,
          }),
        })),
      },
    ]
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children } = this.props

      return (
        <Html lang='en-US'>
          <Head>
            <meta charSet='UTF-8' />
            <title>Poverty Stoplight</title>
            <meta
              name='Description'
              content='Poverty stoplight uses mobile technology and social innovation to find solutions that activate the potential of families.'
            />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
            <link rel='apple-touch-icon-precomposed' sizes='57x57' href='/icons/apple-touch-icon-57x57.png' />
            <link rel='apple-touch-icon-precomposed' sizes='114x114' href='/icons/apple-touch-icon-114x114.png' />
            <link rel='apple-touch-icon-precomposed' sizes='72x72' href='/icons/apple-touch-icon-72x72.png' />
            <link rel='apple-touch-icon-precomposed' sizes='144x144' href='/icons/apple-touch-icon-144x144.png' />
            <link rel='apple-touch-icon-precomposed' sizes='120x120' href='/icons/apple-touch-icon-120x120.png' />
            <link rel='apple-touch-icon-precomposed' sizes='152x152' href='/icons/apple-touch-icon-152x152.png' />
            <link rel='icon' type='image/png' href='/icons/favicon-32x32.png' sizes='32x32' />
            <link rel='icon' type='image/png' href='/icons/favicon-16x16.png' sizes='16x16' />
            <meta name='application-name' content='Poverty Stoplight' />
            <meta name='msapplication-TileColor' content='#50AA47' />
            <meta name='msapplication-TileImage' content='icons/mstile-144x144.png' />
            {/* <link
              href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800|Work+Sans:300,400,500,600,700"
              rel="stylesheet"
            /> */}
            <link href='https://fonts.googleapis.com/css?family=Poppins:400,700|Signika:300,600' rel='stylesheet' />
            <link rel='shortcut icon' type='image/png' href='/icons/favicon.ico' />
          </Head>
          <Body>
            {children}
            <script src='/storyblok.js' type='text/javascript' />
            <script async src='https://www.googletagmanager.com/gtag/js?id=UA-104217270-1' />
            <script src='/googleAnalytics.js' type='text/javascript' />
          </Body>
        </Html>
      )
    }
  },
}
