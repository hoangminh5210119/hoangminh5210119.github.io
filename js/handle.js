function init() {

    // loadMQTTDashboard();
    // loadSensorDashboard();
    // loadHomeDashboard()
    loadSettingDashboard()
    // showIndicator("hello")
    // setTimeout(function () {
    //     hideIndicator()
    // }, 7000);
    // document.cookie = "username=do hoang minh";

    // console.log(document.cookie)

    mqtt_connect("broker.hivemq.com", 8000, "", "");
}


function showIndicator(text) {
    document.getElementById("indicator_id").style.display = "block";
    document.getElementById("indicator_label_id").style.display = "block";
    document.getElementById("indicator_label_id").innerText = text;
    document.getElementsByClassName('blur')[0].style.filter = "blur(2px)";
    document.getElementById("app").style.pointerEvents = "none";
}

function hideIndicator() {
    document.getElementById("indicator_id").style.display = "none";
    document.getElementById("indicator_label_id").style.display = "none";
    document.getElementsByClassName('blur')[0].style.filter = "blur(0px)";
    document.getElementById("app").style.pointerEvents = "auto";
}

function showToast(text) {
    var x = document.getElementById("toast");
    x.classList.add("show");
    x.innerHTML = text;
    setTimeout(function () {
        x.classList.remove("show");
    }, 3000);
}

function changeImageOnclick() {
    document.getElementById("preview_frame").style.display = "block";
    toDataURL(URL.createObjectURL(event.target.files[0]))
        .then(dataUrl => {
            preview_frame.src = dataUrl
        })
}

const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))


function readTextFile(file, callback) {
    var _file = "/file?name=" + file
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    // rawFile.saveFile()
    rawFile.open("GET", _file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function requestGET(url, data, callback) {
    request(url, "POST", data, function (res) {
        callback(res)
    })
}

function requestPOST(url, data, callback) {
    request(url, "POST", data, function (res) {
        callback(res)
    })
}

function requestDELETE(url, data, callback) {
    request(url, "DELETE", data, function (res) {
        callback(res)
    })
}

function request(url, method, body, callback) {
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        callback(res)
    });
}