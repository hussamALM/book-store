let bt = document.getElementById("bt");
let action = document.getElementById("form").action;

bt.addEventListener("click", registrationBtnHandler);
bt.addEventListener("submit", submithandler);

function registrationBtnHandler() {
  let username1 = document.getElementById("username").value;
  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;
  let isChecked = document.getElementById("policy").checked;
  if (password1 != password2) {
    event.preventDefault();
    document.getElementById("form").action = "";
    document.getElementById("passwordlabel1").style.color = "red";
    document.getElementById("passwordlabel2").style.color = "red";
    alert("the two password do not match");
  } else if (!isChecked) {
    event.preventDefault();
    document.getElementById("form").action = "";
    document.getElementById("policylabel").style.color = "red";
    alert("please accept our policy");
  } else {
    document.getElementById("form").action = action;
    let users = [];
    if (localStorage.getItem("users"))
      users = JSON.parse(localStorage.getItem("users"));
    users.push([username1, password1]);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("username", username1);
  }
}
function submithandler() {
  let username1 = document.getElementById("username").value;
  let password1 = document.getElementById("password1").value;
  let users = [];
  if (localStorage.getItem("users"))
    users = JSON.parse(localStorage.getItem("users"));
  users.push([username, password1]);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("username", username1);
}
