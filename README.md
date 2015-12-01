# generator-fed

Yeoman generator for Frontend Development with Browserify and SASS Composer.

## Installation

    $ npm install -g yo generator-fed

## Usage

    $ mkdir demo && cd demo
    $ yo fed [--name <name>] [--es5|--es6|--react|--universal] [--install]

- `--es5`

  Creates a blank ES5 project with no frameworks or packages included.

- `--es6`

  Creates a blank ES6 project with no frameworks or packages included.

- `--react`

  Creates a static React project. Uses React and is transpiled to ES5 from ES6+JSX.

- `--universal`

  Creates a Universal JavaScript project. Uses React and Redux transpiled to ES5 from ES6+JSX.

- `--install`

  Installs the dependencies for your new project after it is created.


## Features
- async builds with `gulp`

### Scripts
- dependencies from `npm`
- linted with `eslint`
- bundled with `browserify`
- transpiled with `babel`
- minified with `uglify`
- tested with `karma-mocha` (just plain `mocha` for shallow rendering with React)
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

### Universal Javascript
- served with `express`
- rendered with `react`
- data flow managed with `redux`
- routed with `redux-simple-router`
- pre-fetching with `react-fetcher`
- debug with `redux-devtools`

### Static content

> Note: Temporarily missing from v2

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
- `react-dom-stream` for faster rendering?
- hot reloading

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell
