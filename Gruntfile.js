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
    grunt.task.registerTask('build', ['states_format', 'jsbeautifier', 'add_comment:before', 'add_comment:after']);

    grunt.task.loadTasks('tasks');
    grunt.task.loadNpmTasks('grunt-contrib-jshint');
    grunt.task.loadNpmTasks('grunt-contrib-clean');
    grunt.task.loadNpmTasks('grunt-jsbeautifier');
    grunt.task.loadNpmTasks('grunt-add-comment');

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
        },

        add_comment: {
            before: {
                options: {
                    comments: ['states:js'],
                    carriageReturn: "\n",
                    prepend: true,
                    syntaxes: {
                        '.js': '//'
                    }
                },
                files: [{
                    expand: true,
                    cwd: './build/',
                    src:  ['./json/routes.js'],
                    dest: './build/'
                }]
            },
            after: {
                options: {
                    comments: ['endstates'],
                    carriageReturn: "\n",
                    prepend: false,
                    syntaxes: {
                        '.js': '//'
                    }
                },
                files: [{
                    expand: true,
                    cwd: './build/',
                    src:  ['./json/routes.js'],
                    dest: './build/'
                }]
            }
        }
    });

};
