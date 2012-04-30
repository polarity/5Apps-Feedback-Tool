/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		meta: {
			version: '0.1.0',
			banner: '/*! FiveApps Feedback Tool - v<%= meta.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'* http://5apps.com/\n' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
				'Robert Agthe; Licensed MIT */'
		},
		lint: {
			files: ['grunt.js', 'jsrc/s/*.js']
		},
		concat: {
			dist: {
				src: ['src/js/zepto.js','src/js/feedback.js','src/js/dom.js','src/js/cssInject.js'],
				dest: 'build/FiveAppsFeedbackTool_build.js'
			}
		},
		min: {
			dist: {
				src: ['<config:concat.dist.dest>'],
				dest: 'build/FiveAppsFeedbackTool_build.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {}
		},
		uglify: {},
		injectCSS: {}
	});

	// Custom Task:
	// * reads all css files in the ./css/ directory
	// * concationate these css files
	// * searches for relative SVG urls and read these SVGs into memory
	// * replace all SVGs URLS with data:uris
	// * creates a new Javascript File that injects this CSS content inline
	grunt.registerTask('injectCSS', 'Task for JSfy CSS Files', function(files) {
		var cssFiles = grunt.file.expand('src/css/*.css')
		var cssContent = '';
		for (var key in cssFiles) {
			cssContent = cssContent+grunt.file.read(cssFiles[key])
		}
		var svgs = cssContent.match(/(url\((.*)\.svg\))/ig)
		for(var key in svgs) {
			var svgUrl = svgs[key].match(/(url\(..\/(.*)\))/i)[2]
			// read this svg and safe content
			var svgContent = grunt.file.read('src/'+svgUrl)
			// add datauri header,strip newlines and replace double quotes with single ones
			svgContent = svgContent.replace(/\r\n/g,'')
			svgContent = svgContent.replace(/\n/g,'')
			svgContent = svgContent.replace(/\"/g,'\'')
			var svgDataUri = '"data:image/svg+xml;utf8,'+svgContent+'"'
			cssContent = cssContent.replace(new RegExp(svgs[key].match(/(url\((.*)\))/i)[2],'g'),svgDataUri)
		}

		cssContent = cssContent.replace(/\"/g,'\\"');
		cssContent = cssContent.replace(/\n/g,' ');
		var newFile = 'FiveApps.Zepto(function() {\n \
			var styleElem = document.createElement("style");\n \
			styleElem.setAttribute("data-injected-css", "yea");\n \
			styleElem.setAttribute("type", "text/css");\n \
			styles = document.getElementsByTagName("style");\n \
			domTarget = document.getElementsByTagName("head")[0];\n \
			domTarget.appendChild(styleElem);\n \
			var content = "'+cssContent+'";\n \
			if (styleElem.styleSheet) {\n \
				styleElem.styleSheet.cssText = content;\n \
			} else {\n \
				styleElem.innerHTML = content;\n \
			}\n \
		});';
		grunt.file.write('src/js/cssInject.js',newFile)
	})
	
	// create a build.html
	grunt.registerTask('createBuildHtml','Demo html page to test the build', function(){
		var file = "build/build.html"
		var contens = '<!doctype html>\
			<html lang="en">\
			<meta charset="utf-8">\
			<title>5Apps Feedback Build</title>\
			<script src="FiveAppsFeedbackTool_build.min.js"></script>';
		grunt.file.write(file, contens)
	})

	// Default task.
	grunt.registerTask('default', 'injectCSS concat min createBuildHtml');

};
