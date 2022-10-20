const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    env: {
      access_token: 'Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy'
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
  },
});
