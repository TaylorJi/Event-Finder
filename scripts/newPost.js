// Adds an event to firestore using the form fields.
// Sam.
function addEvent() {
  console.log("addEvent() executing...")
  let Title = document.getElementById("eventTitle").value;
  let Description = document.getElementById("eventBody").value;
  let Address = document.getElementById("eventAddress").value;
  let Category = document.getElementById("eventCategory").value;
  let StartTime = document.getElementById("eventStartTime").value;
  let EndTime = document.getElementById("eventEndTime").value;
  let BannerURL = document.getElementById("bannerURL").value;
  let ImageID = document.getElementById("imageID").value;


  // Ensuring default values:
  if (Title) {} else { Title = "title" };

  // converting date input field values to actual dates.
  StartTime = parseDate(StartTime.toString());
  EndTime = parseDate(EndTime.toString());

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      let userID = user.uid;
      //Add the event to firestore
      db.collection("events").add({
        title: Title,
        body: Description,
        address: Address,
        category: Category,
        timeStart: StartTime,
        timeEnd: EndTime,
        timePosted: firebase.firestore.FieldValue.serverTimestamp(),
        timeEdited: firebase.firestore.FieldValue.serverTimestamp(),
        bannerURL: BannerURL,
        imgID: ImageID,
        owner: userID
      }).then(() => {
        window.location.href = "newSuccess.html"; // if success to show success page.
      })
    } else {
      console.log("not logged in. Will not add to database");
      window.location.href = "login.html"; // if not logged in then redirect to login page.
    }
  });

}


// creates a JS date object from date-string given by input field, to pass to firestore.
// Sam.
function parseDate(dateinput) {
  let date = ""
  if (dateinput) {
    let year = dateinput.substr(0, 4);
    let month = dateinput.substr(5, 2);
    month -= 1;
    let day = dateinput.substr(8, 2);
    let hh = dateinput.substr(11, 2);
    let mm = dateinput.substr(14, 2);
    date = new Date(year, month, day, hh, mm);
    console.log(date);
    return date;
  } else {
    console.log("arrived at date else option...");
    date = new Date("2022");
    return date;
  }
}