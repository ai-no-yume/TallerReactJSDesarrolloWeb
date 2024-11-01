import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAGmfLvtVQI9x5oiwuqcUt854FRMi5FgDU",
  authDomain: "eventsschedule-cd86d.firebaseapp.com",
  projectId: "eventsschedule-cd86d",
  storageBucket: "eventsschedule-cd86d.firebasestorage.app",
  messagingSenderId: "15892901759",
  appId: "1:15892901759:web:63bf8510603b5c06dcf44a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

export default app;
