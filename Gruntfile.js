/*
 * grunt-states-format
 * https://github.com/Sartxi/states-format
 *
 * Copyright (c) 2016 sartxi
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    grunt.task.registerTask('default', ['clean', 'jshint', 'build']);
    grunt.task.registerTask('build', ['states_format', 'jsbeautifier']);

    grunt.task.loadTasks('tasks');
    grunt.task.loadNpmTasks('grunt-contrib-jshint');
    grunt.task.loadNpmTasks('grunt-contrib-clean');
    grunt.task.loadNpmTasks('grunt-jsbeautifier');

    grunt.config.init({
        clean: {
            build: ['./build']
        },
        jshint: {
            all: [
                'gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc'
            }
        },

        'states_format': {
            routes: {
                files: [
                    {
                        expand: true,
                        cwd: './test',
                        src:  ['./json/routes.js'],
                        dest: './build/'
                    }
                ]
            }
        },

        'jsbeautifier' : {
            'default': {
                src : 'build/json/routes.js',
                options:{
                    js: {
                        indentSize: 4
                    }
                }
            }
        }
    });

};
