const admin = require('./config/firebase');

const db = admin.firestore();

// Example: Add data to Firestore
const docRef = db.collection('users').doc('some-user-id');
const userData = {
    name: 'John Doe',
    email: 'john@example.com'
};

docRef.set(userData)
    .then(() => {
        console.log('Data added to Firestore');
    })
    .catch(error => {
        console.error('Error adding data: ', error);
    });
