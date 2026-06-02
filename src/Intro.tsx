import { useEffect, useState, useRef } from 'react'

const FULL_NAME = 'Johanna Huarachi'

export default function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'dot' | 'expand' | 'text' | 'out'>('dot')
  const [typedName, setTypedName] = useState('')
  const [showSticky, setShowSticky] = useState(false)
  const nameRef = useRef(0)

  useEffect(() => {
    const expandTimer = setTimeout(() => setPhase('expand'), 1200)
    const textTimer   = setTimeout(() => setPhase('text'),   2000)
    const stickyTimer = setTimeout(() => setShowSticky(true), 4000)
    const outTimer    = setTimeout(() => setPhase('out'),    7000)
    const doneTimer   = setTimeout(() => onDone(),           7800)
    return () => {
      clearTimeout(expandTimer)
      clearTimeout(textTimer)
      clearTimeout(stickyTimer)
      clearTimeout(outTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  useEffect(() => {
    if (phase !== 'text') return
    nameRef.current = 0
    setTypedName('')
    const interval = setInterval(() => {
      nameRef.current += 1
      setTypedName(FULL_NAME.slice(0, nameRef.current))
      if (nameRef.current >= FULL_NAME.length) clearInterval(interval)
    }, 85)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <div className={`intro-screen intro-phase-${phase}`}>
      <div className={`intro-mask intro-mask-${phase}`} />
      <div className={`intro-dot intro-dot-${phase}`} />

      {(phase === 'text' || phase === 'out') && (
        <div className="intro-inner">
          <div className="intro-eyebrow">Style Guide · v1.0</div>
          <div className="intro-name">
            {typedName}<span className="intro-cursor">|</span>
          </div>
        </div>
      )}

      {(phase === 'text' || phase === 'out') && (
        <div className={`sticky-wrap ${showSticky ? 'sticky-landed' : ''}`}>
          <div className="washi-tape">
            <div className="washi-grid" />
          </div>
          <div className="sticky-body">
            <div className="sticky-content">
              welcome to my design system ✦
            </div>
          </div>
        </div>
      )}
    </div>
  )
}