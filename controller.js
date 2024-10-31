
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
	this.currEditingMode = editingMode.line;
	this.currLineWidth = 5;
	this.currColour = '#ff1100';
	this.currentShape = 0;

	// Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

	new DnD(canvas, this);

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
};


Pencil.prototype.onInteractionStart = function (dnd) {
	if (document.getElementById('butRect').checked) {
		this.currentShape = new Rectangle(dnd.posInitx, dnd.posInity, dnd.posFinalx-dnd.posInitx, dnd.posFinaly-dnd.posInity, this.currLineWidth, this.currColour)
	} else if (document.getElementById('butLine').checked) {
		this.currentShape = new Line(dnd.posInitx, dnd.posInity, dnd.posFinalx-dnd.posInitx, dnd.posFinaly-dnd.posInity, this.currLineWidth, this.currColour)
	}
	drawing.paint(ctx,canvas)
	this.currentShape.paint(this.ctx)
}


Pencil.prototype.onInteractionUpdate = function (dnd) {
	if (document.getElementById('butRect').checked) {
		this.currentShape = new Rectangle(dnd.posInitx, dnd.posInity, dnd.posFinalx-dnd.posInitx, dnd.posFinaly-dnd.posInity, this.currLineWidth, this.currColour)
	} else if (document.getElementById('butLine').checked) {
		this.currentShape = new Line(dnd.posInitx, dnd.posInity, dnd.posFinalx-dnd.posInitx, dnd.posFinaly-dnd.posInity, this.currLineWidth, this.currColour)
	}
	drawing.paint(ctx,canvas)
	this.currentShape.paint(this.ctx)
}

Pencil.prototype.onInteractionEnd = function (dnd) {
	drawing.shapeArray.push(this.currentShape)
	drawing.paint(ctx,canvas)
	this.currentShape.paint(this.ctx)
}
