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
                newcard.querySelector('.card-text').innerHTML = `Number of posts: <span class="number_of_posts"></span>`;
                // // newcard.querySelector('a').href = "eachCommunity.html?docID=" + docID;
                document.getElementById(collection + "-go-here").appendChild(newcard);
            }
        )
}

function displayCommunityPostDynamically(collection) {
    let cardTemplate = document.getElementById("CommunityPostPlaceholder");
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    let i = 0
    db.collection(collection).where("communityid", "==", ID)//.orderBy("timestamp")
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
                i += 1
                document.querySelector('.number_of_posts').innerHTML = i;
            });
        }
        )
}

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
                picture: "https://i.ytimg.com/vi/VPRLDDnCU9o/maxresdefault.jpg",
                postcontent: $(".posting-content").val(),
                title: $(".posting-title").val(),
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(
                $("#contact-form").children().remove(),
                $("#contact-form").html(
                    `<a href="javascript:void(0)" class="closepost" onclick="closePopup()">×</a>
                    <h2>Thank you for sharing with us.</h2>`
                )
            )
        }
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
            db.collection('posts').where(firebase.firestore.FieldPath.documentId(), "==", postid)
                .get()
                .then((allPost) => {
                    allPost.forEach((doc) => {
                        var title = doc.data().title
                        var picture = doc.data().picture
                        var postcontent = doc.data().postcontent
                        var author = doc.data().author
                        var timestamp = doc.data().timestamp
                        db.collection("users").doc(user.uid).update({
                            bookmark: firebase.firestore.FieldValue.arrayUnion({
                                title: title,
                                picture: picture,
                                postcontent: postcontent,
                                timestamp: timestamp,
                                author: author,
                                postID: postid
                            })
                        })
                    });
                }).then(function () {
                    console.log("Bookmark added.")
                    $(`#${postid}`).html(`                            
                        <span id="bookmarks_icon" class="material-symbols-rounded" style="font-size:15px;">bookmarks</span>
                        <span style="font-size:15px">Bookmark added! </span>`)
                })
        }
    });
}

displayCommunityDescriptionDynamically("communities");
displayCommunityPostDynamically("posts");