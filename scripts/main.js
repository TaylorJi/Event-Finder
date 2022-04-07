const urlParams = new URLSearchParams(window.location.search);
const searchCategory = urlParams.get("category");
const searchDate = urlParams.get("date");
const searchTime = urlParams.get("time");


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


console.log(searchCategory,searchDate,searchTime)

function populateCardsDynamically() {
    let eventCardTemplate = document.getElementById("eventCardTemplate");
    let eventCardGroup = document.getElementById("eventCardGroup");
    
    // let paramC1;
    // let paramC2;
    // let paramT1;
    // let paramT2;
    // let paramT3;


    // if (searchCategory) {
    //     paramC1 = "category"
    //     paramC2 = searchCategory;
    // } else {
    //     paramC1 = true;
    //     paramC2 = true;
    // }

    // if (searchDate) {
    //     paramT1 = "TimeEnd"
    //     paramT2 = ">=";
    //     paramT3 = paramDate;
    // } else {
    //     paramT1 = true;
    //     paramT2 = "==";
    //     paramT3 = true;
    // }

    db.collection("events")
    // .where(paramC1, "==", paramC1).where(paramT1, paramT2, paramT3)
    .get()
        .then(allEvents => {
            allEvents.forEach(doc => {
                var eventTitle = doc.data().title; 
                var eventDetails = doc.data().body; 
                var eventImgID = doc.data().imgID; 
                var eventCategory = doc.data().category;
                var timeStart = doc.data().timeStart.toDate(); 
                var timeEnd = doc.data().timeEnd.toDate(); 
                const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric'});
                const timeFormatter = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'});
                var eventDate  = longEnUSFormatter.format(timeStart);
                var eventTimeStart  = timeFormatter.format(timeStart);
                var eventTimeEnd  = timeFormatter.format(timeEnd);

                var docID = doc.id;
                let testEventCard = eventCardTemplate.content.cloneNode(true);
                testEventCard.querySelector('.card-title').innerHTML = eventTitle;
                testEventCard.querySelector('.card-date').innerHTML = eventDate;
                testEventCard.querySelector('.card-time-start').innerHTML = eventTimeStart;
                testEventCard.querySelector('.card-time-end').innerHTML = eventTimeEnd;
                // testEventCard.querySelector('a').onclick = () => setDocData(docID);
                testEventCard.querySelector('a').href = "event.html?eventid=" + docID;
                
                testEventCard.querySelector('i').id = 'save-' + docID;
                // this line will call a function to save the hikes to the user's document             
                testEventCard.querySelector('i').onclick = () => saveBookmark(docID);
                testEventCard.querySelector('img').src = `./images/${eventImgID}.jpg`;
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