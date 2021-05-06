import Head from 'next/head'
import Link from 'next/link'
import Date from '../../components/date'
import Layout from '../../components/layout'
import Tilt from 'react-parallax-tilt'
import { getAllSlugs, getData } from '../../lib/content'
import Image from 'next/image'

interface IProjectProps {
  project: Project
}

export default function Project({ project }: IProjectProps) {
  return (
    <Layout>
      <Head>
        <title>{project.title} &ndash; Sam Magee</title>

        <meta name="title" content={project.title} />
        <meta name="description" content={project.description} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://sammagee.me/projects/${project.slug}`} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content="https://sammagee.me/images/social/social-square.jpg" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content={`https://sammagee.me/images/projects/${project.slug}`} />
        <meta property="twitter:title" content={project.title} />
        <meta property="twitter:description" content={project.description} />
        <meta property="twitter:image" content="https://sammagee.me/images/social/social-square.jpg" />
      </Head>

      <div id="content" className="mt-32 mb-32 md:mt-56">
        <article className="w-full px-12 mx-auto prose prose-lg sm:pl-32 lg:pl-0">
          <Link href="/#work">
            <a className="inline-flex items-center space-x-2 !text-gray-400 !no-underline focus:outline-none border-2 border-transparent border-dashed focus:border-brand-500 -ml-0.5">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>

              <span>Back</span>
            </a>
          </Link>

          <header className="mt-6">
            <div className="transform scale-105">
              <Tilt
                className="relative flex w-full overflow-hidden rounded-lg group"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable={true}
                glareMaxOpacity={0.05}
              >
                <Image
                  className="w-full leading-[7rem] rounded-lg shadow-lg select-none filter grayscale group-hover:filter-none"
                  src={`/images/projects/${project.image}`}
                  alt={project.title}
                  width={1920}
                  height={1080}
                />

                <div className="absolute inset-0 transition-opacity duration-200 ease-in-out bg-opacity-25 border-t rounded-lg bg-brand-500 border-brand-100 border-opacity-5 group-hover:opacity-0" />
              </Tilt>
            </div>

            <h1 className="!mt-12 !mb-0">{project.title}</h1>

            <p className="!mt-3 !mb-0 text-base font-medium text-gray-500">
              <Date dateFormat="d LLLL yyyy" dateString={project.date} />
            </p>
            <p className="!my-0 font-mono text-sm text-gray-500">{project.tags}</p>
          </header>

          <div className="px-6 py-4 mt-6 bg-gray-800 bg-opacity-75 border-t border-white rounded-lg shadow-lg backdrop-filter border-opacity-5 backdrop-blur">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-400 bg-opacity-10 text-brand-400">TL;DR</span>

            <div>{project.description}</div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllSlugs('projects')

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const project = await getData('projects', params.slug)

  return {
    props: {
      project,
    },
  }
}
