module.exports = function(grunt) {

	grunt.initConfig({

		jshint: {
			files: ['Gruntfile.js', 'tests/*.tests.js', 'lib/*.js'],
			options: {
				jshintrc: true
			}
		},

		mochacov: {
			options: {
				reporter: 'mocha-spec-cov'
			},
			all: ['tests/*.js']
		},

		jsdoc : {
			dist : {
				src: ['lib/*.js'],
				options: {
					destination: 'docs',
					readme: 'README.md'
				}
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js']
			},
			lib: {
				files: ['lib/*.js'],
				tasks: ['jshint', 'test', 'docs']
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

	// Overide options if build
	if(process.argv[2] === 'build') {
		grunt.config.merge({
			mochacov: {
				options: {
					reporter: 'html-cov',
					output: 'docs/coverage.html'
				},
				all: ['tests/*.js']
			},
		});
	}

	// Low Level Tasks
	grunt.registerTask('test', 	  ['jshint', 'mochacov']);
	grunt.registerTask('docs',	  ['jsdoc']);

	// High Level Tasks
	grunt.registerTask('default', ['test', 'watch']);
	grunt.registerTask('build',   ['test', 'docs']);
};