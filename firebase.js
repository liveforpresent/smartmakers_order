//import { initializeApp, messaging, credential } from 'firebase-admin';
import serviceAccount from './smartmakers-order-push-firebase-adminsdk-5vziv-e0187c5623.json' assert {type: 'json'};
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// 푸시알람 전송
function sendPushNotification() {
    const payload = {
        notification: {
            title: 'New Data Added',
            body: "새 주문이 들어왔습니다."
        },
        topic: 'all'
    };

    admin.messaging().send(payload)
        .then(response => {
            console.log('Successfully sent message:', response);
        })
        .catch(error => {
            console.log('Error sending message:', error);
        });
}

export { sendPushNotification };