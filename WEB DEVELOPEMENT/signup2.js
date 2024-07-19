document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const userL = document.getElementById("lastname").value;
    const image = document.getElementById("image").files[0];
    const isManager = document.getElementById("isManager").checked;
    const address = document.getElementById("address").value;
    const progress = document.getElementById("progress");
    const errorMessage = document.getElementById("error-message"); // Get the error message element

    // Reference the appropriate table based on the user's choice
    const userTypeRef = isManager ? "manager" : "customer";
    const userRef = firebase.database().ref(userTypeRef);
   
    

    // Check if the username already exists in the database
    userRef.child(username).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            errorMessage.innerHTML = "Error: User already exists. Please choose a different username.";
            return false;
        } else {
            // Check if any of the input fields are empty
            if (username.length!=10) {
                errorMessage.innerHTML = "Error: 10 digit phone number required.";
                return false;
                
            } 
            if(password.length<=5){
                errorMessage.innerHTML = "Error: Password should be more than 5 charachters long.";
            }
            else {
                // Upload the image to Firebase Storage
                const storageRef = firebase.storage().ref(userTypeRef + "/" + username + ".jpg");
                const uploadTask = storageRef.put(image);

                uploadTask.on("state_changed",
                    (snapshot) => {
                        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        progress.value = progressValue;
                    },
                    (error) => {
                        errorMessage.innerHTML = "Error uploading image: " + error;
                    },
                    () => {
                        // Image uploaded successfully, get the download URL
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            // Create a user object with the collected data
                            const user = {
                                password: password,
                                user: firstname,
                                userL: userL,
                                imageURL: downloadURL,
                                Address: address
                            };

                            // Set the user data with the username as the key
                            userRef.child(username).set(user);

                            // Display a success message and redirect to another page
                            errorMessage.innerHTML = "User data added to the database.";
                            window.location.href = "login1.html"; 
                        });
                    }
                );
            }
        }
    });
});
