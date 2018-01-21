/**
 * Created by Nikhil Peter on 08-11-2017.
 */

class NTServer
{
    getRequest(theUrl, callback)
    {
        if(navigator.onLine)
        {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                    callback(xmlHttp.responseText);
            };
            xmlHttp.open("GET", theUrl, true); // true for asynchronous
            xmlHttp.send(null);
        }
        else
        {
            NTEngine.listener.notifyNoInternet(this.getRequest.bind(this, theUrl, callback));
        }
    }

    formatParams( params )
    {
        return "?" + Object
                .keys(params)
                .map(function(key){
                    return key+"="+encodeURIComponent(params[key])
                })
                .join("&")
    }
}