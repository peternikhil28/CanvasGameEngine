/**
 * Created by Nikhil Peter on 07-11-2017.
 */

class NTLabel extends NTSprite
{
    constructor(font, fontSize, w, h)
    {
        super(w, h);

        this._font = font;
        this._fontSize = fontSize + "px";

        this._text = "";
    }

    setLabel(text)
    {
        this._text = text.toString();

        this._needsUpdate = true;
    }

    draw(offsetX, offsetY)
    {
        this._needsUpdate = false;

        let posX = offsetX + this.position.x - (this.anchor.x * this.size.width);
        let posY = offsetY + this.position.y - (this.anchor.y * this.size.height);

        this._lastUpdatedValues.position.set(posX, posY);
        this._lastUpdatedValues.size.set(this.size.width, this.size.height);

        NTEngine.scene.font = this._fontSize + " " + this._font;
        NTEngine.scene.textAlign = "center";
        NTEngine.scene.textBaseline='middle';
        NTEngine.scene.fillText(this._text, offsetX + this.position.x, offsetY + this.position.y);
    }
}