# generator-fed

Yeoman generator for Frontend Development with Browserify and SASS Composer.

## Installation

    npm install -g generator-fed

## Usage

    yo fed

## Features
- async builds with `gulp`

### Scripts
- dependencies from `npm`
- linted with `standard`
- bundled with `browserify`
- minified with `uglify`
- tested with `karma-mocha`
- test coverage with `istanbul`
- watched with `gulp`

### Styles
- dependencies from `npm`
- bundled with `sass-composer`
- prefixed with `autoprefixer`
- minified with `clean-css`
- watched with `gulp`

### Assets
- urls rewritten and copied to the build dir with `sass-composer`
- images optimised with `imagemin`

## TODO:
- make `karma-threshold-reporter` actually break the build
- split component specific stuff into a sub-generator and create another sub-generator for static content specific stuff
- `karma-browserifast` might bundle tests faster?
- `testem` might be nicer for debugging tests?
