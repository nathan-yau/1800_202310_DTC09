function check_null(userName, userPC, userCity, userEmail, subscription, picUrl) {
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
  if (picUrl != null) {
    $("#mypic-goes-here").attr("src", picUrl);
  }
  else {
    $("#mypic-goes-here").attr("src", "../images/profile.png");
  }
}

function populateUserInfo() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid)
      currentUser.get()
        .then(userDoc => {
          var userName = userDoc.data().name;
          var userPC = userDoc.data().postalcode;
          var userCity = userDoc.data().city;
          var userEmail = userDoc.data().email;
          var subscription = userDoc.data().subscription;
          var picUrl = userDoc.data().profile_picture;
          check_null(userName, userPC, userCity, userEmail, subscription, picUrl)
        })
    } else {
      location.replace('./index.html');
    }
  });
}

let originalUserInfo = {};
let editMode = false;

function editUserInfo() {
  var fields = document.getElementById('personalInfoFields').elements;

  if (editMode) {
    document.getElementById('personalInfoFields').disabled = true;
    document.getElementById('email').disabled = true;
    document.getElementById('edit').innerHTML = "Edit";
    editMode = false;
  } else {
    if (Object.keys(originalUserInfo).length === 0) {
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

var ImageFile;

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input");   // pointer #1
  const image = document.getElementById("mypic-goes-here");   // pointer #2
  fileInput.addEventListener('change', function (e) {
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);
    image.src = blob;
  })
}

chooseFileListener();

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    var userName = document.getElementById("nameInput").value;
    var userPC = document.getElementById("postalCodeInput").value;
    var userCity = document.getElementById("cityInput").value;
    var subscription = document.getElementById("emailSubscription").value;
    if (document.getElementById("mypic-input").value !== "") {
      var storageRef = storage.ref("images/" + user.uid + ".jpg");
      storageRef.put(ImageFile)
        .then(function () {
          storageRef.getDownloadURL()
            .then(function (url) { // Get "url" of the uploaded file
              console.log("Got the download URL: " + url);
              currentUser.update({
                name: userName,
                postalcode: userPC,
                city: userCity,
                subscription: subscription,
                profile_picture: url
              })
                .then(function () {
                  document.getElementById('personalInfoFields').disabled = true;
                  window.location.reload();
                })
                .catch(function (error) {
                  console.error('Error updating user profile:', error);
                });
              })
        })
    } else {
      currentUser.update({
        name: userName,
        postalcode: userPC,
        city: userCity,
        subscription: subscription,
      })
        .then(function () {
          document.getElementById('personalInfoFields').disabled = true;
          window.location.reload();
        })
        .catch(function (error) {
          console.error('Error updating user profile:', error);
        });  
    }
  })
}

populateUserInfo();