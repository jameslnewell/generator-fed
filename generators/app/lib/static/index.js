var extend = require('extend');

module.exports = function(ctx) {

  //append the static site tasks to the app tasks
  ctx.tasks.build[0].push('content.build');
  ctx.tasks.optimise[0].push('content.optimise');
  ctx.tasks.watch[0].push('content.watch');

  //append the static site dependencies to the app dependencies
  ctx.dependencies = extend(ctx.dependencies, {
    'ejs': '^2.3.4',
    'gulp-htmlmin': '^1.1.3',
    "gulp-rev-all": "^0.8.21",
    "gulp-rev-napkin": "git+https://github.com/mbbender/gulp-rev-napkin.git",
    'metalsmith': '^1.7.0',
    'metalsmith-rootpath': '^0.1.2',
    'metalsmith-templates': '^0.7.0'
  });

};