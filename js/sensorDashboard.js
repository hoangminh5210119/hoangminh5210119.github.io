var sensor_data = [{
    name: "dht",
    photo: "https://dotobjyajpegd.cloudfront.net/photo/5d5150b0df04120cc46c5e23",
    id: 1,
    setting: [{
        name: "temp",
        image: "https://img.icons8.com/nolan/64/temperature.png",
        value: 55,
        unit: "°C"
    }, {
        name: "hum",
        image: "https://img.icons8.com/fluent/48/000000/wet.png",
        value: 32,
        unit: "%"
    }]
}, {
    name: "dht",
    photo: "https://dotobjyajpegd.cloudfront.net/photo/5d5150b0df04120cc46c5e23",
    id: 1,
    setting: [{
        name: "temp",
        image: "https://img.icons8.com/nolan/64/temperature.png",
        value: 55,
        unit: "°C"
    }, {
        name: "hum",
        image: "https://img.icons8.com/fluent/48/000000/wet.png",
        value: 32,
        unit: "%"
    }]
}, {
    name: "dht1",
    photo: "https://dotobjyajpegd.cloudfront.net/photo/5d5150b0df04120cc46c5e23",
    id: 2,
    setting: [{
        name: "temp",
        image: "https://img.icons8.com/nolan/64/temperature.png",
        value: 44,
        unit: "°C"
    }, {
        name: "hum",
        image: "https://img.icons8.com/fluent/48/000000/wet.png",
        value: 535,
        unit: "%"
    }, {
        name: "hum2",
        image: "https://img.icons8.com/fluent/48/000000/wet.png",
        value: 515,
        unit: "%"
    }, {
        name: "hum2",
        image: "https://img.icons8.com/fluent/48/000000/wet.png",
        value: 515,
        unit: "%"
    }]
}]

function onSensorSetting(value) {
    console.log("onSensorSetting: " + value)
}

function selecThisSensorSwitch(value, sensor_id) {
    console.log("selecThisSensorSwitch: " + value + ", id: " + sensor_id)
}

function expandChartData(sensor_id) {
    console.log("expandChartData: " + sensor_id)

}

function drawSettingSensorValue(setting) {
    console.log(setting.value)

    return `
    <a class="w3-text-gray center-no-border"><img src="${setting.image}"
                    width="25px" /> ${setting.value} ${setting.unit}</a>
    `
}

function drawSensor(sensor) {
    return `
    <div class="w3-container w3-quarter w3-card-2 w3-margin-top w3-zoom w3-round-xlarge w3-margin-right w3-margin-bottom w3-animate-zoom"
        style="min-width: 270px;">
        <H4 id="sensor_name_id" onclick="onSensorSetting(${sensor.id})" class="w3-center w3-text-gray"><u>${sensor.name}</u></H4>

        <div class="w3-container w3-margin-bottom w3-display-container">
            <img class="w3-left w3-round-large"
                src="${sensor.photo}" width="35%">
            <div class="w3-right switch w3-display-hover w3-animate-zoom">
                <label class="w3-margin-top switch">
                    <input type="checkbox" onchange="selecThisSensorSwitch(this.checked, ${sensor.id})">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>

        <p class="w3-margin w3-large w3-text-theme"><b><i
                    class="fa fa-gears fa-fw w3-margin-right w3-text-teal"></i><u>setup
                    info</u></b></p>
        <div class="w3-container w3-center">
        ${sensor.setting.map(drawSettingSensorValue).join("")}
        </div>
        
        <div class="w3-center" style="width: 100%;" onclick="expandChartData(${sensor.id})">
        <img src="https://img.icons8.com/fluent/48/000000/expand-arrow.png" height="20px" /></div>
    </div> 
    `;
}

function loadSensorDashboard() {
    showIndicator("load sensor")
    var data = `
    <div id="sensor_container_id" class="w3-container center-no-border" style="max-width: 900px;">
    ${sensor_data.map(drawSensor).join("")}
    </div> 
  `;
    document.getElementById("app").innerHTML = data
    setTimeout(function () {
        hideIndicator()
    }, 200);
    // hideIndicator()
}