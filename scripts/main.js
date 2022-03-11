function populateCardsDynamically() {
    let eventCardTemplate = document.getElementById("eventCardTemplate");
    let eventCardGroup = document.getElementById("eventCardGroup");
    
    db.collection("events").get()
        .then(allEvents => {
            allEvents.forEach(doc => {
                var eventTitle = doc.data().title; //gets the name field
                var eventDetails = doc.data().details; //gets the name field
                var eventID = doc.data().id; //gets the unique ID field
                var eventTime = doc.data().time.toDate(); //gets the length field
                let testEventCard = eventCardTemplate.content.cloneNode(true);
                testEventCard.querySelector('.card-title').innerHTML = eventTitle;
                testEventCard.querySelector('.card-time').innerHTML = eventTime;
                testEventCard.querySelector('.card-details').innerHTML = eventDetails;
                testEventCard.querySelector('a').onclick = () => setEventData(eventID);
                testEventCard.querySelector('img').src = `./images/${eventID}.jpg`;
                eventCardGroup.appendChild(testEventCard);
            })

        })
}
populateCardsDynamically();