const { defineConfig } = require('cypress')

module.exports = defineConfig({
  videosFolder: './videos',
  screenshotsFolder: './screenshots',
  fixturesFolder: './fixtures',
  video: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config)
    },
    specPattern: './integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './support/index.ts',
    baseUrl: 'http://localhost:8200',
  },
})
