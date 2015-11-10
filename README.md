# generator-fed

Yeoman generator for Frontend Development with Browserify and SASS Composer.

> **NOTE:** Code coverage and static site generation are not yet implemented in v2.0 -
    Can't get `isparta` to work with the most recent Babel v6 (Oct 29th).


## Installation

    $ npm install -g yo generator-fed

## Usage

    $ mkdir demo && cd demo
    $ yo fed [--name <name>] [--es5|--es6|--react] [--static] [--install]

## Features
- async builds with `gulp`

### Scripts
- dependencies from `npm`
- linted with `eslint`
- bundled with `browserify`
- transpiled with `babel`
- minified with `uglify`
- tested with `karma-mocha`
- test coverage with `istanbul`
- watched with `watchify`

### Styles
- dependencies from `npm`
- bundled with `sass-composer`
- prefixed with `autoprefixer`
- minified with `clean-css`
- watched with `sass-composer`

### Images
- urls rewritten and copied to the build dir with `sass-composer`
- images optimised with `imagemin`

### Static content
(optional)

- templates with `ejs`
- built with `metalsmith`
- minified with `html-minifier`
- watched with `gulp`

## TODO:
- `livereload`/`browsersync`
- make `karma-threshold-reporter` actually break the build
- `karma-browserifast` might bundle tests faster?
- `testem` might be nicer for debugging tests?

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell
