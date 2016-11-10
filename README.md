# grunt-documentation

[![Circle CI](https://circleci.com/gh/documentationjs/grunt-documentation/tree/master.svg?style=svg)](https://circleci.com/gh/documentationjs/grunt-documentation/tree/master)

Use [Grunt](http://gruntjs.com/) with
[documentation](https://github.com/documentationjs/documentation)
to generate great documentation for your JavaScript projects.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-documentation --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-documentation');
```

## The "documentation" task

### Overview
In your project's Gruntfile, add a section named `documentation` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    documentation: {
        default: {
            files: [{
                "expand": true,
                "cwd": "src",
                "src": ["**/*.js"]
            }],
            options: {
                destination: "docs"
            }
        },
    }
});
```

### Options

#### options.destination
Type: `String`

The destination folder for the generated docs.

#### options.format
Type: `String`
Default value: `'html'`

Either `'html'`, `'md'`, `'json'`, or `'docset'`.

#### options.filename
Type: `String`

Custom filename for md or json output.

#### options.access
Type: `Array`
Default value: `['protected', 'public', 'undefined']`

Include only comments with a given access level, out of `private`, `protected`, `public` and `undefined`. By default, `public`, `protected` and `undefined` access levels are included.

#### options.order
Type: `Array`
Default value: `[]`

An array defining explicit sort order.

#### options.theme
Type: `String`

Path to a custom theme.

#### options.name
Type: `String`

A custom project name to display in the generated documentation.

#### options.version
Type: `String`

A custom version string to display in the generated documentation.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint your code using [Grunt](http://gruntjs.com/).

## Release History

**v1.2.0**
* new options: theme, name and version
* now compatible with both 3.x and 4.x version of documentation
* new theming demo

**v1.1.2**
* always use latest NPM packages

**v1.1.1**
* support Grunt 1.0

**v1.1.0**
* new feature: `access` option to only include comments with a given access level, out of `private`, `protected`, `public` and `undefined`
* new feature: `order` option to include user-defined sorting

**v1.0.1**
* store `md` format at right destination; fixes [issue #3](https://github.com/documentationjs/grunt-documentation/issues/3) 

**v1.0.0**
* Transfered to documentationjs
