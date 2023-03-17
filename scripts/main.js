function displayCardsDynamically(collection, category, search) {
    let cardTemplate = document.getElementById("communityPlaceholder");
    if (category == undefined) {
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
                newcard.querySelector('.map-template').innerHTML = `<div id='map-template-${i}' style='width: 100%; height: 200px;'></div>`
                document.getElementById(collection + "-go-here").appendChild(newcard);
                showEventsOnMap(`map-template-${i}`, latitude, longitude)
                i += 1
            })
        })
    }
    if (category != undefined) {
        $("#communities-go-here").children().remove()
        db.collection(collection).where("longitude", "<=", search[0]).where("longitude", ">=", search[2]).get().then(allCommunity => {
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
                if (latitude <= search[1] & latitude >= search[3]) {
                    //update title and text and image
                    newcard.querySelector('.area').innerHTML = area + " (" + postal_code + ")";
                    newcard.querySelector('.region').innerHTML = region + " (" + province + ", " + country + ")";
                    // newcard.querySelector('.card-text').innerHTML = details;
                    newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
                    newcard.querySelector('.map-template').innerHTML = `<div id='map-template-${i}' style='width: 100%; height: 200px;'></div>`
                    document.getElementById(collection + "-go-here").appendChild(newcard);
                    showEventsOnMap(`map-template-${i}`, latitude, longitude)
                    i += 1
                }
            })
        })
    }
}

function page_distribution() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#mainPlaceholder').load('./text/main_after_login.html');
            displayCardsDynamically("communities");
        } else {
            $('#mainPlaceholder').load('./text/main_before_login.html');
        }
    });

}

function showEventsOnMap(mapid, lat, long) {
    // Defines basic mapbox data
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
    const map = new mapboxgl.Map({
        container: mapid, // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
        center: [long, lat], // Starting position
        zoom: 11, // Starting zoom
        interactive: false
    });

    const marker1 = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map);
}

function search_by_user_location() {
    navigator.geolocation.getCurrentPosition(position => {
        const range = 0.02
        const userLocation = [position.coords.longitude + range, position.coords.latitude + range, position.coords.longitude - range, position.coords.latitude - range];
        console.log(userLocation);
        displayCardsDynamically("communities", 'GPS', userLocation);
    })
}

page_distribution(); //run the function