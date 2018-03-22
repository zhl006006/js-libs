const Gulp = require('gulp');
const GulpUglify = require('gulp-uglify');
const GulpConcat = require('gulp-concat');
const GulpUtil = require('./plugins/gulp-util');
//
const DistPath = './dist';

Gulp.task('utils', function()
{
    var version = GulpUtil.getProcessArgs();
    if(version == null)
    {
        throw new Error('版本号不能为空');
    }
    var fileName = 'utils-' + version + '.min.js';
    Gulp.src('src/*.js').pipe(GulpConcat(fileName)).pipe(GulpUglify()).pipe(Gulp.dest(DistPath));
    console.log('输出完成：' + fileName);
});
function parseJsFile(name)
{
    var version = GulpUtil.getProcessArgs();
    if(version == null)
    {
        throw new Error('版本号不能为空');
    }
    var fileName = name + '-' + version + '.min.js';
    Gulp.src('src/' + name + '.js').pipe(GulpConcat(fileName)).pipe(GulpUglify()).pipe(Gulp.dest(DistPath));
    console.log('输出完成：' + fileName);
}
Gulp.task('href', function()
{
    parseJsFile('href');
});
Gulp.task('timer', function()
{
    parseJsFile('timer');
});
Gulp.task('unixtime', function()
{
    parseJsFile('unixtime');
});
Gulp.task('urlutil', function()
{
    parseJsFile('urlutil');
});
Gulp.task('validate', function()
{
    parseJsFile('validate');
});