interface ISkillsProps {
  skills: Skills
}

export default function Skills({ skills }: ISkillsProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-brand-500">
        Skills
      </h2>

      {Object.entries(skills).map(([title, list]) => (
        <div key={title}>
          <strong className="block font-semibold">{title}:</strong>
          <p className="text-xs">
            {list.slice(0, -1).join(', ')}, and {list.slice(-1)}
          </p>
        </div>
      ))}
    </section>
  )
}
