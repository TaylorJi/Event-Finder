firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

//This function will bring the saved events from firebase.
function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            thisUser = userDoc.data();
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(async currentDocId => {
                console.log(currentDocId);
                const query = db.collection("events").doc(currentDocId);
                const doc = await query.get();
                if (doc.exists) {
                    const data = doc.data();
                    var docTitle = data.title;
                    var docCategory = data.category;
                    var eventImgID = doc.data().imgID;
                    let newCard = CardTemplate.content.cloneNode(true);

                    newCard.querySelector('.card-title').innerHTML = docTitle;
                    newCard.querySelector('.card-length').innerHTML = docCategory;
                    newCard.querySelector('a').onclick = () => setDocData(currentDocId);
                    newCard.querySelector('img').src = `./images/${eventImgID}.jpg`;
                    eventCardGroup.appendChild(newCard);
                } else {
                    console.log("no such documentation: " + currentDocId);
                }
            });
        })
}