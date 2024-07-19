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
    const database = firebase.database();

  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const image = document.getElementById("image").files[0];
    const address = document.getElementById("address").value;
    const errorMessage = document.getElementById("error-message");

    // Reference the appropriate table based on the user type
    const userTypeRef = "customer"; // Assuming it's for customers
    const userRef = firebase.database().ref(userTypeRef);

    // Check if the username exists in the database
    userRef.child(username).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            // Check if any of the input fields are empty or invalid
            if (username.length !== 10) {
                errorMessage.innerHTML = "Error: 10-digit phone number required.";
            } else if (password.length <= 5) {
                errorMessage.innerHTML = "Error: Password should be more than 5 characters long.";
            } else {
                // Only update the image if a new one is selected
                if (image) {
                    // Upload the image to Firebase Storage
                    const storageRef = firebase.storage().ref(userTypeRef + "/" + username + ".jpg");
                    const uploadTask = storageRef.put(image);

                    uploadTask.then(() => {
                        // Image uploaded successfully, get the download URL
                        storageRef.getDownloadURL().then((downloadURL) => {
                            // Update the user data with the new information
                            const user = {
                                password: password,
                                user: firstname,
                                userL: lastname,
                                imageURL: downloadURL,
                                Address: address
                            };

                            // Set the user data with the username as the key
                            userRef.child(username).set(user);

                            // Display a success message and optionally redirect
                            errorMessage.innerHTML = "User data updated in the database.";
                            // Optionally, you can redirect the user to another page.
                        });
                    });
                } else {
                    // Update user data without changing the image
                    const user = {
                        password: password,
                        user: firstname,
                        userL: lastname,
                        Address: address
                    };

                    userRef.child(username).update(user);

                    // Display a success message and optionally redirect
                    errorMessage.innerHTML = "User data updated in the database.";
                    // Optionally, you can redirect the user to another page.
                }
            }
        } else {
            errorMessage.innerHTML = "Error: User does not exist.";
        }
    });
});
