function logoutHandler() {
  localStorage.removeItem("remember");
  location.href = "/index.html";
}

async function displayBook(name) {
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
    document.getElementById("search-main").innerHTML = `<h1>no data found</h1>`;
    return;
  }
  let body = `
  <div class="bg-light">
      <table class="table table-striped mt-3 text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th width="70%">Description</th>
            <th>Image</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        <tr>
    <td style="vertical-align: middle;">${book.name}</td>
    <td style="vertical-align: middle;">${book.description}</td>
    <td style="vertical-align: middle;"><img src="../imgs/books-imgs/${book.img}" width="70px"/></td>
    <td style="vertical-align: middle;">${book.price}</td>
    </tr>
        </tbody>
      </table>
    </div>
    `;
  document.getElementById("search-main").innerHTML = body;
}
function clickHandler() {
  let name = document.getElementById("name").value;
  displayBook(name);
}
document.addEventListener("keypress", (event) => {
  if (event.key == "Enter") clickHandler();
});
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
displaySearch();
