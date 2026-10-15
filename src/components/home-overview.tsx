import { FormEvent, useEffect, useRef, useState } from 'react'

const EMAIL = process.env.NEXT_PUBLIC_EMAIL || 'sam@magee.one'

const OUTCOMES: Record<string, string> = {
  vanta: 'Agentic environment and deployments',
  uber: 'Incentives for five million earners',
  marqeta: 'Design system startup cut by 75 percent',
  principal: 'Automation and scheduled reports',
  imt: 'Policy file service, from scratch',
  leantech: 'Software for manufacturing floors',
  central: 'Admissions site for the college',
  krafted: 'Studio work for local companies',
}

const KINDS: Record<string, string> = {
  py: 'Python editor',
  extro: 'Message viewer',
  v2: 'Portfolio',
  v1: 'Portfolio',
  rillo: 'Event page',
  krafted: 'Studio site',
  'hanna-and-sam': 'Illustrated site',
}

const SKILLS = [
  { name: 'Design', detail: 'Figma through production' },
  { name: 'Systems', detail: 'Libraries across fifteen apps' },
  { name: 'Type', detail: 'TypeScript and React' },
  { name: 'Product', detail: 'Trust, incentives, tools' },
  { name: 'Platforms', detail: 'AWS, data, and delivery' },
  { name: 'Testing', detail: 'Checked before it ships' },
]

const range = (start: string, end: string) => {
  const from = start.slice(0, 4)
  const to = end === 'Present' ? 'now' : end.slice(0, 4)
  return from === to ? from : `${from}–${to}`
}

interface HomeOverviewProps {
  positions: Array<Position & { slug: string }>
  projects: Project[]
  schools: Array<School & { slug: string }>
}

export default function HomeOverview({ positions, projects, schools }: HomeOverviewProps) {
  const workRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [top, setTop] = useState(96)
  const [note, setNote] = useState('')

  const align = (index: number, row: HTMLElement) => {
    const section = workRef.current
    if (!section) return
    setActive(index)
    setTop(row.getBoundingClientRect().top - section.getBoundingClientRect().top)
  }

  useEffect(() => {
    const row = workRef.current?.querySelector<HTMLElement>('.work-row')
    if (row) align(0, row)
  }, [projects.length])

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = note.trim() || 'Hello Sam,'
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      'A note from your site'
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div id="content">
      <section className="hero" aria-label="Introduction">
        <div className="hero-paper" data-chapter="paper" />
        <div className="hero-field" data-chapter="ink" />
        <h1 className="hero-title">
          <span className="line line-a">Complex</span>
          <span className="line line-b">simple</span>
        </h1>
        <div className="hero-support">
          <p>Sam Magee, senior software engineer at Vanta.</p>
        </div>
      </section>

      <section className="about" id="about" data-chapter="paper">
        <div className="about-copy">
          <p data-rise style={{ ['--i' as string]: 0 }}>
            <strong>Sam Magee</strong> is a senior software engineer at <mark>Vanta</mark>,
            designing software for trust and compliance.
          </p>
          <p data-rise style={{ ['--i' as string]: 1 }}>
            At Vanta he is building a remote development environment, with a terminal, chat,
            ticket handoff and browser.
          </p>
          <p data-rise style={{ ['--i' as string]: 2 }}>
            He is also shipping the controls that move a commit between staging and production.
          </p>
          <p data-rise style={{ ['--i' as string]: 0 }}>
            At Uber, incentive tools reached more than <mark>five million earners</mark> and a
            billion dollars of investment.
          </p>
          <p data-rise style={{ ['--i' as string]: 1 }}>
            A management platform there took operations work from hours to minutes.
          </p>
          <p data-rise style={{ ['--i' as string]: 2 }}>
            He led the web libraries used by <mark>fifteen apps</mark>.
          </p>
          <p data-rise style={{ ['--i' as string]: 0 }}>
            At <mark>Marqeta</mark> he cut design-system startup time by 75 percent.
          </p>
          <p data-rise style={{ ['--i' as string]: 1 }}>
            Earlier work includes Principal, IMT Insurance and Lean Technologies: reports, a
            policy file service, and tools for manufacturing floors.
          </p>
          <p data-rise style={{ ['--i' as string]: 2 }}>
            He earned a master’s in computer science from <mark>Vanderbilt</mark>, and a
            bachelor’s from <mark>Central College</mark> with a minor in French.
          </p>
          <p data-rise style={{ ['--i' as string]: 1 }}>
            <a className="closing" href="#contact">
              Write if the next system should feel simpler.
            </a>
          </p>
        </div>
      </section>

      <figure className="plate">
        <div className="plate-frame is-drift" data-chapter="photo">
          <img
            src="/images/world/greetings-from-pella-iowa-the-garden-city.jpg"
            width={1000}
            height={639}
            alt="Large-letter postcard reading Greetings from Pella, Iowa, with a windmill, tulips and a parade set inside the letters."
          />
        </div>
        <figcaption data-chapter="ink">
          Pella, Iowa, where he grew up. Postcard by Steve Shook, CC BY 2.0, via Wikimedia
          Commons.
        </figcaption>
      </figure>

      <section className="record" id="record" data-chapter="paper">
        <h2>
          <span>The record</span>
          <span>of the work</span>
        </h2>
        <table>
          <caption className="sr-only">Roles and degrees, newest first</caption>
          <thead className="sr-only">
            <tr>
              <th>Years</th>
              <th>Role</th>
              <th>Place</th>
              <th>Focus</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.slug} data-rise style={{ ['--i' as string]: 0 }}>
                <th scope="row">{range(position.date, position.endDate)}</th>
                <td>{position.title}</td>
                <td>
                  <a href={`https://${position.companyLink}`}>{position.company}</a>
                </td>
                <td className="note">{OUTCOMES[position.slug]}</td>
              </tr>
            ))}
            <tr className="gap" aria-hidden="true">
              <td colSpan={4} />
            </tr>
            {schools.map((school) => (
              <tr key={school.slug} data-rise style={{ ['--i' as string]: 1 }}>
                <th scope="row">{school.endDate.slice(0, 4)}</th>
                <td>{school.points[0]}</td>
                <td>{school.name}</td>
                <td className="note">{school.points.slice(1).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="skills" id="skills" data-chapter="paper">
        {SKILLS.map((skill, index) => (
          <div className="skill-row" key={skill.name} data-rise style={{ ['--i' as string]: index % 3 }}>
            <p className="skill-name">{skill.name}</p>
            <p className="skill-detail">{skill.detail}</p>
          </div>
        ))}
      </section>

      <figure className="plate">
        <div className="plate-frame" data-chapter="photo">
          <img
            src="/images/world/the-capitol-nashville-tennessee.jpg"
            width={1920}
            height={1495}
            alt="Nineteenth-century photograph of the Tennessee state capitol in Nashville, printed on a book plate."
          />
        </div>
        <figcaption data-chapter="ink">
          Nashville, where he studied at Vanderbilt. Photograph by George N. Barnard, CC0, via
          Wikimedia Commons.
        </figcaption>
      </figure>

      <section className="work" id="work" data-chapter="surface" ref={workRef}>
        <h2>Selected work</h2>
        <div className="ledger">
          {projects.map((project, index) => {
            const year = project.date.slice(0, 4)
            const previous = index > 0 ? projects[index - 1].date.slice(0, 4) : year
            return (
              <a
                className={year !== previous ? 'work-row spaced' : 'work-row'}
                href={`/projects/${project.slug}`}
                key={project.slug}
                onMouseEnter={(event) => align(index, event.currentTarget)}
                onFocus={(event) => align(index, event.currentTarget)}
              >
                <img
                  className={active === index ? 'preview is-on' : 'preview'}
                  style={{ top }}
                  src={`/images/projects/${project.image}`}
                  alt=""
                  width={1920}
                  height={1080}
                />
                <span className="name">{project.title}</span>
                <span className="kind">{KINDS[project.slug] || project.tags}</span>
                <span className="year">{year}</span>
              </a>
            )
          })}
        </div>
      </section>

      <section className="contact" id="contact" data-chapter="field">
        <div className="contact-inner">
          <p className="prompt" data-rise style={{ ['--i' as string]: 0 }}>
            <span>A note is enough.</span>
            <span>Tell me what you are building.</span>
          </p>

          <form
            action={`mailto:${EMAIL}`}
            method="post"
            encType="text/plain"
            onSubmit={send}
          >
            <div className="note">
              <label className="sr-only" htmlFor="note">
                Note to Sam
              </label>
              <input
                id="note"
                name="body"
                type="text"
                value={note}
                placeholder="What should feel simpler?"
                onChange={(event) => setNote(event.target.value)}
                autoComplete="off"
              />
              <button type="submit" aria-label="Send this note by email">
                →
              </button>
            </div>
            <p className="note-next">This opens an email to {EMAIL}.</p>
          </form>

          <dl className="contact-list">
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>Résumé</dt>
              <dd>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  PDF
                </a>
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                <a href="https://github.com/sammagee" rel="noopener noreferrer">
                  sammagee
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  )
}
