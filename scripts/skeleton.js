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

function dark_mode() {
    if ($(".dark-enable").is(':checked') == true) {
        $('.sidebar').css('background-color', 'darkslategrey');
        $('#header').css('background-color', '#CF6679')
        $('body').attr('style', 'background-color: #121212 !important;transition: all .5s;');
    }
    else {
        $('.sidebar').css('background-color', '#00cbad');
        $('#header').css('background-color', 'orange')
        $('body').attr('style', 'background-color: #f8f9fa!important;transition: all .5s;');

    }
}

loadSkeleton();  //invoke the function

// $(document).ready(function() {
//     .is(':checked')
// })