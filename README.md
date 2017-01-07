# js-utils
javascript实用工具库
<br/>
<br/>
<br/>
文件名href.js:<br/>
Href封装了超链接功能，支持get和post，参数使用对象
<br/>
<br/>
Href.get(url,data);<br/>
Href.post(url,data);<br/>
<br/>
<br/>
文件名time.js:<br/>
Time封装了时间处理相关功能
<br/>
<br/>
同步服务器时间<br/>
Time.syncServer(url,callback);<br/>
获取服务器时间，单位：秒 (只有在syncServer回调完成之后才有效)<br/>
Time.getServerTime();<br/>
UTC时间转本地时间：参数和返回单位：秒 <br/>
Time.toLocal(utc);<br/>
