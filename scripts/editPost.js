const urlParams = new URLSearchParams(window.location.search);
const eventID = urlParams.get("eventid");


if (!eventID) {
  console.log("No eventID param detected. Redirecting...")
  redirect(mainPage);
}


// Authenticates user and then loads the event data into form field.
// Sam A.
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    let userID = user.uid;
    // console.log(userID);

    db.collection("events").doc(eventID).get()
      .then(eventDoc => {
        let e_address = eventDoc.data().address;
        let e_bannerURL = eventDoc.data().bannerURL;
        let e_description = eventDoc.data().body;
        let e_category = eventDoc.data().category;
        let e_imgID = eventDoc.data().imgID;
        let e_owner = eventDoc.data().owner;
        let e_timeStart = eventDoc.data().timeStart;
        let e_timeEnd = eventDoc.data().timeEnd;
        let e_title = eventDoc.data().title;
        // console.log(e_timeStart, e_timeEnd);

        // fixing date format
        e_timeStart = parseDateToText(e_timeStart.toDate());
        e_timeEnd = parseDateToText(e_timeEnd.toDate());

        // check if user owns the event
        if (userID === e_owner) {
          document.getElementById("eventTitle").value = e_title;
          document.getElementById("eventBody").value = e_description;
          document.getElementById("eventAddress").value = e_address;
          document.getElementById("eventCategory").value = e_category;
          document.getElementById("eventStartTime").value = e_timeStart;
          document.getElementById("eventEndTime").value = e_timeEnd;
          document.getElementById("bannerURL").value = e_bannerURL;
          document.getElementById("imageID").value = e_imgID;
        } else {
          // if user tries to edit file that they don't own, redirected to event page instead.
          window.location.href = "event.html?eventid=" + eventID;
        }
      }).catch((error) => {
        console.log('Firestore "get" error: ', error);
      });
  } else {
    console.log("No user detected. Redirecting.");
    redirect(loginPage); // if not logged in then redirect to login page.
  }
});




// Updates the event info to firestore from the form fields.
// Sam A.
function updateEvent() {
  console.log("updateEvent() executing...")
  let e_title = document.getElementById("eventTitle").value;
  let e_description = document.getElementById("eventBody").value;
  let e_address = document.getElementById("eventAddress").value;
  let e_category = document.getElementById("eventCategory").value;
  let e_timeStart = document.getElementById("eventStartTime").value;
  let e_timeEnd = document.getElementById("eventEndTime").value;
  let e_bannerURL = document.getElementById("bannerURL").value;
  let e_imgID = document.getElementById("imageID").value;


  // Ensuring default values:
  if (!e_title) { e_title = "title" }
  // converting date input field values to actual dates.
  // console.log(e_timeStart, e_timeEnd);
  e_timeStart = parseTextToDate(e_timeStart.toString());
  e_timeEnd = parseTextToDate(e_timeEnd.toString());


  firebase.auth().onAuthStateChanged(user => {
    let userID = user.uid;
    db.collection("events").doc(eventID).get()
      .then(eventDoc => {
        let e_owner = eventDoc.data().owner;

        if (user && (userID === e_owner)) {
          db.collection("events").doc(eventID).update({     // Sends data to firestore.
            title: e_title,
            body: e_description,
            address: e_address,
            category: e_category,
            timeStart: e_timeStart,
            timeEnd: e_timeEnd,
            timeEdited: firebase.firestore.FieldValue.serverTimestamp(),
            bannerURL: e_bannerURL,
            imgID: e_imgID,
          }).then(() => {
            console.log("event updated.");
            window.location.href = "success.html"; // if success to show success page.
          }).catch((error) => {
            console.error('Firestore "update" error: ', error);
          });
        } else {
          console.log("User mismatch. Will not add to database");
          redirect(loginPage); // if not logged in then redirect to login page.
        }

      }).catch((error) => {
        console.error('Firestore "get" error: ', error);
        console.log("Unable to connect with firstore. Update Failed.");
      });
  });
}
