const morgan = require("morgan");
const bodyParser = require("body-parser");
// const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
var mqtt = require('mqtt')
const fs = require('fs');



// var firebase = require('./fireBase')
// console.log(firebase.getName())
// firebase.data()

// var firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/firestore");

// var options = {
//     clientId: 'cdttech_tester' + Math.random().toString(16).substr(2, 8),
//     username: "",
//     password: "",
//     servers: [{
//         host: "broker.hivemq.com",
//         port: "1883",
//         protocol: "mqtt"
//     }],
//     clean: true,
//     keepalive: 30,
//     reconnect: true,
//     reconnectInterval: 100,
//     reconnectPeriod: 1000
// };

// var client = mqtt.connect(options)
// mqttSetup()

app.use(morgan("dev"));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', router);
app.listen(process.env.port || 8000);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use((req, res) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: "false",
        message: error.message
    });
});

router.get('/', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/index.html'));
});
router.get('/js/fireBase.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/fireBase.js'));
});

router.get('/js/mqtt.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/mqtt.js'));
});

router.get('/js/chartDashboard.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/chartDashboard.js'));
});

router.get('/js/sensorDashboard.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/sensorDashboard.js'));
});

router.get('/js/handle.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/handle.js'));
});

router.get('/js/mqttSettingDashboard.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/mqttSettingDashboard.js'));
});

router.get('/js/homeDashboard.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/homeDashboard.js'));
});

router.get('/js/settingsDashboard.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/settingsDashboard.js'));
});

router.get('/js/fireBase.js', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/js/fireBase.js'));
});

router.get('/css/styles.css', function (req, res) {
    console.log("get path: " + req.path);
    res.sendFile(path.join(__dirname + '/css/styles.css'));
});


router.get('/file', function (req, res) {
    // console.log("read file");
    let namefile = req.query.name
    console.log("load file: " + namefile);
    let _path = __dirname + '/' + namefile
    try {
        if (fs.existsSync(_path)) {
            res.sendFile(path.join(__dirname + '/' + namefile));
        } else {
            res.json({
                status: false
            });
        }
    } catch (err) {
        console.error(err)
        res.json({
            status: false,
            error: err
        });
    }
});

router.use('/userconfig', function (req, res) {

    let image_base64 = req.body.coverimage
    let name = req.body.name
    let title1 = req.body.title1
    let title2 = req.body.title2
    let title3 = req.body.title3

    let img_name = name + '.txt'
    let data = {
        imageURL: img_name,
        name: name,
        title1: title1,
        title2: title2,
        title3: title3
    }
    saveFile(img_name, image_base64);
    saveFile('userconfig.json', JSON.stringify(data));
    res.json({
        status: "ok"
    });
})

router.use('/mqtt', function (req, res) {

    console.log(req.path);

    if (req.path === "/disconnect") {
        // client.end(true);
        var json = {
            status: "ok",
            mqttconnected: client.connected,
            url: client.options.host
        }
        // res.json(json);
        console.log(json)
    } else if (req.path === "/connect") {
        let url = req.body.url;
        let port = req.body.port;
        let username = req.body.username;
        let psk = req.body.psk;
        console.log(url);
        console.log(port);
        console.log(username);
        console.log(psk);

        if (client.connected) {
            client.end(true);
        }

        var options = {
            clientId: 'cdttech_tester' + Math.random().toString(16).substr(2, 8),
            username: username,
            password: psk,
            servers: [{
                host: url,
                port: port,
                protocol: "mqtt"
            }],
            clean: true,
            keepalive: 30,
            reconnect: true,
            reconnectInterval: 100,
            reconnectPeriod: 1000
        };
        saveFile('options.json', JSON.stringify(options));
        console.log(options);

        setTimeout(() => {
            client = new mqtt.connect(options);
            mqttSetup()
        }, 1000)

        setTimeout(() => {
            res.json({
                status: client.connected
            });
        }, 3000);
    }
});

function mqttSetup() {
    client.on('connect', function () {
        client.subscribe('channels/d57a15ba-7f43-44bf-aa76-16deaf97c3d2/messages/#', function (err) {
            if (!err) {
                client.publish('channels/d57a15ba-7f43-44bf-aa76-16deaf97c3d2/messages/dhm', client.options.host)
            }
        })
    })

    client.on('message', function (topic, message) {
        // message is Buffer
        console.log("topic: " + topic);
        console.log("message: " + message.toString())
    })

    client.on("error", function (error) {
        console.log("Can't connect" + error);
        process.exit(1)
    });
}

function saveFile(file, data) {
    let _data = JSON.stringify(data);
    fs.writeFile(file, data, function (err) {
        if (err) throw err;
        console.log('complete');
    });
}