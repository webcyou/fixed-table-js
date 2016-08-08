var gulp = require("gulp"),
  path = require('path'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  typescript = require('gulp-typescript'),
  tslint = require('gulp-tslint'),
  plumber = require('gulp-plumber'),
  rename = require("gulp-rename"),
  stripDebug = require('gulp-strip-debug'),
  del = require('del'),
  runSequence = require('run-sequence'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util');

var FILE_NAME = 'fixed_table.js';

var SOURCE_DIR = 'src',
  DEMO_DIR = 'demo',
  DIST_DEMO = 'public',
  DIST_DIR = 'dist';

var htmlFiles = DEMO_DIR + '/**/*.html';
var scssFiles = DEMO_DIR + '/scss/**/*.scss';
var cssFiles = DEMO_DIR + '/**/*.css';
var jsFiles = [
    DEMO_DIR + '/js/**/*.js',
  '!src/js/contrib/**/*.js',
    SOURCE_DIR + '/js/**/*.js'
];
var tsFiles = [ SOURCE_DIR + '/**/*.ts' ];
var imgFiles = DEMO_DIR + '/img/**/*.{jpg,png,gif,ico}';


/**
 * Clean Task
 **/
gulp.task('clean.dist', function() {
  return del([DIST_DIR + '/*'], {force: true});
});

gulp.task('clean.demo', function() {
  return del([DIST_DEMO + '/*'], {force: true});
});

gulp.task('ts.clean', function(cb) {
  return del([DIST_DEMO + '/**/*.ts'], {force: true}, cb);
});


/**
 * HTML Task
 **/
gulp.task('html', function() {
  gulp.src([
    htmlFiles,
      '!' + DEMO_DIR + '/html/index.html'
  ]).pipe(gulp.dest( DIST_DEMO ));
});

/**
 * Image Task
 **/
gulp.task('img', function() {
  gulp.src(imgFiles).pipe(gulp.dest(DIST_DEMO + '/img'));
});

/**
 * Sass, CSS Task
 **/
gulp.task('sass', function() {
  return gulp.src(scssFiles)
    .pipe(sass({
      outputStyle: 'expanded'
    })
      .on('error', sass.logError))
    .pipe(gulp.dest( DEMO_DIR + '/css'));
});

gulp.task('css.min', function() {
  gulp.src(cssFiles)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ios 5', 'android 2.3'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(gulp.dest( DEMO_DIR ));
});

gulp.task('css.copy', function() {
  return gulp.src(cssFiles)
    .pipe(cssmin())
    .pipe(gulp.dest( DIST_DEMO ));
});

/**
 * JavaScript Task
 **/
gulp.task('uglify-contrib', function () {
  gulp.src([])
    .pipe(uglify())
    .pipe(concat('contrib.js'))
    .pipe(gulp.dest(DIST_DEMO + '/js/'));
});

// tslint
gulp.task("tslint", function() {
  gulp.src([
    "./src/**/*.ts",
    "./demo/**/*.ts"
  ])
    .pipe(tslint({
      configuration: "./tslint.json"
    }))
    .pipe(tslint.report("verbose"));
});

// typescript
gulp.task('ts', function () {
  return gulp.src(tsFiles)
    .pipe(plumber())
    .pipe(typescript({
      removeComments: true,
      module: 'commonjs',
      out: FILE_NAME
    }))
    .pipe(gulp.dest(SOURCE_DIR + '/js/'));
});

gulp.task('js.min', function() {
  return gulp.src([
      SOURCE_DIR + '/js/**/*.js',
      '!' + SOURCE_DIR + '/js/**/*min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(SOURCE_DIR + '/js/'));
});

gulp.task('js.copy', function() {
  return gulp.src(jsFiles)
    .pipe(gulp.dest( DIST_DEMO + '/js/' ));
});

gulp.task('js.copy.dist', function() {
  return gulp.src(jsFiles)
    .pipe(gulp.dest( DIST_DIR ));
});


/**
 * Dist Task
 **/
gulp.task('dist', function() {
  gulp.src(SOURCE_DIR + '/js/' + FILE_NAME)
    .pipe(gulp.dest(DIST_DIR));

  gulp.src(SOURCE_DIR + '/js/' + FILE_NAME)
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(DIST_DIR));
});


/**
 * Watch Files
 **/
gulp.task('watch', function() {
  // HTML
  gulp.watch([htmlFiles],['build.html']);

  // SCSS
  gulp.watch([scssFiles],['build.css']);

  // Typescript
  gulp.watch([tsFiles],['build.js']);

  // Image
  gulp.watch([imgFiles],['build.img']);
});


/**
 * Build Task
 **/
gulp.task('build.ui', function(callback) {
  return runSequence(
    ['build.html','build.img','build.css', 'build.js'],
    callback
  );
});

gulp.task('build.html', function(callback) {
  return runSequence(
    'html',
    callback
  );
});

gulp.task('build.img', function(callback) {
  return runSequence(
    'img',
    callback
  );
});

gulp.task('build.css', function(callback) {
  return runSequence(
    'sass',
    'css.min',
    'css.copy',
    callback
  );
});

gulp.task('build.js', function(callback) {
  return runSequence(
    'ts',
    'js.min',
    'js.copy',
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
  gulp.watch([
      DEMO_DIR + '/**/*.*'
  ]).on('change', function(changedFile) {
    gulp.src(changedFile.path).pipe(connect.reload());
  });
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname + '/public/'],
    port: 8088,
    livereload: true
  });
});


/**
 * Default Task
 **/
gulp.task('default', function(callback) {
  runSequence(
    'clean.demo',
    'build.ui',
    'watch',
    'serve',
    callback
  );
});
