import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAdFUPc_GHxCX-a8ecDRFFe_XRYH9-s0E",
    authDomain: "chicas-tec-am.firebaseapp.com",
    projectId: "chicas-tec-am",
    storageBucket: "chicas-tec-am.firebasestorage.app",
    messagingSenderId: "85027786061",
    appId: "1:85027786061:web:7102a4ace730835c5cfb04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportaciones
export default app;
export { db };