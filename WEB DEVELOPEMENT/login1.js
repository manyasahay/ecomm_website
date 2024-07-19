const firebaseConfig = {
    apiKey: "AIzaSyCBVnCNu0GAetC5I5UaIu0_0kBvJbqQ-ss",
    authDomain: "electronicbazarmad.firebaseapp.com",
    databaseURL: "https://electronicbazarmad-default-rtdb.firebaseio.com",
    projectId: "electronicbazarmad",
    storageBucket: "electronicbazarmad.appspot.com",
    messagingSenderId: "330157543683",
    appId: "1:330157543683:web:12a5ee0854b79e9efcd936",
    measurementId: "G-2DW0SHCYV0"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const form = document.getElementById("form");
const uname = document.getElementById("uname");
const pass = document.getElementById("pass");
const manager = document.getElementById("manager");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorMessage.textContent = ""; // Clear any previous error message
  
    const phoneNumber = uname.value;
    const password = pass.value;
    const isManager = manager.checked;
    const userTypeRef = isManager ? "manager" : "customer";
  
    // Reference the database table based on user type
    const userRef = firebase.database().ref(userTypeRef);

    // Query the database to find a matching user
    userRef.once("value", function (snapshot) {
        if (snapshot.exists()) {
          const userData = snapshot.val();
    
          for (const userId in userData) {
            const user = userData[userId];
            
            if ( userId===phoneNumber && user.password === password) {
              // Successful login
              errorMessage.textContent = "Login successful.";
              localStorage.setItem('phonenumber',phoneNumber)
              window.phoneNumber = phoneNumber;
              console.log("Phone Number:", phoneNumber);
              
              setTimeout(function() {
                if (isManager) {
                  window.location.href = `mainhomepage1.html`;
                } else {
                  localStorage.setItem('phonenumber',phoneNumber)
                  window.location.href = `catalogue.html?phoneNumber=${phoneNumber}`;

                }
              }, 2000);
            return;
              
            }
          }
    
         
          errorMessage.textContent = "Incorrect entry.";
        } else {
          // User not found
          errorMessage.textContent = "User not found.";
        }
      });
    });
