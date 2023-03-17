//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            // console.log(user.uid)
            // console.log($.currentUser)
            $('#navbarPlaceholder').load('./text/nav_after_login.html')
            $('#footerPlaceholder').load('./text/footer_after_login.html')
        } else {
            // No user is signed in.
            $('#navbarPlaceholder').load('./text/nav_before_login.html');
            $('#footerPlaceholder').load('./text/footer_before_login.html');
        }
    });
    
}

function openNav() {
    document.getElementById("navbar").style.width = "250px";
}

function closeNav() {
    document.getElementById("navbar").style.width = "0";
}

$("body").on("click", ".login", function () {
    window.location = "./login.html";
});

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
        location.replace('./index.html');
      }).catch((error) => {
        // An error happened.
      });
}


loadSkeleton();  //invoke the function
