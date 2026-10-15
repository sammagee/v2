import Head from 'next/head'
import { Content, getAllSlugs, getProject } from '../../lib/content'
import Layout from '../../components/layout'

interface ProjectPageProps {
  project: Project
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const copy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard.writeText(window.location.href)
  }

  return (
    <Layout>
      <Head>
        <title>{project.title} – Sam Magee</title>
        <meta name="description" content={project.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://sammagee.me/projects/${project.slug}`}
        />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta
          property="og:image"
          content={`https://sammagee.me/images/projects/${project.image}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={project.title} />
        <meta property="twitter:description" content={project.description} />
        <meta
          property="twitter:image"
          content={`https://sammagee.me/images/projects/${project.image}`}
        />
      </Head>

      <article className="article" id="content" data-chapter="paper">
        <a className="back" href="/#work">
          Back
        </a>
        <header>
          <h1>{project.title}</h1>
          <p className="meta">
            <time dateTime={project.date}>{project.date}</time>
            {project.tags ? ` · ${project.tags}` : ''}
          </p>
        </header>

        <figure className="article-figure">
          <img
            src={`/images/projects/${project.image}`}
            alt={`${project.title} interface`}
            width={1920}
            height={1080}
          />
        </figure>

        <p className="lead">{project.description}</p>

        <div className="article-actions">
          {project.link ? (
            <a href={`https://${project.link}`} rel="noopener noreferrer">
              Visit
            </a>
          ) : null}
          {project.git ? (
            <a href={`https://${project.git}`} rel="noopener noreferrer">
              Code
            </a>
          ) : null}
          <button className="button" type="button" onClick={copy}>
            Copy link
          </button>
        </div>

        {project.contentHtml ? (
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        ) : null}
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs(Content.Projects),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const project = await getProject(params.slug)

  return {
    props: {
      project,
    },
  }
}
