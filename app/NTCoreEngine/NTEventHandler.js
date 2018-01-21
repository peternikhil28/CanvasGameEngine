/**
 * Created by Nikhil Peter on 06-11-2017.
 */

class NTEventHandler
{
    constructor()
    {
        this._listenerArray = [];

        this._noInternetCallBack = null;
    }

    init()
    {
        NTEngine.canvas.addEventListener( 'click', this.onTouch.bind(this), false );

        NTEngine.canvas.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
    }

    addTouchListener(object)
    {
        this._listenerArray.push(object);
    }

    removeTouchListener(object)
    {
        if(this._listenerArray.indexOf(object) != -1)
            this._listenerArray.splice(this._listenerArray.indexOf(object), 1);
    }

    onTouch( event )
    {
        let rect = NTEngine.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let canvasWidth = parseFloat(NTEngine.canvas.style.width);
        let canvasHeight = parseFloat(NTEngine.canvas.style.height);

        x = ( x/canvasWidth ) * NTEngine.screenWidth;
        y = ( y/canvasHeight ) * NTEngine.screenHeight;

        for ( let i = 0; i < this._listenerArray.length; i++ )
        {
            let object = this._listenerArray[i];

            if( x > object.position.x - object.size.width/2 &&
                x < object.position.x + object.size.width/2 &&
                y > object.position.y - object.size.height/2 &&
                y < object.position.y + object.size.height/2 )
            {
                this._listenerArray[i].onTouch();
                break;
            }
        }
    }

    onMouseMove( event )
    {
        let rect = NTEngine.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let canvasWidth = parseFloat(NTEngine.canvas.style.width);
        let canvasHeight = parseFloat(NTEngine.canvas.style.height);

        x = ( x/canvasWidth ) * NTEngine.screenWidth;
        y = ( y/canvasHeight ) * NTEngine.screenHeight;

        for ( let i = 0; i < this._listenerArray.length; i++ )
        {
            let object = this._listenerArray[i];

            if( x > object.position.x - object.size.width/2 &&
                x < object.position.x + object.size.width/2 &&
                y > object.position.y - object.size.height/2 &&
                y < object.position.y + object.size.height/2 &&
                this._listenerArray[i].onTouchEnabled)
            {
                NTEngine.canvas.style.cursor = 'pointer';
                break;
            }
            else
            {
                NTEngine.canvas.style.cursor = 'default';
            }
        }
    }

    setNoInternetCallback(callBack)
    {
        this._noInternetCallBack = callBack;
    }

    notifyNoInternet(lastRequest)
    {
        if(this._noInternetCallBack)
            this._noInternetCallBack(lastRequest);
    }
}