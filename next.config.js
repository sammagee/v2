const CANONICAL_ORIGIN = 'https://sammagee.me'
const ALIAS_HOSTS = [
  'magee.one',
  'www.magee.one',
  'v2.sammagee.me',
  'sammagee.dev',
  'www.sammagee.dev',
]
const REMOVED_PAGES = [
  '/posts/:path*',
  '/projects/:path*',
  '/thoughts',
  '/work',
]

module.exports = {
  reactCompiler: true,
  async redirects() {
    return [
      ...ALIAS_HOSTS.map(aliasRedirect),
      ...REMOVED_PAGES.map(homeRedirect),
    ]
  },
}

function aliasRedirect(host) {
  return {
    source: '/:path*',
    has: [{ type: 'host', value: host }],
    destination: `${CANONICAL_ORIGIN}/:path*`,
    permanent: true,
  }
}

function homeRedirect(source) {
  return { source, destination: '/', permanent: true }
}
