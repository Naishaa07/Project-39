var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, b1, bImage;
var score, endgame;
endgame = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bImage = loadImage("background.jpg")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {

  createCanvas(600, 300);
  b1 = createSprite(300, 150, 600, 300);
  b1.addImage(bImage);
  b1.scale = 1.5;
  //b1.x=b1.width/2;
  monkey = createSprite(100, 215, 20, 20)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 275, 600, 15)
  //ground.velocityX=-6;
  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;

}


function draw() {
  if (gamestate === PLAY) {
    background("white");
    drawSprites();

    b1.velocityX = -6;
    if (ground.x > 0) {
      ground.x = ground.width / 2;
      ground.visible = false;
    }
    if (b1.x < 0) {
      b1.x = b1.width / 3;
    }
    if (FoodGroup.isTouching(monkey)) {
      score = score + 2;
      FoodGroup.destroyEach();
    }
    switch (score) {
      case 10:
        monkey.scale = 0.12

        break;
      case 20:
        monkey.scale = 0.14

        break;
      case 30:
        monkey.scale = 0.16

        break;
      case 40:
        monkey.scale = 0.18

        break;
      default:
        break;

    }

    if (obstacleGroup.isTouching(monkey)) {
      score = 0;
      monkey.scale = 0.1;
      endgame = endgame + 1;
    }
    if (endgame === 2) {
      gamestate = END;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    obstacleGroup.collide(monkey);

    if (keyDown("space") && monkey.y >= 200 && monkey.scale < 21) {
      monkey.velocityY = -12
    }
    if (keyDown("space") && monkey.y >= 250 && monkey.scale > 20) {
      monkey.velocityY = -12
    }

    stroke("white")
   // strokeWeight(15)
    text("score : " + score, monkey.x + 150, monkey.y - 110)
    bananas();
    obstacles();
    camera.position.y = monkey.y;
    camera.position.x = monkey.x
  }
  if (gamestate === END) {
    background("white");
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    text("GAME OVER", 200, 125);
    text("PRESS SPACE TO RESTART", 175, 175);

  }
  if (keyWentDown("space") && gamestate === END) {
    gamestate = PLAY;

  }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 100, 10, 10)
    banana.addImage(bananaImage)
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.y = Math.round(random(120, 200))
    banana.lifetime = 150;
    FoodGroup.add(banana);
  }


}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 220, 20, 20)
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 150;
    obstacle.scale = 0.1
    obstacleGroup.add(obstacle);
  }


}