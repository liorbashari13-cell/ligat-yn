import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Scopes GSAP animations to a container ref and auto-reverts on unmount.
 *
 * Use for imperative timelines / ScrollTriggers. Prefer Framer Motion
 * (`motion.*`, `whileInView`) for simple enter/hover transitions; reach
 * for GSAP when you need fine-grained timelines or scroll-scrubbing.
 *
 *   const scope = useGsap((ctx) => {
 *     gsap.from('.fade-up', { y: 40, opacity: 0, stagger: 0.1 })
 *   })
 *   return <section ref={scope}>...</section>
 */
export function useGsap(setup, deps = []) {
  const scope = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(setup, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
