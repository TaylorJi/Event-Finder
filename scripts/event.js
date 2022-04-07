const urlParams = new URLSearchParams(window.location.search);
const eventID = urlParams.get("eventid");

function populateEventPage() {
    // let documentID = localStorage.getItem("documentID");
    let eventPageTemplate = document.getElementById("eventPageTemplate");
    let eventPage = document.getElementById("eventPage");
    var docRef = db.collection("events").doc(eventID);

    docRef.get().then((doc) => {
        var eventTitle = doc.data().title;
        var eventDetails = doc.data().body; 
        var eventCategory = doc.data().imgID;
        var timeStart = doc.data().timeStart.toDate(); 
        var timeEnd = doc.data().timeEnd.toDate(); 
        const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric'});
        const timeFormatter = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'});
        var eventDate  = longEnUSFormatter.format(timeStart);
        var eventTimeStart  = timeFormatter.format(timeStart);
        var eventTimeEnd  = timeFormatter.format(timeEnd);


        console.log(doc.data().title);
        let testEventPage = eventPageTemplate.content.cloneNode(true);
        testEventPage.querySelector('.eventTitle').innerHTML = eventTitle;
        testEventPage.querySelector('.eventStart').innerHTML = eventTimeStart;
        testEventPage.querySelector('.eventEnd').innerHTML = eventTimeEnd;
        testEventPage.querySelector('.eventDate').innerHTML = eventDate;
        testEventPage.querySelector('.eventDetails').innerHTML = eventDetails;
        testEventPage.querySelector('img').src = `./images/${eventCategory}.jpg`;
        eventPage.appendChild(testEventPage);
    })



}


populateEventPage();
