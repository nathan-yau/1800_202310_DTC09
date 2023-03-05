function displayCommunityDescriptionDynamically(collection) {
    let cardTemplate = document.getElementById("CommunityInfoPlaceholder");
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    db.collection(collection)
        .doc(ID)
        .get()
        .then(
            doc => {
                var area = doc.data().area;
                var country = doc.data().country;
                var latitude = doc.data().latitude;
                var longitude = doc.data().longitude;
                var place = doc.data().place;
                var postal_code = doc.data().postal_code;
                var province = doc.data().province;
                var region = doc.data().region;
                // var details = doc.data().details;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);
                // //update title and text and image
                newcard.querySelector('.area').innerHTML = area + " (" + postal_code + ")";
                newcard.querySelector('.region').innerHTML = region + " (" + province + ", " + country + ")";
                newcard.querySelector('.card-text').innerHTML = "Number of posts: ";
                // // newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
                document.getElementById(collection + "-go-here").appendChild(newcard);
            }
        )
}

function displayCommunityPostDynamically(collection) {
    let cardTemplate = document.getElementById("CommunityPostPlaceholder");
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    db.collection(collection).where("communityid", "==", ID)
        .get()
        .then((allPost) => {
            allPost.forEach((doc) => {
                console.log(doc.data())
                var title = doc.data().title
                var photo = doc.data().photo
                var postcontent = doc.data().postcontent
                var user = doc.data().user
                var timestamp = doc.data().timestamp
                let newcard = cardTemplate.content.cloneNode(true);
                var d = new Date(timestamp.seconds * 1000)
                // //update title and text and image
                newcard.querySelector('.title').innerHTML = title;
                newcard.querySelector('.photo').src = photo;
                newcard.querySelector('.postcontent').innerHTML = postcontent;
                newcard.querySelector('.timestamp').innerHTML = "Posted: " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " By " + user;
                // // newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
                document.getElementById(collection + "-go-here").appendChild(newcard);
            });
        }
        )
}

let popup = document.getElementById("popup")

function openPopup(){
    popup.classList.add("open-popup")
}

function closePopup(){
    popup.classList.remove("open-popup")
}

function bookmark(){
    console.log("Bookmarked!")
}

displayCommunityDescriptionDynamically("communities");
displayCommunityPostDynamically("posts");