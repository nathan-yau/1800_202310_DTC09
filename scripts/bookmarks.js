function displayBookmark() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let bookmarkTemplate = document.getElementById("bookmarkTemplate");
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                let bookmarkList = userDoc.data().bookmark;
                if (bookmarkList.length === 0) {
                    let message = document.createElement("p");
                    message.innerText = "There are no bookmarks added.";
                    document.getElementById("message").style.padding = "200px 0px 0px 0px"
                    document.getElementById("message").appendChild(message);
                } else {
                    bookmarkList.forEach(bookmark => {
                        let title = bookmark.title;
                        let picture = bookmark.picture;
                        let postcontent = bookmark.postcontent;
                        let timestamp = bookmark.timestamp;
                        let author = bookmark.author;
                        var d = new Date(timestamp.seconds * 1000)
                        var postID = bookmark.postID
                        let newBookmark = bookmarkTemplate.content.cloneNode(true);

                        newBookmark.querySelector(".bookmark-title").innerText = title;
                        if (picture != '') {
                            newBookmark.querySelector('.bookmark-image').src = `${picture}`;
                        }
                        else {
                            newBookmark.querySelector('.bookmark-image').remove();
                        }
                        newBookmark.querySelector('.bookmark-text').innerHTML = postcontent;
                        newBookmark.querySelector('.bookmark-timestamp').innerHTML = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                            d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                        newBookmark.querySelector('.bookmark-author').innerHTML = author;
                        newBookmark.querySelector('.remove-btn').value = postID;

                        document.getElementById("bookmarks").appendChild(newBookmark);
                    });
                }
            });
        }
        else {
            location.replace('./index.html');
        }
    });
}

displayBookmark()

function removeBookmark(postID) {
    firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            let userDoc = await currentUser.get()
            let bookmarkList = userDoc.data().bookmark;
            bookmarkList.forEach(bookmark => {
                if (bookmark.postID == postID) {
                    bookmarkList.splice(bookmarkList.indexOf(bookmark), 1);
                }
            });
            await db.collection("users").doc(user.uid).update({
                bookmark: bookmarkList
            }).catch(function (error) {
                console.error("Error updating bookmark list: ", error);
            });

            location.reload();
        }
    });
}