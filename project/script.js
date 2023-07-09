let btn = document.getElementById("btn");
btn.addEventListener("click", mainClickHandler);

function mainClickHandler() {
  if (localStorage.getItem("remember")) {
    location.href = "home page/home.html";
  } else {
    location.href = "login page/login.html";
  }
}
