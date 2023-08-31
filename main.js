import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAeQNsCkLEuDxD1stM-mGcZxr7owLFGL-8",
    authDomain: "webapp-b0390.firebaseapp.com",
    projectId: "webapp-b0390",
    storageBucket: "webapp-b0390.appspot.com",
    messagingSenderId: "430165108360",
    appId: "1:430165108360:web:96ea333587fc253349a13d"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to toggle between sign-up and sign-in forms
function toggle() {
  var signUpForm = document.querySelector(".sign-up");
  var signInForm = document.querySelector(".sign-in");
  signUpForm.classList.toggle("hidden");
  signInForm.classList.toggle("hidden");
}

// Function to handle sign up
function signUp(event) {
  event.preventDefault();

  const emailField = document.querySelector(".sign-up input[type='email']");
  const passwordField = document.querySelector(".sign-up input[placeholder='Password']");
  const confirmPasswordField = document.querySelector(".sign-up input[placeholder='Confirm password']");

  const email = emailField.value;
  const password = passwordField.value;

  // Check if the password and confirm password are the same
  if (password !== confirmPasswordField.value) {
    alert("Passwords do not match. Please try again.");

    // Add red border to the password fields
    passwordField.style.borderColor = 'red';
    confirmPasswordField.style.borderColor = 'red';

    return;
  }

  // Reset the border colors if passwords match
  passwordField.style.borderColor = '';
  confirmPasswordField.style.borderColor = '';

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed up
      const user = userCredential.user;
      // Do something after successful sign-up
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Check if the error is due to duplicate email
      if (errorCode === 'auth/email-already-in-use') {
        alert("This email is already in use. Please use a different email.");

        // Make the email field red
        emailField.style.borderColor = 'red';
      }

      // Handle other errors
    });
}

// Function to handle sign in
function handleSignIn(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordField = document.getElementById("password");
  const emailField = document.getElementById("email");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully signed in
      const user = userCredential.user;
      alert("Signed in successfully!");
      window.location.href = "listing/index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        // Wrong password
        alert("Wrong password. Please try again.");

        // Make the password field border red
        passwordField.style.borderColor = 'red';
      } else if (errorCode === 'auth/user-not-found') {
        // User not found (email doesn't exist)
        alert("User does not exist. Please check your email.");

        // Make the email field border red
        emailField.style.borderColor = 'red';
      } else {
        // Other errors
        alert(errorMessage);
      }
    });
}


const signInForm = document.querySelector(".sign-in");
signInForm.addEventListener("submit", handleSignIn);

const signUpForm = document.querySelector(".sign-up");
signUpForm.addEventListener("submit", signUp);


