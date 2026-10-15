document.documentElement.classList.add('js')

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const rises = document.querySelectorAll('[data-rise]')

if (reduce) {
  rises.forEach((node) => node.classList.add('is-in'))
} else if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        io.unobserve(entry.target)
      })
    },
    { threshold: 0.18, rootMargin: '0px 0px -6% 0px' }
  )
  rises.forEach((node) => io.observe(node))
} else {
  rises.forEach((node) => node.classList.add('is-in'))
}

const header = document.querySelector('[data-header]')
const chapters = () => Array.from(document.querySelectorAll('[data-chapter]'))

const paintHeader = () => {
  if (!header || header.dataset.menu === 'open') return
  const y = 28
  let tone = 'paper'
  chapters().forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top <= y && rect.bottom > y) tone = el.dataset.chapter || tone
  })
  header.dataset.ink =
    tone === 'field' ? 'field' : tone === 'ink' ? 'light' : tone === 'photo' ? 'photo' : 'dark'
}

window.__paintHeader = paintHeader
paintHeader()
window.addEventListener('scroll', paintHeader, { passive: true })
window.addEventListener('resize', paintHeader)
