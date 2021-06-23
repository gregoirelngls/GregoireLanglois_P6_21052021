// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// Imporptation du module multer. Package permet de gérer les fichiers entrants dans les requêtes HTTP.
const multer = require('multer');

// Permet de cibler le format des images acceptées par l'application
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Middleware permettant de gérer les fichiers entrants.
// Création d'une constante storage ,qui contient la logique pour indiquer à multer où enregistrer les fichiers entrants :
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
// La fonction filename indique à multer d'utiliser le nom d'origine, 
//de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier.
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exportation de l'élément multer entièrement configuré.
// Création constante storage, Indication: Uniquement les téléchargements de fichiers image.
module.exports = multer({storage: storage}).single('image');