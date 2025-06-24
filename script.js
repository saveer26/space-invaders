const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 700;
// Collision Function
function isColliding(rect1, rect2) {
  return !(rect1.x > rect2.x + rect2.width ||
             rect1.x + rect1.width < rect2.x ||
             rect1.y > rect2.y + rect2.height ||
             rect1.y + rect1.height < rect2.y);
}
const player = {
    x:0,
    y:canvas.height-100,
    vx:0,
    speed:7,
    width:100,
    height:100,
    sprite:null
}
player.x = canvas.width/2-player.width/2;
player.sprite = new Image();
player.sprite.src = "https://upload.wikimedia.org/wikipedia/commons/1/1f/Space-Invaders-ship.png";

function drawPlayer(){
    ctx.drawImage(player.sprite,player.x,player.y,player.width,player.height);
}

function keydown(e){
    if(e.key == "ArrowRight") {
      player.vx = player.speed;
    }
    if(e.key == "ArrowLeft") {
      player.vx = player.speed * -1;
    }
    if(e.key === " "){
      activateLaser()
    }
}
  function keyUp(e){
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      player.vx = 0;
    }
}
function movePlayer(){
    player.x += player.vx;
    if(player.x <= 0){
      player.x = 0
   }
    if(player.x >= canvas.width - player.width){
      player.x = canvas.width - player.width
    }
}
background = new Image()
background.src = "https://t4.ftcdn.net/jpg/08/23/16/77/360_F_823167736_3khXA7u6htYmqY0gKeRKmofnr6Q43Rkg.jpg"
function drawBackground() {
  ctx.drawImage(background,0,0,canvas.width,canvas.height);
}
let enemies = [];
let enemyIndex = 0;
let lasers = [];
let lasersIndex = 0;
for(let i = 0; i < 10; i++){
  let laserSound = new Audio("laser.mp3");
  let laser = {
    x:0,
    y:0,
    vy:0,
    width:5,
    height:20,
    speed:5,
    active:false,
    audio:laserSound,
    color: "#ff2411"
  }
  lasers.push(laser);
  let enemy = {
    x:player.x,
    y:0,
    vy:0,
    width:50,
    height:50,
    speed:1,
    active:true,
    sprite:null
  } 
  enemy.sprite = new Image();
  enemy.sprite.src = "https://www.pngall.com/wp-content/uploads/13/Space-Invaders-PNG-Clipart.png";
  enemies.push(enemy);
}
function drawLasers(){
  for(let i = 0;i < lasers.length; i++){
  if(lasers[i].active){
    ctx.fillStyle = lasers[i].color;
  ctx.fillRect(lasers[i].x,lasers[i].y,lasers[i].width,lasers[i].height);
  }  
}

}
 
function drawEnemy(){
  for(let i = 0; i < enemies.length; i++){
    if(enemies[i].active){
      ctx.drawImage(enemies[i].sprite,enemies[i].x,enemies[i].y,enemies[i].width,enemies[i].height)
    }
  }
}

function manageLasers(){
  for(let i = 0; i < lasers.length; i++){
    if(lasers[i].active){
      lasers[i].y -= lasers[i].speed;
      if(lasers[i].y <= 0){
        lasers[i].active = false;
      }
    }
  }
}
function manageEnemies(){
  for(let i = 0;i < enemies.length; i++){
    if(enemies[i].active){
      enemies[i].y += enemies[i].speed
      for(let j = 0; j < lasers.length; j++){
        if(isColliding(enemies[i],lasers[j])){
          enemies[i].active = false;
        }
      }
      
    }
  }
}
function activateLaser(){
  if(lasers[lasersIndex].active != true){
    lasers[lasersIndex].audio.play();
    lasers[lasersIndex].active = true;
    lasers[lasersIndex].x = player.x + player.width/2 - lasers[lasersIndex].width
    lasers[lasersIndex].y = player.y;
  }
  lasersIndex++
  if(lasersIndex >= lasers.length){
    lasersIndex = 0
  }
}
document.addEventListener("keyup",keyUp);
document.addEventListener("keydown",keydown);
function update(){
    drawBackground();
    drawPlayer();
    movePlayer();
    drawLasers();
    drawEnemy();
    manageLasers();
    manageEnemies();
    requestAnimationFrame(update);
}
update()