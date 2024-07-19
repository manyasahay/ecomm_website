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
const productId = urlParams.get("productId");

if (productId) {
  // Retrieve the product details from Firebase using the product ID
  const productDetailRef = firebase.database().ref(`products/${productId}`);
  
  productDetailRef.once("value", (snapshot) => {
    const product = snapshot.val();
    
    if (product) {
      // Create HTML elements to display the product details
      const productDetailDiv = document.createElement("div");
      productDetailDiv.className = "product-detail";

      const image = document.createElement("img");
      image.src = product.imageURL;

      const productName = document.createElement("h3");
      productName.textContent = product.productname;

      const productDescription = document.createElement("p");
      productDescription.textContent = product.productdesc;

      const productPrice = document.createElement("p");
      productPrice.textContent = `Price: $${product.productcost}`;

      // Append elements to the product detail div
      productDetailDiv.appendChild(image);
      productDetailDiv.appendChild(productName);
      productDetailDiv.appendChild(productDescription);
      productDetailDiv.appendChild(productPrice);

      // Append the product detail div to the product detail page
      document.body.appendChild(productDetailDiv);
    } else {
      // Handle the case where the product doesn't exist
      console.log("Product not found");
    }
  });
} else {
  // Handle the case where the product ID is not provided
  console.log("Product ID not provided in the URL");
}
const addToCartButton = document.createElement("button");
