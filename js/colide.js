function blockRect(r1, r2, key){
    //r1 = obj bloqueado
    //r2 = obj parede
    //catetos
    var catX = r1.centerX() - r2.centerX();
    var catY = r1.centerY() - r2.centerY();

    //soma das metades
    var sumHalfWidth = r1.halfWidth() + r2.halfWidth();
    var sumHalfHeight = r1.halfHeight() + r2.halfHeight();

    if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight){
       
        switch(key){
            case 37:
                r1.dX += r1.speed
                break;
            case 38:
                r1.dY += r1.speed
                break;
            case 39:
                r1.dX -= r1.speed
                break;
            case 40:
                r1.dY -= r1.speed
                break;
        }
    }
}