const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope,rope2,rope3;
var fruit_con,fruit_con2,fruit_con3;

var bg_img;
var food;
var rabbit;
var bunny;

var button,button2,button3;
var muteButton;

var blink,eat,sad;

var bkSound,cutSound,sadSound,eatingSound,airSound;
var balloon;

function preload()
{
  bg_img = loadImage('./Assets/background.png');
  food = loadImage('./Assets/melon.png');
  rabbit = loadImage('./Assets/Rabbit-01.png');
  blink = loadAnimation("./Assets/blink_1.png","./Assets/blink_2.png","./Assets/blink_3.png");
  eat = loadAnimation("./Assets/eat_0.png","./Assets/eat_1.png","./Assets/eat_2.png","./Assets/eat_3.png","./Assets/eat_4.png");
  sad = loadAnimation("./Assets/sad_1.png","./Assets/sad_2.png","./Assets/sad_3.png");
  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
  bkSound = loadSound("./Assets/sound1.mp3");
  cutSound = loadSound("./Assets/rope_cut.mp3");
  sadSound = loadSound("./Assets/sad.wav");
  eatingSound = loadSound("./Assets/eating_sound.mp3");
  airSound = loadSound("./Assets/air.wav");
}

function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 20;
  eat.frameDelay = 20; 

  bunny = createSprite(170,canH-80,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  bunny.addAnimation("blinking",blink);
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);
  bunny.changeAnimation("blinking");

  ground = new Ground(200,canH,600,20);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  button = createImg("./Assets/cut_button.png");
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("./Assets/cut_button.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg("./Assets/cut_button.png");
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  balloon = createImg("./Assets/balloon.png");
  balloon.position(10,250);
  balloon.size(150,100);
  balloon.mouseClicked(airBlow);

  bkSound.play()
  bkSound.setVolume(0.5);

  muteButton = createImg("./Assets/mute.png");
  muteButton.position(450,20);
  muteButton.size(50,50);
  muteButton.mouseClicked(mute);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);

  
  
}

function draw() 
{
  background(51);
  

  image(bg_img,0,0,displayWidth+80,displayHeight+500);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }


  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)== true){
    bunny.changeAnimation("eating");
    eatingSound.play();
  }

  if(fruit!=null && fruit.position.y>=650) { 
  bunny.changeAnimation('crying'); 
  bkSound.stop(); 
  sadSound.play(); 
  fruit=null;
   
 }

  drawSprites()

}

function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit)
      fruit=null
      return true
    }else{
      return false
    }
  }
}

function drop(){
  cutSound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2(){
  cutSound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}

function drop3(){
  cutSound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  airSound.play();
}

function mute(){
  if(bkSound.isPlaying()){
    bkSound.stop();
  }else{
    bkSound.play();
  }
}
