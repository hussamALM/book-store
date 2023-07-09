let cart = [];
// check if there are already an existing cart
if (localStorage.getItem("cart"))
  cart = JSON.parse(localStorage.getItem("cart"));
// welcome the user by its name stored in the local storage
let node = document.getElementById("username__welcome");
node.textContent = `Welcome ${localStorage.getItem("username")}`;
navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
// set the id of the book that will be shown in the book details page
function setinfo(id) {
  localStorage.setItem("id", id);
  location.href = "/home page/bookDetails.html";
}
function onSuccess(position) {
  let latitude = 24.4862304;
  let longitude = 39.5423091;
  let coords = [latitude, longitude];
  let map = L.map("map").setView(coords, 20);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords).addTo(map).bindPopup("OUR LOCATION").openPopup();
}
function onFailure(error) {
  alert("couldn't get your location");
}
function logoutHandler() {
  localStorage.removeItem("remember");
  location.href = "/index.html";
}
// declare books it outside the function so i can use it in other functions
let books;
async function addItem(id) {
  let respone = await fetch("../API.json");
  let jsonBooks = await respone.json();
  books = jsonBooks.books;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      let check = checkDuplicate(books[i]);
      if (check) {
        return;
      }
      cart.push([books[i], 1, books[i].price]);
      localStorage.setItem("cart", JSON.stringify(cart));
      display();
      break;
    }
  }
}
function checkDuplicate(book) {
  for (let i = 0; i < cart.length; i++) {
    if (book.name == cart[i][0].name) {
      cart[i][1] += 1;
      cart[i][2] += book.price;
      display();
      localStorage.setItem("cart", JSON.stringify(cart));
      return true;
    }
  }
  return false;
}
async function displayBook() {
  let respone = await fetch("../API.json");
  let jsonBooks = await respone.json();
  let books = jsonBooks.books;
  let body = "";
  if (!books) {
    return;
  }
  for (let book of books) {
    body += `
    <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 450px;"
            >
              <img src="../imgs/books-imgs/${book.img}" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title">${book.name}</h6>
                <div class="card-btn">
                <button onclick="setinfo(${book.id})" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(${book.id})" class="fa fa-cart-plus"></i></div>
              </div>
            </div> 
    `;
  }
  document.getElementById("books").innerHTML = body;
}
// display the number of the books in the cart in the shape fixed in the screen
function display() {
  document.getElementById("cart-sum").innerHTML = !cart ? 0 : cart.length;
  displayBook();
}

display();

/* 
      <div class="container-fluid text-center">
        <div class="row">
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img src="../imgs/books-imgs/rdpd.jpg" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title">Rich Dad Poor Dad</h6>
                <button onclick="setinfo(1)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(1)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img src="../imgs/books-imgs/ftf.jpg" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title text-black">First things First</h6>
                <button onclick="setinfo(5)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(5)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img src="../imgs/books-imgs/toTalk.jpg" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title text-black">
                  How to Speak So People Really Listen
                </h6>
                <button onclick="setinfo(2)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(2)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img src="../imgs/books-imgs/rmb.jpg" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title text-black">
                  The Richest Man in Babylon
                </h6>
                <button onclick="setinfo(3)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(3)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid text-center mt-5">
        <div class="row">
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img src="../imgs/books-imgs/7habits.jpg" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title">
                  The 7 Habits Of Highly Effective People
                </h6>
                <button onclick="setinfo(4)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(4)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img
                src="../imgs/books-imgs/powerMind.jpg"
                class="card-img-top"
              />
              <div class="card-body">
                <h6 class="card-title text-black">
                  The Power of Your Subconscious Mind
                </h6>
                <button onclick="setinfo(6)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(6)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img src="../imgs/books-imgs/gtd.jpg" class="card-img-top" />
              <div class="card-body">
                <h6 class="card-title text-black">Getting Things Done</h6>
                <button onclick="setinfo(7)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(7)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="card bg-light text-dark mx-auto design__card"
              style="width: 200px; height: 100%"
            >
              <img
                src="../imgs/books-imgs/atomicHabits.jpg"
                class="card-img-top"
              />
              <div class="card-body">
                <h6 class="card-title text-black">Atomic Habits</h6>
                <button onclick="setinfo(8)" class="btn btn-danger">
                  Learn More!
                </button>
                <i onclick="addItem(8)" class="fa fa-cart-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>*/
