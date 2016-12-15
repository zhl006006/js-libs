/**
 * Created by tb on 2016/12/13.
 */
var PostHref = (function ()
{
    function submit(url,data)
    {
        var form = document.createElement('form');
        form.method = 'post';
        form.action = url;
        form.style.display='none';
        if (data != null)
        {
            for(var name in data)
            {
                createInput(form,name,data[name]);
            }
        }
        form.submit();
    }
    function createInput(form,name,value)
    {
        var input = document.createElement("input");
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    }
    return {submit:submit};
})();