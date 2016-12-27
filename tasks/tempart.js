var path = require('path');
var tempart = require('tempart');


module.exports = function (grunt) {
  grunt.registerMultiTask('tempart-parser', 'parsing files.', function () {
    this.files.forEach(function (filePair) {
      filePair.src.forEach(function (src) {
        var template;
        if (filePair.cwd) {
          var parts = src.split(path.sep);
          parts.unshift(filePair.cwd);
          template = tempart.parser(grunt.file.read(parts.join(path.sep)));
        } else {
          template = tempart.parser(src);
        }

        var fileName = src.substring(0, src.length - path.parse(src).ext.length);
        var content = filePair.prefix.replace('{{path}}', fileName) + 'tempart.factory(' + JSON.stringify(template) + ');';

        var dest = filePair.dest.split(path.sep).concat(fileName.split(path.sep)).join(path.sep).concat('.js');

        grunt.file.write(dest, content);
      });
    });
  });
};
