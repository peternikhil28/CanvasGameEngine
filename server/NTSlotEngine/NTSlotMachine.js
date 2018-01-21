/**
 * Created by Nikhil Peter on 07-11-2017.
 */

'use strict';

const NTSlotGenerator = require("./NTSlotGenerator.js"),
      NTSlotEvaluator = require("./NTSlotEvaluator.js"),
      NTSlotUtils = require("./NTSlotUtils.js"),
      NTUtils = require("..//NTCoreEngine/NTUtils.js");

class NTSlotMachine
{
    constructor()
    {
        this._generator = null;
        this._evaluator = null;

        this.initSlotParams();

        this.loadGenerator();
        this.loadEvaluator();
    }

    initSlotParams()
    {
        NTSlotUtils.NUM_REELS = 3;
        NTSlotUtils.NUM_ROWS = 1;
        NTSlotUtils.SYMBOL_WILD = 0;
        NTSlotUtils.MIN_RECURRENCE_WIN = 2;
    }

    loadGenerator()
    {
        this._generator = new NTSlotGenerator();
    }

    loadEvaluator()
    {
        this._evaluator = new NTSlotEvaluator();
    }

    loadSymbolDefinition(assetPath, callBack)
    {
        let self = this;
        NTUtils.loadJSON(assetPath + 'SymbolDefinition.json', (inData)=>
        {
            self.onDataLoaded(inData);
            callBack(self._evaluator.result);
        });
    }

    onDataLoaded(inData)
    {
        let data = JSON.parse(inData);
        this._machineData = data;

        this._evaluator.slotLines = data.lines;

        this.setInitialState();
    }

    setInitialState()
    {
        this.generate();
    }

    generate()
    {
        this._generator.generate(this._evaluator.result, this._machineData.reels);
    }

    evaluate()
    {
        this._evaluator.evaluate();
    }

    getSpinResult()
    {
        this.reset();

        this.generate();
        this.evaluate();

        return this._evaluator.result;
    }

    reset()
    {
        this._evaluator.reset();
    }
}

module.exports = NTSlotMachine;