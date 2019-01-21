const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.addUserMessages = functions.database.ref(`/messages/{messageID}`)
    .onWrite(event =>{

    const messageKey = event.data.key;
    const messageValue = event.after.val();

    admin.database()
    .ref(`/user-messages/${messageValue.userFromID}/${messageValue.userToID}`)
    .child(messageKey).set(1).catch(() => 'obligatory catch');
    admin.database()
    .ref(`/user-messages/${messageValue.userToID}/${messageValue.userFromID}`)
    .child(messageKey).set(1).catch(() => 'obligatory catch');
});

exports.generateLastMessage = functions.database.ref(`/messages/{messageID}`)
    .onWrite(event => {

        const messageKey = event.data.key;
        const messageValue = event.after.val();

        admin.database.ref(`/last-messages/${messageValue.userFromID}/${messageValue.userToID}`)
        .child('key').set(messageKey);
        admin.database.ref(`/last-messages/${messageValue.userToID}/${messageValue.userFromID}`)
        .child('key').set(messageKey);
    });