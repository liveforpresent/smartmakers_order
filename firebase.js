import { initializeApp, messaging, credential } from 'firebase-admin';
import * as serviceAccount from './smartmakers-order-push-firebase-adminsdk-5vziv-90c94c2b66.json';
import { connection } from './db';

initializeApp({
    credential: credential.cert(serviceAccount)
});

// Function to send push notification
function sendPushNotification(token, message) {
    const payload = {
        notification: {
            title: 'New Data Added',
            body: message
        }
    };

    messaging().sendToDevice(token, payload)
        .then(response => {
            console.log('Successfully sent message:', response);
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });
}

// Monitor for new data in MySQL and send notification
connection.on('newData', (data) => {
    const message = `New data added: ${data.name}`;
    const userToken = 'user-device-token'; // You need to obtain and store this for each user

    sendPushNotification(userToken, message);
});