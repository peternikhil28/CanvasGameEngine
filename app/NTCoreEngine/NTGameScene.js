/**
 * Created by Nikhil Peter on 03-11-2017.
 */

class NTGameScene extends NTContainer
{
    constructor()
    {
        super();

        this._canvas = null;
        this._scene = null;

        this._refreshAreaList = [];

        this.loadCanvas();
        this.loadContext();

        NTEngine.root = this;

        this.startRender();
    }

    loadCanvas()
    {
        this._canvas = document.createElement('canvas');
        this._canvas.width  = NTEngine.screenWidth;
        this._canvas.height = NTEngine.screenHeight;

        document.body.appendChild(this._canvas);

        this.onWindowResize();

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        NTEngine.canvas = this._canvas;
    }

    loadContext()
    {
        this._scene = this._canvas.getContext('2d');
        NTEngine.scene = this._scene;
    }

    onWindowResize()
    {
        let canvasWidth = 0 ,
            canvasHeight = 0;

        if(window.innerWidth > (NTEngine.screenWidth / NTEngine.screenHeight) * window.innerHeight)
        {
            canvasWidth = (NTEngine.screenWidth / NTEngine.screenHeight) * window.innerHeight;
            canvasHeight = window.innerHeight;
        }
        else
        {
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerWidth * (NTEngine.screenHeight / NTEngine.screenWidth);
        }

        this._canvas.style.width = canvasWidth + "px";
        this._canvas.style.height = canvasHeight + "px";
    }

    pushClearArea(rect)
    {
        this._refreshAreaList.push(rect);
    }

    getRefreshList()
    {
        return this._refreshAreaList;
    }

    update()
    {
        for(let i=0; i<this._refreshAreaList.length; i++)
            this._scene.clearRect(this._refreshAreaList[i].position.x, this._refreshAreaList[i].position.y, this._refreshAreaList[i].size.width, this._refreshAreaList[i].size.height);


        for(let i=0; i<this._children.length; i++)
                this._children[i].update();

        this._refreshAreaList.length = 0;
    }

    startRender()
    {
        NTEngine.listener.init();

        this.render();
    }

    render()
    {
        requestAnimationFrame(this.render.bind(this));

        NTTweener.update();

        for(let index=0; index<this._children.length; index++)
            this._children[index].render();

        if(this._refreshAreaList.length!==0)
            this.update();
    }
}