const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: 'https://be-offer-landed.firebaseio.com' // Replace with your database URL
});

module.exports = admin;
