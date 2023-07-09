async function getBookInfo(id) {
  let respone = await fetch("../API.json");
  let jsonBooks = await respone.json();
  let books = jsonBooks.books;
  let book;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      book = books[i];
      break;
    }
  }
  document.getElementById("bookName").textContent = book.name;
  document.getElementById("price").textContent = `price: ${book.price}`;
  document.getElementById("author").textContent = `author: ${book.author}`;
  document.getElementById("bookImage").src = `../imgs/books-imgs/${book.img}`;
  document.getElementById(
    "desc"
  ).textContent = `description: ${book.description}`;
}
getBookInfo(localStorage.getItem("id"));
function logoutHandler() {
  localStorage.removeItem("remember");
  location.href = "/index.html";
}
