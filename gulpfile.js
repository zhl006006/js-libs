var gulp = require('gulp');
gulp.task('default',function()
{
    //js 合并 压缩
    var uglify=require('gulp-uglify');
    var concat = require('gulp-concat');
    gulp.src('src/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
    //gulp.src('src/*.js').pipe(concat('utils.min.js')).pipe(uglify()).pipe(gulp.dest('dist'));
});