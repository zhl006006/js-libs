const FS = require("fs");
const Path = require('path');
/**
 * 获取命令行输入的一个参数
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
 * 获取命令行输入的参数列表
 */
exports.getProcessArgsList = function()
{
    var list = [];
    for(var i = 3;i<process.argv.length;i++)
    {
        list.push(process.argv[i].substr(1));
    }
    return list;
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
            var currentPath = Path.join(path, file);
            if(FS.statSync(currentPath).isDirectory())
            {
                exports.deleteDirectory(currentPath, true);
            }
            else
            {
                FS.unlinkSync(currentPath);
            }
        }, this);
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
 * 删除指定路径下所有指定名或后缀名的文件
 * path:指定路径
 * nameOrSuffix：文件全名或后缀名
 * allDirectories：是否包括所有子目录下的文件
 */
exports.deleteFiles = function(path, nameOrSuffix, allDirectories)
{
    if(FS.existsSync(path))
    {
        var files = FS.readdirSync(path);
        files.forEach(function(file, index) {
            var currentPath = Path.join(path, file);
            if(FS.statSync(currentPath).isDirectory())
            {
                if(allDirectories === true)
                {
                    exports.deleteFiles(currentPath, nameOrSuffix, allDirectories);
                }
            }
            else
            {
                if(!nameOrSuffix)
                {
                    FS.unlinkSync(currentPath);
                }
                else if(nameOrSuffix.indexOf('.') === 0)
                {
                    if(Path.extname(file) == nameOrSuffix)
                    {
                        FS.unlinkSync(currentPath);
                    }
                }
                else
                {
                    if(file == nameOrSuffix)
                    {
                        FS.unlinkSync(currentPath);
                    }
                }
            }
        }, this);
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
/**
 * 获取path下所有子级文件路径添加到list并返回
 */
exports.getAllFilePath = function(path, suffixs)
{
    var list = [];
    exports.refAllFilePath(path, suffixs, list);
    return list;
};
/**
 * 获取path下所有子级文件路径添加到list中，list不能为空
 * @param path
 * @param suffixs
 * @param list
 */
exports.refAllFilePath = function (path, suffixs, list)
{
    if(FS.existsSync(path))
    {
        var files = FS.readdirSync(path);
        files.forEach(function(file)
        {
            var currentPath = Path.join(path, file);
            if(FS.statSync(currentPath).isDirectory())
            {
                exports.refAllFilePath(currentPath, suffixs, list);
            }
            else
            {
                if(suffixs == null || suffixs.indexOf(Path.extname(currentPath)) >= 0)
                {
                    list.push(currentPath);
                }
            }
        }, this);
    }
};