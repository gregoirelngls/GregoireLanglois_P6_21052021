// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// Users.js dans le dossier "Routes" contient les différents fonctions appliquées aux routes pour les utilisateurs.

// Imortation d'express
const express = require('express');
// Création d'un router avec express
const router = express.Router();

// Importation du controller
const userCtrl = require('../controllers/user');

// Création d'un nouvel utilisateur dans la base de données.
router.post('/signup', userCtrl.signup); 
// Vérifie les informations d'identification de l'utilisateur
// en renvoyant l'identifiant userID depuis la base de données et un TokenWeb JSON signé
router.post('/login', userCtrl.login); 



module.exports = router;