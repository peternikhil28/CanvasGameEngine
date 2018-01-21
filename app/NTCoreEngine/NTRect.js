/**
 * Created by Nikhil Peter on 06-11-2017.
 */

class NTRect
{
    constructor(x, y, w, h)
    {
        this.position = new NTPoint(x, y);
        this.size = new NTSize(w, h);
    }
}