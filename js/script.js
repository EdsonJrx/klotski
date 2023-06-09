(function(){
    
    //VARIAVEIS
    var cnv = document.querySelector('canvas');
    var ctx = cnv.getContext('2d');
    const sprt = new Image()
    sprt.src = './assets/sprite.png'

    //TECLAS
    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

    var key = 0

    var qdr
    var clicado = false

    //MOVIMENTOS
    var mvLeft = mvUp = mvRight = mvDown = false;

    //ARRAYS
    var sprites = [];
    var blocks = [];

    //OBJETOS
    var character = new Sprite(0, 0, 1, 2, 0, 0, 1, 2, 0, "none");
    character.speed = 100;
    sprites.push(character);
    var char = character

    var block1 = new Sprite(1, 0, 2, 2, 1, 0, 2, 2, 0, "none")
    sprites.push(block1);
    blocks.push(block1)

    var block2 = new Sprite(3, 0, 1, 2, 3, 0, 1, 2, 0, "none")
    sprites.push(block2);
    blocks.push(block2)
    
    var block3 = new Sprite(0, 2, 1, 2, 0, 2, 1, 2, 0, "none")
    sprites.push(block3);
    blocks.push(block3)

    var block4 = new Sprite(1, 2, 2, 1, 1, 2, 2, 1, 0, "none")
    sprites.push(block4);
    blocks.push(block4)

    var block5 = new Sprite(3, 2, 1, 2, 3, 2, 1, 2, 0, "none")
    sprites.push(block5);
    blocks.push(block5)

    var block6 = new Sprite(0, 4, 1, 1, 0, 4, 1, 1, 0, "none")
    sprites.push(block6);
    blocks.push(block6)

    var block7 = new Sprite(1, 3, 1, 1, 1, 3, 1, 1, 0, "none")
    sprites.push(block7);
    blocks.push(block7)

    var block8 = new Sprite(2, 3, 1, 1, 2, 3, 1, 1, 0, "none")
    sprites.push(block8);
    blocks.push(block8)

    var block9 = new Sprite(3, 4, 1, 1, 3, 4, 1, 1, 0, "none")
    sprites.push(block9);
    blocks.push(block9)



    //ENTRADAS
    window.addEventListener('keydown', function(e){
        key  = e.keyCode
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
    window.addEventListener('keyup', function(e){
        key  = e.keyCode
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

    //MOUSE
    window.addEventListener('mousedown',function(e){
        clicado = true
        qdr = ((Math.floor(e.offsetX/100))+(Math.floor(e.offsetY/100))*4)+1
        blocks = []
        for(var i in sprites){
            var spr = sprites[i]
            var cateX = spr.dX + spr.dW
            var cateY = spr.dY + spr.dH
            if(e.offsetX >= spr.dX && e.offsetX <= cateX && e.offsetY >= spr.dY && e.offsetY <= cateY){
                spr.contrast = "contrast(0.5)"
                spr.speed = 100
                char = spr
            } else {
                spr.contrast = "none"
                spr.speed = 0
                blocks.push(spr)
            }
        }
    },false)

    cnv.addEventListener('mousemove',function(e){
        var Cqdr = ((Math.floor(e.offsetX/100))+(Math.floor(e.offsetY/100))*4)+1
        if(qdr != Cqdr && clicado){
            if(qdr%2==0){
                if(qdr > Cqdr && Cqdr%2 == 0){
                    mvUp = true
                    key = 38
                    
                }
                if(qdr < Cqdr && Cqdr%2 == 0){
                    mvDown = true
                    key = 40

                }
                if(qdr > Cqdr && Cqdr%2 != 0){
                    mvLeft = true
                    key = 37

                }
                if(qdr < Cqdr && Cqdr%2 != 0){
                    mvRight = true
                    key = 39

                }
            } else {
                if(qdr > Cqdr && Cqdr%2 != 0){
                    mvUp = true
                    key = 38

                }
                if(qdr < Cqdr && Cqdr%2 != 0){
                    mvDown = true
                    key = 40

                }
                if(qdr > Cqdr && Cqdr%2 == 0){
                    mvLeft = true
                    key = 37

                }
                if(qdr < Cqdr && Cqdr%2 == 0){
                    mvRight = true
                    key = 39
                }
            }
            qdr = ((Math.floor(e.offsetX/100))+(Math.floor(e.offsetY/100))*4)+1
        }
    },false)

    window.addEventListener('mouseup', function(e){
        clicado = false
        char.contrast = 'none'

    },false)



    //FUNCÕES
    function drawblocks(){
        for( i in sprites){
          sprB = sprites[i]
          ctx.filter = sprB.contrast
          ctx.drawImage(
            sprt,
            sprB.sX, sprB.sY,
            sprB.sW, sprB.sH,
            sprB.dX, sprB.dY,
            sprB.dW, sprB.dH
          )
        }
    }
    
    function loop(){
        window.requestAnimationFrame(loop,cnv)
        update();
        render();
    };

    function update(){
        if(mvLeft && !mvRight ){
            char.dX -= char.speed
            mvLeft = false
        };
        if(mvRight && !mvLeft){
            char.dX += char.speed
            mvRight = false
        };
        if(mvUp && !mvDown){
            char.dY -= char.speed
            mvUp = false
        };
        if(mvDown && !mvUp){
            char.dY += char.speed
            mvDown = false
        }
        //LIMiTES DA TELA
        char.dX = Math.max(0, Math.min(cnv.width-char.dW, char.dX));
        char.dY = Math.max(0, Math.min(cnv.height-char.dH, char.dY));
        
        //COLISOES
        if(blocks.length != sprites.length){
            for(var i in blocks){
                var blk = blocks[i]
                blockRect(char,blk,key);
            }
        }

    };
    
    function render(){
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        drawblocks()
    };

    loop();
}());