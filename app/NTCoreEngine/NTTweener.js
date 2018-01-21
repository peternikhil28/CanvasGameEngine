/**
 * Created by Nikhil Peter on 04-11-2017.
 */
let NTTweener = null;

NTTweener = NTTweener || (()=>
{
    let _tweenId = 0;
    let _tweens = {};

    return {
        update()
        {
            let currentTime = new Date().getTime();

            let tweenIds = Object.keys(_tweens);

            for(let index=0; index<tweenIds.length; index++)
            {
                let completed = _tweens[tweenIds[index]].update(currentTime);

                if(completed)
                    delete _tweens[tweenIds[index]]
            }
        },

        add(tween)
        {
            _tweens[tween.getId()] = tween;
        },

        remove(tween)
        {
            delete _tweens[tween.getId()];
        },

        getTweenId()
        {
            return _tweenId++;
        }
    };
})();

NTTweener.Tween = function(object)
{
    this._object = object;
    this._startValues = {};
    this._endValues = {};

    this._duration = 1000;

    this._startTime = null;

    this._onUpdateCallBack = null;
    this._onCompleteCallBack = null;

    this._tweenId = NTTweener.getTweenId();
};

NTTweener.Tween.prototype = Object.assign(Object.create(Object.prototype),
{
    to(endObject, duration)
    {
        this._endValues = endObject;
        this._duration = duration;
    },

    onUpdate(callback)
    {
        this._onUpdateCallBack = callback;
    },

    onComplete(callback)
    {
        this._onCompleteCallBack = callback;
    },

    start()
    {
        this._startTime = new Date().getTime();

        this._startValues = NTUtils.cloneObject(this._object);

        NTTweener.add(this);
    },

    getId()
    {
        return this._tweenId;
    },

    update(currentTime)
    {
        let progress = (currentTime - this._startTime)/this._duration;
        progress = progress>1 ? 1 : progress;

        for(let key in this._endValues)
        {
            let start = this._startValues[key];
            let end = this._endValues[key];

            this._object[key] = start + (end - start) * progress;
        }

        if (this._onUpdateCallBack !== null) {
            this._onUpdateCallBack(this._object);
        }

        let completed = progress == 1 ? true : false;

        if(completed)
        {
            if (this._onCompleteCallBack !== null) {
                this._onCompleteCallBack.call();
            }
        }

        return completed;
    }
});
