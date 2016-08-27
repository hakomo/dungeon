
var gulp    = require('gulp'),

    babel   = require('gulp-babel'),
    notify  = require('gulp-notify'),
    plumber = require('gulp-plumber')

gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
})

gulp.task('css', function() {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('build'))
})

gulp.task('image', function() {
    gulp.src('src/**/images/**/*')
        .pipe(gulp.dest('build'))
})

gulp.task('font', function() {
    gulp.src('src/**/fonts/**/*')
        .pipe(gulp.dest('build'))
})

gulp.task('min.js', function() {
    gulp.src('src/**/*.min.js')
        .pipe(gulp.dest('build'))
})

gulp.task('js', function() {
    gulp.src(['src/**/*.js', '!src/**/*.min.js'])
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('build'))
})

gulp.task('default', ['html', 'css', 'image', 'font', 'min.js', 'js'], function() {
    gulp.watch('src/**/*.html', ['html'])
    gulp.watch('src/**/*.css', ['css'])
    gulp.watch('src/**/images/**/*', ['image'])
    gulp.watch(['src/**/*.js', '!src/**/*.min.js'], ['js'])
})
