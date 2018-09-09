
var mqtt;
var reconnectTimeout = 2000;
var host = "192.168.0.27"; //change this
var port = 9001;
var timeoutHaignere
var timeoutCreaspace
var timeoutBecquerel
		
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    document.getElementById("status").innerHTML = "Connected";
	console.log("Connected ");
    mqtt.subscribe("application/1/device/00250c0100001157/rx"); /*ROOM_1*/
	mqtt.subscribe("application/1/device/00250c0100001159/rx"); /*ROOM_2*/
    mqtt.subscribe("application/1/device/00250c0100001122/rx"); /*ROOM_3*/
    mqtt.subscribe("application/1/device/00250c0100001137/rx"); /*ROOM_4*/
    mqtt.subscribe("application/1/device/00250c0100001319/rx"); /*Grafana*/
    mqtt.subscribe("application/1/device/00250c0100001199/rx"); /*ROOM_5*/
    mqtt.subscribe("application/1/device/00250c0100001188/rx"); /*Wizzilab*/
    mqtt.subscribe("application/1/device/00250C01000011b1/rx"); /*UveGotMail*/
    //Pierre mqtt.subscribe("application/1/device/00250c010000132D/rx");
    //mqtt.subscribe("application/1/device/#");
	//mqtt.subscribe("gateway/008000000000ace0/stats");
	//mqtt.subscribe("sensor1");
	//message = new Paho.MQTT.Message("Hello World");
	//message.destinationName = "sensor1";
	//mqtt.send(message);
  }

function MQTTconnect() {
    console.log("connecting to "+ host +" "+ port);
    mqtt = new Paho.MQTT.Client(host,port,"clientjs");
    //document.write("connecting to "+ host);
    
    var that = this;
    
    var sslOption = true;
    if(host == "192.168.0.27") {
      sslOption = false;
    }
    
	var options = {
        timeout: 3,
        //userName: this.getToken(),
        userName:"clientjs",
        password: "clientjs",
        useSSL: sslOption,
        keepAliveInterval: 3600,
        onSuccess: onConnect,
        onFailure: onFailure, 
    };
		 
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options); //connect
    
}
	
function onFailure(message) {
    console.log("Connection attempt to host"+host+"Failed");
    setTimeout(MQTTconnect, reconnectTimeout);
}
	
function onMessageArrived(r_message){
    
    var topic = r_message.destinationName;
    var payload = r_message.payloadString;
    var message = topic.split('/');
    var device = message[3];
    //var state = message[2];
    var timestamp = Math.round((new Date()).getTime() / 1000);
            switch (device) {
                case '00250c0100001159':
                    clearInterval(timeoutCreaspace); /*ROOM_2 */
                    console.log(device);
                    timeoutCreaspace = setInterval(myTimeoutCreaspace, 120000);
                    var elmt = document.getElementById("creaspace");
                
                    elmt.style.backgroundColor = "#e9001b";
                    
                    break;
                    
                case '00250c0100001137': /* ROOM_4 */
                    clearInterval(timeoutCreaspace);
                    console.log(device);
                    timeoutCreaspace = setInterval(myTimeoutCreaspace, 120000);
                    var elmt = document.getElementById("creaspace");
                    
                    elmt.style.backgroundColor = "#e9001b";
                    
                    break;
                    
                 case '00250c0100001122': /* ROOM_3 */
                    clearInterval(timeoutCreaspace);
                    console.log(device);
                    timeoutCreaspace = setInterval(myTimeoutCreaspace, 120000);
                    var elmt = document.getElementById("creaspace");
                    
                    elmt.style.backgroundColor = "#e9001b";
                    
                    break;
                    
                 case '00250c0100001199': /* ROOM_5 */
                    clearInterval(timeoutBecquerel);
                    console.log(device);
                    timeoutBecquerel = setInterval(myTimeoutBecquerel, 120000);
                    var elmt = document.getElementById("becquerel");
                    
                    elmt.style.backgroundColor = "#e9001b";
                    
                    break;
                    
                 case '00250c0100001157': /* ROOM_1 */
                    clearInterval(timeoutHaignere);
                    console.log(device);
                    timeoutHaignere = setInterval(myTimeoutHaignere, 120000);
                    var elmt = document.getElementById("haigneré");
                    
                    elmt.style.backgroundColor = "#e9001b";
                    
                    break;
                    
                 case '00250c0100001188': /* WIZZILAB */
                    clearInterval(timeoutHaignere);
                    console.log(device);
                    timeoutHaignere = setInterval(myTimeoutHaignere, 120000);
                    var elmt = document.getElementById("haigneré");
                    
                    elmt.style.backgroundColor = "#e9001b";
                    
                    break;
                    default: console.log('Error: Data do not match the MQTT topic.'); 
                    break;
            }
    
    //console.log(timestamp);
    out_msg="Message received "+r_message.payloadString+"<br>";
    out_msg=out_msg+"Message received Topic "+r_message.destinationName;
    //console.log("Message received ",r_message.payloadString);
    document.getElementById("messages").innerHTML =out_msg;
        
}

function myTimeoutCreaspace() {
    
    var myCreaspace = document.getElementById("creaspace");
    
    myCreaspace.style.backgroundColor = "#7dbc00";
    clearInterval(timeoutCreaspace);
}
    
function myTimeoutHaignere() {
    
    var myHaignere = document.getElementById("haigneré");
    
    myHaignere.style.backgroundColor = "#7dbc00";
    clearInterval(timeoutHaignere);
    
}

function myTimeoutBecquerel() {
    
    var myBecquerel = document.getElementById("becquerel");
    
    myBecquerel.style.backgroundColor = "#7dbc00";
    clearInterval(timeoutBecquerel);
}
