/**
 *  MAIN JS
 */
//check if there is user name in the localstorage, if not, set it
var user;
if (!localStorage.name) {
    var name = prompt('It seems you\'re visiting for the first time. May I know your name?');
    localStorage.setItem('name', name);
    user = name;
} else {
    user = localStorage.name;
}

//Fill up the notes
if (user === 'Peter') {
    fetchNotes();
}



