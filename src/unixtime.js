/**
 * @version 1.0.0
 */
var UnixTime = (function ()
{
    /**
     *
     * @param date
     * @param format
     * @param tpl
     * @returns {string}
     */
    function baseDateFormat(date, format, tpl)
    {
        if (/(y+)/i.test(format))
        {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in tpl)
        {
            if (new RegExp("(" + k + ")").test(format))
            {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? tpl[k] : ("00" + tpl[k]).substr(("" + tpl[k]).length));
            }
        }
        return format;
    }
    //
    var o = {};
    /**
     * 把Date对象格式化为yyyy-MM-dd h:m:s格式的日期时间
     * @param date
     * @param format
     * @returns {string}
     */
    o.formatDate = function (date, format)
    {
        if(!date)
        {
            date = new Date();
        }
        if(!format)
        {
            format = 'yyyy-MM-dd hh:mm:ss';
        }
        var tpl = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S+': date.getMilliseconds()
        };
        return baseDateFormat(date, format, tpl);
    };
    /**
     * 返回前后指定日开始的日期时间，默认今天
     * @param day
     * @returns {string}
     */
    o.toDayStart = function (day)
    {
        if(!day)
        {
            day = 0;
        }
        var date = new Date();
        date.setDate(date.getDate() + day);
        var format = 'yyyy-MM-dd 00:00:00';
        var tpl = {'M+': date.getMonth() + 1, 'd+': date.getDate(), 'q+': Math.floor((date.getMonth() + 3) / 3)};
        return baseDateFormat(date, format, tpl);
    };
    /**
     * 返回前后指定日结束的日期时间，默认今天
     * @param day
     * @returns {string}
     */
    o.toDayEnd = function (day)
    {
        if(!day)
        {
            day = 0;
        }
        var date = new Date();
        date.setDate(date.getDate() + day);
        var format = 'yyyy-MM-dd 23:59:59';
        var tpl = {'M+': date.getMonth() + 1, 'd+': date.getDate(), 'q+': Math.floor((date.getMonth() + 3) / 3)};
        return baseDateFormat(date, format, tpl);
    };
    /**
     * 把时间戳（秒）格式化为yyyy-MM-dd h:m:s格式的日期时间
     * @param timestamp
     * @param format
     * @returns {string}
     */
    o.formatTimestamp = function (timestamp, format)
    {
        var date = new Date();
        date.setTime(timestamp * 1000);
        return o.formatDate(date, format);
    };
    /**
     * 把yyyy-MM-dd h:m:s格式的日期时间转为时间戳(秒)
     * @param unixTime
     * @returns {number}
     */
    o.toTimestamp = function (unixTime)
    {
        if(typeof unixTime === 'string')
        {
            var date = new Date(unixTime);
            return parseInt(Date.parse(date)/1000);
        }
        else
        {
            return parseInt(Date.now()/1000);
        }
    };
    return o;
})();