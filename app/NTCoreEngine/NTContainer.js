/**
 * Created by Nikhil Peter on 06-11-2017.
 */

class NTContainer extends NTDisplayObject
{
    constructor(w, h)
    {
        super();

        this.size.set(w, h);

        this._children = [];

        this._clippingEnabled = false;
    }

    addChild(object)
    {
        this._children.push(object);
    }

    removeChild(object)
    {
        object.unload();
        this._children.splice(this._children.indexOf(object), 1);
    }

    removeAllChildren()
    {
        while(this._children.length > 0)
        {
            this._children[0].unload();
            this._children[0] = null;
            this._children.splice(0, 1);
        }
    }

    toLocal(x, y)
    {
        return new NTPoint(x - this.position.x, y - this.position.y);
    }

    setClippingEnabled(boolean)
    {
        this._clippingEnabled = boolean;
    }

    clip(offsetX, offsetY)
    {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        let posX = offsetX + this.position.x - (this.anchor.x * this.size.width);
        let posY = offsetY + this.position.y - (this.anchor.y * this.size.height);

        NTEngine.scene.save();

        NTEngine.scene.beginPath();

        NTEngine.scene.rect(posX, posY, this.size.width, this.size.height);

        NTEngine.scene.closePath();

        NTEngine.scene.clip();
    }

    render(offsetX, offsetY)
    {
        super.render();

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        for(let index=0; index<this._children.length; index++)
            this._children[index].render(offsetX + this.position.x, offsetY + this.position.y);
    }

    update(offsetX, offsetY )
    {
        super.update();

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        if(this._clippingEnabled)
            this.clip(offsetX, offsetY);

        for(let index=0; index<this._children.length; index++)
            this._children[index].update(offsetX + this.position.x, offsetY + this.position.y);

         if(this._clippingEnabled)
            NTEngine.scene.restore();
    }

    unload()
    {
        super.unload();

        this.removeAllChildren();
    }


}