/**
 * Created by Nikhil Peter on 08-11-2017.
 */

let express = require('express'),
    router = express.Router();

const NTEngine = require("../NTCoreEngine/NTEngine.js");

router.get('/getSpinResult', (req, res) => {

    let result = NTEngine.MACHINE.getSpinResult();

    res.status(200).json(result);
});

module.exports = router;