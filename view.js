
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.


Rectangle.prototype.paint = function (ctx) {
    //TODO Manager color
    Shape.prototype.paint.call(this,ctx);
    console.log("Rect", this.getInitX(), this.getInitY(),this.getFinalX(), this.getFinalY())
    ctx.beginPath();
    ctx.rect(this.getInitX(), this.getInitY(), this.getFinalX(), this.getFinalY());
    ctx.stroke();
};

Line.prototype.paint = function (ctx) {
    //TODO Manager color
    Shape.prototype.paint.call(this,ctx);
    console.log("Line", this.getInitX(), this.getInitY(),this.getFinalX(), this.getFinalY())
    ctx.beginPath();
    ctx.moveTo(this.getInitX(), this.getInitY());
    ctx.lineTo(this.getFinalX(), this.getFinalY());
    ctx.stroke();
};

Drawing.prototype.paint = function (ctx) {
    //console.log(this.getForms());
    Shape.prototype.paint.call(this,tx);
    ctx.fillStyle = '#F0F0F0'; // set canvas' background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function (eltDuTableau) {
        // now fill the canvas
        eltDuTableau.paint(ctx);

    });
};

Shape.prototype.paint = function (ctx) {
    //TODO Manager color
    console.error(this.color)
    ctx.strokeStyle = this.color
    ctx.width = this.epTrait
};

