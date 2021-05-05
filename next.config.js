module.exports = {
  future: {
    webpack5: true,
  },
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
    ];
  },
};
