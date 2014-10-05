var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
});

gulp.task('mocha', function() {
    return gulp.src(['tests/*test.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
    return gulp.watch(['src/**', 'tests/**'], ['mocha']);
});

