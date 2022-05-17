import React, { useContext, useEffect } from 'react'
import {
  ReactBricksContext,
  PageViewer,
  fetchPage,
  fetchPages,
  cleanPage,
  types,
} from 'react-bricks/frontend'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'

import config from '../../react-bricks/config'
import Layout from '@/components/layout'
import ErrorNoPage from '@/components/errorNoPage'
import { pageNames } from '@/common/pageNames'
import { PageProps } from '@/common/pageProps'


const PostPage: React.FC<PageProps> = ({ page, error }) => {
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext);
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return (
    <Layout displayCallout={false}>
      {pageOk && (
        <div className="w-full h-full">
          <Head>
            <title>{page.meta.title}</title>
            <meta name="description" content={page.meta.description} />
          </Head>
          <PageViewer page={pageOk} />
        </div>
      )}
      {error === 'NOPAGE' && <ErrorNoPage />}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } }
  }

  const { slug } = context.params

  try {
    const page = await fetchPage(slug.toString(), config.apiKey, context.locale)
    return { props: { page } }
  } catch {
    return { props: { error: 'NOPAGE' } }
  }
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (!config.apiKey) {
    return { paths: [], fallback: false }
  }

  const allPages = await fetchPages(config.apiKey)
  const paths = allPages
    .filter((page) => page.type === pageNames.POST.name)
    .map((page) =>
      page.translations
        .filter(
          (translation) => context.locales.indexOf(translation.language) > -1
        )
        .map((translation) => ({
          params: { slug: translation.slug },
          locale: translation.language,
        }))
    )
    .flat()

  return { paths, fallback: false }
}

export default PostPage
