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
const phoneNumber = localStorage.getItem('phonenumber');
const order = document.getElementById("order")
order.addEventListener("click" ,function(){
    alert("Order Placed, Cart Cleared")
    const ref = db.ref(`cart/${phoneNumber}`)
    ref.on("value", function(snapshot){
      snapshot.forEach(function(cartitem){
        const productid = cartitem.key;
        ref.child(productid).remove();
      })
    })
})

if (phoneNumber) {
  const cartlist = document.getElementById("cart-list");
  const cartsRef = firebase.database().ref(`cart/${phoneNumber}`);

  let currentUser = null;

  firebase.auth().onAuthStateChanged(function(user) {
    currentUser = user;

    cartsRef.on("value", (snapshot) => {
      cartlist.innerHTML = "";

      snapshot.forEach((cartSnapshot) => {
        const quantity = cartSnapshot.val();
        const productid = cartSnapshot.key;

        const cartDiv = document.createElement("div");
        cartDiv.className = "cartdiv";

        const productRef = firebase.database().ref(`products/${productid}`);

        productRef.once("value", (productSnapshot) => {
          const productData = productSnapshot.val();

          if (productData) {
            const productName = document.createElement("h3");
            productName.textContent = productData.productname;
            productName.addEventListener("click", () => {
              window.location.href = `productDetail.html?productId=${productid}`;
            });

            const productImage = document.createElement("img");
            productImage.src = productData.imageURL;
            productImage.alt = productData.productname;
            const productcost = document.createElement("price");
            productcost.textContent = "Price is " + productData.productcost;
            productImage.className = "product-image";

            const productDesc = document.createElement("desc");
            productDesc.textContent = productData.productdesc;

            const productQuantity = document.createElement("h3");
            productQuantity.textContent = `Quantity: ${quantity}`;

            cartDiv.appendChild(productImage);
            cartDiv.appendChild(productName);
            cartDiv.appendChild(productDesc);
            
            cartDiv.appendChild(productcost)
            cartDiv.appendChild(productQuantity);
            cartDiv.addEventListener("click",function(){
              window.location.href = `productDetail.html?productId=${productid}`;
            })
            cartlist.appendChild(cartDiv);
          }
        });
      });
    });
  });
}