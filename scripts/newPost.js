// Used by newPost.html
// Author: Sam A.
//


// Adds an event to firestore using the form fields.
// Sam A.
function addEvent() {
  console.log("addEvent() executing...")
  let e_title = document.getElementById("eventTitle").value;
  let e_description = document.getElementById("eventBody").value;
  let e_address = document.getElementById("eventAddress").value;
  let e_category = document.getElementById("eventCategory").value;
  let e_timeStart = document.getElementById("eventStartTime").value;
  let e_timeEnd = document.getElementById("eventEndTime").value;
  let e_bannerURL = document.getElementById("bannerURL").value;
  let e_imgID = document.getElementById("imageID").value;


  // Ensuring default values:
  if (!e_title) { e_title = "title" };

  // converting date input field values to actual dates.
  // console.log(e_timeStart, e_timeEnd);
  e_timeStart = parseTextToDate(e_timeStart.toString());
  e_timeEnd = parseTextToDate(e_timeEnd.toString());

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;
      //Add the event to firestore
      db.collection("events").add({
        title: e_title,
        body: e_description,
        address: e_address,
        category: e_category,
        timeStart: e_timeStart,
        timeEnd: e_timeEnd,
        timePosted: firebase.firestore.FieldValue.serverTimestamp(),
        timeEdited: firebase.firestore.FieldValue.serverTimestamp(),
        bannerURL: e_bannerURL,
        imgID: e_imgID,
        owner: userID
      }).then(docRef => {
        let docID = docRef.id;
        console.log("new Doc ID is: ", docID);
        
        // adds the event to user's owned events
        db.collection("users").doc(userID).update({
          posts: firebase.firestore.FieldValue.arrayUnion(docID)
        }).then( () => {
          console.log("event ID was added to user's data.");
        });
        window.location.href = "./success.html"; // if success to show success page.
      })
    } else {
      console.log("not logged in. Will not add to database");
      redirect(loginPage); // if not logged in then redirect to login page.
    }
  });
}
