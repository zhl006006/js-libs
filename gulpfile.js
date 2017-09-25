const Gulp = require('gulp');
const GulpUtil = require('./plugins/gulp-util');
Gulp.task('default',function()
{
    const DistPath = './dist';
    //
    GulpUtil.deleteDirectory(DistPath);
    //js 合并 压缩
    const Uglify=require('gulp-uglify');
    const Concat = require('gulp-concat');
    const Rename = require("gulp-rename");
    Gulp.src('src/*.js').pipe(Uglify()).pipe(Rename({suffix:".min"})).pipe(Gulp.dest(DistPath));
    Gulp.src('src/*.js').pipe(Concat('utils.min.js')).pipe(Uglify()).pipe(Gulp.dest(DistPath));
});