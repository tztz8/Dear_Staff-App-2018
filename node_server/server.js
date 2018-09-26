console.log("Server is starting");

//var tempKey = "Wmh2w3M7vTi34mkbNiNDZSKOsKZfr9GJ";
//var tempKey = "W!IOmA90w8fa9H8Zmgp@7Elpy&0sV@$z";

var fs = require('fs');
var list = JSON.parse(fs.readFileSync("./json/list.json"));
var keys = JSON.parse(fs.readFileSync("../Keys/api_keys.json"));
console.log("Start File Done");

var express = require('express');
var app = express();
console.log("Load Express Done");

var port = 3000;
if (true) {
  var https = require('https');
  var options = {
      key: fs.readFileSync('../Keys/sever.key').toString(),
      cert: fs.readFileSync('../Keys/certificate.crt').toString()
  };
  var server = https.createServer(options, app).listen(port);
  var helmet = require('helmet');
  app.use(helmet());
  console.log("Set Https Up");
}else {
  var server = app.listen(port);
}
console.log("listening on " + port);

app.use(express.static("public_page"));
app.use(express.json());

app.get('/list/get', sendListJSON);
function sendListJSON(request, response) {
  response.send(list);
}

app.post('/list/add', function (request, response) {
  var sendData = { meg: "", bad: "", good: "" , work: "no"};
  var dataIn = request.body;
  var keyPass = testKey(dataIn.name, dataIn.key);
  sendData.bad = dataIn.badItme;
  sendData.good = dataIn.goodItme;
  if(keyPass){
    sendData.meg = "Access Granted";
    list.push([sendData.bad, sendData.good]);
    fs.writeFile('./json/list.json', JSON.stringify(list, null, 2), fileDone);
    function fileDone(err) {
      if(err != null){
        console.log(err);
        sendData.work = ("no, err:" + err);
      }else {
        sendData.work = "yes";
      }
      response.send(sendData);
    }
  }else {
    sendData.meg = "Access Denied";
    console.log("Wrong Key retive, Key:" + dataIn.key);
    response.send(sendData);
  }/*
  console.log(request.body);
  var reply = {msg: "not done"}
  response.send(reply);*/
});

app.post('/list/remove', function (request, response) {
  var sendData = { meg: "", bad: "", good: "" , work: ""};
  var dataIn = request.body;
  var keyPass = testKey(dataIn.name, dataIn.key);
  sendData.bad = dataIn.badItme;
  sendData.good = dataIn.goodItme;
  if(keyPass){
    sendData.meg = "Access Granted";

    if (!(sendData.bad == "")){
      for(var i = 0; i < list.length; i++){
        if(list[i][0] == sendData.bad){
          sendData.work = "no, not Done";
        }
      }
      if(sendData.work == ""){
        sendData.work = "no, not found";
      }
    }else if (!(sendData.good == "")) {
      for(var i = 0; i < list.length; i++){
        if(list[i][1] == sendData.good){
          sendData.work = "no, not Done";
        }
      }
      if(sendData.work == ""){
        sendData.work = "no, not found";
      }
    }else {
      sendData.work = "no, no item was sent to be remove";
    }
    if (sendData.work == ""){
      fs.writeFile('./json/list.json', JSON.stringify(list, null, 2), function (err) {
        if(err != null){
          console.log(err);
          sendData.work = ("no, err:" + err);
        }else {
          sendData.work = "yes";
        }
      });
    }
  }else {
    sendData.meg = "Access Denied";
    sendData.work = "no";
    console.log("Wrong Key retive, Key:" + dataIn.key);
  }
  response.send(sendData);
});

app.post("/api", function (request, response) {
  var sendData = { meg: "", key: ""}
  sendData.key = request.body.key;
  if(testKey("temp", sendData.key)){
    sendData.meg = "Access Granted";
  }else {
    sendData.meg = "Access Denied";
  }
  response.send(sendData);
});

function testKey(name, key) {
  if((key == keys.tempKey)&(name == "temp")){
    return true;
  }else {
    for (var i = 0; i < keys.Users.length; i++) {
      if((name == keys.Users[i].Name)&(key == keys.Users[i].apiKey)){
        return true;
      }
    }
    return false;
  }
}

/*app.get('/list/:api_key', sendList);

function sendList(request, response) {
  var api_key = request.params;
  response.send("list is not avaible yet, Key sent is:" + api_key.api_key);
}
*/

// OLD
/*
var list = loadJSON("./json/list.json");
console.log(list);

var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("Hello World!");
}).listen(8080);
*/
