function openNav() {
  document.getElementById("navbar").style.width = "250px";
}

function closeNav() {
  document.getElementById("navbar").style.width = "0";
}

$(".login").click(function () {
  window.location = "./login.html";
});