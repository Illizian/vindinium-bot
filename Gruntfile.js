module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			files: ['Gruntfile.js', 'tests/*.tests.js', 'lib/*.js'],
			options: {
				jshintrc: true
			}
		},

		simplemocha: {
			options: {
				globals: ['expect'],
				timeout: 3000,
				ignoreLeaks: false,
				ui: 'bdd',
				reporter: 'spec'
			},
			all: { src: ['tests/*.js'] }
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			lib: {
				files: ['lib/*.js'],
				tasks: ['jshint', 'test']
			},
			directives: {
				files: ['directives/*.yaml'],
				tasks: ['jshint', 'test']
			},
			tests: {
				files: ['tests/*.js'],
				tasks: ['jshint', 'test']
			},
		},

	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['jshint', 'test', 'watch']);
	grunt.registerTask('test', 	  ['simplemocha']);
};