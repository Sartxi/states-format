/*
 * grunt-states-format
 * https://github.com/Sartxi/states-format
 *
 * Copyright (c) 2016 sartxi
 * Licensed under the MIT license.
 */
'use strict';

var request = require('request');

module.exports = function(grunt) {
    grunt.registerMultiTask(
        'states_format',
        'A Grunt Task for formatting JSON files.',
        function() {
            var options,
                succeededFiles;

            function exists(path) {
                var fileExists = grunt.file.exists(path);
                if (!fileExists) {
                    grunt.fail.warn('Source file "' + path + '" not found.');
                }
                return fileExists;
            }

            succeededFiles = this.files.filter(function(fileOptions) {
                return fileOptions.src
                    .filter(exists)
                    .filter(function process(filepath) {
                        var parsedObject,
                            processedJSON;

                        function build(states) {
                            var newStates = '';
                            states.forEach(function(obj) {
                                if (obj) {
                                    //language
                                    if (obj.languageId === 5) {
                                        obj.language = 'EN';
                                    } else {
                                        obj.language = 'ES';
                                    }
                                    var page = obj.pageId;
            						var post = obj.blogId;
            						var lndpg = obj.indPageId;
                                    var state = {
                                        stateId: obj.id,
                                        title: obj.title,
                                        metaDescription: obj.metaDescription,
                                        metaKeywords: obj.metaKeywords,
                                        url: obj.url
                                    };
                                    if (!obj.url) {
                                        var newurl = obj.title.toLowerCase().replace(/ /g,'-');
                                        state.url = '/' + newurl;
                                    } else {
                                        state.url = obj.url.toLowerCase().replace(/ /g,'');
                                    }
                                    if (page) {
                                        state.name = 'page' + page + obj.language;
                                        state.type = 'page';
                                        state.pageId = page;
                                        state.params = {
                                            pageId: page,
                                            language: obj.language
                                        };
                                    }
                                    if (post) {
                                        state.name = 'post' + post + obj.language;
                                        state.type = 'post';
                                        state.pageId = post;
                                        state.templateUrl = 'views/dynamic/blog.post.html';
                                        state.params = {
                                            pageId: post,
                                            language: obj.language
                                        };
                                    }
                                    if (lndpg) {
                                        state.name = 'lnd' + lndpg + obj.language;
                                        state.type = 'lndPage';
                                        state.pageId = lndpg;
                                        state.templateUrl = 'views/dynamic/lndpage.html';
                                        state.params = {
                                            pageId: lndpg,
                                            language: obj.language
                                        };
                                    }
                                    if (state.title) {state.title = state.title.replace(/'/g, "\\'");}
                                    if (state.metaDescription) {state.metaDescription = state.metaDescription.replace(/'/g, "\\'");}
                                    if (state.metaKeywords) {state.metaKeywords = state.metaKeywords.replace(/'/g, "\\'");}
                                    if (state.pageId === 11)  {state.name = 'home'; state.templateUrl = 'views/static/home.html';}
                                    if (state.pageId === 116) {state.name = 'merchants'; state.templateUrl = 'views/static/merchants.html';}
                                    if (state.pageId === 259) {state.name = 'aboutus'; state.templateUrl = 'views/static/aboutus.html';}
                                    if (state.pageId === 193) {state.name = 'isitrightforyou'; state.templateUrl = 'views/static/customersright.html';}
                                    if (state.pageId === 208) {state.name = 'howitworks'; state.templateUrl = 'views/static/howitworks.html';}
                                    if (state.pageId === 249) {state.name = 'preapproved'; state.templateUrl = 'views/static/preapproved.html';}
                                    if (state.pageId === 219) {state.name = 'financetips'; state.templateUrl = 'views/static/financetips.html';}
                                    if (state.pageId === 175) {state.name = 'merchantReviews'; state.templateUrl = 'views/dynamic/reviews.html';}
                                    if (state.pageId === 172) {state.name = 'customerReviews'; state.templateUrl = 'views/dynamic/reviews.html';}
                                    if (state.pageId === 267) {state.name = 'customercontact'; state.templateUrl = 'views/dynamic/contact.html';}
                                    if (state.pageId === 12)  {state.name = 'merchantcontact'; state.templateUrl = 'views/dynamic/contact.html';}
                                    if (state.pageId === 154) {state.name = 'blog'; state.templateUrl = 'views/static/blog.html';}
                                    if (state.pageId === 162) {state.name = 'theteam'; state.templateUrl = 'views/static/theteam.html';}
                                    if (state.pageId === 157) {state.name = 'fourofour'; state.templateUrl = 'views/static/404.html';}
                                    if (state.pageId === 273) {state.name = 'faqs'; state.templateUrl = 'views/static/faq.html';}
                                    if (state.pageId === 257) {state.name = 'privacy'; state.templateUrl = 'views/static/page.html';}
                                    if (state.pageId === 169) {state.name = 'terms'; state.templateUrl = 'views/static/page.html';}
                                    if (state.pageId === 589) {state.name = 'apply'; state.templateUrl = 'views/static/apply/apply.html';}
                                    if (state.pageId === 451) {state.name = 'applyperson'; state.templateUrl = 'views/static/apply/person.html';}
                                    if (state.pageId === 591) {state.name = 'applybank'; state.templateUrl = 'views/static/apply/bank.html';}
                                    if (state.pageId === 593) {state.name = 'applyincome'; state.templateUrl = 'views/static/apply/income.html';}
                                    if (state.pageId === 595) {state.name = 'applysubmit'; state.templateUrl = 'views/static/apply/submit.html';}
                                    if (state.pageId === 597) {state.name = 'approved'; state.templateUrl = 'views/static/apply/approved.html';}
                                    if (state.pageId === 599) {state.name = 'denied'; state.templateUrl = 'views/static/apply/denied.html';}
                                    if (state.pageId === 601) {state.name = 'idology'; state.templateUrl = 'views/static/apply/idology.html';}
                                    if (state.pageId === 610) {state.name = 'merchantSearchzip'; state.templateUrl = 'views/static/merchantSearch.html';}
                                    if (state.pageId === 754) {state.name = 'merchantApply'; state.templateUrl = 'views/static/merchantApply.html';}
                                    if (state.pageId === 863) {state.name = 'topoffs'; state.templateUrl = 'views/static/topoffs.html';}

                                    if (state.name === 'applyperson' || state.name === 'applybank' || state.name === 'applyincome' || state.name === 'applysubmit' || state.name === 'approved' || state.name === 'denied' || state.name === 'idology') {
                                        state.params.useAltHead = true;
                                        if (state.name === 'applyperson') {
                                            state.url = state.url + '?mig&mid';
                                        }
                                    }

                                    // create states string -- Filtering EN only (remove when ready)
                                    if (state.name && state.templateUrl && state.params.language === 'EN') {
                                        if (state.name === 'merchantSearchzip' || state.params.useAltHead) {
                                            if (state.name === 'merchantSearchzip') {
                                                newStates += '.state(\'' + state.name + '\', {stateId: ' + state.stateId + ', title: \'' + state.title + '\', metaDescription: \'' + state.metaDescription + '\', metaKeywords: \'' + state.metaKeywords + '\', templateUrl: \'' + state.templateUrl + '\', url: \'' + state.url + '/:zip\', name: \'' + state.name + '\', type: \'' + state.type + '\', pageId: ' + state.pageId + ', params: {pageId: ' + state.pageId + ', language: \'' + obj.language + '\', zip: null, industry: null}}).state(\'merchantSearch\', {stateId: ' + state.stateId + ', title: \'' + state.title + '\', metaDescription: \'' + state.metaDescription + '\', metaKeywords: \'' + state.metaKeywords + '\', templateUrl: \'' + state.templateUrl + '\', url: \'' + state.url + '\', name: \'' + state.name + '\', type: \'' + state.type + '\', pageId: ' + state.pageId + ', params: {pageId: ' + state.pageId + ', language: \'' + obj.language + '\'}})';
                                            }
                                            if (state.params.useAltHead) {
                                                newStates += '.state(\'' + state.name + '\', {stateId: ' + state.stateId + ', title: \'' + state.title + '\', metaDescription: \'' + state.metaDescription + '\', metaKeywords: \'' + state.metaKeywords + '\', templateUrl: \'' + state.templateUrl + '\', url: \'' + state.url + '\', name: \'' + state.name + '\', type: \'' + state.type + '\', pageId: ' + state.pageId + ', params: {pageId: ' + state.pageId + ', language: \'' + obj.language + '\', useAltHead: true}, hiddenState: true})';
                                            }
                                        } else {
                                            newStates += '.state(\'' + state.name + '\', {stateId: ' + state.stateId + ', title: \'' + state.title + '\', metaDescription: \'' + state.metaDescription + '\', metaKeywords: \'' + state.metaKeywords + '\', templateUrl: \'' + state.templateUrl + '\', url: \'' + state.url + '\', name: \'' + state.name + '\', type: \'' + state.type + '\', pageId: ' + state.pageId + ', params: {pageId: ' + state.pageId + ', language: \'' + obj.language + '\'}})';
                                        }
                                    }
            					}
                            });
                            return newStates + ';';
                        }

                        try {
                            //the meat
                            parsedObject = grunt.file.readJSON(filepath);
                            grunt.log.verbose.write('Formatting ' + filepath + ' to ' + fileOptions.dest + '...');
                            var states = parsedObject;
                            if (Array.isArray(states)) {
                                var formatting = grunt.util.callbackify(build);
                                formatting(states, function(res) {
                                    grunt.file.write(fileOptions.dest, res);
                                });
                            }
                            grunt.log.verbose.ok();
                            return true;
                        } catch(e) {
                            grunt.fail.warn(e);
                            return false;
                        }
                    });
            });

            grunt.log.oklns(succeededFiles.length + ' JS ' + grunt.util.pluralize(succeededFiles.length, 'file/files') + ' formatted.');
        }
    );
};
