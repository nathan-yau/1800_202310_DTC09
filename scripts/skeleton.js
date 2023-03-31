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
        $('.card ').attr('style', 'color: white!important; background-color: #665f5f !important;transition: all .5s; border-radius: 20px!important;');
        $('.enter_btn ').attr('style', 'color: white!important; background-color: #2999FF !important;transition: all .5s;');
        $('h1').attr('style', 'color: white!important')
    }
    else {
        $('.sidebar').css('background-color', '#00cbad');
        $('#header').css('background-color', 'orange')
        $('body').attr('style', 'background-color: #f8f9fa!important;transition: all .5s;');
        $('.card ').attr('style', 'color: black!important; background-color: #fff !important;transition: all .5s; border-radius: 20px!important;');
        $('.enter_btn ').attr('style', 'color: #2999FF!important; background-color: #fff !important;transition: all .5s;');
        $('h1').attr('style', 'color: black!important')
    }
}

loadSkeleton();  //invoke the function

// $(document).ready(function() {
//     .is(':checked')
// })