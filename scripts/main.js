function populateCardsDynamically() {
    let eventCardTemplate = document.getElementById("eventCardTemplate");
    let eventCardGroup = document.getElementById("eventCardGroup");
    
    db.collection("events").get()
        .then(allEvents => {
            allEvents.forEach(doc => {
                var eventTitle = doc.data().title; 
                var eventDetails = doc.data().body; 
                var eventCategory = doc.data().imgID; 
                var eventTimeStart = doc.data().timeStart.toDate();
                var eventTimeEnd = doc.data().timeEnd.toDate();
                var docID = doc.id;
                let testEventCard = eventCardTemplate.content.cloneNode(true);
                
                testEventCard.querySelector('.card-title').innerHTML = eventTitle;
                testEventCard.querySelector('.card-time-start').innerHTML = eventTimeStart;
                testEventCard.querySelector('.card-time-end').innerHTML = eventTimeEnd;
                testEventCard.querySelector('.card-details').innerHTML = eventDetails;
                testEventCard.querySelector('a').onclick = () => setDocData(docID);
                testEventCard.querySelector('img').src = `./images/${eventCategory}.jpg`;
                eventCardGroup.appendChild(testEventCard);
            })

        })
}
populateCardsDynamically();

function setDocData(id){
    localStorage.setItem ('documentID', id);
}