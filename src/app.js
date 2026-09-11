const main = document.querySelector('main')
const hero = document.querySelector('#hero')
const playButton = document.querySelector('[data-play]')
const muteButton = document.querySelector('[data-mute]')
const audioState = document.querySelector('[data-audio-state]')
const progressFill = document.querySelector('[data-progress-fill]')
const trackTime = document.querySelector('[data-track-time]')
const visualState = document.querySelector('[data-visual-state]')
const canvas = document.querySelector('.visualizer')
const ctx = canvas.getContext('2d')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

class MotionController {
  constructor() {
    this.state = 'IDLE'
    this.ambientTime = 0
    this.audioEnergy = 0
    this.targetAudioEnergy = 0
    this.scrollProgress = 0
    this.pointerX = 0
    this.pointerY = 0
    this.trackSeconds = 0
    this.lastTime = 0
    this.rafId = 0
    this.running = false
    this.tick = 0
    this.analyser = undefined
    this.audioData = undefined
    this.frame = this.frame.bind(this)
  }

  attachAnalyser(analyser) {
    this.analyser = analyser
    this.audioData = new Uint8Array(analyser.frequencyBinCount)
  }

  setState(nextState) {
    this.state = nextState
    this.targetAudioEnergy = nextState === 'PLAYING' && !muted ? 1 : 0
    main.classList.toggle('audio-active', nextState === 'PLAYING' && !muted)
    visualState.textContent = nextState === 'PLAYING' ? (muted ? 'FIELD / MUTED' : 'FIELD / PLAYING') : `FIELD / ${nextState}`
  }

  start() {
    if (this.running || reducedMotion.matches || document.hidden) return
    this.running = true
    this.rafId = requestAnimationFrame(this.frame)
  }

  stop() {
    if (!this.running) return
    cancelAnimationFrame(this.rafId)
    this.running = false
  }

  frame(now) {
    if (!this.running) return
    const delta = Math.min((now - (this.lastTime || now)) / 1000, 0.1)
    this.lastTime = now
    this.ambientTime += delta
    this.tick += 1
    this.sampleAudio()
    this.audioEnergy += (this.targetAudioEnergy - this.audioEnergy) * Math.min(delta * 2.6, 1)
    if (this.state === 'PLAYING') this.trackSeconds += delta
    this.syncProperties()
    this.drawCanvas()
    this.rafId = requestAnimationFrame(this.frame)
  }

  sampleAudio() {
    if (this.state !== 'PLAYING' || muted || !this.analyser || !this.audioData) return
    this.analyser.getByteFrequencyData(this.audioData)
    const bins = Math.min(this.audioData.length, 32)
    let sum = 0
    for (let index = 0; index < bins; index += 1) sum += this.audioData[index]
    const analyserEnergy = sum / Math.max(bins, 1) / 255
    this.targetAudioEnergy = Math.min(1, 0.5 + analyserEnergy * 0.9)
  }

  syncProperties() {
    const t = this.ambientTime
    const audio = this.audioEnergy
    const driftX = Math.sin(t * 0.68) * 22 + this.pointerX * 0.8
    const driftY = Math.cos(t * 0.52) * 16 + this.pointerY * 0.7
    const vinylDegrees = (t * (this.state === 'PLAYING' ? 86 + audio * 150 : 5.5) + Math.sin(t * 0.7) * 5) % 360
    main.style.setProperty('--ambient-drift', `${driftX.toFixed(2)}px`)
    main.style.setProperty('--ambient-drift-y', `${driftY.toFixed(2)}px`)
    main.style.setProperty('--ambient-breath', (1 + Math.sin(t * 0.92) * 0.075 + audio * 0.035).toFixed(3))
    main.style.setProperty('--audio-energy', audio.toFixed(3))
    main.style.setProperty('--light-pulse', (0.72 + Math.sin(t * 0.9) * 0.2 + audio * 0.28).toFixed(3))
    main.style.setProperty('--graphic-shift', `${(Math.sin(t * 1.05) * 22 + this.scrollProgress * 42).toFixed(2)}px`)
    main.style.setProperty('--hero-scroll', `${(this.scrollProgress * -18).toFixed(2)}px`)
    main.style.setProperty('--vinyl-rotation', `${vinylDegrees.toFixed(2)}deg`)
    main.style.setProperty('--horse-drift', `${(-driftX * 0.4).toFixed(2)}px`)
    progressFill.style.width = `${Math.min(this.trackSeconds / 180, 1) * 100}%`
    trackTime.textContent = `${String(Math.floor(this.trackSeconds / 60)).padStart(2, '0')}:${String(Math.floor(this.trackSeconds % 60)).padStart(2, '0')} / DEMO`
  }

  drawCanvas() {
    const ratio = Math.min(devicePixelRatio || 1, 2)
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!width || !height) return
    if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
      canvas.width = width * ratio
      canvas.height = height * ratio
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    ctx.clearRect(0, 0, width, height)
    const beat = 0.18 + this.audioEnergy * 0.75 + Math.sin(this.ambientTime * 1.1) * 0.08
    ctx.strokeStyle = '#c5dfeb'
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.28 + beat * 0.5
    for (let row = 0; row < 11; row += 1) {
      ctx.beginPath()
      const y = height * (0.1 + row * 0.085)
      for (let x = 0; x < width; x += 8) {
        const wave = Math.sin(x / 48 + this.ambientTime * 2.1 + row) * (5 + beat * 28) + Math.cos(x / 130 - this.ambientTime * 1.2) * 5
        x ? ctx.lineTo(x, y + wave) : ctx.moveTo(x, y + wave)
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 0.45
    ctx.strokeRect(width * 0.12, height * 0.12, width * 0.76, height * 0.76)
  }

  renderStatic() {
    this.syncProperties()
    this.drawCanvas()
  }
}

let muted = false
let context
let oscillator
let lfo
let gain
let analyser
const motion = new MotionController()

function setPlayButton(active) {
  playButton.textContent = active ? 'Ⅱ Pause tone' : '▶ Play tone'
  playButton.setAttribute('aria-label', active ? 'Pause demo audio' : 'Play demo audio')
}

function stopSources() {
  oscillator?.stop()
  lfo?.stop()
  oscillator = undefined
  lfo = undefined
}

async function toggleAudio() {
  if (motion.state === 'PLAYING') {
    stopSources()
    motion.setState('PAUSED')
    setPlayButton(false)
    return
  }
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) throw new Error('unavailable')
    context ||= new AudioContext()
    await context.resume()
    if (!gain) {
      gain = context.createGain()
      analyser = context.createAnalyser()
      analyser.fftSize = 64
      analyser.connect(gain)
      gain.connect(context.destination)
    }
    gain.gain.value = muted ? 0 : 0.035
    oscillator = context.createOscillator()
    lfo = context.createOscillator()
    const lfoGain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = 72
    lfo.frequency.value = 0.11
    lfoGain.gain.value = 13
    lfo.connect(lfoGain)
    lfoGain.connect(oscillator.frequency)
    oscillator.connect(analyser)
    lfo.start()
    oscillator.start()
    motion.attachAnalyser(analyser)
    motion.setState('PLAYING')
    setPlayButton(true)
  } catch {
    playButton.disabled = true
    muteButton.disabled = true
    audioState.textContent = 'Audio is unavailable in this browser.'
  }
}

function toggleMute() {
  muted = !muted
  if (gain) gain.gain.value = muted ? 0 : 0.035
  muteButton.textContent = muted ? 'Unmute' : 'Mute'
  muteButton.setAttribute('aria-label', muted ? 'Unmute demo audio' : 'Mute demo audio')
  muteButton.setAttribute('aria-pressed', String(muted))
  motion.setState(motion.state)
}

playButton.addEventListener('click', toggleAudio)
muteButton.addEventListener('click', toggleMute)
document.addEventListener('keydown', (event) => {
  if (event.code !== 'Space' || event.target.matches('button, a, input, textarea, select')) return
  event.preventDefault()
  toggleAudio()
})
hero.addEventListener('pointermove', (event) => {
  if (reducedMotion.matches) return
  motion.pointerX = (event.clientX / innerWidth - 0.5) * 10
  motion.pointerY = (event.clientY / innerHeight - 0.5) * 10
})
window.addEventListener('scroll', () => {
  motion.scrollProgress = Math.min(window.scrollY / Math.max(document.body.scrollHeight - innerHeight, 1), 1)
}, { passive: true })
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    motion.stop()
    motion.renderStatic()
  } else {
    motion.lastTime = 0
    motion.start()
  }
})
document.addEventListener('visibilitychange', () => {
  if (document.hidden) motion.stop()
  else {
    motion.lastTime = 0
    motion.start()
  }
})

motion.renderStatic()
motion.start()
