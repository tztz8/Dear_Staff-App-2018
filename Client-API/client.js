var url = "https://home.tftinker.club:3000";
function getListFromAPI() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     list = JSON.parse(this.responseText);
   }
  };
  xhttp.open("GET", url+"/list/get", true);
  xhttp.send();
}
function sendItemToAPI(name, key, bad, good, endURL, returnFun) {
  if (!(returnFun == null)){
    var data = {
      name: name,
      key: key,
      badItme: bad,
      goodItme: good
    }
    fetch(url+endURL, {
      method: "POST",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json();
    }).then(function(myJson) {
      returnFun(JSON.stringify(myJson));
    });
    return "will run the function when get data";
  }else {
    return "missing agument";
  }
}
