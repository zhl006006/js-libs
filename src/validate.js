/**
 * Created by tb on 2017/2/28.
 */
var Validate = (function ()
{
    var o = {};
    var _error = '';
    o.getError = function (name)
    {
        if(name === undefined || name === null)
        {
            name = '';
        }
        return _error.replace(/:attribute/, name);
    };
    /**
     * 是否为null或''
     * @param str
     * @returns {boolean}
     */
    o.isNullOrEmpty = function (str)
    {
        var ret = (str === undefined || str === null || str === '');
        if(ret === true)
        {
            _error = ':attribute不能为空';
        }
        return ret;
    };
    /**
     * 是否等于指定长度
     * @param str
     * @param length
     * @param require
     * @returns {boolean}
     */
    o.isLength = function (str, length, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false)
        {
            if(str.length === length)
            {
                return true;
            }
            _error = ':attribute长度不等于'+length;
        }
        else
        {
            _error = ':attribute不能为空';
        }
        return false;
    };
    /**
     * 长度是否小于等于指定最大值
     * @param str
     * @param length
     * @param require
     * @returns {boolean}
     */
    o.isMax = function (str, length, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false)
        {
            if(str.length <= length)
            {
                return true;
            }
            _error = ':attribute长度不能大于'+length;
        }
        else
        {
            _error = ':attribute不能为空';
        }
        return false;
    };
    /**
     * 长度是否大于等于指定最小值
     * @param str
     * @param length
     * @param require
     * @returns {boolean}
     */
    o.isMin = function (str, length, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false)
        {
            if(str.length >= length)
            {
                return true;
            }
            _error = ':attribute长度不能小于'+length;
        }
        else
        {
            _error = ':attribute不能为空';
        }
        return false;
    };
    /**
     * 长度是在指定范围内，包括最大最小值
     * @param str
     * @param min
     * @param max
     * @param require
     * @returns {boolean}
     */
    o.isRange = function (str, min, max, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false)
        {
            if((str.length >= min) && (str.length <= max))
            {
                return true;
            }
            _error = ':attribute长度不能小于'+min+'或大于'+max;
        }
        else
        {
            _error = ':attribute不能为空';
        }
        return false;
    };
    /**
     * 只能是汉字、字母、数字和下划线_及破折号-
     * @param str
     * @param require
     * @returns {boolean}
     */
    o.isChsDash = function (str, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false && new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/).test(str))
        {
            return true;
        }
        _error = ':attribute只能是汉字、字母、数字和下划线_及破折号-';
        return false;
    };
    /**
     * 只能是字母、数字和下划线_及破折号-
     * @param str
     * @param require
     * @returns {boolean}
     */
    o.isAlphaDash = function (str, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false && new RegExp(/^[a-zA-Z0-9_\-]+$/).test(str))
        {
            return true;
        }
        _error = ':attribute只能是字母、数字和下划线_及破折号-';
        return false;
    };
    /**
     * 是否是手机号码
     * @param str
     * @param require
     * @returns {boolean}
     */
    o.isMobile = function (str, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false && new RegExp(/^1[3456789]{1}\d{9}$/).test(str))
        {
            return true;
        }
        _error = '请输入正确的手机号码';
        return false;
    };
    /**
     * 是否是数字
     * @param str
     * @param require
     * @returns {boolean}
     */
    o.isNumber = function (str, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false && new RegExp(/^[0-9]+$/).test(str))
        {
            return true;
        }
        _error = ':attribute只能是数字';
        return false;
    };
    /**
     * 是否是身份证号
     * @param str
     * @param require
     * @return {boolean}
     */
    o.isIdCard = function (str, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false && new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/).test(str))
        {
            return true;
        }
        _error = '请输入正确的身份证号码';
        return false;
    };
    /**
     * 是否是正确的日期格式yyyy-mm-dd hh:mm:ss
     * @param str
     * @param require
     * @return {boolean}
     */
    o.isDateTime = function (str, require)
    {
        if(!require && o.isNullOrEmpty(str))
        {
            return true;
        }
        if(o.isNullOrEmpty(str) === false && new RegExp(/^(((\d{4}-(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|(\d{4}-(0[2469]|11)-(0[1-9]|[12][0-9]|30))) (20|21|22|23|[0-1][0-9]):[0-5][0-9]:[0-5][0-9])$/).test(str))
        {
            return true;
        }
        _error = '请输入正确的日期时间';
        return false;
    };
    /**
     * 日期时间范围是否正确(开始日期时间是否小于结束日期时间(秒))
     * @param start
     * @param end
     * @return {boolean}
     */
    o.isDateTimeRange = function (start, end)
    {
        if(o.isNullOrEmpty(start) || o.isNullOrEmpty(end))
        {
            return true;
        }
        if(typeof start === 'string')
        {
            start = parseInt(Date.parse(new Date(start))/1000);
        }
        if(typeof end === 'string')
        {
            end = parseInt(Date.parse(new Date(end))/1000);
        }
        if(start < end)
        {
            return true;
        }
        _error = '开始日期时间必须小于结束日期时间';
        return false;
    };
    /**
     * 路线格式是否正确
     * @param taskRoute
     * @return {boolean}
     */
    o.isTaskRoute = function (taskRoute) {
        var strRegex = /^\d+(,\d+)+(,\d+)$/;
        var re=new RegExp(strRegex);
        if (re.test(taskRoute)){
            return true;
        }else{
            _error = '路线格式不正确';
            return false;
        }
    };
    /**
     * URL格式是否正确
     * @param url
     * @return {boolean}
     */
    o.isURL = function (url){
        var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
            + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
            + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
        var re=new RegExp(strRegex);
        if (re.test(url)){
            return true;
        }else{
            _error = 'URL格式不正确';
            return false;
        }
    };
    return o;
})();