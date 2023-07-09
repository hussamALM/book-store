let cart = [];

async function displaySearch() {
  let respone = await fetch("../API.json");
  let jsonBooks = await respone.json();
  let books = jsonBooks.books;
  let body;
  for (let i = 0; i < books.length; i++) {
    body += `<option>${books[i].name}</option>`;
  }
  document.getElementById("books").innerHTML = body;
}
function clickHandler(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let quantity = Number(document.getElementById("quantity").value);
  displayBook(name, quantity);
}
async function displayBook(name, quantity) {
  let respone = await fetch("../API.json");
  let jsonBooks = await respone.json();
  let books = jsonBooks.books;
  let book;
  for (let i = 0; i < books.length; i++) {
    if (books[i].name.toLowerCase() === name.toLowerCase()) {
      book = books[i];
    }
  }
  if (!book) {
    alert("no book data was found !");
    return;
  }
  let there = isThere(book, quantity);
  if (!there) {
    cart.push([book, quantity, book.price * quantity]);
    renderCart();
  }
}
function isThere(book, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (book.name == cart[i][0].name) {
      cart[i][1] += Number(quantity);
      cart[i][2] = cart[i][0].price * cart[i][1];
      console.log("there");
      renderCart();
      return true;
    }
  }
}
function renderCart() {
  let body = "";
  for (let i = 0; i < cart.length; i++) {
    body += `
<tr>
    <td style="vertical-align: middle;">${cart[i][0].name}</td>
    <td style="vertical-align: middle;">${cart[i][0].price}</td>
    <td style="vertical-align: middle;">${cart[i][1]}</td>
    <td style="vertical-align: middle;">${
      cart[i][1] * Number(cart[i][0].price)
    }</td>
    <td style="vertical-align: middle;"><button class="btn btn-danger" onclick="deleteHandler(${i})">Delete</button></td>
    </tr>
`;
  }
  document.getElementById("tbody").innerHTML = body;
}
function deleteHandler(index) {
  cart.splice(index, 1);
  renderCart();
}
let temp;
function submitHandler() {
  if (!cart.length > 0) {
    alert("please choose book to buy");
    return;
  }
  for (let i = 0; i < cart.length; i++) {}
  if (localStorage.getItem("cart")) {
    temp = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      checkDuplicate(cart[i][0], cart[i][1], i);
    }
    temp.push(...cart);
    localStorage.setItem("cart", JSON.stringify(temp));
  } else {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  document.getElementById(
    "main"
  ).innerHTML = `<h1 class="text-center " style="margin-top:250px;">thanks for purchasing</h1>
  <div class="text-center mt-5">
  <button onclick="reloadPage()" class="btn btn-dark">Continue Shopping</button></div
  `;
}
function checkDuplicate(book, quantity, index) {
  for (let i = 0; i < temp.length; i++) {
    if (book.name == temp[i][0].name) {
      temp[i][1] += quantity;
      temp[i][2] += quantity * book.price;
      cart.splice(index, 1);
      return true;
    }
  }
  return false;
}
function reloadPage() {
  location.href = "/cart page/cart.html";
}

function logoutHandler() {
  localStorage.removeItem("remember");
  location.href = "/index.html";
}
displaySearch();
