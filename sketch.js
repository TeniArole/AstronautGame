var astronaut, astronautImage

var stars, starsImage

var rocket, rocketImage

var gameover, gameoverImage

var saturn, saturnImage

var mars, marsImage

var rocketsGroup, saturnsGroup, marsGroup

var score;

var restart, restartImage

var gameoverSound

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload () {
  astronautImage=loadImage("astronaut.png");
  
  starsImage=loadImage("stars.png")
  
  rocketImage=loadImage("rocket ship.png");
  
  gameoverImage=loadImage("gameover.png");
  
  saturnImage=loadImage("saturn.png");
  
  marsImage=loadImage("mars.png");
  
  restartImage=loadImage("restart.png");
  
  gameoverSound=loadSound("GameOverSound.mp3");
  
}

function setup () {
  createCanvas(600, 600);
  background(0);
  
  //background
  stars=createSprite(300, 300, 20, 20);
  stars.addImage(starsImage);
  
  //astronaut image
  astronaut=createSprite(300, 530, 20, 20);
  astronaut.addImage(astronautImage);
  astronaut.scale = 0.075;
  
  //gameover image
  gameover=createSprite(300, 275, 20, 20);
  gameover.addImage(gameoverImage);
  
  //groups
  rocketsGroup =new Group();
  saturnsGroup =new Group();
  marsGroup =new Group();
  
  //restart image
  restart=createSprite(300, 500, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.3;

  //score; currently not working
  score = 0;


  
  
}

function draw () {
  console.log(frameCount);
  
  //background image
  if(stars.y > 750 ){
    stars.y = height/2;
    }
    
  //play state
  if(gameState===PLAY) {
    
    
    //score isn't visible; when I remove the background it is
    textSize(20);
    fill("lime");
    text("Score: "+ score, 250,50);
   
    //background moving
    stars.velocityY = 2;
    
    //gameover and restart images not visible
    gameover.visible = false;
    restart.visible = false;
    
    //astronaut moves by mouse
    astronaut.x=World.mouseX;
    astronaut.y=World.mouseY;

    
   
    //run groups
    rockets();
    saturns();
    redPlanets();
   
    
    if(rocketsGroup.isTouching(astronaut)){
      gameState=END;
      gameoverSound.play();
    }
    
    else if(saturnsGroup.isTouching(astronaut)){
      gameState=END;
      gameoverSound.play();
    }
   
    else if(marsGroup.isTouching(astronaut)){
      gameState=END;
      gameoverSound.play();
    }
  
   }
  
    if(gameState===END)  {
    
    astronaut.x = 50;
    astronaut.y = 550;
    stars.velocityY=0;
    rocketsGroup.destroyEach();
    marsGroup.destroyEach();
    saturnsGroup.destroyEach();
        
    rocketsGroup.setVelocityYEach(0);
    marsGroup.setVelocityYEach(0);
    saturnsGroup.setVelocityYEach(0);
        
      restart.visible = true;
      gameover.visible = true;
     
      if(mousePressedOver(restart)){
        gameState=PLAY;
      }
 
    }
    drawSprites();
}

function rockets () {
 if(frameCount%(Math.round(random(100,200)))===0) {
  rocket=createSprite(Math.round(random(25, 575)), 10);
  rocket.addImage(rocketImage);
  rocket.scale = 0.2;
  rocket.velocityY = (8+frameCount/100);
  rocket.lifetime = 300;
  rocketsGroup.add(rocket);
 }
  
}

function saturns () {
 if(frameCount%(Math.round(random(100,200)))===0) {
  saturn=createSprite(Math.round(random(25, 575)), 10);
  saturn.addImage(saturnImage);
  saturn.scale = 0.2;
  saturn.velocityY = (8+frameCount/100);
  saturn.lifetime = 300;
  saturnsGroup.add(saturn);
 }
  
}

function redPlanets () {
 if(frameCount%(Math.round(random(100,200)))===0) {
  mars=createSprite(Math.round(random(25, 575)), 10);
  mars.addImage(marsImage);
  mars.scale = 0.03;
  mars.velocityY = (8+frameCount/100);
  mars.lifetime = 300;
  marsGroup.add(mars);
 }
  
}