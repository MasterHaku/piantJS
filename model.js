
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

/**
 * Constructeur de la classe Shape, definis les parametres communs a toutes les formes
 * @param {int} epTrait 
 * @param {string} color 
 * @param {int} posStartx position de depart
 * @param {int} posStarty position d'arrivée
 */
function Shape (epTrait,color,posStartx,posStarty){
    this.epTrait = epTrait
    this.color = color
    this.posStartx = posStartx
    this.posStarty = posStarty
    this.name="" // Utile uniquement pour l'affichage
};


/**
 * Constructeur de Drawing
 * Initialisation de arrayShape en Map (K,V)
 */
function Drawing(){
    this.arrayShapes = new Map();
}

/**
 * REnvoier la Map des formes
 * @returns {Map} arrayShape
 */
Drawing.prototype.getForms = function(){
    return this.arrayShapes;
}

/**
 * Ajoute une forme a la Map des formes deja presentes 
 * @param {string} id 
 * @param {*} shape 
 */
Drawing.prototype.addShape = function(id,shape){
    this.arrayShapes.set(id,shape);
}


/**
 * Constructeur de la classe Rectantgle, heritant de Shape
 * @param {int} posStartx 
 * @param {int} posStarty 
 * @param {int} larg 
 * @param {int} haut 
 * @param {int} ep 
 * @param {string} color 
 */
function Rectangle(posStartx, posStarty,larg,haut,ep,color){
    Shape.call(this,ep,color,posStartx,posStarty) //Heritage
    //Definition des attributs en focntion des valeurs
    this.posFinalx = larg
    this.posFinaly = haut 
    this.name="Rectangle" //Pour l'affichage du nom
}
Rectangle.prototype = new Shape()


/**
 * Constructeur de la classe Line, heritant de Shape -- Meme chose que pour Rectangle
 * @param {int} posStartx 
 * @param {int} posStarty 
 * @param {int} larg 
 * @param {int} haut 
 * @param {int} ep 
 * @param {string} color 
 */
function Line(posStartx, posStarty,posFinalx, posFinaly,ep, color){
    Shape.call(this,ep,color,posStartx,posStarty)
    this.posFinx = posFinalx
    this.posFiny = posFinaly
    this.name="Ligne"
};
Line.prototype = new Shape()