var loggedInUser;

function populateInfo() {
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
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone;
                    var userBirthday = userDoc.data().birthday;
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userPhone != null) {
                        document.getElementById("phoneInput").value = userPhone;
                    }
                    if (userBirthday != null) {
                        document.getElementById("birthdayInput").value = userBirthday;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();


function edit() {
    //allows us to edit the form fields 
   document.getElementById('personalInfoFields').disabled = false;
}

function save(){
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    userEmail = document.getElementById('emailInput').value;     //get the value of the field with id="schoolInput"
    userPhone = document.getElementById('phoneInput').value;
    userBirthday = document.getElementById('birthdayInput').value;
    userCity = document.getElementById('cityInput').value;
   

    if(!userName) {userName = "<Name>"}
    currentUser.update({
        name: userName,
        email: userEmail,
        phone: userPhone,
        birthday: userBirthday,
        city: userCity
      })
        .then(() => {
          console.log("Document successfully updated!");
          document.getElementById('personalInfoFields').disabled = true;
        })
}

function insertName2() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    console.log(user_Name);
                    //method #1:  insert with html only
                    //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                    //method #2:  insert using jquery
                    $("#nameOfUser").text(user_Name);                         //using jquery
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName2();