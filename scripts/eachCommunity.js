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
                document.querySelector('.community_name').innerHTML = area + " (" + postal_code + ")";
                newcard.querySelector('.card-text').innerHTML = `Number of posts: <span class="number_of_posts">0</span>`;
                // newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
                document.getElementById(collection + "-go-here").appendChild(newcard);
                showEventsOnMap(`map-template`, latitude, longitude)
            }
        )
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

function displayCommunityPostDynamically(collection) {
    let cardTemplate = document.getElementById("CommunityPostPlaceholder");
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    let i = 0

    db.collection(collection).where("communityid", "==", ID) //.orderBy("timestamp", "desc")
        .get()
        .then((allPost) => {
            allPost.forEach((doc) => {
                var title = doc.data().title
                var picture = doc.data().picture
                var postcontent = doc.data().postcontent
                var author = doc.data().author
                var timestamp = doc.data().timestamp
                let newcard = cardTemplate.content.cloneNode(true);
                var d = new Date(timestamp.seconds * 1000)
                var postID = doc.id
                // //update title and text and image
                newcard.querySelector('.title').innerHTML = title;
                newcard.querySelector('.picture').src = picture;
                newcard.querySelector('.postcontent').innerHTML = postcontent;
                newcard.querySelector('.timestamp').innerHTML = "Posted: " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " By " + author;
                newcard.querySelector('.bookmark').setAttribute('id', postID)
                // // newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
                document.getElementById(collection + "-go-here").appendChild(newcard);
                firebase.auth().onAuthStateChanged(function (user) {
                    var x = 0
                    if (user) {
                        currentUser = db.collection("users").doc(user.uid);
                        currentUser.get().then(userDoc => {
                            var bookmarkList = userDoc.data().bookmark;
                            $.each(bookmarkList, function () {
                                if (bookmarkList[x].postID == postID) {
                                    $(`#${postID}`).html(`                            
                                    <span id="bookmarks_icon_small" class="material-symbols-rounded" style="font-size:16px; padding-top: 5px;">bookmarks</span>
                                    <span style="font-size:12px">Bookmark added! </span>`)
                                }
                                x += 1
                            })
                        })
                    }
                })
                i += 1
                document.querySelector('.number_of_posts').innerHTML = i;
            });
        }
        )
}

var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        // image.src = blob; // Display this image
    })
}
listenFileSelect();

function add_post() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            UserID = firebase.auth().currentUser.uid
            currentUser = db.collection("users").doc(UserID);
            let params = new URL(window.location.href);
            let ID = params.searchParams.get("docID");
            db.collection("posts").add({
                author: firebase.auth().currentUser.displayName,
                communityid: ID,
                // picture: "https://i.ytimg.com/vi/VPRLDDnCU9o/maxresdefault.jpg",
                postcontent: $(".posting-content").val(),
                title: $(".posting-title").val(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then((doc) => {
                uploadPic(doc.id),
                    $("#contact-form").children().remove(),
                    $("#contact-form").html(
                        `<a href="javascript:void(0)" class="closepost" onclick="closePopup()">×</a>
                    <h2>Thank you for sharing with us.</h2>`
                    )
            })
        }
    })
}

function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "picture": url // Save the URL into users collection
                    })

                        // AFTER .update is done
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

let popup = document.getElementById("popup")

function openPopup() {
    popup.classList.add("open-popup")
}

function closePopup() {
    popup.classList.remove("open-popup")
}

function bookmark() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var postid = event.currentTarget.id
            db.collection('posts').doc(postid).get()
                .then((doc) => {
                    var title = doc.data().title
                    var picture = doc.data().picture
                    var postcontent = doc.data().postcontent
                    var author = doc.data().author
                    var timestamp = doc.data().timestamp
                    var bookmarkRef = db.collection("users").doc(user.uid)
                    bookmarkRef.get().then((doc) => {
                        if (doc.exists) {
                            var bookmarks = doc.data().bookmark
                            var bookmarkIndex = bookmarks.findIndex((bookmark) => bookmark.postID === postid)
                            if (bookmarkIndex === -1) {
                                bookmarkRef.update({
                                    bookmark: firebase.firestore.FieldValue.arrayUnion({
                                        title: title,
                                        picture: picture,
                                        postcontent: postcontent,
                                        timestamp: timestamp,
                                        author: author,
                                        postID: postid
                                    })
                                }).then(() => {
                                    console.log("Bookmark added.")
                                    $(`#${postid}`).html(`                            
                                        <span id="bookmarks_icon_small" class="material-symbols-rounded" style="font-size:16px; padding-top: 5px;">bookmarks</span>
                                        <span style="font-size:12px">Bookmark added! </span>`)
                                })
                            } else {
                                bookmarkRef.update({
                                    bookmark: firebase.firestore.FieldValue.arrayRemove(bookmarks[bookmarkIndex])
                                }).then(() => {
                                    console.log("Bookmark removed.")
                                    $(`#${postid}`).html(`                            
                                        <span " class="material-symbols-rounded" style="font-size:16px; padding-top: 5px;">bookmarks</span>
                                        <span style="font-size:12px">BOOKMARK THIS POST</span>`)
                                })
                            }
                        } else {
                            bookmarkRef.set({
                                bookmark: [{
                                    title: title,
                                    picture: picture,
                                    postcontent: postcontent,
                                    timestamp: timestamp,
                                    author: author,
                                    postID: postid
                                }]
                            }).then(() => {
                                console.log("Bookmark added.")
                                $(`#${postid}`).html(`                            
                                    <span id="bookmarks_icon_small" class="material-symbols-rounded" style="font-size:16px; padding-top: 5px;">bookmarks</span>
                                    <span style="font-size:12px">Bookmark added! </span>`)
                            })
                        }
                    })
                })
        }
    });
}
displayCommunityDescriptionDynamically("communities");
displayCommunityPostDynamically("posts");
