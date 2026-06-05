// Renders an emoji as a Twemoji SVG image so it looks identical (iPhone /
// Twitter style) on every OS and browser, instead of the platform's native
// glyph. SVG scales crisply at any font size.
//
// The image is sized to 1em and aligned to the text baseline, so dropping
// <Emoji> inside a text-5xl element makes the emoji 5xl too.

const TWEMOJI_BASE =
  'https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/'

// Twemoji's codepoint algorithm: walk surrogate pairs, drop the FE0F
// variation selector (Twemoji asset filenames omit it).
function toCodePoint(emoji) {
  const codes = []
  let high = 0
  for (let i = 0; i < emoji.length; i++) {
    const c = emoji.charCodeAt(i)
    if (high) {
      codes.push(
        (0x10000 + ((high - 0xd800) << 10) + (c - 0xdc00)).toString(16),
      )
      high = 0
    } else if (c >= 0xd800 && c <= 0xdbff) {
      high = c
    } else {
      codes.push(c.toString(16))
    }
  }
  return codes.filter((code) => code !== 'fe0f').join('-')
}

export default function Emoji({ char, label, className = '' }) {
  return (
    <img
      src={`${TWEMOJI_BASE}${toCodePoint(char)}.svg`}
      alt={label ?? char}
      draggable={false}
      loading="lazy"
      className={`inline-block h-[1em] w-[1em] align-[-0.125em] ${className}`}
    />
  )
}
