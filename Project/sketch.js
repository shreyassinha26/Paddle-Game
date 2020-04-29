var ball,ballimg,paddle , paddleimg;
var gamestate , PLAY ,  SERVE;

function preload() {
  /* preload your images here of the ball and the paddle */
  ballimg = loadImage("ball.png");
  paddleimg = loadImage("paddle.png");
}
function setup() {
  createCanvas(400, 400);
   /* create the Ball Sprite and the Paddle Sprite */
  ball = createSprite(200 , 200 , 10 , 10);
  paddle = createSprite(375 , 200 , 10 , 10);
  
  /* assign the images to the sprites */
  ball.addImage(ballimg);
  paddle.addImage(paddleimg);
  ball.scale = 0.5;
  
  /* give the ball an initial velocity of 9 in the X direction */
  ball.velocityX = 9;
  
  PLAY = 0;
  
  SERVE = 2
  gamestate = PLAY;
  
  ball.setCollider("circle" , 0 , 0 , 5);
  
}

function draw() {
  background(205,153,0);
  /* create Edge Sprites here */
  edges = createEdgeSprites();
  
  /* Allow the ball sprite to bounceOff the left, top and bottom edges only, leaving the right edge of the canvas to be open. */
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);

  /* Allow the ball to bounceoff from the paddle */
  ball.bounceOff(paddle , randomVelocity);
  /* Also assign a collision callback function, so that the ball can have a random y velocity, making the game interesting */
 
  /* Prevent the paddle from going out of the edges */ 
  
  
  if(keyDown(UP_ARROW) && gamestate == PLAY)
  {
     /* what should happen when you press the UP Arrow Key */
    paddle.y = paddle.y-20;
  }
  
  if(keyDown(DOWN_ARROW) && gamestate == PLAY)
  {
    /* what should happen when you press the UP Arrow Key */
    paddle.y = paddle.y+20;
  }
  
  if(ball.x >=400 || gamestate == SERVE){
    ball.setVelocity(0 , 0);
    gamestate = SERVE;
    fill("white");
    text("press space to serve" , 160, 100);
    ball.x = 200 ;
    ball.y = 200;
    paddle.x = 375;
    paddle.y = 200;
    
  }
  if(gamestate == SERVE && keyDown("space")){
    ball.velocityX = 9;
    gamestate = PLAY;
      
  }
  
  paddle.collide(edges);
  drawSprites();
  
}

function randomVelocity()
{
  /* this function gets called when the ball bounces off the paddle */
  /* assign the ball a random vertical velocity, so it bounces off in random direction */
  ball.velocityY = Math.round(random(10 , -10));
}

