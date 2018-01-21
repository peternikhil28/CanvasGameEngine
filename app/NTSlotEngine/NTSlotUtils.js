/**
 * Created by Nikhil Peter on 06-11-2017.
 */

let NTSlotUtils ={
    NUM_REELS : -1,
    NUM_ROWS : -1,
    SYMBOL_WILD : -1,
    MIN_RECURRENCE_WIN : 3,

    FIRST_REEL_SPIN_DURATION : 2000 ,
    OFFSET_REEL_SPIN_DURATION : 200,
    SYMBOLS_SPINNING_PER_SEC : 10,
    REVERSE_SPIN_DISTANCE_FACTOR : 0.5,
    REVERSE_SPIN_DURATION : 200,

    MACHINE : null,

    createSymbolAsset: function(symbol)
    {
        let assetPath = NTSlotUtils.MACHINE.reelManager.symbolData[symbol].assetPath;
        let width = NTSlotUtils.MACHINE.reelManager.symbolData[symbol].width;
        let height = NTSlotUtils.MACHINE.reelManager.symbolData[symbol].height;

        let npObject = new NTSprite(width, height);
        npObject.setTexture(assetPath);
        return npObject;
    }
};