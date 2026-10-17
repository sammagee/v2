module.exports = {
  async redirects() {
    return ['/posts/:path*', '/projects/:path*', '/words', '/work'].map(
      (source) => ({ source, destination: '/', permanent: true })
    )
  },
}
