// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// On récupère le base de données Mongodb.
const mongoose = require('mongoose');

// Nous créons un schéma de données qui contient les champs souhaités pour chaque Sauce.
// On indique leur type ainsi que leur caractère (obligatoire ou non). 
//Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. 
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name : {type: String, require: true},
    manufacturer : {type: String, require: true},
    description: {type: String, required: true},
    mainPepper : {type: String, require: true},
    imageUrl : {type: String, require: true},
    heat : {type: Number, require: true},
    likes : {type: Number},
    dislikes : {type: Number},
    usersLiked : {type: [String]},
    usersDisliked : {type: [String]},
})

// Exportation du schéma en tant que modèle Mongoose appelé « Sauce »,
// le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('Sauce', sauceSchema);

// Ce modèle vous permettra non seulement d'appliquer notre structure de données, 
//mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données.