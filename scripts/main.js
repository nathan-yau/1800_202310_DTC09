function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("communityPlaceholder");

    db.collection(collection).where("region", "==", "Metro Vancouver").limit(5).get().then(allCommunity => {
        var i = 1;  //Optional: if you want to have a unique ID for each hike
        allCommunity.forEach(doc => { //iterate thru each doc
            let area = doc.data().area;
            let country = doc.data().country;
            let latitude = doc.data().latitude;
            let longitude = doc.data().longitude;
            let place = doc.data().place;
            let postal_code = doc.data().postal_code;
            let province = doc.data().province;
            let region = doc.data().region;
            // var details = doc.data().details;  // get value of the "details" key
            let docID = doc.id;
            let newcard = cardTemplate.content.cloneNode(true);

            //update title and text and image
            newcard.querySelector('.area').innerHTML = area + " (" + postal_code + ")";
            newcard.querySelector('.region').innerHTML = region + " (" + province + ", " + country + ")";
            // newcard.querySelector('.card-text').innerHTML = details;
            newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
            document.getElementById(collection + "-go-here").appendChild(newcard);
        })
    })
}

function page_distribution() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('#mainPlaceholder').load('./text/main_after_login.html'));
            displayCardsDynamically("communities");
        } else {
            console.log($('#mainPlaceholder').load('./text/main_before_login.html'));
        }
    });

}

page_distribution(); //run the function