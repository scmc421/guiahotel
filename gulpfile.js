'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');
    
    gulp.task('sass',function(){
        gulp.src('./css/*.css')
            .pipe(sass().on('error',sass.logError))
            .pipe(gulp.dest('./css'));
    })
    
    gulp.task('sass:watch', function(){
        gulp.watch('./css/*.scss', ['sass']);

    gulp.task('broser-sync', function(){
        var files = ['./*.html','./css/*.css','./img/*.{png, jpg, gif}','./js/*.js']
        browserSync.init(files, {
            server: {
                baseDir: './'
            }
        });
    });

    gulp.task('default', ['browser-sync'], function(){
        gulp.start('sass:watch');
    });