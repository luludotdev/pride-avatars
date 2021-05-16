const withPlugins = require('next-compose-plugins')
const images = require('next-images')

module.exports = withPlugins(
  [[images, { esModule: true, inlineImageLimit: false }]],
  {
    future: {
      webpack5: true,
    },
  }
)
