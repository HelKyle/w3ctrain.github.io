
/*
* @Author: HelKyle & cyseria
* @Date:   2015-12-04 11:37:35
* @Last Modified by:   cyseria
* @Last Modified time: 2016-02-10 12:35:55
*/
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    prettify = require('gulp-prettify'),
    cache = require('gulp-cache'),
    runSequence = require('run-sequence'),
    del = require('del'),

    // uncss = require('gulp-uncss'),
    autoPrefixer = require('gulp-autoprefixer');

// Development Tasks
// -----------------
gulp.task('help', function() {
  console.log('----------------------------------------');
  console.log('gulp                 开发模式');
  console.log('gulp build           部署模式');
  console.log('----------------------------------------');
})

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(autoPrefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('jade', function() {
	return gulp.src('app/jade/*.jade')
	.pipe(jade())
	.pipe(prettify({ indent_size: 2, unformatted: ['pre', 'code']}))
	.pipe(gulp.dest('app'))
	.pipe(browserSync.reload({
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest(''))
});

// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true,
    })))
  .pipe(gulp.dest('img'))
});

// Uncss
gulp.task('uncss', function() {
  gulp.src('./css/**/*.css')
      .pipe(uncss({
        html: ['index.html']
      }))
      .pipe(gulp.dest('./css/'))
});

// Cleaning
gulp.task('clean', function(callback) {
  del('css');
  del('img');
  del('js');
  return cache.clearAll(callback);
})
gulp.task('clean:dist', function(callback) {
  del('css');
  del('js');
  del('fonts');
  return cache.clearAll(callback);
})


gulp.task('publish-html', function () {
  var manifest = gulp.src('rev/**/*.json');
  return gulp.src(['index.html'])
    .pipe(revReplace({manifest : manifest}))
    .pipe(gulp.dest(''));
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('./fonts/'))
})

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass','jade', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['sass', 'jade', 'images', 'fonts' ],
    'useref',
    // 'deploy',
    callback
  )
})
