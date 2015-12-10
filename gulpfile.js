'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const del = require('del');

gulp.task('clean', () => {
  return del('lib');
});

gulp.task('compile', ['clean'], () => {
  return gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('lib'));
});

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('default', ['compile']);
