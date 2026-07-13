export const formatTimelineTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - minutes * 60
  return `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`
}
