import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useEffect, useState} from "react";

const firebaseConfig = {
        apiKey: 'AIzaSyD7XV8cc4qR01iZ4zCi61XRJ-QvyoVvtnQ',
        authDomain: 'medi-vault.firebaseapp.com', // Replace with your actual authDomain
        projectId: 'medi-vault', // Replace with your actual projectId
        storageBucket: 'medi-vault.appspot.com', // Replace with your actual storageBucket
        messagingSenderId: '511636296416',
        appId: '1:511636296416:web:YOUR_APP_ID', // Replace with your actual appId

};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();

function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in.
                setUser(authUser);
            } else {
                // No user is signed in.
                setUser(null);
            }
        });

        return () => {
            // Cleanup the listener when the component unmounts
            unsubscribe();
        };
    }, []);

    return user;
}

export { useAuth };

export default app;
