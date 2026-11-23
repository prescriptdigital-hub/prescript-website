'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion, useScroll } from 'framer-motion'

export default function ScrollFilm() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduce) return
    let raf = 0
    let shown = 0
    const tick = () => {
      if (video.readyState >= 2 && video.duration) {
        const target = Math.min(scrollYProgress.get() / 0.9, 1) * (video.duration - 0.05)
        shown += (target - shown) * 0.18
        if (!video.seeking && Math.abs(video.currentTime - shown) > 0.02) video.currentTime = shown
      }
      raf = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(tick)
    })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduce, scrollYProgress])

  return (
    <section ref={sectionRef} aria-label="From scattered to structured" className="relative bg-pd-brick motion-safe:h-[260vh]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden flex flex-col lg:block">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={reduce ? '/media/blocks-end.webp' : '/media/blocks-start.webp'}
          src={reduce ? undefined : '/media/blocks-scroll.mp4'}
          aria-hidden="true"
          tabIndex={-1}
          className="w-full flex-1 min-h-0 lg:absolute lg:inset-0 lg:h-full object-cover object-right"
        />
        <div className="relative bg-pd-oxblood p-7 sm:p-10 lg:absolute lg:left-0 lg:bottom-0 lg:w-[38%] lg:max-w-xl lg:p-12">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-cream mb-4">The problem we solve</p>
          <h2 className="font-display font-light text-pd-cream text-[32px] sm:text-[42px] lg:text-[48px] leading-[1.05] tracking-tighter">
            From scattered to structured
          </h2>
          <p className="mt-4 text-pd-paper leading-relaxed">
            A logo here, a website there, leads in three inboxes. We put the pieces in order so your business works as one system.
          </p>
        </div>
      </div>
    </section>
  )
}
