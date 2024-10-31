
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.


Rectangle.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.posStartx, this.posStarty, this.posFinalx, this.posFinaly);
    ctx.lineWidth = this.epTrait;
    ctx.strokeStyle = this.color;
    ctx.stroke();
};

Line.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.posStartx, this.posStarty);
    ctx.lineTo(this.posFinx, this.posFiny);
    ctx.lineWidth = this.epTrait;
    ctx.strokeStyle = this.color;
    ctx.stroke();
};

Drawing.prototype.paint = function(ctx) {
    // Définir la couleur de fond du canvas
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Parcourir et dessiner chaque forme
    this.getForms().forEach(function(eltDuTableau) {
        eltDuTableau.paint(ctx);
    });
};

Shape.prototype.paint = function (ctx) {
    //TODO Manager color
    console.error(this.color)
    //ctx.strokeStyle = this.color
    //ctx.width = this.epTrait
}.bind(this);

