/**
 * Created by Nikhil Peter on 08-11-2017.
 */

NTUtils = {

    loadJSON(path, callback)
    {
        let fs = require('fs');
        fs.readFile(path, function (err, data) {
            if (err) throw err;
                callback(data);
        });
    },

    getRandomInt(min, max) // min and max  included
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
};

module.exports = NTUtils;