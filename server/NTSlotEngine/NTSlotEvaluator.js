/**
 * Created by Nikhil Peter on 06-11-2017.
 */

'use strict';

const NTSlotUtils = require("./NTSlotUtils.js");

class NTSlotEvaluator
{
    constructor()
    {
        this.result = {};
        this.slotLines = [];

        this.result.peakSymbolIndex = [];
        this.result.spinGenerated = [];
        this.result.winDetails = [];
    }

    reset()
    {
        this.result.peakSymbolIndex.length = 0;
        this.result.spinGenerated.length = 0;
        this.result.winDetails.length = 0;
    }

    evaluate()
    {
        for(let num=0; num<this.slotLines.length; num++)
        {
            let line = this.slotLines[num];
            let spinGenerated = this.result.spinGenerated;

            let numRecurrence = 0;

            let winSymbol, col = 0;

            do
            {
                winSymbol = spinGenerated[line[col]];
                col++;
            }while(winSymbol===NTSlotUtils.SYMBOL_WILD && col < NTSlotUtils.NUM_REELS);

            numRecurrence = col;

            if(winSymbol!==NTSlotUtils.SYMBOL_WILD)
            {
                for(let index=col; index<line.length; index++)
                {
                    if(winSymbol === spinGenerated[line[index]] || spinGenerated[line[index]] === NTSlotUtils.SYMBOL_WILD)
                        numRecurrence++;
                    else
                        break;
                }
            }

            if(numRecurrence >= NTSlotUtils.MIN_RECURRENCE_WIN)
            {
                let winResult = {};
                winResult.line = line;
                winResult.winSymbol = winSymbol;
                winResult.numRecurrence = numRecurrence;
                this.result.winDetails.push(winResult);
            }
        }
    }
}

module.exports = NTSlotEvaluator;