let uri = null;
const mongoose = require('mongoose');
const debug = process.env.NODE_ENV === 'dev';
const bdd = process.env.BDD;
const cluster = process.env.CLUSTER;
const options = {};

function connectDB (who = 'unknown') {
  if (process.env.NODE_ENV === 'dev') {
    console.log('DEV MODE !')
    uri = `mongodb://127.0.0.1:27017/Book`;
  } else {
    console.log('NOT IN DEV MODE !');
    uri = `mongodb+srv://Book:${bdd}@${cluster}.mongodb.net/Book`;
  }

  mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => { console.log(`Connexion à MongoDB réussie ! ${who} est connecté`) },
    err => { console.log(`Connexion à MongoDB fail ! ${who} n'est pas connecté`) }
  );
}

module.exports = connectDB;
