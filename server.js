/**
 * Created by Nikhil Peter on 03-11-2017.
 */

let express = require("express"),
    app = express(),
    PORT = 8081;

app.use('/api', require('./server/api/LoadMachine'));

app.use('/api', require('./server/api/GetSpinResult'));

app.use('/', express.static(__dirname+'/app'));

app.listen(PORT, () =>{
    console.log('Server Started on PORT : ' + PORT);
});