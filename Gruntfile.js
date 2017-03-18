
/*Grunt task file */

module.exports = grunt => {

	//load all tasks defined in package.json.
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	      },
	      build: {
	        src: 'src/<%= pkg.name %>.js',
	        dest: 'build/<%= pkg.name %>.min.js'
	      }
		}

	});

	grunt.registerTask('default', ['uglify'], function() {
		grunt.log.write("Starting uglification ...").ok();
	});
}