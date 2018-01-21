/**
 * Created by Nikhil Peter on 04-11-2017.
 */

class NTLoader
{
    constructor()
    {
        this.resources = {};

        this._resToLoad = null;
        this._resLoadedIndex = null;
        this._callback = null;

        this._textureLoader = new NTTextureLoader();
        this._jsonLoader = new NTJsonLoader();
    }

    loadResource(resList, callback)
    {
        this._callback = callback;

        this._resourceToLoad = [];
        this._resourceToLoad = resList;

        this._resLoadedIndex = -1;

        this.next();
    }

    next()
    {
        this._resLoadedIndex++;

        if(this._resLoadedIndex < this._resourceToLoad.length)
            this.load();
        else
            this.loadComplete();

    }

    load()
    {
        let resPath = this._resourceToLoad[this._resLoadedIndex];

        if(this.resources[resPath]!=null)
        {
            this.next();
            return;
        }

        let format = resPath.split('.').pop();
        let loader;

        switch (format)
        {
            case "png":
            case "jpg":
                loader = this._textureLoader;
                break;

            case "json":
                loader = this._jsonLoader;
                break;

            default :
                console.log("Unknown format loaded");
                break;
        }

        loader.load(resPath, this.next.bind(this),

            // Function called when download errors
            function ( status )
            {
                console.error( 'An error loading ' + resPath );
            }
        );
    }

    loadComplete()
    {
        if(this._callback)
            this._callback.call();
    }

    getResource(path)
    {
        return this.resources[path];
    }
}