function insertName() {
    firebase.auth().onAuthStateChanged(user => { //will verify whos logged in
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console (The hash code of the user)
            console.log(user.displayName);  //print the user name in the browser console
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#signing").children().remove();
            $("#signing").html(`<a href="./logout.html">Logout<br><span style="font-size: 20px;">(${user_Name})</span></a>`);

        } else {
            // No user is signed in.
            $("#main-context").html(`
                <div class="login-div">
                    <h1 style="text-align: center;margin-bottom: 5%;">Join the conversation and share your own weather updates</h1>
                    <h1 style="text-align: center;margin-bottom: 5%;">Log in to LifeLine to get started.</h1>
                    <button class="login"> LOG IN / SIGN UP</button>
                </div>`)
        }
    });
}
insertName(); //run the function