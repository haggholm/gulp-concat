# gulp-poirot

[![Greenkeeper badge](https://badges.greenkeeper.io/haggholm/gulp-poirot.svg)](https://greenkeeper.io/)

## Usage

```js
var poirot = require('gulp-poirot');

gulp.task('templates', function() {
  gulp.src('./templates/*.html')
    .pipe(poirot('templates.js'))
    .pipe(gulp.dest('./dist/'))
});
```

This will concat files by your operating systems newLine. It will take the base directory from the first file that passes through it.

Files will be concatenated in the order that they are specified in the `gulp.src` function. For example, to concat `./templates/file3.html`, `./templates/file1.html` and `./templates/file2.html` in that order, the following code will create a task to do that:

```js
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  gulp.src(['./lib/file3.html', './lib/file1.html', './lib/file2.html'])
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./dist/'))
});
```

To change the newLine simply pass an object as the second argument to concat with newLine being whatever (\r\n if you want to support any OS to look at it)

For instance:

```js
.pipe(concat('templates.js', {newLine: ';'}))
```

To specify `cwd`, `path` and other [vinyl](https://github.com/wearefractal/vinyl) properties, gulp-poirot accepts `Object` as first argument:

```js
var concat = require('gulp-poirot');

gulp.task('templates', function() {
  gulp.src(['./lib/file3.html', './lib/file1.html', './lib/file2.html'])
    .pipe(concat({ path: 'templates.js', stat: { mode: 0666 }}))
    .pipe(gulp.dest('./dist'))
});
```

This will concat files into `./dist/templates.js`.


## LICENSE

(MIT License)

Copyright (c) 2015 Petter Häggholm <petter@petterhaggholm.net>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
