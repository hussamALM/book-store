function checkData(event) {
  event.preventDefault();
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let users = [];
  if (username == "admin" && password == "123") {
    location.href = "/admin page/admin.html";
    return;
  }
  if (localStorage.getItem("server") == "false") {
    alert("sorry the server is not available");
    return;
  }

  if (username == "admin" && password == "123") {
    location.href = "/admin page/admin.html";
    return;
  }
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }
  isCorrect = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i][0] == username && users[i][1] == password) {
      isCorrect = true;
      localStorage.setItem("username", username);
      break;
    }
  }

  if (!isCorrect) {
    alert("the username or the password is incorrect");
    location.href = "#";
    return;
  }
  if (document.getElementById("rem").checked) {
    localStorage.setItem("remember", document.getElementById("username").value);
  }
  location.href = "/home page/home.html";
  localStorage.setItem("username", document.getElementById("username").value);
}
