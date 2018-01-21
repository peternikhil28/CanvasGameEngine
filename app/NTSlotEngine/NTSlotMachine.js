/**
 * Created by Nikhil Peter on 06-11-2017.
 */

class NTSlotMachine extends NTGameScreen
{
    constructor(assetPath, layoutName)
    {
        super(assetPath, layoutName);

        this.reelManager = null;

        this._machineData = null;

        this.initSlotParams();

        this.loadReelManager();
    }

    initSlotParams()
    {
        NTSlotUtils.NUM_REELS = 3;
        NTSlotUtils.NUM_ROWS = 1;
        NTSlotUtils.SYMBOL_WILD = 0;
        NTSlotUtils.MACHINE = this;
    }

    loadReelManager()
    {
        this.reelManager = new NTSlotReelManager();
    }

    createCustomObject(objectData)
    {
        switch (objectData.name)
        {
            case "MachineHolder":
                this.reelManager.position.set(objectData.x, objectData.y);
                this.reelManager.size.set(objectData.w, objectData.h);
                this.reelManager.setClippingEnabled(true);
                this.addChild(this.reelManager);
                break;

            case "Icon00":
                this.reelManager.setAnchorSymbol(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "Icon01":
                this.reelManager.setRightSymbol(objectData.x, objectData.y, objectData.w, objectData.h);
                break;

            case "Icon10":
                this.reelManager.setBottomSymbol(objectData.x, objectData.y, objectData.w, objectData.h);
                break;
        }
    }

    onObjectCreated(object, objectData)
    {
        switch(objectData.name)
        {
            case "button":
                this._spinButton = object;
                break;
        }
    }

    onLayoutComplete()
    {
        this.reelManager.setSymbolSize();

        this.loadSymbolDefinition();
    }

    loadSymbolDefinition()
    {
        NTUtils.loadJSON(this._assetPath + 'SymbolDefinition.json', this.onDataLoaded.bind(this));
    }

    onDataLoaded(inData)
    {
        let data = JSON.parse(inData);
        this._machineData = data;

        let symbols = data.symbols;

        for(let i=0; i<symbols.length; i++)
        {
            let symbolData = {};
            let id = symbols[i].id;

            symbolData.assetPath = this._assetPath + symbols[i].assetName;
            symbolData.width = symbols[i].w;
            symbolData.height = symbols[i].h;

            this.reelManager.symbolData[id] = symbolData;
        }

        this.reelManager.setReels(data.reels);


        let params = {};
        params.machineName = data.machineName;
        params.assetPath = this._assetPath;
        
        params = NTEngine.server.formatParams(params);
        NTEngine.server.getRequest("api/loadMachine" + params, this.machineLoadedOnServer.bind(this));
    }

    machineLoadedOnServer(result)
    {
        this._result = JSON.parse(result);

        this.setInitialState();

        NTEngine.screenManager.reveal(this);
    }

    setInitialState()
    {
        this.reelManager.setInitialState(this._result);
    }


    onButtonClicked(target)
    {
        switch(target.getName())
        {
            case "button":
                this.spinButtonClicked();
                break;
        }
    }

    spinButtonClicked()
    {
        this._spinButton.setTouchEnabled(false);

        this.reset();

        NTEngine.server.getRequest("api/getSpinResult", this.spinResultResponse.bind(this));
    }

    spinResultResponse(result)
    {
        this._result = JSON.parse(result);

        this.reelManager.startSpin(this._result);
    }

    onReelStopped(reelId)
    {

    }

    onSpinCompleted()
    {
        this._spinButton.setTouchEnabled(true);
    }

    reset()
    {

    }
}