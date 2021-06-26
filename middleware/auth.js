//Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// Importation du module "Jsonwebtoken".
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  // Compte tenu des potentiels problème de ce middleware, on englobe le code entre les fonctions "Try" et "Catch"
  try {
    // Extraction du Token propre au header "authorization" Utilisation de split pour récupérer tout après l'espace dans le header. 
    //Les erreurs générées ici s'afficheront dans le bloc catch ;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    // Utilisation de la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée ;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // Extraction de l'ID utilisateur du Token
    const userId = decodedToken.userId;

    // Si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. 
    // S'ils sont différents, nous générons une erreur ;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      // Si tout fonctionne, on passe à la fonction "next".
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};