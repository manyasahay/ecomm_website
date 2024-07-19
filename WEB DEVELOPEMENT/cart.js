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
const urlParams = new URLSearchParams(window.location.search);
const phoneNumber = urlParams.get('phoneNumber');
console.log(`Phone Number in Catalog: ${phoneNumber}`);

if (phoneNumber) {
    const productList = document.getElementById("product-list");
    const productsRef = db.ref("cart");

    // Check the user's authentication status and get their UID
    let currentUser = null;
    firebase.auth().onAuthStateChanged(function(user) {
        currentUser = user;

        productsRef.once("value", (snapshot) => {

            snapshot.forEach((productSnapshot) => {
                const product = productSnapshot.val();
                console.log(product)
                const productId = productSnapshot.key; // Access the product ID

                // Create HTML elements for each product
                const productDiv = document.createElement("div");
                productDiv.className = "product";

                const image = document.createElement("img");
                image.src = product.imageURL;

                const productName = document.createElement("h3");
                productName.textContent = product.productname;

                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Add to Cart";

                addToCartButton.addEventListener("click", () => {
                    if (phoneNumber) {
                        const userCartRef = db.ref(`cart/${phoneNumber}`);

                        // Get the current quantity for the product in the user's cart (if any)
                        userCartRef.child(productId).once("value", (snapshot) => {
                            const currentQuantity = snapshot.val() || 0;

                            // Update the quantity in the cart
                            userCartRef.update({ [productId]: currentQuantity + 1 });
                        });
                    } else {
                        console.log("Phone number not available.");
                    }
                });

                // Append elements to the product div
                productDiv.appendChild(image);
                productDiv.appendChild(productName);
                productDiv.appendChild(addToCartButton);

                // Append the product div to the product grid
                // productList.appendChild(productDiv);
            });
        });
    });
} else {
    console.log("Phone number not available.");
}