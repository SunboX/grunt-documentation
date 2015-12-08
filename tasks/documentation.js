/*
 * grunt-documentation
 * https://github.com/SunboX/grunt-documentation
 *
 * Copyright (c) 2015 André Fiedler
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function(grunt) {

    var path = require('path'),
        chalk = require('chalk'),
        documentation = require('documentation');

    grunt.registerMultiTask('documentation', 'Use Grunt with documentation to generate great documentation for your JavaScript projects.', function() {
        var options = this.options({
            format: 'html',
            shallow: false,
            github: false
        });

        var formatter = documentation.formats[options.format];
        if (!formatter) {
            throw new Error('invalid format given: valid options are ' + Object.keys(documentation.formats).join(', '));
        }

        var docOptions = {
            github: options.github,
            shallow: options.shallow
        };

        var done = this.async(),
            waiting = 0;

        function await (c) {
            c = c || 1;
            waiting += c;
        }

        function release() {
            waiting--;
            if (waiting <= 0) {
                done();
            }
        }

        function generateDocs(files) {
            await ();
            documentation(files, docOptions, function(err, comments) {
                if (err) {
                    grunt.log.error(err.toString());
                    if (err.codeFrame) {
                        grunt.log.error(err.codeFrame);
                    }
                    done(false);
                } else {
                    await ();
                    formatter(comments, {}, function(err, output) {
                        if (err) {
                            grunt.log.error(err.toString());
                            if (err.codeFrame) {
                                grunt.log.error(err.codeFrame);
                            }
                            done(false);
                        } else {
                            if (options.format === 'json' || options.format === 'md') {
                                grunt.file.write(options.filename || 'API.' + options.format, output);
                                grunt.log.writeln('File "' + (options.filename || 'API.' + options.format) + '" created.');
                            } else if (options.format === 'html') {
                                await (output.length);
                                output.forEach(function(file) {
                                    var dest = path.join(process.cwd(), options.destination, file.relative);
                                    if (file.isDirectory() || grunt.file.isDir(file.path)) {
                                        grunt.file.mkdir(dest);
                                        grunt.verbose.writeln('Directory ' + chalk.cyan(dest) + ' created.');
                                    } else {
                                        grunt.file.write(dest, file.contents);
                                        grunt.verbose.writeln('File ' + chalk.cyan(dest) + ' created.');
                                    }
                                    release();
                                });
                            }
                        }
                        release();
                    });
                }
                release();
            });
        }

        var files = [];

        var filesToProcess = this.files.length;

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });
            files = files.concat(src);
            filesToProcess--;
            if (filesToProcess <= 0) {
                generateDocs(files);
            }
        }.bind(this));
    });

};