module.exports = (config) => {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'dist/index.js', type: 'module' },
      { pattern: 'test/*.spec.js', type: 'module' }
    ],
    browsers: ['ChromeHeadless', 'FirefoxHeadless', 'Edge'],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },
    reporters: ['progress'],
    port: 1234,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: false,
    singleRun: true,
    // https://github.com/karma-runner/karma/pull/2834#issuecomment-376854730
    customContextFile: 'test/context.html',
    customDebugFile: 'test/debug.html'
  });
};