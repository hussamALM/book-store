let users = JSON.parse(localStorage.getItem("users"));
function displayusers() {
  users = JSON.parse(localStorage.getItem("users"));
  if (!users || users.length == 0) return;
  let body = `
  <table class="table table-striped mt-3 text-center">
  <tr>
  <th>Username</th>
 <th>Password</th>
 <th>Action</th>
  </tr>
  `;
  for (let i = 0; i < users.length; i++) {
    body += `<tr>
    <td>${users[i][0]}</td>
    <td>${users[i][1]}</td>
    <td><button onclick="deleteUser(${i})" class="btn btn-danger">Delete</button></td>
    </tr>`;
  }
  body += `</table>`;
  document.getElementById("main-info").innerHTML = body;
}
displayusers();
function deleteUser(id) {
  let ok = confirm(
    "Are you sure you want to delete this user, THIS USER CANNOT BE RESTORED !"
  );
  if (!ok) return;
  users.splice(id, 1);
  localStorage.setItem("users", JSON.stringify(users));
  displayusers();
}
