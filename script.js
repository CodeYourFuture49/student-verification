// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPq388Cq3fYlV1Ejk0IEJ6SBHtClulgUs",
  authDomain: "student-verification-8d01d.firebaseapp.com",
  projectId: "student-verification-8d01d",
  storageBucket: "student-verification-8d01d.firebasestorage.app",
  messagingSenderId: "700888781038",
  appId: "1:700888781038:web:382c8662782d10cf5663ff"
};

// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Verify Student ID
async function verifyID() {
    const inputID = document.getElementById("studentId").value.trim();
    const result = document.getElementById("result");

    if (!inputID) {
        result.textContent = "❌ Please enter a Student ID.";
        result.style.color = "red";
        return;
    }

    const docRef = doc(db, "students", inputID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        result.textContent = `✅ Verified! Student: ${docSnap.data().name}`;
        result.style.color = "green";
        generateQRCode(inputID);
    } else {
        result.textContent = "❌ Invalid Student ID!";
        result.style.color = "red";
    }
}

// QR Code Generation
function generateQRCode(studentID) {
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: `https://yourwebsite.com/verify?studentId=${studentID}`,
        width: 128,
        height: 128
    });
}
