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
exports.refAllFilePath = function(path, suffixs)
{
    var list = [];
    _refAllFilePath(path, suffixs, list);
    return list;
}
/**
 * 抽取语言
 */
exports.extractLang = function(paths, suffixs, filterPaths, filterKeywords, origLangs)
{
    if(!suffixs)
    {
        return null;
    }
    //
    var regex_content = new RegExp('[\"\']((?![\"\']).)+[\"\']','g');//抽取引号中的内容
    var regex_lang = new RegExp('[\u4e00-\u9fa5]','g');//过滤出中文内容
    var regex_remove = new RegExp('[\\t\\0\\v]', 'g');//去掉杂七杂八的字符
    var regex_line = new RegExp('[\\r\\n]', 'g');//换行裁剪成数组
    //
    var langArray = [];
    var pathList = [];
    paths.forEach(function(path) {
        _refAllFilePath(path, suffixs, pathList);
    }, this);
    for(var a in pathList)
    {
        var path = pathList[a];
        if(_isFilterPaths(path, filterPaths) == false)
        {
            var lineList = FS.readFileSync(path).toString().split(regex_line);
            for(var b in lineList)
            {
                var line = lineList[b].trim().replace(regex_remove, '');
                if(_isFilterKeywords(line, filterKeywords) == false)
                {
                    var array = line.match(regex_content);
                    for(var c in array)
                    {
                        var lang = array[c].substring(1, array[c].length-1);
                        if(regex_lang.test(lang))
                        {
                            var obj = _getLangObject(origLangs, lang);
                            if(!obj)
                            {
                                obj = {k:lang,v:''};
                            }
                            langArray.push(obj);
                        }
                    }
                }
            }
        }
    }
    return langArray;
};
function _getLangObject(langArray, key)
{
    if(langArray)
    {
        for(var i in langArray)
        {
            var o = langArray[i];
            if(o.k == key)
            {
                return o;
            }
        }
    }
    return null;
}
function _isFilterPaths(path, filters)
{
    if(filters)
    {
        path = path.replace(/\\/g,'/');
        for(var i in filters)
        {
            var item = filters[i].replace(/\\/g,'/');
            if(path.indexOf(item) >= 0)
            {
                return true;
            }
        }
    }
    return false;
}
function _isFilterKeywords(line, filters)
{
    if(filters)
    {
        for(var i in filters)
        {
            if(line.indexOf(filters[i]) == 0)
            {
                return true;
            }
        }
    }
    return false;
}
function _refAllFilePath (path, suffixs, list)
{
    if(FS.existsSync(path))
    {
        var files = FS.readdirSync(path);
        files.forEach(function(file)
        {
            var currentPath = Path.join(path, file);
            if(FS.statSync(currentPath).isDirectory())
            {
                _refAllFilePath(currentPath, suffixs, list);
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