
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

function Drawing(){
    this.arrayShapes = new Map();
}

Drawing.prototype.getForms = function(){
    return this.arrayShapes;
}

Drawing.prototype.addShape = function(id,shape){
    this.arrayShapes.set(id,shape);
}

function Shape (epTrait,color,posStartx,posStarty){
    this.epTrait = epTrait
    this.color = color
    this.posStartx = posStartx
    this.posStarty = posStarty
    this.name=""
    console.log("colortest", this.color)
    console.log("trait", this.epTrait
    )
};



function Rectangle(posStartx, posStarty,larg,haut,ep,color){
    Shape.call(this,ep,color,posStartx,posStarty)
    this.posFinalx = larg
    this.posFinaly = haut
    this.name="Rectangle"
}
Rectangle.prototype = new Shape()

Rectangle.prototype.getInitX=function(){
    console.log(this.posStartx)
    return this.posStartx

}
Rectangle.prototype.getInitY=function(){
    console.log(this.posStarty)
    return this.posStarty
}
Rectangle.prototype.getFinalX=function(){
    return this.posFinalx
}
Rectangle.prototype.getFinalY=function(){
    return this.posFinaly
}



function Line(posStartx, posStarty,posFinalx, posFinaly,ep, color){
    Shape.call(this,ep,color,posStartx,posStarty)
    this.posFinx = posFinalx
    this.posFiny = posFinaly
    this.name="Ligne"
};
Line.prototype = new Shape()
Line.prototype.getInitX=function(){
    return this.posStartx
};
Line.prototype.getInitY=function(){
    return this.posStarty
};
Line.prototype.getFinalX=function(){
    return this.posFinx
};
Line.prototype.getFinalY=function(){
    return this.posFiny
}