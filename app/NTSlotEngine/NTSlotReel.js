/**
 * Created by Nikhil Peter on 06-11-2017.
 */
let NTSlotSpinStates = {
    SPINNING : 0,
    REVERSING : 1,
    STOPPED : 2,
};

class NTSlotReel extends NTContainer
{
    constructor()
    {
        super();

        this._reelId = -1;
        this._reelLength = -1;

        this._anchorY = 0;
        this._symbolHeight = 0;

        this._reelSpinDuration = 0;
        this._finalY = 0;

        this._peakSymbolIndex = -1;
        this._prevPeakSymbolIndex = -1;

        this._reel = [];
        this._reelSymbols = [];
        this._reelAssets = [];
        this._spinState = NTSlotSpinStates.STOPPED;
    }

    setReel(reelData)
    {
        this._reel = reelData;
        this._reelLength = reelData.length;
    }

    setAnchorY(yPos)
    {
        this._anchorY = yPos;
    }

    setSymbolHeight(height)
    {
        this._symbolHeight = height;
    }

    setInitialState(result)
    {
        this._peakSymbolIndex = result.peakSymbolIndex[this._reelId];

        for(let row=1; row<=NTSlotUtils.NUM_ROWS; row++)
        {
            // No peak symbol for initial state
            let index = (this._peakSymbolIndex + row) % this._reelLength;
            this._reelSymbols.push(this._reel[index])
        }

        this.addSymbolsToReel();
    }

    constructReel(result)
    {
        this._prevPeakSymbolIndex = this._peakSymbolIndex;

        this._peakSymbolIndex = result.peakSymbolIndex[this._reelId];


        // -- Add current spin result and peak symbol --
        for(let row=0; row<=NTSlotUtils.NUM_ROWS; row++)
        {
            this.pushSymbolToReel(this._peakSymbolIndex + row);
        }


        // -- Add symbols in between --
        let length = this.calculateReelLength();
        for(let i=NTSlotUtils.NUM_ROWS+1; i<=length; i++)
        {
            this.pushSymbolToReel(this._peakSymbolIndex + i);
        }


        // -- Add previous spin result and peak symbol --
        for(let row=0; row<=NTSlotUtils.NUM_ROWS; row++)
        {
            this.pushSymbolToReel(this._prevPeakSymbolIndex + row);
        }

        this.addSymbolsToReel();

        this._finalY = this._anchorY - this._reelAssets[1].position.y;
    }

    calculateReelLength()
    {
        this._reelSpinDuration = NTSlotUtils.FIRST_REEL_SPIN_DURATION + (this._reelId * NTSlotUtils.OFFSET_REEL_SPIN_DURATION);
        let totalLength = (this._reelSpinDuration/1000) * NTSlotUtils.SYMBOLS_SPINNING_PER_SEC;

        return totalLength;
    }

    pushSymbolToReel(pos)
    {
        let index = (pos) % this._reelLength;
        this._reelSymbols.push(this._reel[index]);
    }

    addSymbolsToReel()
    {
        let initY = - (this._symbolHeight * (NTSlotUtils.NUM_ROWS - 1));

        for (let index=this._reelSymbols.length-1, count=0; index>=0; index--, count++)
        {
            let symbol = this._reelSymbols[index];

            let symbolAsset = NTSlotUtils.createSymbolAsset(symbol);

            let posY = initY - (count * this._symbolHeight);
            symbolAsset.position.y = posY;
            this.addChild(symbolAsset);

            this._reelAssets.unshift(symbolAsset);
        }
    }

    startSpin()
    {
        this._spinState = NTSlotSpinStates.SPINNING;

        this.updateReel(NTSlotSpinStates.SPINNING)
    }

    updateReel(spinState)
    {
        switch (spinState)
        {
            case NTSlotSpinStates.SPINNING :
                let reverseSpinDist = NTSlotUtils.REVERSE_SPIN_DISTANCE_FACTOR * this._symbolHeight;
                let reversePos = this._finalY + reverseSpinDist;
                this.actionMoveTo(this._reelSpinDuration, this.position.x, reversePos, this.updateReel.bind(this, NTSlotSpinStates.REVERSING));
                break;

            case NTSlotSpinStates.REVERSING :
                this.actionMoveTo(NTSlotUtils.REVERSE_SPIN_DURATION, this.position.x, this._finalY, this.updateReel.bind(this, NTSlotSpinStates.STOPPED));
                break;

            case NTSlotSpinStates.STOPPED :
                NTSlotUtils.MACHINE.onReelStopped(this._reelId);
                if(this._reelId == NTSlotUtils.NUM_REELS -1)
                {
                    NTSlotUtils.MACHINE.onSpinCompleted();
                }
                break;
        }
    }

    reset()
    {
        this.removeAllChildren();
        this._reelSymbols.length = 0;
        this._reelAssets.length = 0;

        this._finalY = 0;
        this.position.y = this._anchorY;
    }
}