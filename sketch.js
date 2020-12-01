//creating the variables
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;

//loading the multimedia files
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas (600,600);
//creating the monkey sprite
monkey=createSprite(80,515,20,20)  
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.2;

//creating the ground sprite
ground=createSprite(50,580,600,10);
ground.velocityX = -4;
ground.x = ground.width/2;
ground.scale=2;
ground.shapeColor=("brown")

//creating the banana group
bananaGroup=createGroup();
//creating the obstacles group
obstaclesGroup=createGroup();
}


function draw() {
background(0,255,153) ;
drawSprites();

//displaying the score by using the concatenation operator to join a string with a variable
stroke (0,255,153);
textSize(20);
fill(0,255,153);
text ("Score:" + score, 500,50);

//displaying how long the game has continued using the frameRate
stroke ("black");
textSize(21);
fill("black");
textFont("Georgia")
survivalTime = Math.ceil(frameCount/frameRate())
text ("Survival Time:" + survivalTime, 400,50)

//making the ground infinitely scroll itself
if (ground.x < 0){
ground.x = ground.width/2;
}

//mkaing the minkey jump when the space key is pressed
if (keyDown("space") && monkey.y>500) {
monkey.velocityY=-15 ;
}
//adding the gravity to the monkey
monkey.velocityY = monkey.velocityY +0.6;
//making the monkey collide with the ground
monkey.collide(ground);

//calling the custom function-food
food();
//calling the custom function-obstacles
obstacles();
}


function food() {
//creating the banana sprite after every 80 frames
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
  //making the y value of the banana sprite a random number between 220 and 300.
    banana.y = Math.round(random(220,300));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
  //adding the banana to the banana group
    bananaGroup.add(banana);
    banana.scale=0.2;
  //setting the lifetime for the banana
    banana.lifetime = 120;
  }
}

function obstacles() {
//creating the obstacles after every 300 frames
  if (frameCount % 300 === 0){
   var obstacle = createSprite(500,525,10,40);
  obstacle.scale=0.2;
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -6;
  obstacle.lifetime=100;
  obstaclesGroup.add(obstacle);
  //increasing the depth of the monkey so that the obstacles appear behind it only
  monkey.depth=obstacle.depth;
  monkey.depth=monkey.depth+1;
  
//adding the image to the obstacles sprite 
    //generate random obstacles
    var rand = Math.round(random);
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
     
      default: break;
    }
  }
 
}



