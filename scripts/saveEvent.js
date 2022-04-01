firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            thisUser = userDoc.data();
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(thisdocID => {
                console.log(thisdocID);
                db.collection("events").where("id", "==", thisdocID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;

                    if (size == 1) {
                        var doc = queryData[0].data();
                        var eventTitle = doc.name; //gets the name field
                        var eventID = doc.city; //gets the unique ID field
                        var docID = doc.id;
                        // var eventDetails = doc.body;
                        // var eventCategory = doc.imgID;
                        // var hikeLength = doc.length; //gets the length field
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = eventTitle;
                        newCard.querySelector('.card-length').innerHTML = eventID;
                        newCard.querySelector('a').onclick = () => setDocData(docID);
                        newCard.querySelector('img').src = `./images/${docID}.jpg`;
                        eventCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}