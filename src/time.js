/**
 * Created by tb on 2017/1/7.
 */
var Time = (function ()
{
    var _syncTime = 0;
    var _serverTime = 0;
    var o = {};
    o.syncServer = function(url,callback)
    {
        var xhr = null;
        if(window.XMLHttpRequest)
        {
            xhr = new window.XMLHttpRequest();
        }
        else
        { // ie
            xhr = new ActiveObject("Microsoft")
        }
        // 通过get的方式请求当前文件
        xhr.open("get",url);
        xhr.send(null);
        // 监听请求状态变化
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState===2)
            {
                _syncTime = new Date().getTime();
                // 获取响应头里的时间戳
                var time = xhr.getResponseHeader("Date");
                _serverTime = new Date(time).getTime();
                if (callback)
                {
                    callback();
                }
            }
        }
    }
    o.getServerTime = function ()
    {
        return Math.floor((new Date().getTime() - _syncTime + _serverTime)/1000);
    }
    o.toLocal = function(utc)
    {
        return utc - new Date().getTimezoneOffset()*60;
    }
    return o;
})();