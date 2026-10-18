import Router from 'next/router'
import { useEffect } from 'react'

const scrollPositions = new Map<string, number>()

type PopState = Parameters<Parameters<typeof Router.beforePopState>[0]>[0]

export function useAnimatedHistory() {
  useEffect(() => {
    if (!('startViewTransition' in document)) return
    manualScroll()
    addEventListener('scroll', rememberScroll, { passive: true })
    addEventListener('pagehide', autoScroll)
    addEventListener('pageshow', manualScroll)
    Router.beforePopState(deferPopState)
    return () => {
      removeEventListener('scroll', rememberScroll)
      removeEventListener('pagehide', autoScroll)
      removeEventListener('pageshow', manualScroll)
      Router.beforePopState(() => true)
      autoScroll()
    }
  }, [])
}

function deferPopState({ url, as, options }: PopState) {
  if (pathOf(as) === pathOf(Router.asPath)) return true
  const top = scrollPositions.get(entryKey()) ?? 0
  setTimeout(() => void traverse(url, as, options.locale, top))
  return false
}

async function traverse(
  url: string,
  as: string,
  locale: PopState['options']['locale'],
  top: number
) {
  await Router.replace(url, as, { locale, scroll: false })
  scrollTo(0, top)
  rememberScroll()
}

function rememberScroll() {
  scrollPositions.set(entryKey(), scrollY)
}

function entryKey(): string {
  return String(history.state?.key)
}

function pathOf(as: string) {
  return as.split(/[?#]/)[0]
}

function manualScroll() {
  history.scrollRestoration = 'manual'
}

function autoScroll() {
  history.scrollRestoration = 'auto'
}
