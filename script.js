const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 700;
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
}
  function keyUp(e){
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      player.vx = 0;
    }
}
function movePlayer(){
    player.x += player.vx;
}
background = new Image()
background.src = "https://t4.ftcdn.net/jpg/08/23/16/77/360_F_823167736_3khXA7u6htYmqY0gKeRKmofnr6Q43Rkg.jpg"
function drawBackground() {
  ctx.drawImage(background,0,0,canvas.width,canvas.height);
}

document.addEventListener("keyup",keyUp);
document.addEventListener("keydown",keydown);
function update(){
    drawBackground();
    drawPlayer();
    movePlayer();
    requestAnimationFrame(update);
}
update()