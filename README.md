# grunt-script-runner

> Script Runner

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-script-runner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-states-format');
```

## The "states_format" task

### Overview
In your project's Gruntfile, add a section named `states_format` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    states_format: {
        routes: {
            files: [{
                expand: true,
                cwd: './src',
                src:  ['./routes.js'],
                formattersrc: '../yourformatting.js',
                dest: './build'
            }]
        }
    },
});
```

## Contributing
