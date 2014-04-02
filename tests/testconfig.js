require.config({
  baseUrl: '../',

  paths: {
    jasmine: 'bower_components/jasmine/lib/jasmine-core/jasmine',
    'jasmine-html': 'bower_components/jasmine/lib/jasmine-core/jasmine-html',
    sinon: 'bower_components/sinon/index',
    spec: 'tests/spec',

    'aeris/mocks': 'bower_components/aerisjs/tests/mocks',
    'aeris/testUtils': 'bower_components/aerisjs/tests/testUtils',
    'matchers': 'bower_components/aerisjs/tests/lib/matchers'
  },

  map: {
    'aeris': {
      mocks: 'aeris/mocks'
    }
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
