export const IntervalTimer = (callback, interval) => {
  let timerId
  let startTime
  let remaining = 0
  let state = 0 // 0 = idle, 1 = running, 2 = paused, 3 = resumed

  const pause = () => {
    if (state !== 1) return

    remaining = interval - (new Date() - startTime)
    clearInterval(timerId)
    state = 2
  }

  const resume = () => {
    if (state !== 2) return

    state = 3
    setTimeout(timeoutCallback, remaining)
  }

  const timeoutCallback = () => {
    if (state !== 3) return

    callback()

    startTime = new Date()
    timerId = setInterval(callback, interval)
    state = 1
  }

  // Initialize the timer
  startTime = new Date()
  timerId = setInterval(callback, interval)
  state = 1

  // Return the public API
  return {
    pause,
    resume,
  }
}
