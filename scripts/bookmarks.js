function writeBookmark(picture, title, description) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            db.collection("users").doc(user.uid).update({
                bookmark: firebase.firestore.FieldValue.arrayUnion({
                    title: title, 
                    picture: picture, 
                    description: description
                })
            });
        }
    });
}

// writeBookmark("heavy_snow", "Snowing in Vancouver", "Enim ut tellus elementum sagittis vitae et leo duis ut. Mattis aliquam faucibus purus in. Placerat vestibulum lectus mauris ultrices eros. Lectus nulla at volutpat diam ut venenatis tellus. ");
// writeBookmark("heavy_snow", "Lorem ipsum dolor", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
// writeBookmark("heavy_snow", "Lorem ipsum dolor", "Integer quis auctor elit sed vulputate mi sit amet mauris. Ut sem viverra aliquet eget sit amet tellus cras. Quisque id diam vel quam elementum pulvinar etiam non quam. Massa eget egestas purus viverra accumsan.");
// writeBookmark("heavy_snow", "Lorem ipsum dolor", "Lorem ipsum dolor sit amet, ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
// writeBookmark("heavy_snow", "Lorem ipsum dolor", "Ut sem viverra aliquet eget sit amet tellus cras. Quisque id diam vel quam elementum pulvinar etiam non quam. Massa eget egestas purus viverra accumsan.");
// writeBookmark("heavy_snow", "Lorem ipsum dolor", "Integer quis auctor elit sed vulputate mi sit amet mauris. Aliquet eget sit amet tellus cras. Quisque id diam vel quam elementum pulvinar etiam non quam. Massa eget egestas purus viverra accumsan.");


function displayBookmark() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let bookmarkTemplate = document.getElementById("bookmarkTemplate");
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                let bookmarkList= userDoc.data().bookmark;
                bookmarkList.forEach(bookmark => {
                    let title = bookmark.title;
                    let picture = bookmark.picture;
                    let description = bookmark.description;
                    let newBookmark = bookmarkTemplate.content.cloneNode(true);

                    newBookmark.querySelector(".bookmark-title").innerText = title;
                    newBookmark.querySelector('.bookmark-image').src = `./images/${picture}.jpg`;
                    newBookmark.querySelector('.bookmark-text').innerHTML = description;
                    newBookmark.querySelector('.remove-btn').value = title;

                    document.getElementById("bookmarks").appendChild(newBookmark);
                });
            });
        }
    });
}

displayBookmark()


function removeBookmark(title) {
    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            // get the bookmark list
            // iterate through the list
            // if the title matches the title of the bookmark
            // remove the bookmark
            // save array back to user

            currentUser = db.collection("users").doc(user.uid);
            let userDoc = await currentUser.get()
            let bookmarkList= userDoc.data().bookmark;
            bookmarkList.forEach(bookmark => {
                if (bookmark.title == title) {
                    bookmarkList.splice(bookmarkList.indexOf(bookmark), 1);
                }
            });

            console.log(bookmarkList);

            await db.collection("users").doc(user.uid).update({
                bookmark: bookmarkList
            }).catch(function(error) {
                console.error("Error updating bookmark list: ", error);
            });

            location.reload();
            console.log("Bookmark has been removed successfully");
            
        }
    });
    
}