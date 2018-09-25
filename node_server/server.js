console.log("Server is starting");

//var tempKey = "Wmh2w3M7vTi34mkbNiNDZSKOsKZfr9GJ";
//var tempKey = "W!IOmA90w8fa9H8Zmgp@7Elpy&0sV@$z";

var fs = require('fs');
var list = JSON.parse(fs.readFileSync("./json/list.json"));
var keys = JSON.parse(fs.readFileSync("../Keys/api_keys.json"));
console.log("Start File Done");

var express = require('express');
var app = express();

var server = app.listen(3000, function () {
  console.log("listening. . . ");
});
app.use(express.static("public_page"));
app.use(express.json());

app.get('/list/get', sendListJSON);
function sendListJSON(request, response) {
  response.send(list);
}

app.post('/list/add', function (request, response) {
  var sendData = { meg: "", bad: "", good: "" , work: "no"};
  var dataIn = request.body;
  var keyPass = testKey(dataIn.key);
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

app.post("/api", function (request, response) {
  var sendData = { meg: "", key: ""}
  sendData.key = request.body.key;
  if(testKey(sendData.key)){
    sendData.meg = "Access Granted";
  }else {
    sendData.meg = "Access Denied";
  }
  response.send(sendData);
});

function testKey(key) {
  if(key == keys.tempKey){
    return true;
  }else{
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
