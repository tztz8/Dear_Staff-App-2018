function setup() {
  noCanvas();
  //createCanvas(400,400);
  //background(51);
  loadJSON('/list/get', gotData);

  var button = select('#add');
  button.mousePressed(addByButton);
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

function addByButton() {
  var keyIn = select('#key').value();
  var badIn = select('#bad').value();
  var goodIn = select('#good').value();
  console.log(keyIn, badIn, goodIn);

  loadJSON('/list/add/' + keyIn + '/' + badIn + '/' + goodIn, function (dataBack) {
    if(dataBack.meg == "Access Granted"){
      loadJSON('/list/get', gotDataUpdate);
    }else {
      alert(dataBack.meg);
    }
  });
}

function gotDataUpdate(data) {
  createP("<br><br>Upate:");
  createP(data[data.length-1][0]);
  createP(data[data.length-1][1]);
}
