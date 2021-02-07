'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var angularFileSort = require('gulp-angular-filesort'), inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var mainBowerFiles = require('main-bower-files');
var gulpUglify = require('gulp-uglify');


gulp.task('buildLibs', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('libs'));
});

gulp.task('libs', function() {
    return gulp.src('libs/*.js')
        .pipe(angularFileSort())
        .pipe(concat('libs.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest('dist/src'));
});

gulp.task('appModules', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(inject(gulp.src(['app/js/**/*.js']).pipe(angularFileSort())))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('css', function() {
    return gulp.src('app/css/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('templates', function() {
    return gulp.src('app/templates/**/*.html')
        .pipe(templateCache('template.js', {
            module: 'webApp',
            root: 'app/templates/'
        }))
        .pipe(gulp.dest('dist/src'));
});

gulp.task('index', function() {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('app/js/**/*.js', gulp.series(['appModules']));
    gulp.watch('app/css/*.css',  gulp.series(['css']));
    gulp.watch('app/templates/**/*.html',  gulp.series(['templates']));
    gulp.watch('app/index.html',  gulp.series(['index']));
});

gulp.task('build', gulp.series(
    gulp.parallel('index', 'css', 'templates', 'libs', 'appModules')
))