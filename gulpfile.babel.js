'use strict';

import gulp from 'gulp';                            // Import Gulp
import plumber from  'gulp-plumber';                // Error handler
import notify from  'gulp-notify';                  // Error handler
import gulpif from  'gulp-if';                      // gulp if
import sourcemaps from  'gulp-sourcemaps';          // JavaScript sourcemap
import browserSync from  'browser-sync';            // Live server
import babel from  'gulp-babel';                    // Babel for ES6
import del from  'del';                             // Delete result folder
import concat from 'gulp-concat';                   // Concat JavaScript
import cssmin from 'gulp-cssmin';                   // Minify CSS
import rename from 'gulp-rename';                   // For rename files
import compass from 'gulp-compass';
import jade from 'gulp-jade'
import ngAnnotate  from 'gulp-ng-annotate';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const browser = browserSync.create();

const config = {
  src: {
    jade: ['dev/**/*.jade',
      '!dev/**/_*.jade'],
    sass: ['dev/sass/*.scss',
      '!dev/sass/_*.scss']
  },
  dest: {
    html: 'public',
    css: 'public/css'
  }
};

// Prepare html
gulp.task('html', function () {
  return gulp.src('dev/**/*.html')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'html',
          message: err.message
        };
      })
    }))
    .pipe(gulp.dest('public'));
});

// jade -> html
gulp.task('jade', function () {
  return gulp.src(config.src.jade)
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'jade',
          message: err.message
        };
      })
    }))
    .pipe(jade({
      locals: {}
    }))
    .pipe(gulp.dest(config.dest.html));
});


// Auto-open libraries js/css

gulp.task('compass', function () {
  return gulp.src(config.src.sass)
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(compass({
//      project: "/",
      css: "public/styles",
      sass: "dev/sass",
      font: "public/fonts",
      image: "public/img",
      javascript: "public/js",
      // style: 'compressed',
//      relative: true,
      comments: true
    }))
    .pipe(rename({suffix: '.min'}))
});


// Move Css
gulp.task('css', function () {
  return gulp.src('dev/styles/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/styles'));
});


// Move images
gulp.task('images', function () {
  return gulp.src(['dev/images/*', 'dev/images/**/*.*'])
    .pipe(gulp.dest('./public/images'));
});

// Move Css
gulp.task('fonts', function () {
  return gulp.src(['dev/fonts/*', 'dev/fonts/**/*.*'])
    .pipe(gulp.dest('public/fonts/'));
});

// Move vendor, images, fonts, folders
gulp.task('move-folders', function () {
  return gulp.src([
    'dev/vendor/**/*.*',
    'dev/images/**/*.*',
    'dev/fonts/**/*.*',
  ], {base: './dev'})
    .pipe(gulp.dest('./public'));
});


// Minify & concat Angular app files
gulp.task('app', function () {
  return gulp.src([
    'dev/script/**/*.js',
  ])
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'app',
          message: err.message
        };
      })
    }))
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(babel({
      plugins: ['transform-runtime']
    }))
    .pipe(plumber())
    .pipe(ngAnnotate({add: true}))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public'));
});


// Minify & concat Angular controllers
gulp.task('controllers', function () {
  return gulp.src([
    'dev/scripts/controllers/**/*.js',
    '!dev/scripts/controllers/AppCtrl.js'
  ])
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'minify-controllers',
          message: err.message
        };
      })
    }))
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(babel({
      plugins: ['transform-runtime']
    }))
    .pipe(plumber())
    .pipe(ngAnnotate({add: true}))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(concat('controllers.js'))
    .pipe(gulp.dest('public'));
});

// Minify & concat theme directives
gulp.task('theme-directives', function () {
  return gulp.src([
    'dev/scripts/directives/*.js'
  ])
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'theme-directives',
          message: err.message
        };
      })
    }))
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(babel({
      plugins: ['transform-runtime']
    }))
    .pipe(plumber())
    .pipe(ngAnnotate({add: true}))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(concat('theme-directives.js'))
    .pipe(gulp.dest('public'));
});

// Minify & concat Angular directives
gulp.task('common-directives', function () {
  return gulp.src('dev/scripts/directives/common/*.*')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'common-directives',
          message: err.message
        };
      })
    }))
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(babel({
      plugins: ['transform-runtime']
    }))
    .pipe(plumber())
    .pipe(ngAnnotate({add: true}))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(concat('common-directives.js'))
    .pipe(gulp.dest('public'));
});


// Delete 'public' folder with generated files
gulp.task('clean', function () {
  return del([
    'public/scripts',
    'public/styles',
    'public/templates',
    'public/*.js',
    'public/index.html',
    '!public/bower_components'
  ]);
});

// Rebuild all
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'fonts',
    'jade',
    'html',
    'app',
    'compass',
    'css',
    'images',
    'move-folders'
  ),)
);

// Watcher for changes
gulp.task('watch', function () {
  gulp.watch([
    'dev/**/*.js',
    'dev/**/*.jade',
    'dev/**/*.html',
    'dev/**/*.scss',
  ], gulp.series('build'));
});

// Server for 'public' directory
gulp.task('serve', function () {
  browser.init({
    server: 'public'
  });
  browser.watch('public/**/*.*').on('change', browserSync.reload);
});

// Rebuild and watch
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));