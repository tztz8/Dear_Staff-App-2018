var aRF = false;
function setup() {
  noCanvas();
  loadJSON('/list/get', gotData);

  var autoRefreshCheckbox = select("#autoRefresh");
  if (sessionStorage.getItem("aRF") == "true"){
    aRF = true;
    autoRefreshCheckbox.attribute('checked', null);
    myRefresh(false, "");
  }else {
    aRF = false;
  }
  autoRefreshCheckbox.input(function () {aRF = !aRF; sessionStorage.setItem("aRF", aRF);});
}

function gotData(data) {
  createP("<br>Bad Items:");
  var itmes = [];
  for (var i = 0; i < data.length; i++) {
    if(!(i == 0)){
      itmes.push("<br>" + data[i][0]);
    }else {
      itmes.push(data[i][0]);
    }
  }
  createP(itmes);
  itmes = [];
  createP("<br>Good Items:");
  for (var i = 0; i < data.length; i++) {
    if(!(i == 0)){
      itmes.push("<br>" + data[i][1]);
    }else {
      itmes.push(data[i][1]);
    }
  }
  createP(itmes);
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
    myRefresh(true, result);
  }
  function errorFun(err) {
    console.log(err);
  }
}

function myRefresh(notStart, result) {
  if(aRF & notStart){
    sessionStorage.setItem("name", select('#name').value());
    sessionStorage.setItem("key", select('#key').value());
    sessionStorage.setItem("badItme", select('#bad').value());
    sessionStorage.setItem("goodItme", select('#good').value());
    sessionStorage.setItem("result", result.work);
    document.location.reload(true);
  }else if (!notStart) {
    select('#name').value(sessionStorage.getItem("name"));
    select('#key').value(sessionStorage.getItem("key"));
    select('#bad').value(sessionStorage.getItem("badItme"));
    select('#good').value(sessionStorage.getItem("goodItme"));
    if((!(sessionStorage.getItem("result") == "null")) & (!(sessionStorage.getItem("result") == ""))){
      alert(sessionStorage.getItem("result"));
      sessionStorage.setItem("result", null);
    }
  }
}
