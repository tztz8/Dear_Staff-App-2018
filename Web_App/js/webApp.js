var list = [10];
list[0] = ["You don't have a fucking clue, do you?", "I think you could do with more training"];
list[1] = ["She's a fucking power-crazy bitch","She's an aggressive go-getter."];
list[2] = ["And when the fuck do you expect me to do this?","Perhaps I can work late"];
list[3] = ["Fuck off arsehole","I'm certain that isn't feasible"];
list[4] = ["Well fuck me backwards with a telegraph pole","Really?"];
list[5] = ["Tell someone who gives a fuck.","Perhaps you should check with..."];
list[6] = ["Not my fucking problem.","I wasn't involved in the project."];
list[7] = ["What the fuck?","That's interesting."];
list[8] = ["No fucking chance mate.","I'm not sure this can be implemented within the given timescale."];
list[9] = ["Why the fuck didn't you tell me that yesterday?","It will be tight, but I'll try to schedule it in"];

var showItmesSize = 6;
var showItmesLocat = 0;
var paddingSize = 5;
var webAppStarted = false;
var desktopApp = true;

function startUpWebApp(){

  // set flag that web app has started
  webAppStarted = true;
  // set flat that it is desktop or mobile mode
  if(screen.width < 768){
    desktopApp = false;
  }else {
    desktopApp = true;
  }
  // Hide the button
  document.getElementById("showWebAppButton").style.display = "none";
  // showWebApp
  document.getElementById("webapp").style.display = "block";

  // put the staring itmes down
  for(var i = 0; i < list.length; i++){
    // evil
    var evilElement = document.createElement("LI"); // started making the itme
    var evilTextNode = document.createTextNode(list[i][0]); // seting up text for itme
    evilElement.appendChild(evilTextNode); // appling text to item
    evilElement.id = ("evilItem" + i); // giveing item a id
    evilElement.onclick = function(){clickOnItem(this, false)}; // seing up to run a fuc when click on
    document.getElementById("evilList").appendChild(evilElement); // appling the item to the site
    // good
    var goodElement = document.createElement("LI"); // started making the itme
    var goodTextNode = document.createTextNode(list[i][1]); // seting up text for itme
    goodElement.appendChild(goodTextNode); // appling text to item
    goodElement.id = ("goodItem" + i); // giveing item a id
    goodElement.onclick = function(){clickOnItem(this, true)}; // seing up to run a fuc when click on
    document.getElementById("goodList").appendChild(goodElement); // appling the item to the site
  }

  // Set both to the same size and add pading(margin) to the itmes
  updateListSize(0, showItmesSize);

  // Hide all but the firtst showItmesSize
  for(var i = showItmesSize; i < list.length; i++){
    document.getElementById("evilItem" + i).style.display = "none"; // hide evil Item
    document.getElementById("goodItem" + i).style.display = "none"; // hide good Item
  }

  // seting locashen of list
  showItmesLocat = 0;
}

function screenSizeUpdate() {
  if(screen.width < 768){
    if(desktopApp){
      desktopApp = false;
    }
  }else {
    if(!desktopApp){
      desktopApp = true;
      document.getElementById("evilDBoxList").style.display = "block";
      document.getElementById("goodDBoxList").style.display = "block";
    }
  }
  updateListSize(showItmesLocat, showItmesLocat+showItmesSize);
}

function updateListSize(top, bottom) {
  if(webAppStarted){ // run only when nesarry
    // Set both to the same size and add pading(margin) to the itmes
    for(var i = top; i < bottom; i++){ // runing on each itme pland
      var evilItem = document.getElementById("evilItem" + i); // seleting evil item
      var goodItem = document.getElementById("goodItem" + i); // seleting good item
      if (evilItem.clientHeight > goodItem.clientHeight){ // comparing each itme (>)
        //console.log("evilItem" + i + " is biger then goodItem" + i); // for trubleshoting
        var addPad = evilItem.clientHeight - goodItem.clientHeight;
        goodItem.style.margin = paddingSize + "px 0px " + addPad + "px 0px";
        evilItem.style.margin = paddingSize + "px 0px 0px 0px";
      } else if (goodItem.clientHeight > evilItem.clientHeight){ // comparing each itme (>)
        //console.log("goodItem" + i + " is biger then evilItem" + i); // for trubleshoting
        var addPad = goodItem.clientHeight - evilItem.clientHeight;
        evilItem.style.margin = paddingSize + "px 0px " + addPad + "px 0px";
        goodItem.style.margin = paddingSize + "px 0px 0px 0px";
      } else{
        evilItem.style.margin = paddingSize + "px 0px 0px 0px";
        goodItem.style.margin = paddingSize + "px 0px 0px 0px";
      }
    }
  }
}

function scroling(move){
  // moving itmes up
  if(move > 0){
    if(showItmesLocat < (list.length-showItmesSize)){
      document.getElementById("evilItem" + showItmesLocat).style.display = "none";
      document.getElementById("goodItem" + showItmesLocat).style.display = "none";
      document.getElementById("evilItem" + (showItmesLocat+showItmesSize)).style.display = "block";
      document.getElementById("goodItem" + (showItmesLocat+showItmesSize)).style.display = "block";
      showItmesLocat++;
      document.getElementById("arrow").style.display = "none";
    }
  }else if(move < 0) { // moving itmes down
    if(showItmesLocat > 0){
      document.getElementById("evilItem" + (showItmesLocat-1)).style.display = "block";
      document.getElementById("goodItem" + (showItmesLocat-1)).style.display = "block";
      document.getElementById("evilItem" + (showItmesLocat-1+showItmesSize)).style.display = "none";
      document.getElementById("goodItem" + (showItmesLocat-1+showItmesSize)).style.display = "none";
      showItmesLocat--;
      document.getElementById("arrow").style.display = "none";
    }
  }else {
    alert("something when wrong with scroling value:" + move);
  }
  // update itmes
  updateListSize(showItmesLocat, showItmesLocat+showItmesSize);
}

function aListButton(isGood) {
  document.getElementById("mobileApp").style.display = "none";
  document.getElementById("desktopApp").style.display = "block";
  document.getElementById("arrow").style.display = "none";
  if(isGood){
    document.getElementById("evilDBoxList").style.display = "none";
    document.getElementById("goodDBoxList").style.display = "block";
  }else {
    document.getElementById("evilDBoxList").style.display = "block";
    document.getElementById("goodDBoxList").style.display = "none";
  }
}

function clickOnItem(item, isGood){
  //console.log(item.id);
  if(desktopApp){
    var arrow = document.getElementById("arrow");
    arrow.style.display = "initial";
    var bodyLocat = document.body.getBoundingClientRect();
    var itemLocat = item.getBoundingClientRect();
    arrow.style.position = "absolute";
    if(isGood){
      arrow.style.right = (itemLocat.left) + "px"; // x pos
      arrow.style.top = ((-bodyLocat.top) + itemLocat.top) + "px"; // y pos
    }else {
      arrow.style.left = (itemLocat.right) + "px"; // x pos
      arrow.style.top = ((-bodyLocat.top) + itemLocat.top) + "px"; // y pos
    }
  }else {
    if(isGood){
      document.getElementById("WTSS").innerHTML = item.innerHTML;
      document.getElementById("WYTS").innerHTML = document.getElementById("evilItem" + (item.id.substr(8))).innerHTML;
    }else {
      document.getElementById("WYTS").innerHTML = item.innerHTML;
      document.getElementById("WTSS").innerHTML = document.getElementById("goodItem" + (item.id.substr(8))).innerHTML;
    }
    document.getElementById("mobileApp").style.display = "block";
    document.getElementById("desktopApp").style.display = "none";
  }
}
