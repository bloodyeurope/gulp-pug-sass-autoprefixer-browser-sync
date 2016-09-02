var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var pug         = require('gulp-pug');

/**
 * Launch the Server
 */
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'site'
        }
    });
});

gulp.task('reload-browser', function () {
    browserSync.reload();
});

/**
 * Concatenate js files
 */
gulp.task('concatenate', function() {
  return gulp.src(['_js/jquery-3.1.0.min.js', '_js/mine.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('site'));
});

/**
 * Compile files from sass and use autoprefix for browser compatibility.
 */
gulp.task('sass', function () {
    return gulp.src('_sass/main.sass')
      .pipe(sass({

          includePaths: ['sass'],
          onError: browserSync.notify
      }))
      .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(gulp.dest('site'))
      //.pipe(browserSync.reload({stream:true}))
});


/**
 * Watch pug files for changes & recompile
 */
gulp.task('pugcompile', function buildHTML() {
  return gulp.src('_pug/*.pug')
  .pipe(pug({
    pretty: true,
    includePaths: ['_pug'],
    onError: browserSync.notify
    // Your options in here.
  }))
  .pipe(gulp.dest('site'))
});

/**
 * Watch sass files for changes & recompile
 * Watch site files reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_sass/**/*.sass', ['sass']);
    gulp.watch('_js/*.js', ['concatenate']);
    gulp.watch('_pug/**/*.pug', ['pugcompile']);
    gulp.watch(['site/*'], ['reload-browser']);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync','sass', 'concatenate','pugcompile', 'watch']);
