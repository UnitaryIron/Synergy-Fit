const name = localStorage.getItem("userName");
document.getElementById("user-name").textContent = name ?? "User";

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = "login.html"; // or your home page
}
