import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '../components/ui/Reveal.jsx'

const VIDEO_ID = 'nti2eDOCMTg'
const THUMB_URL = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`

// ── Inline icons ───────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}
function VolumeOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  )
}
function VolumeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  )
}

// ── Helpers ────────────────────────────────────────────────────────
function showIframe(ref) {
  if (ref.current) ref.current.style.opacity = '1'
}
function hideIframe(ref) {
  if (ref.current) ref.current.style.opacity = '0'
}

export default function VideoSection() {
  const playerRef = useRef(null)
  const mountRef = useRef(null)
  const iframeRef = useRef(null)   // the actual <iframe> element injected by YT
  const sectionRef = useRef(null)
  const playerReadyRef = useRef(false)
  const wantsUnmutedRef = useRef(false)

  const [playerReady, setPlayerReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [bannerVisible, setBannerVisible] = useState(true)

  // ── YouTube IFrame API ─────────────────────────────────────────
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
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
        },
        events: {
          onReady(e) {
            const iframe = e.target.getIframe()
            iframeRef.current = iframe
            Object.assign(iframe.style, {
              position: 'absolute',
              inset: '0',
              width: '100%',
              height: '100%',
              opacity: '1',
            })
            if (wantsUnmutedRef.current) {
              e.target.unMute()
              e.target.setVolume(100)
            }
            playerReadyRef.current = true
            setPlayerReady(true)
            setIsPlaying(true)
            e.target.playVideo()
          },
          onStateChange(e) {
            const S = window.YT.PlayerState
            if (e.data === S.PLAYING) {
              showIframe(iframeRef)
              setIsPlaying(true)
            } else if (e.data === S.PAUSED) {
              // Hide the iframe so YouTube's paused-state overlay (title,
              // logo, big play button) never shows — we render our own instead.
              hideIframe(iframeRef)
              setIsPlaying(false)
            } else if (e.data === S.ENDED) {
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
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        initPlayer()
      }
    }

    return () => playerRef.current?.destroy?.()
  }, [])

  // ── Auto-pause when section scrolls out of view (>= 50% hidden) ─
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playerReadyRef.current) {
          playerRef.current?.pauseVideo?.()
          // onStateChange(PAUSED) will handle hiding the iframe + setIsPlaying(false)
        }
        // Intentionally no auto-resume when scrolling back in
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ── Control handlers ───────────────────────────────────────────
  const handleUnmute = () => {
    wantsUnmutedRef.current = true
    playerRef.current?.unMute?.()
    playerRef.current?.setVolume?.(100)
    setIsMuted(false)
    setBannerVisible(false)
  }

  const togglePlay = () => {
    if (!playerReadyRef.current) return
    if (isPlaying) {
      playerRef.current?.pauseVideo?.()
      // iframe hidden + isPlaying=false handled by onStateChange(PAUSED)
    } else {
      // Show iframe immediately so there's no flash between overlay removal
      // and the PLAYING state event arriving from the player.
      showIframe(iframeRef)
      setIsPlaying(true)
      playerRef.current?.playVideo?.()
    }
  }

  const toggleMute = () => {
    if (!playerReadyRef.current) return
    if (isMuted) {
      wantsUnmutedRef.current = true
      playerRef.current?.unMute?.()
      playerRef.current?.setVolume?.(100)
      setIsMuted(false)
      setBannerVisible(false)
    } else {
      playerRef.current?.mute?.()
      setIsMuted(true)
    }
  }

  // Pause overlay: shown whenever the player is ready but not playing.
  // Covers both manual pause, scroll-triggered pause, and any initial
  // paused state before the first playback begins.
  const showPauseOverlay = playerReady && !isPlaying

  return (
    <section ref={sectionRef} className="bg-dark py-14 md:py-20">
      {/* Heading */}
      <Reveal className="mb-8 px-5 text-center">
        <h2 className="text-2xl font-black text-gold md:text-3xl">
          הזמנה אישית מהכוכבים שלכם
        </h2>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />
      </Reveal>

      <div className="flex justify-center px-5">
        {/*
          Z-index stack (bottom → top):
            iframe        (z-auto, opacity toggled) — video content
            init-thumb    (z-[1])  — placeholder while API script loads
            blocker       (z-[2])  — always; blocks all YT native UI pointer events
            pause-overlay (z-[3])  — thumbnail + play button when paused
            controls      (z-10)   — our play/mute pill (always after ready)
            banner        (z-20)   — initial full-area unmute prompt
        */}
        <div
          className="relative w-full max-w-[320px] overflow-hidden rounded-2xl bg-dark-soft sm:max-w-[380px]"
          style={{ aspectRatio: '9 / 16' }}
        >
          {/* Thumbnail shown while the API script is still loading */}
          {!playerReady && (
            <div
              className="absolute inset-0 z-[1] bg-cover bg-center"
              style={{ backgroundImage: `url('${THUMB_URL}')` }}
            />
          )}

          {/* YT IFrame API replaces this div with its <iframe> */}
          <div ref={mountRef} />

          {/* Full-cover transparent blocker — hides & blocks YT native UI */}
          <div className="absolute inset-0 z-[2]" />

          {/* Pause overlay — replaces the iframe visually while paused */}
          <AnimatePresence>
            {showPauseOverlay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 z-[3] bg-cover bg-center"
                style={{ backgroundImage: `url('${THUMB_URL}')` }}
              >
                {/* Centered play button */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label="הפעל"
                >
                  <span className="flex items-center gap-2 rounded-xl border border-white/25 bg-black/65 px-5 py-2.5 font-bold text-white backdrop-blur-sm">
                    <PlayIcon />
                    <span className="text-sm">הפעל</span>
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom controls pill — always visible once player is ready */}
          {playerReady && (
            <div className="absolute bottom-3 end-3 z-10 flex items-center gap-0.5 rounded-xl border border-white/20 bg-black/65 p-1 backdrop-blur-sm">
              <button
                onClick={togglePlay}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15 active:bg-white/25"
                aria-label={isPlaying ? 'השהה' : 'הפעל'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={toggleMute}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15 active:bg-white/25"
                aria-label={isMuted ? 'הפעל קול' : 'השתק'}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
            </div>
          )}

          {/* Initial unmute banner — full-area tap target, fades out when dismissed */}
          <AnimatePresence>
            {bannerVisible && (
              <motion.button
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleUnmute}
                className="absolute inset-0 z-20 flex items-center justify-center"
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
