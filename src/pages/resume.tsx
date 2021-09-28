import { GetStaticProps } from 'next'
import Head from 'next/head'
import Education from '../components/resume/education'
import Experience from '../components/resume/experience'
import Header from '../components/resume/header'
import Projects from '../components/resume/projects'
import Skills from '../components/resume/skills'
import {
  getPositions,
  getProjects,
  getSchools,
  getSkills,
} from '../lib/content'

interface IResumeProps {
  positions: Position[]
  projects: Project[]
  schools: School[]
  skills: Skills
}

export default function Resume({
  positions,
  projects,
  schools,
  skills,
}: IResumeProps) {
  return (
    <main className="w-screen min-h-screen py-16 text-lg print:py-0 bg-gray-50 dark:bg-gray-1000">
      <Head>
        <title>Résumé &ndash; Sam Magee</title>
      </Head>

      <div className="bg-white dark:bg-gray-900 w-[8.5in] h-[11in] mx-auto print:m-0 shadow-xl print:shadow-none p-[0.5in] text-gray-900 dark:text-gray-300 text-sm">
        <Header />

        <hr className="my-6 border border-gray-100 dark:border-gray-800" />

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <Experience positions={positions} />

            <Projects projects={projects} />
          </div>

          <aside className="space-y-8">
            <Education schools={schools} />

            <Skills skills={skills} />
          </aside>
        </div>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const positions = (await getPositions()).filter(
    (position) => position.featured
  )
  const projects = (await getProjects()).filter((project) => project.featured)
  const schools = await getSchools()
  const skills = await getSkills()

  return {
    props: {
      positions,
      projects,
      schools,
      skills,
    },
  }
}
