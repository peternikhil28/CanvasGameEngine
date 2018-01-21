/**
 * Created by Nikhil Peter on 08-11-2017.
 */

let express = require('express'),
    router = express.Router();

const FruitSlotMachine = require("../src/fruitslot/FruitSlotMachine.js"),
      NTEngine = require("../NTCoreEngine/NTEngine");

router.get('/loadMachine', (req, res) => {

    let machineName = req.query.machineName;
    let assetPath = req.query.assetPath;

    let machine;

    switch (machineName)
    {
        case "FruitSlot" :
            machine = new FruitSlotMachine();
            break;
    }

    machine.loadSymbolDefinition(NTEngine.APP_ROOT_PATH + assetPath, (result)=>
    {
        res.status(200).json(result);
    });

    NTEngine.MACHINE = machine;
});

module.exports = router;