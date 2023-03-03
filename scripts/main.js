function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("communityPlaceholder");

    db.collection(collection).get().then(allCommunity => {
        var i = 1;  //Optional: if you want to have a unique ID for each hike
        allCommunity.forEach(doc => { //iterate thru each doc
            var area = doc.data().area;
            var country = doc.data().country;
            var latitude = doc.data().latitude;
            var longitude = doc.data().longitude;
            var place = doc.data().place;
            var postal_code = doc.data().postal_code;
            var province = doc.data().province;
            var region = doc.data().region;
            // var details = doc.data().details;  // get value of the "details" key
            var docID = doc.id;
            let newcard = cardTemplate.content.cloneNode(true);

            //update title and text and image
            newcard.querySelector('.area').innerHTML = area + " (" + postal_code + ")";
            newcard.querySelector('.region').innerHTML = region + " (" + province + ", " + country + ")";
            // newcard.querySelector('.card-text').innerHTML = details;
            newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
            if (region == "Metro Vancouver") {
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            }
            if (i > 10) {
                throw 'Break';
            }
        })
    })
}

function page_distribution() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log($('#mainPlaceholder').load('./text/main_after_login.html'));
            // displayCardsDynamically("communities");
        } else {
            console.log($('#mainPlaceholder').load('./text/main_before_login.html'));
        }
    });

}

page_distribution(); //run the function