function loadChartDashboard(sensor_config) {
    var data = `
    <div class="w3-container w3-margin-top w3-margin-bottom center-no-border  w3-animate-zoom w3-card-2 w3-round-xlarge w3-zoom"
    style="max-width: 700px;">

    <p class="w3-center">DHT SENSOR</p>
    <p class="w3-margin w3-large w3-text-theme"><b><img
        src="https://img.icons8.com/color/48/000000/combo-chart.png" style="max-width: 30px;" /><u>
        chart</u></b></p>

    <canvas id="myChart" class="center w3-round-xlarge" style="max-width: 500px;"></canvas>

    <p class="w3-margin w3-large w3-text-theme"><b><img
                        src="https://img.icons8.com/color/48/000000/cloud-storage.png" style="max-width: 30px;" /><u>
                        sensor value</u></b></p>


    <div class="w3-center w3-container">
        <a class="w3-text-gray center-no-border"><img src="https://img.icons8.com/nolan/64/temperature.png"
                width="30px" /> value1</a>
        <a class="w3-text-gray center-no-border"><img src="https://img.icons8.com/fluent/48/000000/wet.png"
                width="30px" /> value2</a>
        <a class="w3-text-gray center-no-border"><img src="https://img.icons8.com/nolan/64/temperature.png"
                width="30px" /> value3</a>
        <a class="w3-text-gray center-no-border"><img src="https://img.icons8.com/fluent/48/000000/wet.png"
                width="30px" /> value4</a>
    </div>
        
    <div class="w3-container w3-margin">
        <p><img src="https://img.icons8.com/color/48/000000/story-time.png" width="30px" />
            <i id="time_sensor_id"> 12:22:06 12-10-2020</i>
        </p>
    </div>

    <div class="w3-center" style="width: 100%;" onclick="hideChart(1)">
                <img src="https://img.icons8.com/color/48/000000/collapse-arrow.png" /></div>

    </div>
    `

    document.getElementById("app").innerHTML = data
}

function createChart() {
    var ctx = document.getElementById('myChart');

    window.myLine = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Line 1',
                data: [5, 48, 66, 95],
                type: 'line',
                order: 2
            }, {
                label: 'Line 2',
                data: [],
                type: 'line',
                order: 1
            }],
            labels: [12, 55, 33, 45]
        }
    });
}

function updateChart(value) {
    if (window.myLine.config.data.datasets.length > 0) {
        var d = new Date();
        var h = d.getHours()
        var m = d.getMinutes()
        var s = d.getSeconds()
        t = h + ":" + m + ":" + s
        // console.log(t);
        window.myLine.config.data.labels.push(t);
        window.myLine.config.data.datasets.forEach(function (dataset) {
            dataset.data.push(Math.floor(Math.random() * 100));
            console.log(dataset.data)
        });

        if (window.myLine.config.data.datasets[0].data.length > 10) {

            window.myLine.config.data.labels.shift(); // remove the label first

            window.myLine.config.data.datasets.forEach(function (dataset) {
                dataset.data.shift()
            });
        }

        console.log("add new")
        window.myLine.update();
    }
}