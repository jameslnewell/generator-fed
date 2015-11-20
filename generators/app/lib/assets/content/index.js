
module.exports = function(config) {
  var configWithContent = Object.assign({}, config || {});

  configWithContent.files.push({
    src: './assets/content/**', dest: '.'
  });

  return configWithContent;
};
