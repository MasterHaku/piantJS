var editingMode = { rect: 0, line: 1 }; // Definition des deux modes possibles


/**
 * Constructeur du pinceau
 * @param {*} ctx 
 * @param {Drawing} drawing 
 * @param {canvas} canvas 
 */
function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line; //Changement du mode d'edition par defaut
    this.currLineWidth = 5; //Epaisseur du trait
    this.currColour = document.getElementById('colour').valueOf().value; //Selection de la couleur HTML par défaut
    this.currentShape = 0; //Line: forme par defaut

    //Ajout de recepteir d'evenements
    document.getElementById('butRect').onclick = (_) => this.currEditingMode = editingMode.rect; //Selection du mode de dessin Rectangle	
    document.getElementById('butLine').onclick = (_) => this.currEditingMode = editingMode.line; //Selecyion du mode de dessin Line
    document.getElementById('spinnerWidth').onchange = (e) => this.currLineWidth = e.target.value; //En cas de changement d'epaisseur
    document.getElementById('colour').onchange = (e) => this.currColour = e.target.value; //En cas de changement de couleur

    new DnD(canvas, this); //Initialistation du Drag And Drop
};


/**
 * Gestion du debut du clic
 * @param {DnD} dnd 
 */
Pencil.prototype.onInteractionStart = function (dnd) {

    //Switch permets l'ajout plus simple de nouvelles formes
    switch (editingMode) {
        case 0:
            this.currentShape = new Rectangle(dnd.posInitx, dnd.posInity, dnd.posFinalx, dnd.posFinaly, this.currLineWidth, this.currColour) //Initialisation d'un Rectangle
        case 1:
            this.currentShape = new Line(dnd.posInitx, dnd.posInity, dnd.posFinalx, dnd.posFinaly, this.currLineWidth, this.currColour) //Intialisation d'une Line
    }
    drawing.paint(ctx, canvas) //Ajout sur le canva
    this.currentShape.paint(ctx) //Dessin de la forme visée

}

/**
 * Gestion du mouvement 
 * @param {DnD} dnd 
 */
Pencil.prototype.onInteractionUpdate = function (dnd) {
    switch (this.currEditingMode) {
        case editingMode.rect:
            this.currentShape = new Rectangle(dnd.posInitx, dnd.posInity, dnd.posFinalx - dnd.posInitx, dnd.posFinaly - dnd.posInity, this.currLineWidth, this.currColour) // Definition de la forme courante a rectangle 
        case editingMode.line:
            this.currentShape = new Line(dnd.posInitx, dnd.posInity, dnd.posFinalx, dnd.posFinaly, this.currLineWidth, this.currColour) // Definition de la forme courante a line
    }
    drawing.paint(ctx, canvas) //Ajout sur le canva
    this.currentShape.paint(ctx)//Dessin de la forme visée
}

/**
 * Fin de l'interaction
 * @param {DnD} dnd 
 */
Pencil.prototype.onInteractionEnd = function (dnd) {
    var id = generateUUID(); //Generation de l'id unique
    drawing.addShape(id, this.currentShape); //Ajout a la liste des formes
    drawing.paint(ctx, canvas);
    updateShapeMap(id, this.currentShape); //Ajout de l'element a la liste des formes
    document.getElementById("remove" + id).addEventListener('click', (e) => {
        removeShape(drawing, id, ctx, canvas); //Ajout de la capacité de supprerssion
    });
};


/**
 * Supprime la forme du canva, de la Map et supprime son bouton
 * @param {Drawing} drawing 
 * @param {String} id 
 * @param {*} ctx 
 * @param {canvas} canvas 
 */
function removeShape(drawing, id, ctx, canvas) {
    drawing.arrayShapes.delete(id);//Supprime l'element de la Map
    const listItem = document.getElementById('liRemove' + id);
    //Suppression de l'element dans la liste HTML
    if (listItem) {
        listItem.remove();
    }
    // Redessine le canvas pour mettre à jour la vue sans la forme supprimée
    drawing.paint(ctx, canvas);
}

/**
 * Methode trouvée sur Internet (oui c'est pas bien, mais c'est facile)
 * @returns {String}
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}