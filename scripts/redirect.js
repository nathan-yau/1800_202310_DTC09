function page_redirection() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            location.replace('./main.html');
        } else {
            location.replace('./index.html');
        }
    });

}

page_redirection(); //run the function