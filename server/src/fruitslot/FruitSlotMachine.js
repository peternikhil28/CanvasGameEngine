/**
 * Created by Nikhil Peter on 08-11-2017.
 */

'use strict';

const NTSlotMachine = require("../../NTSlotEngine/NTSlotMachine.js"),
      NTUtils = require("../../NTCoreEngine/NTUtils.js");

class FruitSlotMachine extends NTSlotMachine
{
    getSpinResult()
    {
        let result = super.getSpinResult();

        let bonus = NTUtils.getRandomInt(0,1) == 0 ? false : true;

        result.bonus = bonus;

        return result;
    }
}

module.exports = FruitSlotMachine;