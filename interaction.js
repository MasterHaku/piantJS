
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  console.log(interactor);
  posInitx = 0
  posInity = 0
  posFinalx = 0
  posFinaly = 0
  inited = false
  this.interactor = interactor

  canvas.addEventListener('mousedown', this.mousePressed.bind(this), false);
  canvas.addEventListener('mousemove', this.moving.bind(this), false);
  canvas.addEventListener('mouseup', this.mouseDrop.bind(this), false);
  // Définir ici les attributs de la 'classe'

  // Developper les 3 fonctions gérant les événements

  // Associer les fonctions précédentes aux évènements du canvas.
};



DnD.prototype.mousePressed = function (evt) {
  this.posInitx = getMousePosition(canvas, evt).x
  this.posInity = getMousePosition(canvas, evt).y
  //console.log(getMousePosition(canvas,evt).x);
  this.inited = true
  this.interactor.onInteractionStart(this);
};


DnD.prototype.mouseDrop = function (evt) {
  this.posFinalx = getMousePosition(canvas, evt).x
  this.posFinaly = getMousePosition(canvas, evt).y
  this.inited = false
  this.interactor.onInteractionEnd(this);
};

DnD.prototype.moving = function (evt) {
  if (this.inited) {
    this.posFinalx = getMousePosition(canvas, evt).x
    this.posFinaly = getMousePosition(canvas, evt).y
    this.interactor.onInteractionUpdate(this);
  }
};

// Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};


