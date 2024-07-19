document.getElementById("product-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const managerIdText = document.getElementById("managerId").value;
    const productidText = document.getElementById("productid").value;
    const productnameText = document.getElementById("productname").value;
    const productcatText = document.getElementById("productcat").value;
    const productdescText = document.getElementById("productdesc").value;
    const productcostText = document.getElementById("productcost").value;
    const imageInput = document.getElementById("imgInput");
    const errorMessage = document.getElementById("error-message");

    if (
        productidText.trim() === "" ||
        productnameText.trim() === "" ||
        productcatText.trim() === "" ||
        productdescText.trim() === "" ||
        productcostText.trim() === "" ||
        !imageInput.files[0]
    ) {
        errorMessage.innerHTML = "Provide all details";
        return;
    }

    const db = firebase.database();
    const storage = firebase.storage();
    const productsRef = db.ref("products");

    productsRef.child(productidText).once("value").then((snapshot) => {
        if (snapshot.exists()) {
            errorMessage.innerHTML = "Product ID " + productidText + " already exists";
        } else {
            const imageFile = imageInput.files[0];
            const imageRef = storage.ref("products/" + productidText + ".jpg");

            imageRef.put(imageFile).then((snapshot) => {
                imageRef.getDownloadURL().then((uri) => {
                    const productData = {
                        productname: productnameText,
                        productcat: productcatText,
                        productdesc: productdescText,
                        productcost: productcostText,
                        AddedBy: managerIdText,
                        imageURL: uri,
                    };

                    productsRef.child(productidText).set(productData).then(() => {
                        errorMessage.innerHTML = "Product Successfully Added";
                        // You can add further actions here if needed
                    }).catch((error) => {
                        errorMessage.innerHTML = "Error adding product to the database: " + error;
                    });
                });
            }).catch((error) => {
                errorMessage.innerHTML = "Error uploading image: " + error;
            });
        }
    });
});