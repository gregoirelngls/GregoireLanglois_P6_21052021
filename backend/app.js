// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// App.js fait appel aux fonctions suivantes :  Accès aux images, aux routes User et Sauces

// Import du module "express" grace a NPM. Framework basé sur node
const express = require('express');
// Importation du module Moongoose. Qui va servir de base de données
const mongoose = require('mongoose');
// Importation du module Bodyparser. Permet d'extraire l'objet JSON des requêtes POST
const bodyParser = require('body-parser');
// Importation du module qui donne l'accès à notre à fichier (Upload d'images)
const path = require('path');
// Implémentation du système de sécurité
const cors = require('cors'); 
// Limite le nombre de connexion maximale pour eviter les attaques de force brute
const rateLimit = require("express-rate-limit");

// Importation des module pour protéger l'application des vulnérabilités (requêtes HTTP, DNS navigateur, en-têtes ...)
const helmet = require('helmet');
const session = require('cookie-session');
const nocache = require('nocache');

// Déclaration des routes pour les Sauces et les utilisateurs.
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')

// Importation du module 'dotenv'concernant le masquage des informations de connexion à la base de données en utilisant desnvariables d'environnement
require('dotenv').config();

// Mise en place de la méthode qui va nous permettre de communiquer avec la base de données mongodb.
mongoose.connect(process.env.DB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application "Express".
const app = express();

// Utilisation des Cors. Permet aux requêtes AJAX d'ignorer la politique de même origine et d'accéder aux ressources à partir d'hôtes distants.
app.use(cors()) 

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Envoi des données (sous la forme d'un objet de données) au serveur 
// on demande au serveur d'accepter ou de stocker ces données (objet), qui sont incluses dans le corps (req.body) de cette demande.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// Sécuriser Express en définissant divers en-têtes HTTP. 
app.use(helmet());

//Désactive la mise en cache du navigateur
app.use(nocache());

// Activation du nombre maximale de requête par minute.
app.use(limiter);

// Middleware permettant de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Modèle de route appliqué à la méthode "USE" qui correspond à l'URL demandé par le frontend
app.use('/api/sauces', saucesRoutes); 
app.use('/api/auth', userRoutes);

// Export de l'application express (déclaration dans le serveur)
module.exports = app;

