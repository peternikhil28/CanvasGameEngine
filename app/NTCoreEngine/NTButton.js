/**
 * Created by Nikhil Peter on 05-11-2017.
 */

class NTButton extends NTSprite
{
    constructor(w, h)
    {
        super(w, h);

        this._onTouchCallback = null;
        this.onTouchEnabled = true;
    }
    
    addTouchListener(callback)
    {
        this._onTouchCallback = callback;
        NTEngine.listener.addTouchListener(this);
    }

    removeTouchListener()
    {
        NTEngine.listener.removeTouchListener(this);
    }

    setTouchEnabled(boolean)
    {
        this.onTouchEnabled = boolean;
    }

    onTouch()
    {
        if(this.onTouchEnabled)
            this._onTouchCallback(this);
    }

    unload()
    {
        super.unload();

        this.removeTouchListener();
    }
}