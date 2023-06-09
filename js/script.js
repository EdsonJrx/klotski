//VARIAVEIS
const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');


//TECLAS
var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

//MOVIMENTOS
var mvLeft = mvUp = mvRight = mvDown = false;


let character
let select = false
const W = 100
const H = 100
const sprites = new Image()
sprites.src = './assets/sprite.png'

const bloks = [
  {'id':0, 'sX':0*W, 'sY':0*H, 'sW':1*W, 'sH':2*H, 'dX':0*W, 'dY':0*H, 'dW':1*W, 'dH':2*H, 'speed':0, 'contrast':"none", 'hold':false},//1
  {'id':1, 'sX':1*W, 'sY':0*H, 'sW':2*W, 'sH':2*H, 'dX':1*W, 'dY':0*H, 'dW':2*W, 'dH':2*H, 'speed':0, 'contrast':"none", 'hold':false},//2
  {'id':2, 'sX':3*W, 'sY':0*H, 'sW':1*W, 'sH':2*H, 'dX':3*W, 'dY':0*H, 'dW':1*W, 'dH':2*H, 'speed':0, 'contrast':"none", 'hold':false},//3
  {'id':3, 'sX':0*W, 'sY':2*H, 'sW':1*W, 'sH':2*H, 'dX':0*W, 'dY':2*H, 'dW':1*W, 'dH':2*H, 'speed':0, 'contrast':"none", 'hold':false},//4
  {'id':4, 'sX':1*W, 'sY':2*H, 'sW':2*W, 'sH':1*H, 'dX':1*W, 'dY':2*H, 'dW':2*W, 'dH':1*H, 'speed':0, 'contrast':"none", 'hold':false},//5
  {'id':5, 'sX':3*W, 'sY':2*H, 'sW':1*W, 'sH':2*H, 'dX':3*W, 'dY':2*H, 'dW':1*W, 'dH':2*H, 'speed':0, 'contrast':"none", 'hold':false},//6
  {'id':6, 'sX':0*W, 'sY':4*H, 'sW':1*W, 'sH':1*H, 'dX':0*W, 'dY':4*H, 'dW':1*W, 'dH':1*H, 'speed':0, 'contrast':"none", 'hold':false},//7
  {'id':7, 'sX':1*W, 'sY':3*H, 'sW':1*W, 'sH':1*H, 'dX':1*W, 'dY':3*H, 'dW':1*W, 'dH':1*H, 'speed':0, 'contrast':"none", 'hold':false},//8
  {'id':8, 'sX':2*W, 'sY':3*H, 'sW':1*W, 'sH':1*H, 'dX':2*W, 'dY':3*H, 'dW':1*W, 'dH':1*H, 'speed':100, 'contrast':"contrast(0.5)", 'hold':true},//9
  {'id':9, 'sX':3*W, 'sY':4*H, 'sW':1*W, 'sH':1*H, 'dX':3*W, 'dY':4*H, 'dW':1*W, 'dH':1*H, 'speed':0, 'contrast':"none", 'hold':false},//10
]
character = bloks[8]

//INPUTS
cnv.addEventListener('mousedown',function(e){
  select = true
  let mX = e.offsetX
  let mY = e.offsetY
  for(i in bloks){
    let blk = bloks[i]
    if(mX >= (blk.dX) && mX <= ((blk.dX + blk.dW)) && mY >= (blk.dY) && mY <= ((blk.dY + blk.dH))){
      blk.speed = 100
      blk.contrast = "contrast(0.5)"
      blk.hold = true
      character = blk
      console.log(character.dY)
    }else{
      blk.contrast = "none"
    }
  }
},false)

cnv.addEventListener('mousemove', function(e){
  if(select){
    // character.dX += e.offsetX%100
    // character.dY += e.offsetY%100
    // console.log("x:"+character.dX)
    // console.log("y:"+character.dY)
  }
},false)

// cnv.addEventListener('mouseup', function(e){
//   select = false
//   for(i in bloks){
//     bloks[i].speed = 0
//     bloks[i].contrast = "none"
//   }
// },false)

//QUANDO SETAS PRESIONADAS
window.addEventListener('keydown', function(e){
  var key  = e.keyCode
  switch(key){
      case LEFT:
          mvLeft = true
          break;
      case UP:
          mvUp = true
          break;
      case RIGHT:
          mvRight = true
          break;
      case DOWN:
          mvDown = true
          break;
  }
},false)
//QUANTDO SETAS DESCLICADAS
window.addEventListener('keyup', function(e){
  var key  = e.keyCode
  switch(key){
      case LEFT:
          mvLeft = false
          break;
      case UP:
          mvUp = false
          break;
      case RIGHT:
          mvRight = false
          break;
      case DOWN:
          mvDown = false
          break;
  }
},false)

//FUNÇÕES
function drawblocks(){
  for( i in bloks){
    blk = bloks[i]
    ctx.filter = blk.contrast
    ctx.drawImage(
      sprites,
      blk.sX, blk.sY,
      blk.sW, blk.sH,
      blk.dX, blk.dY,
      blk.dW, blk.dH
    )
  }
}

let halfWidth = function(crt){
    return crt.dW/2
}
let halfHeight = function(crt){
    return  crt.dH/2;
}
let centerX = function(crt){
    return crt.dX + halfWidth(crt);
}
let centerY = function(crt){
    return crt.dY + halfHeight(crt);
}
function blockRect(r1, r2){
    
  //r1 = obj bloqueado
  //r2 = obj parede
  //catetos
  console.log(r1.dY)
  var catX = centerX(r1) - centerX(r2);
  var catY = centerY(r1) - centerY(r2);

  //soma das metades
  var sumHalfWidth = halfWidth(r1) + halfWidth(r2);
  var sumHalfHeight = halfHeight(r1) + halfHeight(r2);

  if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight){
      console.log(Math.abs(catX))
      console.log(centerY(r1))
      console.log(centerY(r2));
      console.log(r1.id)
      console.log(halfHeight(r1))
      console.log(r1.dY)
      console.log(r2.dY)
      // r2.visible = false;
      // setTimeout(function(){
      //    r2.visible = true;
      // },1000)
      var overlapX = sumHalfWidth - Math.abs(catX);
      var overlapY = sumHalfHeight - Math.abs(catY);


      if(overlapX >= overlapY){//colisão na vertical
          if(catY > 0){//colisão por cima
              r1.dY += overlapY;

          } else {// colisão por baixo
              r1.dY -= overlapY
          }
      } else {//colisão horizontal
          if(catX > 0){// colisão pela esquerda
              r1.dX += overlapX
          } else {// colisão pela direita
              r1.dX -= overlapX
          }
      }
  }
}

function loop(){
  window.requestAnimationFrame(loop,cnv);
  update();
  render();
}

function update(){

  if(mvLeft && !mvRight){
    character.dX -= character.speed
    bloks[character.id].dX = character.dX
    mvLeft = false
  };
  if(mvRight && !mvLeft){
      character.dX += character.speed
      bloks[character.id].dX = character.dX
      mvRight = false
  };
  if(mvUp && !mvDown){
      character.dY -= character.speed
      bloks[character.id].dY = character.dY
      mvUp= false
  };
  if(mvDown && !mvUp){
      character.dY += character.speed
      bloks[character.id].dY = character.dY
      mvDown= false
  }
  //COLISOES
  for(i in bloks){
    var bloco = bloks[i];
    if(!bloco.hold){
      blockRect(character, bloco);
    }
  }
  //LIMITES DA TELA
  character.dX = Math.max(0, Math.min(cnv.width-character.dW, character.dX))
  character.dY = Math.max(0, Math.min(cnv.height-character.dH, character.dY))
}

function render(){
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  drawblocks()
}

loop()