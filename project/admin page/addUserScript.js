function addNewUser(event) {
  event.preventDefault();
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let user = [username.value, password.value];
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alert("user added");
  username.value = "";
  password.value = "";
}
