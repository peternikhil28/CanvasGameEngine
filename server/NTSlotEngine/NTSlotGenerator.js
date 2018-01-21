/**
 * Created by Nikhil Peter on 06-11-2017.
 */

'use strict';

const NTSlotUtils = require("./NTSlotUtils.js");

class NTSlotGenerator
{
    generate(result, reels)
    {
        for(let reel=0; reel<NTSlotUtils.NUM_REELS; reel++)
        {
            let reelData = reels[reel];
            let randIndex = Math.floor(Math.random() * (reelData.length - 1));

            result.peakSymbolIndex[reel] = randIndex;

            for(let row=0; row<NTSlotUtils.NUM_ROWS; row++)
            {
                let index = (randIndex + 1) + row;
                result.spinGenerated[reel + row * NTSlotUtils.NUM_REELS] = reelData[index % reelData.length];
            }
        }
    }
}

module.exports = NTSlotGenerator;