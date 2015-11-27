
module.exports = function(config) {
  var configWithContent = Object.assign({}, config || {});

  configWithContent.files.push({
    src: './assets/content/**', dest: '.'
  });

  configWithContent.templates = configWithContent.templates.concat([
    {
      src: './assets/content/src/content/index.html.ejs',
      dest: configWithContent.contentDirectory + '/index.html',
      data: {
        name: configWithContent.name
      }
    }
  ]);

  return configWithContent;
};
