import { useState, useEffect, useRef } from 'react'

interface IDirection {
  isDown: boolean
  isUp: boolean
}

export default function useScrollDirection(): [number, IDirection] {
  const scrollPos = useRef<number>(0)
  const [direction, setDirection] = useState<IDirection>({
    isDown: false,
    isUp: false
  })

  useEffect(() => {
    const handleScroll = () => {
      setDirection({
        isDown: window.pageYOffset > scrollPos.current,
        isUp: window.pageYOffset < scrollPos.current
      })
      scrollPos.current = window.pageYOffset
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return [scrollPos.current, direction]
}
