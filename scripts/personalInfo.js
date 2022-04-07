var loggedInUser;

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Checks to see if the user is signed in:
        if (user) {

            //go to the current user document by referencing the user uid.
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user including name, email, phone, birthday and city.
                    var userName = userDoc.data().name;
                    var userEmail = userDoc.data().email;
                    var userPhone = userDoc.data().phone;
                    var userBirthday = userDoc.data().birthday;
                    var userCity = userDoc.data().city;

                    //Checks to see if the data fields are empty. If they aren't, populate them with the current users information.
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

            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();


function edit() {
    //Allows us to edit the form fields where the element is in personalInfo.html.
    document.getElementById('personalInfoFields').disabled = false;
}

//Allows us to save the information inputed by the user. 
function save() {
    /* Retrieves the values of name, email, phone, birthday and city that the user entered in the
    fields with the specified ID's. 
    */
    userName = document.getElementById('nameInput').value;       
    userEmail = document.getElementById('emailInput').value;     
    userPhone = document.getElementById('phoneInput').value;
    userBirthday = document.getElementById('birthdayInput').value;
    userCity = document.getElementById('cityInput').value;

    //if user does not enter a name, replace their name with <Name>.
    if (!userName) { userName = "<Name>" }

    //updates the values of the current user into firestore databse. 
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

//declaring a function to insert the name in the personal information page.
function insertName2() {
    firebase.auth().onAuthStateChanged(user => {
        // Checks to see if the user is signed in:
        if (user) {

            console.log(user.uid);
            //go to the current user document by referencing the user uid.
            currentUser = db.collection("users").doc(user.uid);
            //get the document for the current user and store the name in a variable called user_Name.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    console.log(user_Name);

                    //insert current users name using jquery.
                    $("#nameOfUser").text(user_Name);
                })
        } else {
            // No user is signed in.
        }
    });
}
//call the function to insert current users name.
insertName2();