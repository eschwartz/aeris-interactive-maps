require.config({
  baseUrl: '../',

  paths: {
    jasmine: 'bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': 'bower_components/jasmine/lib/jasmine-core/jasmine-html',
    sinon: 'bower_components/sinon/index',
    spec: 'tests/spec',

    mocks: 'bower_components/aerisjs/tests/mocks',
    testUtils: 'bower_components/aerisjs/tests/testUtils',
    'matchers': 'bower_components/aerisjs/tests/lib/matchers'
  },

  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'sinon': {
      exports: 'sinon'
    }
  }
});