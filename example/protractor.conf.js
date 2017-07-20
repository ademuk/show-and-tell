exports.config = {

  baseUrl: 'http://cucumber.io/',

  capabilities: {
    browserName:'chrome'
  },

  framework: 'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: [
    './features/*.feature'
  ],

  cucumberOpts: {
    require: ['features/**/*.js', require.resolve('show-and-tell')],
    format: 'node_modules/show-and-tell/formatter.js'
  }
};
