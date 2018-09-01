function setup() {
  createCanvas(512, 512);
	background(255, 255);
  icon(width/2, height/2);
}

function draw() {
  document.getElementById('dataBox').innerHTML = (
    "<p>X:" + mouseX +
    " , Y:" + mouseY + "</p>");
}

function icon(startX, startY) {
  // Coler
  var Graey = 'rgb(105,105,105)';
  var Bluey = '#85DFFD';
  var Ready = 'rgb(178,34,34)';
  var SReady = '#890000';

  // Srounding Cerce (Right)
  stroke('RED');
	strokeWeight(22);
	fill(Bluey);
  arc(startX, startY, 490, 490, (3*PI)/2, PI/2);

  // Above the angle Head
	stroke(255);
	strokeWeight(10);
	noFill();
	arc(startX, startY - 144, 255, 60, (6*PI)/4, PI/2);

  // Srounding Cerce (Left)
  stroke(Bluey);
	strokeWeight(22);
	fill('RED');
  arc(startX, startY, 490, 490, PI/2, (3*PI)/2);

  // Bad Horn
  noStroke();
  fill(Ready);
  triangle(125, 200, 160, 220, 140, 250);

  // Side of the Face (Var)
  var SOTF_Down = 60;
  var SOTF_Size = 275;

  // Side of the Face (Left)
  noStroke();
	fill(Ready);
  arc(startX, startY + SOTF_Down, SOTF_Size, SOTF_Size, PI/2, (6*PI)/4);

  // Side of the Face (Right)
  noStroke();
  fill(255);
	arc(startX, startY + SOTF_Down, SOTF_Size, SOTF_Size, (6*PI)/4, PI/2);

  // eye's
  var eye_Y = startY + 25;
  var eye_XMove = 55;
  noStroke();
  fill(SReady);
  ellipse(startX - eye_XMove, eye_Y, 40, 50);// BAD Eye
  fill(Ready);
  triangle(225, 275, 180, 245, 220, 220);// Makeing the Bad Eye bad
  fill(115);
  ellipse(startX + eye_XMove, eye_Y, 40, 50);// Good Eye

  // smile
  var smile_Move = 40;

  // smile (Left)
  stroke(SReady);
  strokeWeight(12);
  noFill();
  arc(startX, startY + smile_Move, 200, 200, PI/2, PI);

  // smile (Right)
  stroke(115);
  strokeWeight(12);
  noFill();
  arc(startX, startY + smile_Move, 200, 200, 0, PI/2);
}
