clientID = "clientID_" + Math.random().toString(16).substr(2, 8);

function mqtt_connect() {
    // Generate a random client ID
    // Initialize new Paho client connection
    url = document.getElementById("mqtt_server_id").value;
    port = document.getElementById("mqtt_port_id").value;
    username = document.getElementById("mqtt_username_id").value;
    psk = document.getElementById("mqtt_password_id").value;
    client = new Paho.MQTT.Client(url, parseInt(port), clientID);
    console.log(clientID)
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        useSSL: false,
        mqttVersion: 3,
        userName: username,
        password: psk,
        onSuccess: onConnect,
        onFailure: doFail
    });
}

function doFail(e) {
    console.log(e);
}


// Called when the client connects
function onConnect() {
    console.log('connected');
    showToast("mqtt connected");
    client.subscribe("dohoangminh");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    // alert('connect mqtt false')
    console.log('disconnected');
    showToast("mqtt disconnected");
}

// Called when a message arrives
function onMessageArrived(message) {
    console.log("clientID: " + clientID + "\nurl" + document.getElementById("mqtt_server_id").value +
        "\nmessage: " + message.payloadString);
    // console.log("clientID: " + message.payloadString);

}

// Called when the disconnection button is pressed
function mqtt_disconnect() {
    if (client) {
        client.disconnect();
    }
}