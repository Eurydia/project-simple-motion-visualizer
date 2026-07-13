import { useEffect, useState } from 'react'

export const useMotionPlayback = (duration: number) => {
  const [playing, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    setCurrentTime((time) => Math.min(time, duration))
  }, [duration])

  useEffect(() => {
    if (!playing) return
    let frame = 0
    let previous: number | null = null
    const advance = (timestamp: number) => {
      if (previous !== null) {
        const delta = Math.min((timestamp - previous) / 1000, 0.05)
        setCurrentTime((time) => (time + delta >= duration ? 0 : time + delta))
      }
      previous = timestamp
      frame = requestAnimationFrame(advance)
    }
    frame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(frame)
  }, [duration, playing])

  const resetPlayback = () => {
    setCurrentTime(0)
    setPlaying(false)
  }
  const stepFrame = (direction: -1 | 1) => {
    setPlaying(false)
    setCurrentTime((time) =>
      Math.max(0, Math.min(duration, time + direction / 60)),
    )
  }

  return {
    currentTime,
    setCurrentTime,
    playing,
    setPlaying,
    resetPlayback,
    stepFrame,
  }
}
