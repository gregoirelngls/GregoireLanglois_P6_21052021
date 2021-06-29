// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

const mongoose = require('mongoose');

// importation du plugin qui ajoute une validation de pré-sauvegarde pour les champs uniques dans un schéma Mongoose.
const uniqueValidator = require('mongoose-unique-validator');

// On crée notre schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
  // L'email doit être unique
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]
  },
  // enregistrement du mot de pass
  password: {
    type: String,
    required: [true, "Veuillez choisir un mot de passe"]
  }
});

// Plugin pour garantir un email unique
// On applique ce validateur au schéma avant d'en faire un modèle et on appelle la méthode plugin et on lui passe uniqueValidator
userSchema.plugin(uniqueValidator);

// Exportation du schéma sous forme de modèle : le modèle s'appellera user et on lui passe le shéma de données
module.exports = mongoose.model('User', userSchema);

// Pour être sûr que deux utilisateurs ne peuvent pas utiliser la même adresse e-mail
// nous utiliserons le mot clé unique pour l'attribut email du schéma d'utilisateur userSchema.
// Les erreurs générées par défaut par MongoDB pouvant être difficiles à résoudre, nous installerons un package de validation
//pour pré-valider les informations avant de les enregistrer : npm install --save mongoose-unique-validator