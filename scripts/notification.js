function page_redirection() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var subscription = userDoc.data().subscription;
                if (subscription == 1) {
                    $(".subscription-area").children().remove()
                    $(".subscription-area").html(
                        `<h1 class="header">You have subscribed to LifeLine! </h1> 
                        <h1  class="header"> Thank you for your subscription.</h1>`)
                }
                else {
                    $(".subscription-area").html(
                        `    <div class="header">
                        <h1>Subscribe to stay updated</h1>
                      </div>
                      <input id="email" placeholder="Enter your email address" required>
                      <br>
                      <button id="subscribe" class="cta_btn">Subscribe</button>`
                    )
                }
            }
            )
        } else {
            window.location.assign("index.html");
        }
    });
}


function add_subscription() {
    firebase.auth().onAuthStateChanged(function () {
        UserID = firebase.auth().currentUser.uid
        currentUser = db.collection("users").doc(UserID);
        currentUser.get().then(userDoc => {
            var subscription = userDoc.data().subscription;
            console.log(subscription)
            if (subscription == 0) {
                var inputEmail = $("#email").val()
                db.collection("users").doc(UserID).set({
                    subscription: true,
                    subscription_email: inputEmail,
                }, { merge: true });
                $(".subscription-area").children().remove()
                $(".subscription-area").html(
                    `<h1 class="header">You have subscribed to LifeLine! </h1> 
                    <h1  class="header"> Thank you for your subscription.</h1>`)
            }
        }
        )
    })
}


page_redirection();
$("body").on("click", "#subscribe", function () {
    add_subscription();
});