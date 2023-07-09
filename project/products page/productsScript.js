function logoutHandler() {
  localStorage.removeItem("remember");
  location.href = "/index.html";
}

async function displayBooks() {
  let table = document.getElementById("tbody");
  let respone = await fetch("../API.json");
  let jsonBooks = await respone.json();
  let books = jsonBooks.books;
  let tableBody = "";
  for (let i = 0; i < books.length; i++) {
    tableBody += `<tr>
    <td style="vertical-align: middle;">${books[i].name}</td>
    <td style="vertical-align: middle;">${books[i].description}</td>
    <td style="vertical-align: middle;"><img src="../imgs/books-imgs/${books[i].img}" width="70px"/></td>
    <td style="vertical-align: middle;">${books[i].price}</td>
    </tr>
    `;
  }
  table.innerHTML = tableBody;
}
// JQuery effect
$(document).ready(function () {
  $("#discount-card").hide();
  $("#discount").click(function () {
    $("#discount-card").slideToggle();
  });
});
displayBooks();
