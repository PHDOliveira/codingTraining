var gulp = require('gulp'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css');
var viewDir = 'app/views/';
var sassFiles = ['resources/sass/**/*.scss', viewDir + '**/*.scss'];

gulp.task('connect', function () {
    connect.server({
        port: '8000',
        livereload: false,
        base: 'http://localhost',
    });
});

gulp.task('compiler-sass', function () {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rename(function (path) {
            path.dirname = "";
        }))
        .pipe(gulp.dest('resources/css/'));
});

gulp.task('default', ['connect'], function () {
    gulp.watch(sassFiles, ['compiler-sass']);
});

