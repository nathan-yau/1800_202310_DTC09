function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userPC = userDoc.data().postalcode;
                    var userCity = userDoc.data().city;
                    var userEmail = userDoc.data().email;
                    var subscription = userDoc.data().subscription;
                    var picUrl = userDoc.data().profile_picture;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userPC != null) {
                        document.getElementById("postalCodeInput").value = userPC;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userEmail != null) {
                        document.getElementById("email").value = userEmail;
                    }
                    if (subscription == true) {
                        document.getElementById("emailSubscription").getElementsByTagName('option')[0].selected = true;
                    }
                    else {
                        document.getElementById("emailSubscription").getElementsByTagName('option')[1].selected = true;
                    }
                    if (picUrl != null){
                        console.log(picUrl);
                        $("#mypic-goes-here").attr("src", picUrl);
                    }
                    else {
                    $("#mypic-goes-here").attr("src", "../images/profile.png");
                    console.log("picURL is null");
                    }
                })
        } else {
            // No user is signed in.
            location.replace('./index.html');
        }
    });
}


let originalUserInfo = {};
let editMode = false;

function editUserInfo() {
  var fields = document.getElementById('personalInfoFields').elements;

  if (editMode) {
    // Disable the form fields
    document.getElementById('personalInfoFields').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('edit').innerHTML = "Edit";
    editMode = false;
  } else {
    if (Object.keys(originalUserInfo).length === 0) {
      // Store the original values of the fields
      for (var i = 0; i < fields.length; i++) {
        originalUserInfo[fields[i].name] = fields[i].value;
      }
    }

    // Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
    document.getElementById('email').disabled = true;
    document.getElementById('edit').innerHTML = "Cancel";
    editMode = true;
  }
}



//global variable to store the File Object reference
var ImageFile;

function chooseFileListener(){
    const fileInput = document.getElementById("mypic-input");   // pointer #1
    const image = document.getElementById("mypic-goes-here");   // pointer #2

    //attach listener to input file
    //when this file changes, do something
    fileInput.addEventListener('change', function(e){

        //the change event returns a file "e.target.files[0]"
	    ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
chooseFileListener();


function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

        //Asynch call to put File Object (global variable ImageFile) onto Cloud
        storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                //Asynch call to get URL from Cloud
                storageRef.getDownloadURL()
                    .then(function (url) { // Get "url" of the uploaded file
                        console.log("Got the download URL: " + url);
						//get values from the from
                        var userName = document.getElementById("nameInput").value;
                        var userPC = document.getElementById("postalCodeInput").value;
                        var userCity = document.getElementById("cityInput").value;
                        var subscription = document.getElementById("emailSubscription").value;
                        // console.log(userName, userPC, userCity);

                        //Asynch call to save the form fields into Firestore.
                        if (!ImageFile) {
                            currentUser.update({
                              name: userName,
                              postalcode: userPC,
                              city: userCity,
                              subscription: subscription,
                            })
                            .then(function() {
                              document.getElementById('personalInfoFields').disabled = true;
                            })
                            .catch(function(error) {
                              console.error('Error updating user profile:', error);
                            });
                          } else {
                            currentUser.update({
                              name: userName,
                              postalcode: userPC,
                              city: userCity,
                              subscription: subscription,
                              profile_picture: url
                            })
                            .then(function() {
                              console.log('Added profile pic URL to Firestore.');
                              console.log('Saved user profile info');
                              document.getElementById('personalInfoFields').disabled = true;
                            })
                            .catch(function(error) {
                              console.error('Error updating user profile:', error);
                            });
                          }
                        })
            })
    })
}


populateUserInfo();