import { SocialLink } from './social-link'

export function MoreSection() {
  return (
    <section className="mt-16 sm:mt-32 md:mt-16" aria-labelledby="more">
      <h2 id="more" className="mb-4 block font-medium">
        More
      </h2>
      <p className="text-gray-1100">
        Find me on{' '}
        <SocialLink href="https://x.com/sammagee" hint="@sammagee">
          X
        </SocialLink>
        ,{' '}
        <SocialLink href="https://linkedin.com/in/sammagee" hint="in/sammagee">
          LinkedIn
        </SocialLink>
        , and{' '}
        <SocialLink href="https://github.com/sammagee" hint="@sammagee">
          GitHub
        </SocialLink>
        <ResumeAndEmail email={process.env.NEXT_PUBLIC_EMAIL} />
      </p>
    </section>
  )
}

function ResumeAndEmail({ email }: { email: string | undefined }) {
  if (!email) {
    return (
      <>
        , or see my{' '}
        <SocialLink href="/resume.pdf" hint="resume.pdf">
          resume
        </SocialLink>
        .
      </>
    )
  }
  return (
    <>
      , see my{' '}
      <SocialLink href="/resume.pdf" hint="resume.pdf">
        resume
      </SocialLink>
      , or{' '}
      <SocialLink href={`mailto:${email}`} hint={email}>
        email me
      </SocialLink>
      .
    </>
  )
}
