var del = require('del'); // rm -rf
var gulp = require('gulp');
var es6transpiler = require('gulp-es6-transpiler');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

gulp.task('default', [
  'clean',
  'build',
  'sass'
]);

// JS

var jshintOptions = {
  esnext: true
};

gulp.task('build', function () {
  return gulp.src('src/js/**/*.js')
    // Lint
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter('default'))
    // Transpile to ES5
    .pipe(es6transpiler())
    // Compress
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// Sass

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});
