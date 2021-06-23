// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// Création du routeur Express
const express = require('express');
const router = express.Router();

// Importation Middleware d'authentification.
const auth = require('../middleware/auth')
// Importation du module Multer (Gestion de fichiers entrants)
const multer = require('../middleware/multer-config');
// Importation de la logique métier dans une constante saucesCtrl.
const saucesCtrl = require ('../controllers/sauces');


// Facilite la compréhension de notre fichier de routeur. 
// Distingue quelles routes sont disponibles à quels points de terminaison,

router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id',auth,  saucesCtrl.getOneSauce);
router.get('/',auth, saucesCtrl.getAllSauce); 
router.post('/:id/like', auth, saucesCtrl.likeDislike);

// Exportation du routeur
module.exports = router;