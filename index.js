'use strict';

var path = require('path')
  , poirot = require('poirot')
  , through = require('through')
  , gutil = require('gulp-util')
  , File = require('gulp-util').File
  , PluginError = require('gulp-util').PluginError;


// This was largely copied from gulp-concat.
module.exports = function(file, opt) {
  if (!file) {
    throw new PluginError('gulp-poirot', 'Missing file option for gulp-poirot');
  }
  opt = opt || {};
  // to preserve existing |undefined| behaviour and to introduce
  // |newLine: ""| for binaries
  if (typeof opt.newLine !== 'string') {
    opt.newLine = gutil.linefeed;
  }
  var firstFile
    , fileName
    , poirotTemplates;
  if (typeof file === 'string') {
    fileName = file;
  } else if (typeof file.path === 'string') {
    fileName = path.basename(file.path);
    firstFile = new File(file);
  } else {
    throw new PluginError('gulp-poirot',
      'Missing path in file options for gulp-poirot');
  }

  function bufferContents(file) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', // jshint ignore:line
        new PluginError('gulp-poirot', 'Streaming not supported'));
    }

    // Set first file if not already set
    if (!firstFile) {
      firstFile = file;
    }

    // Track template path and contents.
    if (!poirotTemplates) {
      poirotTemplates = {};
    }
    var templateName = file.relative.replace(
      /\.(poirot|html|mustache|handlebars|hbs)$/, '');
    poirotTemplates[templateName] = String(file.contents);
  }

  function endStream() {
    // no files passed in, no file goes out
    if (!firstFile) {
      return this.emit('end'); // jshint ignore:line
    }
    var joinedFile;

    // if file opt was a file path
    // clone everything from the first file
    if (typeof file === 'string') {
      joinedFile = firstFile.clone({contents: false});
      joinedFile.path = path.join(firstFile.base, file);
    } else {
      joinedFile = firstFile;
    }
    console.log(poirotTemplates);
    joinedFile.contents = new Buffer(poirot.compile(poirotTemplates));

    this.emit('data', joinedFile); // jshint ignore:line
    this.emit('end');              // jshint ignore:line
  }

  return through(bufferContents, endStream);
};
