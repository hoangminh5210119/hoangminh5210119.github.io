function loadMQTTDashboard() {

    data = `
        <div class="w3-container w3-card-2 w3-round-large w3-animate-zoom center" id="mqtt_container_id"
                style="max-width: 500px;">
            <form class="w3-container ">

                <div class="w3-container w3-margin">
                    <h3 class="w3-center"> MQTT Config </h3>
                </div>
                <br>

                <p>
                    <label class="w3-left">URL</label>
                    <input class="w3-input w3-animate-bottom w3-hover-text-indigo" id="mqtt_server_id" required
                        placeholder="broker.hivemq.com" type="text" value="broker.hivemq.com"></p>
                <p>
                    <label class="w3-left">PORT</label>
                    <input class="w3-input w3-animate-left w3-hover-text-indigo" id="mqtt_port_id" required
                        placeholder="1883" type="number" value="8000"></p>
                <p>
                    <label class="w3-left">USER NAME</label>
                    <input class="w3-input w3-animate-bottom w3-hover-text-indigo" id="mqtt_username_id"
                        placeholder="username" type="text">
                </p>
                <p>
                    <label class="w3-left">PASSWORD</label>
                    <input class="w3-input w3-animate-left w3-hover-text-indigo" id="mqtt_password_id"
                        placeholder="password" type="text"></p>

                <div class="w3-containe w3-center">
                    <input class="w3-btn w3-red w3-round-large w3-margin" onclick="mqtt_disconnect()" type="button"
                        value="disconnect">
                    <input class="w3-btn w3-black w3-round-large w3-margin" onclick="mqttConnect()" type="button"
                        value="connect">
                </div>
            </form>
        </div> 
    
    `
    document.getElementById("app").innerHTML = data
}