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
    require: ['features/**/*.js', '../index.js']
  }
};
