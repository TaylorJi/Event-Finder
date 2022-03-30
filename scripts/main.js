function populateCardsDynamically() {
    let eventCardTemplate = document.getElementById("eventCardTemplate");
    let eventCardGroup = document.getElementById("eventCardGroup");
    
    db.collection("events").get()
        .then(allEvents => {
            allEvents.forEach(doc => {
                var eventTitle = doc.data().title; //gets the name field
                var eventDetails = doc.data().body; //gets the name field
                var eventID = doc.data().category; //gets the unique ID field
                var eventTimeStart = doc.data().timeStart.toDate(); //gets the length field
                var eventTimeEnd = doc.data().timeEnd.toDate(); //gets the length field
                var docID = doc.id;
                let testEventCard = eventCardTemplate.content.cloneNode(true);
                testEventCard.querySelector('.card-title').innerHTML = eventTitle;
                testEventCard.querySelector('.card-time-start').innerHTML = eventTimeStart;
                testEventCard.querySelector('.card-time-end').innerHTML = eventTimeEnd;
                testEventCard.querySelector('.card-details').innerHTML = eventDetails;
                testEventCard.querySelector('a').onclick = () => setDocData(docID);
                testEventCard.querySelector('img').src = `./images/${eventID}.jpg`;
                eventCardGroup.appendChild(testEventCard);
            })

        })
}
populateCardsDynamically();

function setDocData(id){
    localStorage.setItem ('documentID', id);
}