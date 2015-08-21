var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();


//Compile less into css
gulp.task('less', function () {
  return gulp.src('./less/**/main.less')
    .pipe(less({
      paths: [ path.join('less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

//Minify css
gulp.task('minify-css', function() {
  return gulp.src('./css/main.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('./less/*.less', ['less']);
});

//Server 
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('less/*.less', ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);

});

