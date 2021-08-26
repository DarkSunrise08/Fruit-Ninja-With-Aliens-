//Game States
var PLAY=1;
var END=0;
var gameState=1;

var o = 0;
var a = 0;
var p = 0;
var b = 0;

var oDestroy = 0;
var aDestroy = 0;
var pDestroy = 0;
var bDestroy = 0;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var orangeGroup, orangeArray;
var appleGroup, appleArray;
var pearGroup, pearArray;
var bananaGroup, bananaArray;

var knifeSwooshSound, gameOverSound;

var edges, edgeL, edgeR;

var gameSpeed = 0;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //load sound here
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  gameOverSound = loadSound("gameover.mp3")

}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  orangeGroup = createGroup();
  appleGroup = createGroup();
  pearGroup = createGroup();
  bananaGroup = createGroup();

  orangeArray = [];

  appleArray = [];

  pearArray = [];

  bananaArray = [];

  edges = createGroup();

  edgeL = createSprite(-10,300,20,600);
  edgeR = createSprite(610,300,20,600);

  edges.add(edgeL);
  edges.add(edgeR);
  
}

function draw() {

  background("lightblue");

  fruitGroup.bounceOff(edges);

  monsterGroup.bounceOff(fruitGroup);
  monsterGroup.collide(edges);

  appleGroup.bounceOff(orangeGroup);
  appleGroup.bounceOff(pearGroup);
  appleGroup.bounceOff(bananaGroup);

  orangeGroup.bounceOff(appleGroup);
  orangeGroup.bounceOff(pearGroup);
  orangeGroup.bounceOff(bananaGroup);

  pearGroup.bounceOff(appleGroup);
  pearGroup.bounceOff(orangeGroup);
  pearGroup.bounceOff(bananaGroup);

  bananaGroup.bounceOff(orangeGroup);
  bananaGroup.bounceOff(pearGroup);
  bananaGroup.bounceOff(appleGroup);
  

  orangeGroup.setVelocityYEach(o);
  
  o+=0.75;

  appleGroup.setVelocityYEach(a);

  a+=0.9;

  pearGroup.setVelocityYEach(p);

  p+=0.5;

  bananaGroup.setVelocityYEach(b);

  b+=0.7;

  if(gameState===PLAY){
    
    if(gameSpeed<5){
      gameSpeed = score/30;
    }
    else{
      gameSpeed = 5;
    }

    //Call fruits and Monster function
    Monster();
    oranges();
    apples();
    pears();
    bananas();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(orangeGroup.isTouching(knife)){
      orangeGroup.destroyEach();
      score+=2;

      knifeSwooshSound.play();

      if(oDestroy>50){
        oDestroy -=50;
      }
    }
    else if(bananaGroup.isTouching(knife)){
      bananaGroup.destroyEach();
      score+=5;

      knifeSwooshSound.play();

      if(bDestroy>50){
        bDestroy -=50;
      }
    }
    else if(appleGroup.isTouching(knife)){
      appleGroup.destroyEach();
      score+=3;

      knifeSwooshSound.play();

      if(aDestroy>25){
        aDestroy -=25;
      }
    }
    else if(pearGroup.isTouching(knife)){
      pearGroup.destroyEach();
      score+=1;

      knifeSwooshSound.play();

      if(pDestroy>60){
        pDestroy -=60;
      }
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;

        gameOverSound.play();
        
        //add gameover sound here
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }

  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);

  if(oDestroy>0){
    oDestroy-=1;
  }

  if(oDestroy === 1){
    orangeArray.pop();
  }

  if(bDestroy>0){
    bDestroy-=1;
  }

  if(bDestroy === 1){
    bananaArray.pop();
  }

  if(aDestroy>0){
    aDestroy-=1;
  }

  if(aDestroy === 1){
    appleArray.pop();
  }

  if(pDestroy>0){
    pDestroy-=1;
  }

  if(pDestroy === 1){
    pearArray.pop();
  }
}



function Monster(){
  if(World.frameCount%15===0){
    monster=createSprite(random(25,575),625,20,20);
    monster.addAnimation("moving", monsterImage);
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityY = -(10+(gameSpeed*3));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function oranges(){
  if(orangeArray.length === 0){
  orange=createSprite(random(25,575),500,20,20);
    
  //using random variable change the position of fruit, to make it more challenging
        
  orange.addImage(fruit1);
  orange.scale = 0.25;
    
  orange.setLifetime=100;
    
  fruitGroup.add(orange);

  orangeGroup.add(orange);

  orange.velocityX = random(-3-gameSpeed,3+gameSpeed);

  o = -25;

  oDestroy = 100;

  orangeArray.push("o");
  }
}

function bananas(){
  if(bananaArray.length === 0){
    banana=createSprite(random(25,575),500,20,20);
    
  //using random variable change the position of fruit, to make it more challenging
        
  banana.addImage(fruit4);
  banana.scale = 0.15;
    
  banana.setLifetime=100;
    
  fruitGroup.add(banana);

  bananaGroup.add(banana);

  banana.velocityX = random(-7-gameSpeed,7+gameSpeed);

  b = -25;

  bDestroy = 100;

  bananaArray.push("b");
  }
}

function apples(){
  if(appleArray.length === 0){
  apple=createSprite(random(25,575),500,20,20);
    
  //using random variable change the position of fruit, to make it more challenging
        
  apple.addImage(fruit2);
  apple.scale = 0.25;
    
  apple.setLifetime=100;
    
  fruitGroup.add(apple);

  appleGroup.add(apple);

  apple.velocityX = random(-5-gameSpeed,5+gameSpeed);

  a = -30;

  aDestroy = 100;

  appleArray.push("a");
  }
}

function pears(){
  if(pearArray.length === 0){
  pear=createSprite(random(25,575),500,20,20);
    
  //using random variable change the position of fruit, to make it more challenging
        
  pear.addImage(fruit3);
  pear.scale = 0.25;
    
  pear.setLifetime=100;
    
  fruitGroup.add(pear);

  pearGroup.add(pear);

  pear.velocityX = random(-5-gameSpeed,5+gameSpeed);

  p = -20;

  pDestroy = 150;

  pearArray.push("p");

  }
}