var currentUser;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);
        // the following functions are always called when someone is logged in
        // read_display_Quote();
        // insertName();
        // populateCardsDynamically();
    } else {
        // No user is signed in.
        console.log("No user signed in");
        window.location.href = "login.html";
    }
});

const urlParams = new URLSearchParams(window.location.search);
const searchCategory = urlParams.get("category");
const searchDate = urlParams.get("date");
const searchTime = urlParams.get("time");

console.log(searchCategory,searchDate,searchTime)

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
                // testEventCard.querySelector('a').onclick = () => setDocData(docID);
                testEventCard.querySelector('a').href = "event.html?eventid=" + docID;
                
                testEventCard.querySelector('i').id = 'save-' + docID;
                // this line will call a function to save the hikes to the user's document             
                testEventCard.querySelector('i').onclick = () => saveBookmark(docID);
                testEventCard.querySelector('img').src = `./images/${eventCategory}.jpg`;
                eventCardGroup.appendChild(testEventCard);
            })

        })
}
populateCardsDynamically();

function setDocData(id){
    localStorage.setItem ('docID', id);
}

function saveBookmark(docID) {
    currentUser.set({
            bookmarks: firebase.firestore.FieldValue.arrayUnion(docID)
        }, {
            merge: true
        })
        .then(function () {
            console.log("bookmark has been saved for: " + currentUser);
            var iconID = 'save-' + docID;
            //console.log(iconID);
            document.getElementById(iconID).innerText = 'bookmark';
        });
}



function findEvents() {
    let formCategory = document.getElementById("formCategoryBox").value;
    let formDate = document.getElementById("formDateBox").value;
    let formTime = document.getElementById("formTimeBox").value;
    let count = 0;

    console.log(formCategory, formDate, formTime)

    let finalURL = "main.html?";
    if (formCategory) {
        finalURL += "category=" + formCategory;
        count = 1;
    }
    if (formDate) {
        if (count == 1) {
            finalURL += "&";
        }
        finalURL += "date=" + formDate;
        count = 1;
    }
    if (formTime) {
        if (count == 1) {
            finalURL += "&";
        }
        finalURL += "time=" + formTime;
        count = 1;
    }


    console.log(finalURL)
    window.location.href = finalURL;

}