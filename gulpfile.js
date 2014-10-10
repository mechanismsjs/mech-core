var pkg = require('./package.json'); // Changed this? Need to re-run gulp to reload the require
var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var header = require('gulp-header');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');

source = [
   'src/util/header.js',
   'src/isUsable.js',
   'src/mech.js',
   'src/num.js',
   'src/numM.js',
   'src/str.js',
   'src/strM.js',
   'src/propGet.js',
   'src/propSet.js',
   'src/writeLn.js',
   'src/dualArg.js',
   'src/add.js',
   'src/sub.js',
   'src/mul.js',
   'src/div.js',
   'src/util/footer.js'
];

var banner = function(bundled) {
  return [
    '// ' + pkg.name + '.js',
    '// version: ' + pkg.version,
    '// author: ' + pkg.author,
    '// license: ' + pkg.license
  ].join('\n') + '\n'
};

gulp.task('build', function(){

   mechCore = gulp.src(source)
      .pipe(concat('mech-core.js'))
      .pipe(header(banner()))
      .pipe(replace('{{VERSION}}',pkg.version))
      .pipe(gulp.dest('dist'))
      .pipe(rename('mech-core.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
   return mechCore;
});

gulp.task('default', ['build','mocha','watch-mocha'], function() {
});

gulp.task('mocha', ['build'], function() {
   return gulp.src(['tests/*test.js'], { read: false })
      .pipe(mocha({ reporter: 'spec' }))
      .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    return gulp.watch(['src/**', 'tests/**'], ['mocha']);
});

