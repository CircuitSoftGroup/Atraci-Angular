const PLATFORM = "win64"; // Pass wanted platform all/osx32/osx64/win32/win6/linux32/linux64

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    nwBuilder = require("node-webkit-builder"),
    gutil = require("gulp-util"),
    ignore = require("gulp-util");

gulp.task('default', ['buildDev']);
gulp.task('buildFirst', ['scssToCss', 'minifyCss', 'concatJS', 'nwBuild', 'openApp']);
gulp.task('buildDev', ['scssToCss', 'concatJS','openApp']);

gulp.task('nwBuild', function () {
    var nw = new nwBuilder({
        version : '0.11.1',
        files : ["./app/**", "./node_modules", "./assets/**", "./package.json", "./index.html", "!./assets/sass"],
        platforms : (!PLATFORM || PLATFORM == 'all' ? ['osx32', 'osx64', 'linux32', 'linux64', 'win32', 'win64'] : [PLATFORM])
    }).on('log', function (msg) { gutil.log('node-webkit-builder', msg) });
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

gulp.task('openApp', function () {
    gulp.src('cache/**/' + PLATFORM + '/nw.exe', {read: true})
        .pipe(shell(['<%= file.path %> ./']));
});

gulp.task('concatJS', function () {
    gulp.src(['app/**/*.js', 'assets/js/**/*.js', '!assets/js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('scssToCss', function () {
    gulp.src('assets/sass/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('minifyCss', function () {
    gulp.src('assets/css/main.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));
});