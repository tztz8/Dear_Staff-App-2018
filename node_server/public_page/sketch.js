function setup() {
  noCanvas();

  loadJSON('/list/get', gotData);
}

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

function byButtonPost(url) {
  var data = {
    name: select('#name').value(),
    key: select('#key').value(),
    badItme: select('#bad').value(),
    goodItme: select('#good').value()
  }
  console.log(data.name, data.key, data.badItme, data.goodItme);

  httpPost(url, 'json', data, callBackFun, errorFun);
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
