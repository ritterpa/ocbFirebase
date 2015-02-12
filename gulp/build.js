'use strict';

// Include gulp
var gulp = require('gulp');

// Include Our Plugins

var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var es = require('event-stream');
var angularFilesort = require('gulp-angular-filesort');


// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('app/**/*.css', ['build']);
    gulp.watch('app/**/*.js', ['build']);
});

gulp.task('build', function () {

    //get css files
    var cssFiles = gulp.src(['app/**/*.css']);

    //get js files, be sure to sort for angular
    var jsFiles =   //include all the js files, ignore test files and all of bwip, then merge only the bwip files we need
        gulp.src([
            'app/**/*.js',
            '!app/**/*-test.js',
            '!app/**/*.test.js'])
            .pipe(angularFilesort());

    //upload files into index.html page
    gulp.src('./app/index.html')
        .pipe(inject(gulp.src(bowerFiles(), {read: true}), {
            name: 'bower',
            addRootSlash: false,
            relative: true
        }))
        .pipe(inject(es.merge(
            cssFiles,
            jsFiles), {
            addRootSlash: false,
            ignorePath: 'app'
        }))
        .pipe(gulp.dest('./app'));

});

gulp.task('karma', function () {
    var jsFiles =
        gulp.src([
            'app/**/*.js'
        ], {read: true})
            //.pipe(footer('../app/**/*.html'))
            .pipe(angularFilesort());

    var bowerStuff =
        gulp.src(bowerFiles({
            includeDev: true,
            filter: /(.)*.js/
        }), {read: true});
    gulp.src('./test/karma.conf.js')
        .pipe(inject(es.merge(bowerStuff, jsFiles), {
            starttag: 'files: [',
            endtag: '\'../app/**/*.html\']',
            transform: function (filepath, file, i, length) {
                return '  \'' + filepath + '\'' + (i + 1 < length ? ',' : ',');
            },
            relative: true
        }))
        .pipe(gulp.dest('./test'));
});
