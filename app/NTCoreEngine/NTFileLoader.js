/**
 * Created by Nikhil Peter on 08-11-2017.
 */

class NTFileLoader
{
    load(filePath, onLoad, onError)
    {
        this._filePath = filePath;
        this._onLoad = onLoad;
        this._onError = onError;

        if(NTEngine.loader.resources[filePath]==null)
        {
            if(!navigator.onLine)
                setTimeout(this.load.bind(this, filePath, onLoad, onError ), 200);
            else
                this.loadResource();
        }
        else
            this._onLoad(NTEngine.loader.resources[filePath]);
    }



    loadResource()
    {

    }
}

class NTTextureLoader extends NTFileLoader
{
    loadResource()
    {
        let img = new Image();

        let self =this;
        img.onload = ()=>
        {
            NTEngine.loader.resources[self._filePath] = img;
            self._onLoad(img);
        };

        img.onError = this._onError;

        img.src = this._filePath;

    }
}

class NTJsonLoader extends NTFileLoader
{
    loadResource()
    {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', this._filePath, true);

        let self = this;
        xobj.onreadystatechange = function ()
        {
            if (xobj.readyState == 4 && xobj.status == "200")
            {
                NTEngine.loader.resources[self._filePath] = xobj.responseText;
                self._onLoad(xobj.responseText);
            }

            if (xobj.readyState == 4)
            {
                if (!(xobj.status >= 200 && xobj.status < 304))
                    self._onError(status);
            }
        };
        xobj.send(null);

    }
}