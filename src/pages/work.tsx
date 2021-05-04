import Head from 'next/head'
import Layout from '../components/layout'
import { GetStaticProps } from 'next'
import { getSortedData } from '../../lib/content'
import Image from 'next/image'

export default function Work({projects}) {
  return (
    <>
      <Head>
        <title>Work &ndash; Sam Magee</title>
      </Head>

      <Layout>
        <section className="relative z-10 mt-32">
          <h2 className="text-6xl font-black text-center text-black dark:text-white">
            Work
            <span className="text-transparent bg-gradient-to-br from-brand-400 to-brand-600 bg-clip-text">.</span>
          </h2>

          <div className="grid items-start grid-cols-3 gap-12 mt-12">
            {projects.map((project, index) => (
              <article
                key={index}
                className="relative flex overflow-hidden transition duration-500 ease-in-out origin-bottom transform bg-gray-500 rounded-lg shadow-lg opacity-75 bg-opacity-20 backdrop-filter backdrop-blur-2xl group hover:opacity-100 hover:scale-105"
              >
                <Image
                  className="w-full rounded-lg shadow-glass filter grayscale"
                  src={project.image}
                  alt={project.title}
                  width={1920}
                  height={1080}
                />

                <div className="absolute inset-0 rounded-lg opacity-10 bg-gradient-to-br from-white" />
                <div className="absolute inset-0 transition duration-500 ease-in-out rounded-lg shadow-glass group-hover:opacity-0" />
                <div className="absolute inset-0 flex items-center justify-center transition duration-500 ease-in-out bg-white bg-opacity-50 rounded-lg opacity-0 dark:bg-opacity-50 dark:bg-black group-hover:opacity-100 backdrop-filter backdrop-blur-sm">
                  <h4 className="text-2xl font-black text-black dark:text-white">{project.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await getSortedData('projects')

  return {
    props: {
      projects
    }
  }
}
