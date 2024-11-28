let currentIndex;

let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let ProductCategory = document.getElementById("ProductCategory");
let productDescription = document.getElementById("productDescription");
let productImage = document.getElementById("productImage");

let addBtn = document.getElementById("addBtn");
let updateBtn = document.getElementById("updateBtn");

let productList = [];

if (localStorage.getItem("allProducts")) {
  productList = JSON.parse(localStorage.getItem("allProducts"));
  displayProducts(productList);
}

function createProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDescription()
  ) {
    let product = {
      name: productName.value,
      price: productPrice.value,
      category: ProductCategory.value,
      description: productDescription.value,
      image: `images/${
        productImage.files[0]?.name
          ? productImage.files[0]?.name
          : "placeHolder.jpg"
      }`,
    };
    productList.push(product);
    localStorage.setItem("allProducts", JSON.stringify(productList));
    displayProducts(productList);
    clearInputData();
  } else {
    window.alert("Something went wrong,Please try again....");
  }
}

function displayProducts(list) {
  let container = "";
  for (let i = 0; i < list.length; i++) {
    container += ` <div class="col-sm-6 col-md-4 col-lg-3">
     <div class="p-3 card shadow-sm">
         <div class="card-img ">
          <img src="${list[i].image}" class="w-100" alt="product">
        </div>
        <div class="card-body pb-1">
           <hr/>
        <p><span class="fw-bold">Name: </span> ${list[i].name}</p>
        <p><span class="fw-bold">Price: </span> ${list[i].price} <span class="text-muted">LE</span></p>
        <p><span class="fw-bold">Category: </span> ${list[i].category}</p>
        <p><span class="fw-bold">Description: </span> ${list[i].description}</p>
         </div>
          <div class=" pb-2">
              <div class="row">
                <div class="col-6 ">
                  <button onclick="setValues(${i})" class="btn btn-outline-warning  w-100">Update</button>
                </div>
                <div class="col-6">
                  <button onclick="deleteItem(${i})" class="btn btn-outline-danger w-100">Delete</button>
                </div>
              </div>
            </div>
            </div>
        </div>`;
  }
  document.getElementById("myData").innerHTML = container;
}

function clearInputData() {
  productName.value = "";
  productPrice.value = "";
  ProductCategory.value = "";
  productDescription.value = "";
  productImage.value = "";

  nameError.classList.add("d-none");
  productName.classList.remove("is-invalid");
  productName.classList.remove("is-valid");

  priceError.classList.add("d-none");
  productPrice.classList.remove("is-invalid");
  productPrice.classList.remove("is-valid");

  CategoryError.classList.add("d-none");
  ProductCategory.classList.remove("is-invalid");
  ProductCategory.classList.remove("is-valid");

  descriptionError.classList.add("d-none");
  productDescription.classList.remove("is-invalid");
  productDescription.classList.remove("is-valid");
}

function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("allProducts", JSON.stringify(productList));
  displayProducts(productList);
}

function setValues(index) {
  currentIndex = index;

  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  ProductCategory.value = productList[index].category;
  productDescription.value = productList[index].description;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateProduct() {
  if (
    validateProductName() &&
    validateProductPrice() &&
    validateProductCategory() &&
    validateProductDescription()
  ) {
    productList[currentIndex].name = productName.value;
    productList[currentIndex].price = productPrice.value;
    productList[currentIndex].category = ProductCategory.value;
    productList[currentIndex].description = productDescription.value;

    localStorage.setItem("allProducts", JSON.stringify(productList));
    displayProducts(productList);

    addBtn.classList.remove("d-none");

    
    updateBtn.classList.add("d-none");

    clearInputData();
  }else {
    window.alert("Something went wrong,Please try again....");
  }
}

function searchForProducts(inputSearch) {
  let foundedProducts = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(inputSearch.toLowerCase())) {
      foundedProducts.push(productList[i]);
    }
  }
  displayProducts(foundedProducts);
}

function validateProductName() {
  var regex = /^[A-Z][a-z]{1,10}$/;
  var nameError = document.getElementById("nameError");
  if (productName.value == "") {
    nameError.classList.add("d-none");
    productName.classList.remove("is-invalid");
    productName.classList.remove("is-valid");
    return false;
  } else if (regex.test(productName.value)) {
    nameError.classList.add("d-none");
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    return true;
  } else {
    nameError.classList.remove("d-none");
    productName.classList.remove("is-valid");
    productName.classList.add("is-invalid");
    return false;
  }
}

function validateProductPrice() {
  var regex = /^(100|[1-9]\d{2,4}|100000)$/;
  var priceError = document.getElementById("priceError");
  if (productPrice.value == "") {
    priceError.classList.add("d-none");
    productPrice.classList.remove("is-invalid");
    productPrice.classList.remove("is-valid");
    return false;
  } else if (regex.test(productPrice.value)) {
    priceError.classList.add("d-none");
    productPrice.classList.add("is-valid");
    productPrice.classList.remove("is-invalid");
    return true;
  } else {
    priceError.classList.remove("d-none");
    productPrice.classList.remove("is-valid");
    productPrice.classList.add("is-invalid");
    return false;
  }
}

function validateProductCategory() {
  var regex = /^(TV|mobile|laptop|other)$/;
  var CategoryError = document.getElementById("CategoryError");
  if (ProductCategory.value == "") {
    CategoryError.classList.add("d-none");
    ProductCategory.classList.remove("is-invalid");
    ProductCategory.classList.remove("is-valid");
    return false;
  } else if (regex.test(ProductCategory.value)) {
    CategoryError.classList.add("d-none");
    ProductCategory.classList.add("is-valid");
    ProductCategory.classList.remove("is-invalid");
    return true;
  } else {
    CategoryError.classList.remove("d-none");
    ProductCategory.classList.remove("is-valid");
    ProductCategory.classList.add("is-invalid");
    return false;
  }
}

function validateProductDescription() {
  var regex = /^[a-zA-Z]{1,200}$/;
  var descriptionError = document.getElementById("descriptionError");
  if (productDescription.value == "") {
    descriptionError.classList.add("d-none");
    productDescription.classList.remove("is-invalid");
    productDescription.classList.remove("is-valid");
    return false;
  } else if (regex.test(productDescription.value)) {
    descriptionError.classList.add("d-none");
    productDescription.classList.add("is-valid");
    productDescription.classList.remove("is-invalid");
    return true;
  } else {
    descriptionError.classList.remove("d-none");
    productDescription.classList.remove("is-valid");
    productDescription.classList.add("is-invalid");
    return false;
  }
}
