var extend = require('extend');

module.exports = function(ctx) {

  //append the static site tasks to the app tasks
  ctx.tasks = extend(ctx.tasks, {
    install:  ['packages.install', 'packages.dedupe'],
    build:    [['scripts.bundle', 'styles.bundle']],
    test:     ['scripts.test'],
    debug:    ['scripts.debug'],
    optimise: [['scripts.optimise', 'styles.optimise', 'images.optimise'], 'cachebust'],
    watch:    [['scripts.watch', 'styles.watch', 'packages.watch']]
  });

  //append the component dependencies to the app dependencies
  ctx.dependencies = extend(ctx.dependencies, {
    "autoprefixer": "^6.0.2",
    "browserify": "^11.0.1",
    "browserify-istanbul": "^0.2.1",
    "del": "^2.0.1",
    "finder-on-steroids": "^0.3.2",
    "gulp": "^3.9.0",
    "gulp-autoprefixer": "^3.0.1",
    "gulp-imagemin": "^2.2.1",
    "gulp-minify-css": "^1.1.1",
    "gulp-standard": "^5.1.0",
    "gulp-uglify": "^1.2.0",
    "gulp-rev-all": "^0.8.21",
    "gulp-rev-napkin": "git+https://github.com/mbbender/gulp-rev-napkin.git",
    "imagemin-pngquant": "^4.1.0",
    "karma": "^0.13.9",
    "karma-bamboo-reporter": "^0.1.0",
    "karma-browserify": "^4.3.0",
    "karma-coverage": "^0.5.2",
    "karma-mocha": "^0.2.0",
    "karma-phantomjs-launcher": "^0.2.1",
    "karma-source-map-support": "^1.1.0",
    "karma-threshold-reporter": "^0.1.15",
    "linklocal": "^2.5.2",
    "mocha": "^2.2.5",
    "npm-cmd": "^0.2.0",
    "phantomjs": "^1.9.18",
    "queue": "^3.1.0",
    "run-sequence": "^1.1.0",
    "sass-composer": "2.0.0-beta7",
    "uglify-js": "^2.4.20",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0"
  });

  return {
    templates: [
      {src: 'src/component/_package.json.ejs', dest: 'src/component/package.json', data: {name: ctx.name}}
    ]
  };
};