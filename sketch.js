var canvas, backgroundImage, MainScreen;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var Tanks,Tank1,Tank2,Tank3,Tank4;
var TankImage1,TankImage2,TankImage3,TankImage4;
var bullet,bulletGroup,bulletImage;


function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  bulletGroup = new Group();
}
function preload(){
  TankImage1 = loadImage("Images/Tank1.png");
  TankImage2 = loadImage("Images/Tank1.png");
  TankImage3 = loadImage("Images/Tank1.png");
  TankImage4 = loadImage("Images/Tank1.png");
  backgroundImage = loadImage("Images/Ground.png");
  bulletImage = loadImage("Images/Bullet.png");
  MainScreen = loadImage("Images/TankBG.jpg");

}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
 // text( "(" +mouseX +","+ mouseY+")",mouseX,mouseY);
}
