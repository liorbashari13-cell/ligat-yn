import sharp from 'sharp'
import { rename } from 'fs/promises'

const src = 'public/players/chen-ezra.jpg'
const tmp = 'public/players/chen-ezra-tmp.jpg'

const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
console.log('Input:', width, 'x', height)

// Replace near-achromatic gray pixels (studio backdrop) with pure white.
// Criteria: R≈G≈B (within 12 luma range) AND brightness > 130.
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  const lo = Math.min(r, g, b)
  const hi = Math.max(r, g, b)
  if (hi - lo <= 12 && r > 130) {
    data[i] = data[i + 1] = data[i + 2] = 255
  }
}

// Crop to top 65% — shows face + upper body, removes legs
const cropHeight = Math.round(height * 0.65)

await sharp(data, { raw: { width, height, channels } })
  .extract({ left: 0, top: 0, width, height: cropHeight })
  .jpeg({ quality: 92 })
  .toFile(tmp)

await rename(tmp, src)

const out = await sharp(src).metadata()
console.log('Output:', out.width, 'x', out.height)
console.log('Done.')
