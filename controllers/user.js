// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// Logique métier concernant nos Users.
// On applique des routes POST pour les opérations d'inscription et de connexion

// utilisation de Bcrypt pour hasher le mot de passe utilisateur
const bcrypt = require('bcrypt');
// Récupération du modèle User, créée avec le Schema Mongoose
const User = require('../models/user');
// Package utilisé pour attribuer un Token à l'utilisateur quand il se connecte.
const jwt = require('jsonwebtoken');

// Middleware pour la création de nouveau utilisateurs.


// Sauvegarde d'un nouvel utilisateur et cryptage du mot de passe avec un hash généré par bcrypt
exports.signup = (req, res, next) => {
  // On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur, le salte (10) représente le nombre de tour que dois faire l'algorithme.
    bcrypt.hash(req.body.password, 10)
  // On récupère le hash du mot de passe, et on l'enregistre en tant que nouvel utilisateur dans la BBD mongoDB
    .then(hash => {
      // Création du nouvel utilisateur avec le model mongoose
      const user = new User({
         // On passe l'email qu'on trouve dans le corps de la requête
        email: req.body.email,
        // On récupère le mdp hashé de bcrypt
        password: hash
      });
      // On enregistre l'utilisateur dans la base de données
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
};

// Ce Middleware vérifie si l'utilisateur existe dans la base de données.
// si l'utilisateur est dans la base de données, il renvoie un TOKEN lié à l'utilisateur, dans le cas contraire, il renvoie une erreur.
exports.login = (req, res, next) => {
  // Permet de trouver  l'utilisateur dans la Base de données, qui correspond à l'adresse entrée par l'utilisateur
    User.findOne({ email: req.body.email })
    .then(user => {
      // Si il n'y a pas cette utilisateur, on envoie une erreur
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // Utilisation de Bcrypt pour comparer les Hashs
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
           // Si c'set faux, ce n'est pas le bon utilisateur, ou le mot de passe est incorrect
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          // Si c'est vrai, on renvoie un statut 200 ainsi qu'un objet JSON avec un userID + un token
          res.status(200).json({ // Le serveur backend renvoie un token au frontend
            userId: user._id,
            // on va pouvoir obtenir un token encodé pour cette authentification grâce à jsonwebtoken.
            token: jwt.sign( // Permet d'encoder le TOKEN.
              { userId: user._id },
              // Encodage de l'userdID nécéssaire dans le cas où une requête transmettrait un userId (ex: modification d'une sauce)
              process.env.SECRET_KEY, // Clé d'encodage du token qui peut être rendue plus complexe en production
              // Argument de configuration avec une expiration au bout de 24h
              { expiresIn: '24h' }
            )
            // On encode le userID pour la création de nouveaux objets, et cela permet d'appliquer le bon userID
            // aux objets et ne pas modifier les objets des autres
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
};

