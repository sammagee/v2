module.exports = {
  async redirects() {
    return [
      {
        source: '/words',
        destination: '/#words',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/#work',
        permanent: true,
      },
    ]
  },
  swcMinify: true,
}
