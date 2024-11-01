// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.

/**
 * Pienture d'une ligne
 * @param {*} ctx 
 */
Line.prototype.paint = function(ctx) {
    ctx.beginPath(); //Debut du dessin
    ctx.moveTo(this.posStartx, this.posStarty); //En mouvement
    ctx.lineTo(this.posFinx, this.posFiny); // Position finale
    ctx.lineWidth = this.epTrait; //Epaisseur du trait
    ctx.strokeStyle = this.color; //Couleur du trait
    ctx.stroke(); 
};

/**
 * Peinture d'un rectangle
 * @param {*} ctx 
 */
Rectangle.prototype.paint = function(ctx) {
    ctx.beginPath();
    ctx.rect(this.posStartx, this.posStarty, this.posFinalx, this.posFinaly);
    ctx.lineWidth = this.epTrait;
    ctx.strokeStyle = this.color;
    ctx.stroke();
};

/**
 * Couleur du canva et affichage de chaque element dessiné 
 * @param {*} ctx 
 */
Drawing.prototype.paint = function(ctx) {
    ctx.fillStyle = '#F0F0F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.getForms().forEach(function(eltDuTableau) {
        eltDuTableau.paint(ctx);
    });
};

/**
 * Affichage du bouton remove et du nom de la forme associée
 * @param {string} id 
 * @param {Map} shape 
 */
function updateShapeMap(id, shape) {
    const shapeList = document.getElementById("shapeList"); //Selection de la bonne balise HTML
    const listItem = document.createElement("li"); //Ajout d'elements a la liste des boutons
    listItem.className = "shape-item"; 
    listItem.id = "liRemove" + id;
    listItem.innerHTML = `
        <span class="shape-name">${shape.name}</span>
        <button id="remove${id}" class="btn btn-danger btn-sm remove-btn">Supprimer</button>
    `;
    shapeList.appendChild(listItem); //Ajout du HTML préparé
}

/**
 * Assignations de l'epaisseur et de la couleur deplacées dans les paint correspondants (bug d'affichage sinon)
 * @param {*} ctx 
 */
Shape.prototype.paint = function (ctx) {   
}
