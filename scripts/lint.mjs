import { readFile } from 'node:fs/promises'
const app = await readFile('src/app.js', 'utf8')
if (!app.includes('AudioContext') || !app.includes('requestAnimationFrame')) throw new Error('Expected native experience modules missing')
console.log('Static source checks passed')
