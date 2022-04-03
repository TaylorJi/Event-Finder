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
            bookmarks.forEach(async currentDocId => {
                console.log(currentDocId);
                const query = db.collection("events").doc(currentDocId);
                const doc = await query.get();
                if (doc.exists) {
                    const data = doc.data();
                    var docTitle = data.title;
                    var docCategory = data.category;
                    let newCard = CardTemplate.content.cloneNode(true);

                    newCard.querySelector('.card-title').innerHTML = docTitle;
                    newCard.querySelector('.card-length').innerHTML = docCategory;
                    newCard.querySelector('a').onclick = () => setDocData(currentDocId);
                    newCard.querySelector('img').src = `./images/${currentDocId}.jpg`;
                    eventCardGroup.appendChild(newCard);
                } else {
                    console.log("no such documentation: " + currentDocId);
                }
            });
        })
}