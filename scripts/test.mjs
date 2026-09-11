import { readFile } from 'node:fs/promises'
const html = await readFile('index.html', 'utf8')
const css = await readFile('src/styles.css', 'utf8')
const app = await readFile('src/app.js', 'utf8')
const checks = ['HIPNOSIS', 'data-play', 'data-mute', 'track-progress', 'data-progress-fill', 'data-track-time', 'prefers-reduced-motion', 'audio-active', 'MotionController', 'createAnalyser', 'visibilitychange', 'Space', 'open.spotify.com/artist/3IdEjZcMkM3f1IcFQkSj92',   'horses.png', 'listening-room.png', 'icon.png', 'bandcamp', 'BIEN', '01 —']
for (const check of checks) if (![html, css, app].some((source) => source.includes(check))) throw new Error(`Missing: ${check}`)
console.log(`Experience smoke checks passed (${checks.length})`)
