/**
 * Created by Nikhil Peter on 08-11-2017.
 */

class NTNoInternetScreen extends NTGameScreen
{
    constructor(assetPath, layoutName, request)
    {
        super(assetPath, layoutName);

        this._request = request;
    }

    onLayoutComplete()
    {
        super.onLayoutComplete();

        this._intervalID = setInterval(this.checkInternet.bind(this), 200);
    }

    checkInternet()
    {
        if(navigator.onLine)
        {
            clearInterval(this._intervalID);
            NTEngine.screenManager.remove(this);

            this._request();
        }
    }
}