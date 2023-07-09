let total;
let cart = [];
function getInfo() {
  cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.length === 0) {
    document.getElementById(
      "danger"
    ).innerHTML = `<h2 class="text-center mx-auto">Your cart is empty</h2>`;
    return;
  }
  document.getElementById("danger").innerHTML = `<thead>
    <tr>
      <th>Title</th>
      <th>Quantity</th>
      <th>Price</th>
       <th>Action</th>
    </tr>
  </thead>
 <tbody id="info"></tbody>`;
  total = 0;
  let body;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i][2];
    body = `
    <tr>
    <td style="vertical-align: middle;">${cart[i][0].name}</td>
    <td style="vertical-align: middle;">${cart[i][1]}</td>
    <td style="vertical-align: middle;">${cart[i][2]}</td>
    <td style="vertical-align: middle;"><i style= "cursor:pointer"class="fa fa-times-circle	
" onclick="deleteHandler(${i})"></i></td>
    </tr>
    `;
    document.getElementById("info").innerHTML += body;
  }
  body = `<tfooter >
  <th class="bg-dark text-white" colspan="3">total</th>
  <th class="bg-dark text-white">${total}</th>
  </tfooter>`;
  document.getElementById("danger").innerHTML += body;
}
function deleteHandler(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getInfo();
}
function deleteCart() {
  if (!cart || cart.length === 0) {
    alert(
      "you don't have anything in your card please make sure to fill your card and try again "
    );
    return;
  }
  let check = confirm("Are you sure you want to delete the cart ?");
  if (!check) {
    return;
  }
  localStorage.removeItem("cart");
  cart = [];
  location.href = "/home page/home.html";
}
function submitHandler() {
  event.preventDefault();
  // check if the admin stop the server from accepting new orders
  if (localStorage.getItem("orders") == "false") {
    alert("sorry we are not accepting any orders right now");
    return;
  }
  if (!cart || cart.length === 0) {
    alert(
      "you don't have anything in your card please make sure to fill your card and try again "
    );
    return;
  }
  let paymethod;
  if (document.getElementById("visa").checked) {
    paymethod = "visa";
  } else if (document.getElementById("paypal").checked) {
    paymethod = "paypal";
  } else if (document.getElementById("mastercard").checked) {
    paymethod = "mastercard";
  }
  let check = confirm(`total=${total} using ${paymethod} ?`);
  if (check) {
    localStorage.removeItem("cart");
    location.href = "/home page/home.html";
  }
}
function logoutHandler() {
  localStorage.removeItem("remember");
  location.href = "/index.html";
}
getInfo();
