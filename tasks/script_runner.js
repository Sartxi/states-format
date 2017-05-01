/*
 * grunt-states-format
 * https://github.com/Sartxi/states-format
 *
 * Copyright (c) 2016 sartxi
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function ( grunt ) {
	grunt.registerMultiTask(
		'script_runner',
		'A Grunt Task for formatting files.',
		function () {
			var options,
				succeededFiles;

			function exists( path ) {
				var fileExists = grunt.file.exists( path );
				if ( !fileExists ) {
					grunt.fail.warn( 'Source file "' + path + '" not found.' );
				}
				return fileExists;
			}

			succeededFiles = this.files.filter( function ( fileOptions ) {
				return fileOptions.src
					.filter( exists )
					.filter( function process( filepath ) {
						var parsedObject;
						var formatter = require( fileOptions.formattersrc );

						try {
							parsedObject = grunt.file.readJSON( filepath );
							grunt.log.verbose.write( 'Formatting ' + filepath + ' to ' + fileOptions.dest + '...' );
							if ( Array.isArray( parsedObject ) ) {
								var formatting = grunt.util.callbackify( formatter.build );
								formatting( parsedObject, function ( res ) {
									grunt.file.write( fileOptions.dest, res );
								} );
							}
							grunt.log.verbose.ok();
							return true;
						} catch ( e ) {
							grunt.fail.warn( e );
							return false;
						}
					} );
			} );

			grunt.log.oklns( succeededFiles.length + ' JS ' + grunt.util.pluralize( succeededFiles.length, 'file/files' ) + ' formatted.' );
		}
	);
};
