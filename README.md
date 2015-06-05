# generator-fed

Yeoman generator for Frontend Development with Browserify and SASS Composer.

## Installation

    npm install -g generator-fed

## Usage

    yo fed

## Features
- async builds with Gulp
- initialise a git repo (optional)
- pre-commit hook to run a full build (optional)

### Javascript
- dependencies from NPM
- linted with JSHint
- built with Browserify
- minified with Uglify
- tested with Mochify
- coverage with Istanbul
- watched with Watchify

### Cascading Style Sheets
- dependencies from NPM
- built with SASS Composer
- prefixed with Autoprefixer
- minified with css-minify

### Assets
- urls rewritten and copied to the build dir
- images optimised with imagemin

## TODO:
 - watched with SASS Composer (style sheets)
 - Style sheets watched with SASS Composer
