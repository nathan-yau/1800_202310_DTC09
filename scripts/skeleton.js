function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#navbarPlaceholder').load('../text/nav_after_login.html')
            $('#footerPlaceholder').load('../text/footer_after_login.html')
        } else {
            $('#navbarPlaceholder').load('../text/nav_before_login.html');
            $('#footerPlaceholder').load('..    /text/footer_before_login.html');
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
        console.log("logging out user");
        location.replace('./index.html');
    })
}

function dark_mode() {
    if ($(".dark-enable").is(':checked') == true) {
        $('.sidebar').attr('style', 'background-color: darkslategrey !important;');
        $('#header').attr('style', 'background-color: #CF6679 !important;');
        $('footer').attr('style', 'background-color: #CF6679 !important;');
        $('body').attr('style', 'background-color: #121212 !important;transition: all .5s;');
        $('.card ').attr('style', 'color: white!important; background-color: #665f5f !important;transition: all .5s; border-radius: 20px!important;');
        $('.enter_btn ').attr('style', 'color: white!important; background-color: #2999FF !important;transition: all .5s;');
        $('#search_btn').attr('style', 'color: white!important; background-color: #2999FF !important;transition: all .5s;');
        $('h1').attr('style', 'color: white!important')
        $('p').attr('style', 'color: white!important')
        $('.card-footer').attr('style', 'background-color: #665f5f!important')
        $('.material-symbols-rounded').attr('style', 'color: white!important')
        $('.faq-page').attr('style', 'color: #858282!important')
        $('.faq-body').attr('style', 'color: #858282!important')
        $('.faq-container').attr('style', 'color: #858282!important')
    }
    else {
        $('.sidebar').removeAttr('style').attr('style', 'transition: all .5s;')
        $('#header').removeAttr('style').attr('style', 'transition: all .5s;')
        $('footer').removeAttr('style').attr('style', 'transition: all .5s;')
        $('body').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.card ').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.enter_btn ').removeAttr('style').attr('style', 'transition: all .5s;')
        $('#search_btn ').removeAttr('style').attr('style', 'transition: all .5s;')
        $('h1').removeAttr('style').attr('style', 'transition: all .5s;')
        $('p').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.card-footer').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.material-symbols-rounded').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.faq-page').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.faq-body').removeAttr('style').attr('style', 'transition: all .5s;')
        $('.faq-container').removeAttr('style').attr('style', 'transition: all .5s;')
    }
}

loadSkeleton();