function openNav() {
  document.getElementById("navbar").style.width = "250px";
}

function closeNav() {
  document.getElementById("navbar").style.width = "0";
}

$("body").on("click", ".login", function () {
  window.location = "./login.html";
});