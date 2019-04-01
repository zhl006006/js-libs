/**
 * url功能
 * Created by tb on 2017/2/16.
 */
var URLUtil = (function ()
{
    var o = {};
    /**
     * 获取url的参数
     * @param url
     * @returns {object}
     */
    o.getQueryMap = function(url)
    {
        var map = {};
        if(typeof url !== 'string')
        {
            return map;
        }
        var index = url.indexOf("?");
        if (index >= 0)
        {
            url = url.substring(index+1);
            var strs = url.split("&");
            for(var i = 0; i < strs.length; i++)
            {
                var item = strs[i].split("=");
                map[item[0]] = item[1] == null ? '' : item[1];
            }
        }
        return map;
    };
    /**
     * 获取url的描点
     * @param url
     * @returns {string}
     */
    o.getAnchor = function(url)
    {
        if (typeof url !== 'string')
        {
            return null;
        }
        var query = url.split("#");
        if (!query || !query[1])
        {
            return null;
        }
        return query[1];
    };
    /**
     * 解决多标签浏览器返回到标签主页问题
     * @param defUrl
     */
    o.historyBack = function (defUrl)
    {
        if(document.referrer)
        {
            window.location.href = document.referrer;
        }
        else
        {
            window.location.href = defUrl;
        }
    };
    return o;
})();