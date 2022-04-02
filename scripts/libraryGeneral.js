// static definitions
const mainPage = "main.html";
const indexPage = "index.html";
const loginPage = "login.html";


// function for redirecting pages.
function redirect(page) {
  window.location.href = page;
}


// creates a JS date object from date-string given by input field, to pass to firestore.
// Sam A.
function parseTextToDate(dateinput) {
  let date = ""
  if (dateinput) {
    let year = dateinput.substr(0, 4);
    let month = dateinput.substr(5, 2);
    month -= 1;
    let day = dateinput.substr(8, 2);
    let hh = dateinput.substr(11, 2);
    let mm = dateinput.substr(14, 2);
    date = new Date(year, month, day, hh, mm);
    console.log(date);
    return date;
  } else {
    console.log("date field is empty. Using default date.");
    date = new Date("2022");
    return date;
  }
}


// Creates date string from a JS date object, formatted for the date input field.
function parseDateToText(dateOBJ) {
  if (dateOBJ) {
    let year = dateOBJ.getFullYear();
    let month = dateOBJ.getMonth() + 1;
    let day = dateOBJ.getDate();
    let hh = dateOBJ.getHours();
    let mm = dateOBJ.getMinutes();
    let date = "" + year + "-"
    + ((month < 10) ? ("0" + month) : month) + "-"
    + ((day < 10) ? ("0" + day) : day) + "T"
    + ((hh < 10) ? ("0" + hh) : hh) + ":"
    + ((mm < 10) ? ("0" + mm) : mm);

    // + month + "-" + day + "T" + hh + "-" + mm;
    console.log("parsed date looks like: ", date);
    return date;
  } else {
    console.log("failed to parse date String. dateOBJ from firestore was empty.");
    return "";
  }
}



/*  Doesn't seem to work because async problems. Archiving.

    function fixZero(number) {
      if (number < 10) {
        number = "0" + number;
        console.log("now number is: " + number);
      }
      else {
        return number;
      }
    }
*/
