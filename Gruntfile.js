module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'jasmine-legacy': {
      options: {
        amdConfigModules: [
          '../config-amd',
          'testconfig'
        ],
        libs: [
          'jasmine',
          'jasmine-html',
          'matchers/matchers.package'
        ],
        exclude: [
          // Not specs
          'tests/**/context.js',

          // Failing specs
          'tests/spec/maps/options/mapappbuilderoptions.js',
          'tests/spec/maps/map/controllers/mapcontroller.js'
        ]
      },

      aim: {
        options: {
          specs: [
            'tests/spec/**/*.js'
          ]
        }
      },

      // Configure test runner to look for
      // Aeris.js in ../
      // Useful for running AIM test with the latest
      // Aeris.js version, when AIM is put into AJS as
      // a subdir.
      local: {
        options: {
          specs: [
            'tests/spec/**/*.js'
          ],
          amdConfig: {
            paths: {
              aeris: '../src'
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-legacy');

  grunt.registerTask('test', [
    'jasmine-legacy'
  ]);
};