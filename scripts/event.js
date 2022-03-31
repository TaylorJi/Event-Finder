

function populateEventPage() {
    let documentID = localStorage.getItem("documentID");
    let eventPageTemplate = document.getElementById("eventPageTemplate");
    let eventPage = document.getElementById("eventPage");
    var docRef = db.collection("events").doc(documentID);

    docRef.get().then((doc) => {
        var eventTitle = doc.data().title;
        var eventDetails = doc.data().body; 
        var eventCategory = doc.data().imgID;
        var eventTimeStart = doc.data().timeStart.toDate(); 
        var eventTimeEnd = doc.data().timeEnd.toDate(); 
        var eventDate = doc.data().timeEnd.toDate(); 

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
