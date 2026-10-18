import type { Assets } from './assets.ts'

const FONT_URL =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..600&display=block'
const BASE_STYLES = `
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; background: #fdfdfc; }
  body {
    font-family: Inter, sans-serif;
    font-feature-settings: 'cv01', 'ss03';
    font-variation-settings: 'opsz' 32;
    -webkit-font-smoothing: antialiased;
    color: #21201c;
  }
  .ring {
    display: inline-block;
    padding: 0.125em;
    border-radius: 9999px;
    background: #fff;
    filter: drop-shadow(0 0.0625em 0.0625em rgb(33 32 28 / 0.22));
    vertical-align: middle;
    transform: translateY(-0.06em);
  }
  .art {
    position: relative;
    display: block;
    width: 1.375em;
    height: 1.375em;
    overflow: hidden;
    border-radius: 9999px;
  }
  .gradient { background: linear-gradient(160deg, #e3eeff 0%, #c9dcff 100%); }
  .memoji {
    position: absolute;
    top: 3.409%;
    left: 5.114%;
    width: 89.773%;
    height: 89.773%;
  }
  .logo { width: 100%; height: 100%; object-fit: cover; }
`

export function cardHtml(assets: Assets) {
  return page(
    `
    .card { display: flex; flex-direction: column; justify-content: center; height: 100%; padding: 0 112px; font-size: 44px; }
    .name, .title { font-weight: 500; line-height: 1.25; }
    .title { color: #63635e; line-height: 1; }
    .bio { margin-top: 72px; color: #63635e; line-height: 1.65; font-size: 40px; max-width: 976px; }
    .bio .ring { margin-right: 0.3em; }
    .strong { color: #21201c; }
    `,
    `<main class="card">
      <div class="name">Sam Magee</div>
      <div class="title">Senior Software Engineer</div>
      <p class="bio">Hey, my name is ${avatar(assets)}<span class="strong">Sam</span>! I'm a senior software engineer at ${logo(assets)}<span class="strong">Vanta</span>, building compliance and trust software for the future.</p>
    </main>`
  )
}

export function avatarHtml(assets: Assets) {
  return page(
    `
    body { display: grid; place-items: center; }
    .art { width: 100vw; height: 100vh; border-radius: 0; }
    `,
    `<div class="art gradient"><img class="memoji" src="${assets.avatar}" alt=""></div>`
  )
}

function page(styles: string, body: string) {
  return `<!doctype html><html><head><link rel="stylesheet" href="${FONT_URL}"><style>${BASE_STYLES}${styles}</style></head><body>${body}</body></html>`
}

function avatar(assets: Assets) {
  return `<span class="ring"><span class="art gradient"><img class="memoji" src="${assets.avatar}" alt=""></span></span>`
}

function logo(assets: Assets) {
  return `<span class="ring"><span class="art"><img class="logo" src="${assets.vanta}" alt=""></span></span>`
}
