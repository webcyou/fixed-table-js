const gulp = require("gulp"),
      path = require('path'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssmin = require('gulp-cssmin'),
      connect = require('gulp-connect'),
      watch = require('gulp-watch'),
      clean = require('gulp-clean'),
      uglify = require('gulp-uglify'),
      typescript = require('gulp-typescript'),
      plumber = require('gulp-plumber'),
      rename = require("gulp-rename"),
      stripDebug = require('gulp-strip-debug'),
      del = require('del'),
      runSequence = require('run-sequence'),
      mocha = require('gulp-mocha'),
      gutil = require('gulp-util');

/**
 * File Name
 */
const FILE_NAME = 'fixed_table.js';


/**
 * File Path
 */
// src
const ROOT        = __dirname;
const SOURCE_PATH = path.join(ROOT, './src'),
      DOCS_PATH   = path.join(ROOT, './docs'),
      DIST_PATH   = path.join(ROOT, './dist');

// files
const SCSS_FILES = path.join(DOCS_PATH, '/scss/**/*.scss');
const CSS_FILES  = path.join(DOCS_PATH, '/css/**/*.css');
const JS_FILES   = path.join(DOCS_PATH, '/js/**/*.js');
const TS_FILES   = path.join(SOURCE_PATH, '/**/*.ts');


/**
 * Clean Task
 **/
gulp.task('clean.dist', function() {
  return del([DIST_PATH + '/*'], {force: true});
});


/**
 * Sass, CSS Task
 **/
gulp.task('sass', function() {
  return gulp.src([SCSS_FILES])
    .pipe(sass({
      outputStyle: 'expanded'
    })
      .on('error', sass.logError))
    .pipe(gulp.dest( DOCS_PATH + '/css' ));
});

gulp.task('css.min', function() {
  gulp.src([CSS_FILES])
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ios 5', 'android 2.3'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest( DOCS_PATH + '/css' ));
});


/**
 * JavaScript Task
 **/
// typescript
gulp.task('ts', function () {
  return gulp.src([TS_FILES])
    .pipe(plumber())
    .pipe(typescript({
      removeComments: true,
      module: 'commonjs',
      out: FILE_NAME
    }))
    .pipe(gulp.dest(DOCS_PATH + '/js/'));
});

gulp.task('js.min', function() {
  return gulp.src([
    DOCS_PATH + '/js/**/*.js',
    '!' + DOCS_PATH + '/js/**/*min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(DOCS_PATH + '/js/'));
});

gulp.task('js.copy.dist', function() {
  return gulp.src([JS_FILES])
    .pipe(gulp.dest( DIST_PATH ));
});


/**
 * Watch Files
 **/
gulp.task('watch', function() {
  // SCSS
  gulp.watch([SCSS_FILES],['build.css']);

  // Typescript
  gulp.watch([TS_FILES],['build.js']);
});


/**
 * Build Task
 **/
gulp.task('build.ui', function(callback) {
  return runSequence(
    ['build.css', 'build.js'],
    callback
  );
});

gulp.task('build.css', function(callback) {
  return runSequence(
    'sass',
    'css.min',
    callback
  );
});

gulp.task('build.js', function(callback) {
  return runSequence(
    'ts',
    'js.min',
    callback
  );
});

/**
 * Dist Task
 **/
gulp.task('dist', function(callback) {
  return runSequence(
    'clean.dist',
    'build.ui',
    'js.copy.dist',
    callback
  );
});


/**
 * Test Task
 **/
gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
    .pipe(mocha({ reporter: 'spec'}))
    .on('error', gutil.log);
});

gulp.task('mocha.watch', function() {
  gulp.watch(['test/**'], ['mocha']);
});


/**
 * Gulp Server
 **/
gulp.task('serve', ['connect'], function() {
  return gulp.watch([
    DOCS_PATH + '/**/*.*'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path).pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  connect.server({
    root: [DOCS_PATH],
    port: 8088,
    livereload: true
  });
});


/**
 * Default Task
 **/
gulp.task('default', function(callback) {
  runSequence(
    'build.ui',
    'watch',
    'serve',
    callback
  );
});
