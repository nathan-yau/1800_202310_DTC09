function page_redirection() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var subscription = userDoc.data().subscription;
                if (subscription == 1) {
                    $(".subscription-area").children().remove()
                    $(".subscription-area").html(
                        `<h1 class="header">You have scubscribed to LifeLine! </h1> 
                        <h1  class="header"> Thank you for your subscription.</h1>`)
                }
            }
            )
        } else {
            window.location.assign("main.html");
        }
    });
}


function add_subscription() {
    firebase.auth().onAuthStateChanged(function () {
        UserID = firebase.auth().currentUser.uid
        currentUser = db.collection("users").doc(UserID);
        currentUser.get().then(userDoc => {
            var subscription = userDoc.data().subscription;
            if (subscription == 0) {
                var inputEmail = $("#email").val()
                db.collection("users").doc(UserID).set({
                    subscription: true,
                    subscription_email: inputEmail,
                    email: firebase.auth().currentUser.email
                })
                $(".subscription-area").children().remove()
                $(".subscription-area").html(
                    `<h1 class="header">You have scubscribed to LifeLine! </h1> 
                    <h1  class="header"> Thank you for your subscription.</h1>`)
            }
        }
        )
    })
}

// currentUser = db.collection("users").doc(user.uid);
// currentUser.get().then(userDoc => {
//     var subscription = userDoc.data().subscription;
//     db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
//         subscription: true,                    //"users" collection
//         email: user.email,                         //with authenticated user's ID (user.uid)
//         country: "Canada",                      //optional default profile info      
//         school: "BCIT"                          //optional default profile info
//     })
// }

page_redirection();
$("body").on("click", "#subscribe", function () {
    add_subscription();
});