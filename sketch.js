var PLAY = 1;
var END = 0;
var gameState = PLAY;

var genie, genieIdle, genieAttack, genieDeath, magic_anim, magic, magicGroup;
var dragon, dragonIdle, dragonAttack; 
var lizard, lizardIdle, lizardAttack;
var medusa, medusaIdle, medusaAttack;;
var demon, demonIdle, demonAttack;
var pandorabox, pandorabox_img;
var bg, bgs, ground;
var score = 0;
var enemiesGroup, medusaGroup;
var gameOver, restart


function preload() {
  pandorabox_img = loadImage("PANDORA'S BOX.png");

  enemiesGroup = new Group();
  medusaGroup = new Group();
  magicGroup = new Group();

  genieIdle = loadAnimation("genie2/Flight1.png","genie2/Flight2.png","genie2/Flight3.png");
  genieAttack = loadAnimation("genie2/Attack1.png","genie2/Attack2.png","genie2/Attack3.png","genie2/Attack4.png");
  magic_anim = loadAnimation("genie/Magic_Attack1.png","genie/Magic_Attack2.png","genie/Magic_Attack3.png","genie/Magic_Attack4.png",
    "genie/Magic_Attack5.png","genie/Magic_Attack6.png","genie/Magic_Attack7.png","genie/Magic_Attack8.png","genie/Magic_Attack9.png",
    "genie/Magic_Attack10.png","genie/Magic_Attack11.png","genie/Magic_Attack22.png","genie/Magic_Attack23.png");
  genieDeath = loadAnimation("genie2/Death4.png");

  lizardAttack = loadAnimation("lizard/Attack1.png","lizard/Attack2.png","lizard/Attack3.png","lizard/Attack4.png","lizard/Attack5.png")

  dragonAttack = loadAnimation("dragon/Walk1.png","dragon/Walk2.png","dragon/Walk3.png","dragon/Walk4.png","dragon/Walk5.png");

  demonAttack = loadAnimation("demon/Attack1.png","demon/Attack2.png","demon/Attack3.png","demon/Attack4.png")

  medusaAttack = loadAnimation("medusa/Attack1.png","medusa/Attack2.png","medusa/Attack3.png","medusa/Attack4.png","medusa/Attack5.png","medusa/Attack6.png")
  
  gameOverImg = loadImage("gameOver (1).png")
  restartImg = loadImage("restart.png")

  bg = loadImage("bg2.jpg")
  
}

function setup(){
    var canvas = createCanvas(800,400);
    bgs = createSprite(600,370);
    bgs.scale = 0.5
    bgs.addImage(bg);

   

    ground = createSprite(600,390,1200,5)
    ground.visible = false;

    pandorabox = createSprite(740,365,50,50)
    pandorabox.addImage("box",pandorabox_img)
    pandorabox.scale = 0.15
    
    genie = createSprite(650,350,50,50);
    genie.setCollider("circle",0,0,40);
    genie.addAnimation("Idle",genieIdle);
    genie.addAnimation("Attack",genieAttack);
    genie.addAnimation("Death",genieDeath);
    
    gameOver = createSprite(300,180);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(300,220);
    restart.addImage(restartImg);
  
    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;
  
    enemiesGroup = new Group();
    medusaGroup = new Group();
  
    score = 0;
  }

function draw(){
  background("white");
  image(bg,600,200);

  let display = touches.length + ' touches';
  text(display, 5, 10);

  if (gameState===PLAY){
    
    bgs.velocityX = -3;
    if (bgs.x < 0){
      bgs.x = bgs.width/2;
    }
    
    spawnEnemies();

    if (touches.length > 0 || keyWentDown("space")){
      MAGIC();
      genie.changeAnimation("Attack",genieAttack);
      magic.visible = true;
      touches = [];
    }
    if(keyWentUp("space")){
      genie.changeAnimation("Idle",genieIdle);
    }
  
    if(enemiesGroup.isTouching(magicGroup)){
      enemiesGroup.destroyEach();
      score = score+10
    }

    else if(enemiesGroup.isTouching(genie)){
      genie.changeAnimation("Death",genieDeath)
      gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    bgs.velocityX = 0;
    enemiesGroup.setVelocityXEach(0);
    
    enemiesGroup.destroyEach();
    
  }

  if(touches.length>0 || mousePressedOver(restart)) {
    genie.destroy();
    reset();
    touches = [];
  }
    
  drawSprites();

  fill('white')
  textSize(20)
  text("Score- "+score,600,150);
}

function MAGIC(){
  magic = createSprite(640,350,50,50);
  magic.visible = false;
  magic.addAnimation("Magic",magic_anim);
  magic.velocityX = -15
  magicGroup.add(magic);
}

function spawnEnemies() {
  if(frameCount % 100 === 0) {
    var enemy = createSprite(0,340,50,50);
    //enemy.debug = true;
    enemy.setCollider("circle",0,0,10);
    enemy.velocityX = 30;
    //enemy.addAnimation();
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: enemy.addAnimation("AttackDem",demonAttack);
              break;
      case 2: enemy.addAnimation("AttackDrag",dragonAttack);
              break;
      case 3: enemy.addAnimation("AttackLiz",lizardAttack);
              break;
      case 4: enemy.addAnimation("AttackMed",medusaAttack);
              break;        
      default: break;
    }
           
    //obstacle.scale = 0.5;
    enemy.lifetime = 700;
    //add each obstacle to the group
    enemiesGroup.add(enemy);
  }

  

    }

    function reset(){
      gameState = PLAY;
      gameOver.visible = false;
      restart.visible = false;
      
      enemiesGroup.destroyEach();

      genie = createSprite(650,350,50,50);
      genie.setCollider("circle",0,0,40);
      genie.addAnimation("Idle",genieIdle);
      genie.addAnimation("Attack",genieAttack);
      genie.addAnimation("Death",genieDeath);
      
      //genie.addAnimation("Idle",genieIdle);
      
      //if(localStorage["HighestScore"]<score){
        //localStorage["HighestScore"] = score;
      //}
      //console.log(localStorage["HighestScore"]);
      
      score = 0;
      
    }

  
