// Formation OpenClassrooms - Développeur Web - Projet 6 - Grégoire Langlois

// Importation de package HTTP relatif à Node, afin de créer un serveur. HTTPS requiert un certificat SSL.
const http = require('http');
// Importation de app pour utiliser l'application sur le serveur
const app = require('./app');

// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne.
// Si aucun port n'est fourni, le serveur s'orientera automatiquement sur le port 3000.
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriées.
// Elle est ensuite enregistrée dans le serveur ;
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// Création d'une constante "Server" concernant les requêtes et les réponses.
const server = http.createServer(app);

// Gestion des évênements serveur.
// Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// Le serveur écoute le port défini dans la fonction NormalizePort.
server.listen(port);
