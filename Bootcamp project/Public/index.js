$(document).ready(function(){
    $("#signup").click(function(e){
        e.preventDefault();
        let nameValue = $('#name').val();
        let emailValue = $('#email').val();
        let passwordValue = $('#password').val();
        let data = {
            name: nameValue,
            email: emailValue,
            password: passwordValue
        };
    
        if(nameValue === '' || emailValue === '' || passwordValue === ''){
                alert('Please fill in the fields')
        } else {
            $.post("http://localhost:3000/users", data, alert('user added'));
            window.location.replace("products.html")
        }
    })


    $("#login").click(function(e){
        e.preventDefault();
        let emailValue = $('#email').val();
        let passwordValue = $('#password').val();

        if(emailValue === '' || passwordValue === '' ){
            alert('Please fill in the fields');
        }

        $.get("http://localhost:3000/users", function(data) {
            for (object of data ) {
                if (object.email === emailValue && object.password === passwordValue) {
                    window.location.replace("products.html")
                }
            }
            alert('Invalid Email or Password');
        });
    });

    // Creating a Product
    $("#addProductBtn").click(function(event) {
        event.preventDefault();
        
        let productName = $("#productName").val();
        let category = $("#category").val();
        let brand = $("#brand").val();
        let quantity = $("#quantity").val();
        let price = $("#price").val();

        // Validation
        if (productName === "" || category === "" || brand === "" || quantity === "" || price === "") {
            $("#error").css('color', 'red')
            $("#error").html("All fields are required");

        } else {
            let data = {
                "productName" : productName,
                "category" : category,
                "brand" : brand,
                "quantity" : quantity,
                "price" : price
            };
    
            // Sending to database
            $.post(" http://localhost:3000/products", data, function(res) {
                alert("Product has been created successfully.");
            })
        }

       

    })

    
    // Product creation ends here

    // Reading (Fetching) all products
    $.get("http://localhost:3000/products", function(products) {
        for (let i = 0; i < products.length; i++) {
            $("#productList").append(`
            <tr>
                <td>${products[i].id}</td>
                <td>${products[i].productName}</td>
                <td>${products[i].category}</td>
                <td>${products[i].brand}</td>
                <td>${products[i].quantity}</td>
                <td>${products[i].price}</td>
                <td>
                    <a href="editProduct.html?id=${products[i].id}" class="button btn btn-primary btn-sm">Edit</a>
                    <a href="viewProduct.html?id=${products[i].id}" class="button btn btn-primary btn-sm">View</a>
                    <button class="button btn btn-danger del" value="${products[i].id}" style="background: red;">Delete</button>
                </td>
            </tr>
            `);
        }

        // Delete a product
        $(".del").click(function(e) {
            e.preventDefault()
            const id = $(this).val();
            $.ajax({
                url: `http://localhost:3000/products/${id}`,
                method: "DELETE",
                success: function(res) {
                    alert("Deleted");
                }
            })
        })
        
    })

    let path = $(location).attr('pathname');


    // Fetch a single product
    if (path === "/viewProduct.html") {
        // Editing and updating a product
        const url = window.location.href;
        const urlArray = url.split("id=");
        let id = urlArray[1];
        id = parseInt(id);
    
    
         // Get the single product
        $.get(`http://localhost:3000/products/${id}`, function(product) {
            $("#productNameTitle").html(product.productName);
            $("#productName").html(product.productName);
            $("#productCategory").html(product.category);
            $("#productBrand").html(product.brand);
            $("#productQuantity").html(product.quantity);
            $("#productPrice").html(product.price);   


        });
    }


    // Editing and updating a product
    const url = window.location.href;
    let id = urlArray[1];
    id = parseInt(id);
    
    
    // Get the single product
    $.get(`http://localhost:3000/products/${id}`, function(product) {
        $("#productNameEdit").val(product.productName);
        $("#categoryEdit").val(product.category);
        $("#brandEdit").val(product.brand);
        $("#quantityEdit").val(product.quantity);
        $("#priceEdit").val(product.price);   


        // Edit Product
        if (path === "/editProduct.html") {
            

            $("#editProductBtn").click(function(e) {
                e.preventDefault()

                let productName = $("#productNameEdit").val();
                let category = $("#categoryEdit").val();
                let brand = $("#brandEdit").val();
                let quantity = $("#quantityEdit").val();
                let price = $("#priceEdit").val();

                if (productName === "" || category === "" || brand === "" || quantity === "" || price === "") {
                    $("#error").css('color', 'red')
                    $("#error").html("All fields are required");
                } else {
                    let data = {
                        "productName" : productName,
                        "category" : category,
                        "brand" : brand,
                        "quantity" : quantity,
                        "price" : price
                    }
            
                    $.ajax({
                        url: `http://localhost:3000/products/${id}`,
                        method: "PUT",
                        data: data,
                        success: function(res) {
                            window.location.replace("products.html")
                        },
                    })
                }

                
            })
        }
        
    })

    
    




      
});