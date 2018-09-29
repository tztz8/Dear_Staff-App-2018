superLog("Server is starting");

var fs = require('fs'); // lib to get file
var list = JSON.parse(fs.readFileSync("./json/list.json")); // geting the list file
var keys = JSON.parse(fs.readFileSync("../Keys/api_keys.json")); // geting the users keys
superLog("List and Users Files Done");

var express = require('express');// lib for web interfacing
var app = express(); // loading express Lib
var cors = require('cors');
app.use(cors());
superLog("Load Express and CORS Done");

var port = 3000; // seting the port number one not over and over
if (true) { // if be https or http
  var https = require('https'); // lib for https
  var options = {
      key: fs.readFileSync('../Keys/sever.key').toString(),
      cert: fs.readFileSync('../Keys/certificate.crt').toString()
  };
  var server = https.createServer(options, app).listen(port); // making the server
  var helmet = require('helmet'); // lib for secreity
  app.use(helmet()); // using the helmet Lib
  superLog("Set Https Up");
}else {
  var server = app.listen(port); // making the server
}
app.use(express.static("public_page")); // using the folder in side the app as the dir for the site
app.use(express.json()); // geting in min lib of json body from express and using the min lib
superLog("listening on " + port);

// geting the list
app.get('/list/get', sendListJSON); // if a get request hapen for '/list/get' lanch sendListJSON
function sendListJSON(request, response) {
  response.send(list); // sending the list off
}
// add a item to the list
app.post('/list/add', function (request, response) { // if a post request hapen for '/list/add' do the folowing
  // seting up var
  var sendData = { meg: "", bad: "", good: "" , work: "no"};
  var dataIn = request.body; // geting the json data sent in and formated (min lib json from express)
  var keyPass = testKey(dataIn.name, dataIn.key); // testing the apiKey sent in
  sendData.bad = dataIn.badItme; // geting the bad item
  sendData.good = dataIn.goodItme;// geting the good item
  if(keyPass){ // if the key pass the do the folowing
    sendData.meg = "Access Granted"; // set meg that the key work
    list.push([sendData.bad, sendData.good]); // adding the item to the list
    fs.writeFile('./json/list.json', JSON.stringify(list, null, 2), fileDone); // updateing the file
    function fileDone(err) {// run when done updateing the file
      if(err != null){ // was there a problem when updateing the file
        superLog("err:" + err); // loging the problem
        sendData.work = ("no, ask the admin to look at the log from the server for the err"); // set work as there was a problem
      }else {
        sendData.work = "yes"; // set work as it work
      }
      response.send(sendData);// sending back of what hapen
    }
  }else { // if the key false the do the folowing
    sendData.meg = "Access Denied";// set meg that the key faild
    superLog("Wrong Key retive, Key:" + dataIn.key); // log the wrong key atemp
  }
  if(!keyPass){response.send(sendData);}// sending back of what hapen}
});
// remove a item from the list
app.post('/list/remove', function (request, response) { // if a post request hapen for '/list/remove' do the folowing
  // seting up var
  var sendData = { meg: "", bad: "", good: "" , work: ""};
  var dataIn = request.body; // geting the json data sent in and formated (min lib json from express)
  var keyPass = testKey(dataIn.name, dataIn.key);// testing the apiKey sent in
  sendData.bad = dataIn.badItme;// geting the bad item
  sendData.good = dataIn.goodItme;// geting the good item
  if(keyPass){// if the key pass the do the folowing
    sendData.meg = "Access Granted";// set meg that the key work
    // finding the item in the list
    if (!(sendData.bad == "")){ // testing if bad is blank if not do the folowing
      for(var i = 0; i < list.length; i++){// for evry item in the list do the folowing
        if(list[i][0] == sendData.bad){// is the item bad equal to the bad sent in
          sendData.work = "no, not Done";
        }
      }
      if(sendData.work == ""){// seing if got any finds
        sendData.work = "no, not found"; // set work can't find
      }
    }else if (!(sendData.good == "")) {// testing if good is blank if not do the folowing
      for(var i = 0; i < list.length; i++){// for evry item in the list do the folowing
        if(list[i][1] == sendData.good){// is the item good equal to the good sent in
          sendData.work = "no, not Done";
        }
      }
      if(sendData.work == ""){// seing if got any finds
        sendData.work = "no, not found"; // set work can't find
      }
    }else {// no item was sent in
      sendData.work = "no, no item was sent to be remove"; /// set work to no item was sent in
    }
  }else {// if the key false the do the folowing
    sendData.meg = "Access Denied";// set meg that the key faild
    sendData.work = "no";// set work that it faild
    superLog("Wrong Key retive, Key:" + dataIn.key);// log the wrong key atemp
  }
  response.send(sendData);// sending back of what hapen
});
// testing the api key
app.post("/api", function (request, response) {// if a post request hapen for '/api' do the folowing
  // seting up var
  var sendData = { meg: "", key: ""}
  sendData.key = request.body.key;// geting the json data sent in and formated (min lib json from express) then geting the keys
  if(testKey("temp", sendData.key)){ // testing the key
    sendData.meg = "Access Granted"; // set meg as key works
  }else {
    sendData.meg = "Access Denied"; // set meg as key falid
  }
  response.send(sendData);// send back what hapen
});
// key testing
function testKey(name, key) {
  if((key == keys.tempKey)&(name == "temp")){ // if temp key was sent in
    return true; // send temp key if grated(true) or denied(false)
  }else { // test the users in the key file
    for (var i = 0; i < keys.Users.length; i++) { // test the key over evey user
      if((name == keys.Users[i].Name)&(key == keys.Users[i].apiKey)){// did the key work for this user
        return true;// send grated for user
      }
    }
    return false;// can't find user with at key
  }
}
// super log add the date that it hapen
function superLog(data) {
  var d = new Date();
  console.log(
    d.getMonth() +
    "/" +
    d.getDate() +
    "/" +
    d.getFullYear() +
    " at " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    "  " +
    data
  );
}
