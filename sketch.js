var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var cycleBell;
var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var distanceRacer = 0;
var cyclebell,redCG,pinkCG;
var player1,player2;
var randPlayerVel = 0;
var oppVelDiff = 0;
var randOppVel = 0;
var score = 0;

function preload(){  
  cycleBell = loadSound("sound/bell.mp3");
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png"); 
}

function setup(){
  randPlayerVel = Math.round(random(10,15));
  createCanvas(500,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;
  
  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
}

function draw() {
  
  //cycle bell
  if(keyDown("SPACE")){
    cycleBell.play();
  }
  
  //time until bicycle spawned
  distanceRacer = distanceRacer + 1;
  if(distanceRacer>100){
    spawnCyclist();
    distanceRacer = 0;
  }
  //distance measurement;
  score = frameCount;
  distance = Math.round(score/10);
  background(0);
  if(randPlayerVel>randOppVel){
    oppVelDiff = randPlayerVel - randOppVel;
    redCG = oppVelDiff;
  }
  
  drawSprites();
  
  //displays distance
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    mainCyclist.y = World.mouseY;
    edges= createEdgeSprites();
    mainCyclist .collide(edges);
    
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }
  }
}

function spawnCyclist(){
  
  //bicycle random spawn
  player1 = createSprite(50,Math.round(random(50,250)),10,10);
  
  //makes opponents velocity relative to yours
  randOppVel = Math.round(random(10,15));
  oppVelDiff = randPlayerVel - randOppVel;
  
  //makes animation and velocity
  player1.addAnimation("racerAn",mainRacerImg2);
  player1.scale = 0.07;
  player1.lifetime =250; 
  player1.velocityX = oppVelDiff;
}