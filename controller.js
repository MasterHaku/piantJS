
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = document.getElementById('colour').valueOf().value;
	this.currentShape = 0;


	document.getElementById('butRect').onclick = (_)=>this.currEditingMode=editingMode.rect;	
	document.getElementById('butLine').onclick = (_)=>this.currEditingMode=editingMode.line;
	document.getElementById('spinnerWidth').onchange = (e)=>this.currLineWidth=e.target.value;	
	document.getElementById('colour').onchange = (e)=>this.currColour=e.target.value;	
	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
};


Pencil.prototype.onInteractionStart = function (dnd) {
	if (document.getElementById('butRect').checked) {
		this.currentShape = new Rectangle(dnd.posInitx, dnd.posInity, dnd.posFinalx, dnd.posFinaly, this.currLineWidth, this.currColour)
	} else if (document.getElementById('butLine').checked) {
		this.currentShape = new Line(dnd.posInitx, dnd.posInity, dnd.posFinalx, dnd.posFinaly, this.currLineWidth, this.currColour)
	}
	drawing.paint(ctx,canvas)
	this.currentShape.paint(ctx)
}


Pencil.prototype.onInteractionUpdate = function (dnd) {
	if (this.currEditingMode === editingMode.rect) {
		this.currentShape = new Rectangle(dnd.posInitx, dnd.posInity, dnd.posFinalx-dnd.posInitx, dnd.posFinaly-dnd.posInity, this.currLineWidth, this.currColour)
	} else if (this.currEditingMode === editingMode.line) {
		this.currentShape = new Line(dnd.posInitx, dnd.posInity, dnd.posFinalx, dnd.posFinaly, this.currLineWidth, this.currColour)
	}
	drawing.paint(ctx,canvas)
	this.currentShape.paint(ctx)
}

Pencil.prototype.onInteractionEnd = function (dnd) {
    var id = generateUUID();
    drawing.addShape(id, this.currentShape);
    drawing.paint(ctx, canvas);
    updateShapeMap(id, this.currentShape); // Ajoute l'élément dans le DOM

    // Associer l'événement de suppression
    document.getElementById("remove" + id).addEventListener('click', (e) => {
        removeShape(drawing, id, ctx, canvas);
    });
};

function updateShapeMap(id, shape) {
    const shapeList = document.getElementById("shapeList");
    const listItem = document.createElement("li");
    listItem.className = "shape-item"; // Applique la classe pour le flex
    listItem.id = "liRemove" + id;
    listItem.innerHTML = `
        <span class="shape-name">${shape.name}</span>
        <button id="remove${id}" class="btn btn-danger btn-sm remove-btn">Remove</button>
    `;
    shapeList.appendChild(listItem);
}


function removeShape(drawing, id, ctx, canvas) {
	console.log(drawing.arrayShapes);
    // Vérifie si arrayShape existe et est une Map
        // Suppression de la forme dans shapeArray (Map)
        drawing.arrayShapes.delete(id);
        // Suppression de l'élément dans la liste DOM
        const listItem = document.getElementById('liRemove' + id);
        if (listItem) {
            listItem.remove();
        }
        // Redessiner le canvas pour mettre à jour la vue sans la forme supprimée
        drawing.paint(ctx, canvas);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}