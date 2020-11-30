//lsof -n -i TCP:3003
//kill -9 74187


const { json } = require('body-parser');
var express = require('express');
const fs = require('fs');
var app = express();
var port = 3003;

app.listen(port, function () {
    console.log('Server is running on port:', port);
})

app.get('/', function (req, res) {
    fs.readFile('devices.json', (err, data) => {
        if (err) throw err;
        let _data = JSON.parse(data);
        res.send(_data);
    });
});

app.get('/update/:namefile', function (req, res) {
    var _filename = req.params['namefile']
    const file = `${__dirname}/` + _filename;
    res.download(file); // Set disposition and send it.
});


app.get('/weather/', function (req, res) {
    var obj;
    fs.readFile('input.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);

        obj.sortBy('name');

        res.send(obj)
        console.log(obj);
    });
});

Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}