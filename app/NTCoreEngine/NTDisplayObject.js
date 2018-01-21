/**
 * Created by Nikhil Peter on 04-11-2017.
 */

class NTDisplayObject
{
    constructor()
    {
        this.userData = {};

        this.anchor = new NTPoint(0.5, 0.5);
        this.position = new NTPoint();
        this.size = new NTSize();
    }

    update()
    {

    }

    actionMoveTo(duration, x, y, callback)
    {
        let current = {x : this.position.x, y : this.position.y};
        let target = {x : x, y : y};

        let self = this;
        let action = new NTTweener.Tween(current);
        action.to(target, duration);
        action.onUpdate(()=>
        {
            self.position.set(current.x, current.y);
        });
        action.onComplete(callback);
        action.start();
    }

    render()
    {

    }

    unload()
    {
        this.userData = null;
    }
}
