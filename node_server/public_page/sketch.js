function setup() {
  noCanvas();
  //createCanvas(400,400);
  //background(51);
  loadJSON('/list/get', gotData);

  //var button = select('#add');
  //button.mousePressed(addByButton);
  var buttonPost = select('#postAdd');
  buttonPost.mousePressed(addByButtonPost);
  var buttonPostRemove = select('#postRemove');
  buttonPostRemove.mousePressed(removeByButtonPost);
}

/*function draw() {
}*/

function gotData(data) {
  createP("<br><br>Bad Items:");
  for (var i = 0; i < data.length; i++) {
    createP(data[i][0]);
  }
  createP("<br><br>Good Items:");
  for (var i = 0; i < data.length; i++) {
    createP(data[i][1]);
  }
}
/*
function addByButton() {
  var keyIn = select('#key').value();
  var badIn = select('#bad').value();
  var goodIn = select('#good').value();
  console.log(keyIn, badIn, goodIn);

  loadJSON('/list/add/' + keyIn + '/' + badIn + '/' + goodIn, function (dataBack) {
    /*if(dataBack.meg == "Access Granted"){
      loadJSON('/list/get', gotDataUpdate);
    }else {
      alert(dataBack.meg);
    }*//*
    console.log(dataBack);
  });
}*/

function addByButtonPost() {
  var data = {
    key: select('#key').value(),
    badItme: select('#bad').value(),
    goodItme: select('#good').value()
  }
  console.log(data.keyIn, data.badIn, data.goodIn);

  httpPost('/list/add/', 'json', data, callBackFun, errorFun);
  function callBackFun(result) {
    console.log(result);
  }
  function errorFun(err) {
    console.log(err);
  }
}

function removeByButtonPost() {
  var data = {
    key: select('#key').value(),
    badItme: select('#bad').value(),
    goodItme: select('#good').value()
  }
  console.log(data.keyIn, data.badIn, data.goodIn);

  httpPost('/list/remove/', 'json', data, callBackFun, errorFun);
  function callBackFun(result) {
    console.log(result);
  }
  function errorFun(err) {
    console.log(err);
  }
}

function gotDataUpdate(data) {
  createP("<br><br>Upate:");
  createP(data[data.length-1][0]);
  createP(data[data.length-1][1]);
}
