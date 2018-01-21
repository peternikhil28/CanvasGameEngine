/**
 * Created by Nikhil Peter on 03-11-2017.
 */

class NTSprite extends NTDisplayObject
{
    constructor(w, h)
    {
        super();

        this.size.set(w, h);

        this._name = null;

        this._needsUpdate = false;
    }

    setName(name)
    {
        this._name = name;
    }

    getName()
    {
        return this._name;
    }

    setTexture(path)
    {
        this._texture = NTEngine.loader.getResource(path);

        this._needsUpdate = true;
    }

    render(offsetX, offsetY)
    {
        super.render();

        offsetX = offsetX || 0;
        offsetY = offsetY || 0;

        if(this._lastUpdatedValues === undefined)
        {
            this._lastUpdatedValues = new NTRect();

            let posX = offsetX + this.position.x - (this.anchor.x * this.size.width);
            let posY = offsetY + this.position.y - (this.anchor.y * this.size.height);

            NTEngine.root.pushClearArea(new NTRect(posX, posY, this.size.width, this.size.height));

            this._needsUpdate = true;
            return;
        }

        this.onBoundsChange(offsetX, offsetY);
    }

    onBoundsChange(offsetX, offsetY)
    {
        let posX = offsetX + this.position.x - (this.anchor.x * this.size.width);
        let posY = offsetY + this.position.y - (this.anchor.y * this.size.height);

        // -- Checking for update on the sprite bounding rect
        if(posX !== this._lastUpdatedValues.position.x
            || posY !== this._lastUpdatedValues.position.y
            || this.size.width !== this._lastUpdatedValues.size.width
            || this.size.height !== this._lastUpdatedValues.size.height
            || this._needsUpdate)
        {
            NTEngine.root.pushClearArea(new NTRect(this._lastUpdatedValues.position.x, this._lastUpdatedValues.position.y, this._lastUpdatedValues.size.width, this._lastUpdatedValues.size.height));

            this._needsUpdate = true;
        }
    }

    update(offsetX, offsetY)
    {
        super.update();

        let refreshList = NTEngine.root.getRefreshList();

        for(let i=0; i<refreshList.length; i++)
            // -- Checking clear rect intersects the sprite bounding rect --
            if(Math.max(refreshList[i].position.x, this._lastUpdatedValues.position.x) < Math.min(refreshList[i].position.x + refreshList[i].size.width, this._lastUpdatedValues.position.x + this._lastUpdatedValues.size.width)
                && Math.max(refreshList[i].position.y, this._lastUpdatedValues.position.y) < Math.min(refreshList[i].position.y + refreshList[i].size.height, this._lastUpdatedValues.position.y + this._lastUpdatedValues.size.height))
                this._needsUpdate = true;

        if(this._needsUpdate)
            this.draw(offsetX, offsetY);
    }
    
    draw(offsetX, offsetY)
    {
        this._needsUpdate = false;

        let posX = offsetX + this.position.x - (this.anchor.x * this.size.width);
        let posY = offsetY + this.position.y - (this.anchor.y * this.size.height);

        this._lastUpdatedValues.position.set(posX, posY);
        this._lastUpdatedValues.size.set(this.size.width, this.size.height);

        NTEngine.scene.drawImage(this._texture, posX, posY, this.size.width, this.size.height);
    }

    unload()
    {
        super.unload();

        NTEngine.root.pushClearArea(new NTRect(this._lastUpdatedValues.position.x, this._lastUpdatedValues.position.y, this._lastUpdatedValues.size.width, this._lastUpdatedValues.size.height));
    }

}