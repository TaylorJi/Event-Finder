
//declaring a function to insert the name in the profile card.
function insertName() {
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
                    $("#name-goes-here").text(user_Name);
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

//declaring a function to insert the name in the welcome hero. 
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
                    $("#newName").text(user_Name);
                })
        } else {
            // No user is signed in.
        }
    });
}
insertName2();