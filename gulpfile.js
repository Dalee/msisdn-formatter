'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var DIST = 'dist/';

gulp.task('build', function () {
    return gulp
        .src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest(DIST))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(DIST));
});

gulp.task('default', ['build']);
