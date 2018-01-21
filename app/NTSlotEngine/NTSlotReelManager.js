/**
 * Created by Nikhil Peter on 06-11-2017.
 */

class NTSlotReelManager extends NTContainer
{
    constructor()
    {
        super();

        this._anchorSymbol = null;
        this._rightSymbol = null;
        this._bottomSymbol = null;

        this._symbolSize = null;

        this.symbolData = [];

        this._reels = [];
    }

    setAnchorSymbol(x, y, width, height)
    {
        let point = this.toLocal(x, y);

        this._anchorSymbol = new NTRect(point.x, point.y, width, height);
    }

    setRightSymbol(x, y, width, height)
    {
        let point = this.toLocal(x, y);

        this._rightSymbol = new NTRect(point.x, point.y, width, height);
    }

    setBottomSymbol(x, y, width, height)
    {
        let point = this.toLocal(x, y);

        this._bottomSymbol = new NTRect(point.x, point.y, width, height);
    }

    setSymbolSize()
    {
        let width = this._rightSymbol.position.x - this._anchorSymbol.position.x;
        let height = this._anchorSymbol.position.y - this._bottomSymbol.position.y;

        this._symbolSize = new NTSize(width, height);
    }

    setReels(reelData)
    {
        for(let reel=0; reel<NTSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel] = new NTSlotReel();
            this._reels[reel].setReel(reelData[reel]);
            this._reels[reel].setSymbolHeight(this._anchorSymbol.size.height);
            this._reels[reel]._reelId = reel;
            this.addChild(this._reels[reel]);

            this.setReelPositions(reel);
        }
    }

    setReelPositions(reel)
    {
        let row = Math.floor(reel / NTSlotUtils.NUM_REELS);

        let xPos = this._anchorSymbol.position.x + (this._symbolSize.width * reel);
        let yPos = this._anchorSymbol.position.y - (this._symbolSize.height * row);
        this._reels[reel].setAnchorY(yPos);
        this._reels[reel].position.set(xPos, yPos);
    }

    setInitialState(result)
    {
        for(let reel=0; reel<NTSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].setInitialState(result);
        }
    }

    startSpin(result)
    {
        for(let reel=0; reel<NTSlotUtils.NUM_REELS; reel++)
        {
            this._reels[reel].reset();
            this._reels[reel].constructReel(result);

            this._reels[reel].startSpin();
        }
    }
}