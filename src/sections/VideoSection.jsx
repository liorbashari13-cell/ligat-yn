import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const VIDEO_ID = 'nti2eDOCMTg'
const PLAY_DELAY_MS = 2500

export default function VideoSection() {
  const playerRef = useRef(null)
  const mountRef = useRef(null)
  const wantsUnmutedRef = useRef(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const initPlayer = () => {
      if (!mountRef.current) return
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady(e) {
            // Stretch the injected iframe to fill the relative container
            Object.assign(e.target.getIframe().style, {
              position: 'absolute',
              inset: '0',
              width: '100%',
              height: '100%',
            })
            if (wantsUnmutedRef.current) {
              e.target.unMute()
              e.target.setVolume(100)
            }
            setTimeout(() => e.target.playVideo(), PLAY_DELAY_MS)
          },
          onStateChange(e) {
            // Backup loop in case the playlist loop param doesn't fire
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(0)
              e.target.playVideo()
            }
          },
        },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      // Chain onto any existing callback (don't clobber other consumers)
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        initPlayer()
      }
    }

    return () => playerRef.current?.destroy?.()
  }, [])

  const handleUnmute = () => {
    wantsUnmutedRef.current = true
    playerRef.current?.unMute?.()
    playerRef.current?.setVolume?.(100)
    setMuted(false)
  }

  return (
    <section className="bg-dark py-14 md:py-20">
      <div className="flex justify-center px-5">
        {/* 9:16 vertical container — prominent on mobile, capped on desktop */}
        <div
          className="relative w-full max-w-[320px] sm:max-w-[380px] overflow-hidden rounded-2xl bg-dark-soft"
          style={{ aspectRatio: '9 / 16' }}
        >
          {/* YT IFrame API replaces this div with an iframe */}
          <div ref={mountRef} />

          {/* Transparent shield — prevents accidental tap-to-pause on the iframe */}
          <div className="absolute inset-0 z-[5]" />

          {/* Unmute overlay — full-area tap target, fades out on click */}
          <AnimatePresence>
            {muted && (
              <motion.button
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleUnmute}
                className="absolute inset-0 z-10 flex items-center justify-center"
                aria-label="הפעל קול"
              >
                <span className="flex items-center gap-2.5 rounded-2xl border border-gold/50 bg-black/65 px-6 py-3.5 text-base font-bold text-white shadow-lg backdrop-blur-sm">
                  <span aria-hidden>🔊</span>
                  <span>הפעל קול</span>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
