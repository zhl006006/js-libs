const FS = require("fs");
const Path = require('path');
/**
 * 获取命令行输入参数
 */
exports.getProcessArgs = function()
{
    var args = process.argv[3];
    if(args)
    {
        return args.substr(1);
    }
    return null;
};
/**
 * 删除目录和所有子文件目录
 * path:目录路径
 * delCurrent:是否删除当前目录
 */
exports.deleteDirectory = function(path, delCurrent)
{
    if(FS.existsSync(path))
    {
        var files = FS.readdirSync(path);
        files.forEach(function(file, index)
        {
            var curPath = Path.join(path, file);
            if(FS.statSync(curPath).isDirectory())
            {
                exports.deleteDirectory(curPath, true);
            }
            else
            {
                FS.unlinkSync(curPath);
            }
        });
        if(delCurrent === true)
        {
            FS.rmdirSync(path);
        }
        return true;
    }
    return false;
};
/**
 * 创建目录
 */
exports.createDirectory = function(path)
{
    if(!FS.existsSync(path))
    {
        FS.mkdirSync(path);
    }
};
/**
 * 删除文件
 */
exports.deleteFile = function(file)
{
    if(FS.existsSync(file))
    {
        FS.unlinkSync(file);
    }
};
/**
 * 删除指定路径下所有指定后缀名的文件
 */
exports.deleteFiles = function(dir, suffix)
{
    var files = FS.readdirSync(dir);
    for(var i in files)
    {
        var file = files[i];
        if(!suffix || Path.extname(file) == suffix)
        {
            exports.deleteFile(Path.join(dir, file));
        }
    }
};
/**
 * 指定目录下是否存在指定后缀名的文件
 */
exports.existsExtname = function(dir, suffix)
{
    var files = FS.readdirSync(dir);
    for(var i in files)
    {
        if(Path.extname(files[i]) == suffix)
        {
            return true;
        }
    }
    return false;
};
/**
 * 合并文本文件
 * @param rootPath  根路径
 * @param files     文件路径列表（不包含根路径）
 * @param outfile   输出文件路径（不包含根路径）
 */
exports.mergeTextFiles = function(rootPath, files, outfile)
{
    var text = '';
    for(var i in files)
    {
        text += FS.readFileSync(Path.join(rootPath, files[i])).toString();
    }
    FS.writeFileSync(Path.join(rootPath, outfile), text);
};
/**
 * 合并对象
 * @param from
 * @param to
 */
exports.mergeObjectTo = function(from, to)
{
    for(var i in from)
    {
        to[i] = from[i];
    }
};