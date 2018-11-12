'use strict'

let gulp            = require('gulp'),
    less            = require('gulp-less'),
    jade            = require('gulp-jade'),
    cleanCSS        = require('gulp-clean-css'),
    spritesmith     = require('gulp.spritesmith'),
    notify          = require('gulp-notify'),
    sourcemaps      = require('gulp-sourcemaps'),
    gcmq            = require('gulp-group-css-media-queries'),
    browserSync     = require('browser-sync').create(),
    autoprefixer    = require('gulp-autoprefixer')

gulp.task('serve', ['jade', 'less'], () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  gulp.watch(['src/**/*.jade'], ['jade'])
  gulp.watch(['src/**/*.less'], ['less'])
  gulp.watch('dist/*.html').on('change', browserSync.reload)
})

gulp.task('jade', () => {
  gulp.src('src/jade/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .on('error', notify.onError({
    message: 'Error: <%= error.message %>',
    title: 'Error running something'
  }))
  .pipe(gulp.dest('dist'))
})

gulp.task('less', () => {
  gulp.src('src/less/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .on('error', notify.onError({
    message: 'Error: <%= error.message %>',
    title: 'Error running something'
  }))
  .pipe(autoprefixer())
  .pipe(gcmq())
  .pipe(cleanCSS({
    level: 2
  }))
  .pipe(sourcemaps.write())
  .pipe(browserSync.stream())
  .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('default', ['serve'])
