/**
 *  NOTES functions
 */

//Primary domain:
const domain = "https://www.p-kin.com"
// ${domain}

//event listeners for save button, add link tag and add line break button
$('.save').on('click', function(){
    var id = $('#note-textarea').data('id');
    if (id != 0) {
        //call the addOrUpdate function with the data-id attribute and the update method
        addOrUpdateNote(id, 'update');
    } else {
        //call the addOrUpdate function with the data-id attribute and the update method
        addOrUpdateNote(id, 'insert');
    }
    //clear the textarea
    $('#note-textarea').val('');
    //reset the data attribute to 0
    $('#note-textarea').data('id', 0);
});
$('.add-href').on('click', function() {
    var text = $('#note-textarea').val();
    $('#note-textarea').val(text + '<a href=\\"http://\\"></a>');
});
$('.add-br').on('click', function() {
    var text = $('#note-textarea').val();
    $('#note-textarea').val(text + '<br>');
});

//function to fetch the notes from the database and call the displaying function
function fetchNotes() {
    //show loading text
    $('#notes-list').html('Loading...');

    //check if there is internet connection
    if (navigator.onLine) {
        //get the data from the API and call the filling function
        $.getJSON(`${domain}/start/php/notes.php?met=all`, (data) => {
            listNotes(data);
            //+ save the current notes to local storage
            localStorage.setItem('notes', JSON.stringify(data));
        }).fail((xhr, status, message) => {
            $('#notes-list').html(status + ': ' + message);
            //+ load notes from localStorage if exist
            if (localStorage.getItem('notes')) {
                listNotes(JSON.parse(localStorage.getItem('notes')));
            }
        });
    } else {
        //+ load notes from localStorage if exist
        if (localStorage.getItem('notes')) {
            listNotes(JSON.parse(localStorage.getItem('notes')));
        }
    }
}

//function to display all notes
function listNotes(data) {
    var time, seconds, html, isActive;
    //clear loading text
    $('#notes-list').html('');
    //append the notes as html
    data.forEach((note) => {
        //convert timestamp to readable time
        seconds = note.added / 1000;
        time = moment.unix(seconds).format('YYYY.M.D. H:mm');
        //check if note is active or not
        isActive = note.active == 1 ? '' : 'inactive';
        //compose the html
        html = `
        <div class="note ${isActive}" data-id="${note.id}">
            <p>${note.text}</p>
            <span class="added-at">${time}</span>
            <span class="icon-btn delete"><i class="fas fa-trash-alt"></i></span>
            <span class="icon-btn archive"><i class="fas fa-archive"></i></span>
            <span class="icon-btn change"><i class="fas fa-edit"></i></span>
        </div>
        `;
        $('#notes-list').append(html);
    });
    notesMouseFunctions();
}

//functionalities of mouse events on notes
function notesMouseFunctions() {
    //DELETE button
    $('#notes-list').on('click', '.delete', function() {
        archiveOrDeleteNote($(this).parent().data('id'), 'delete');
    });
    //ARCHIVE button
    $('#notes-list').on('click', '.archive', function() {
        //if the note is inactive, call archive function with activate, else with archive
        if ($(this).parent().hasClass('inactive')) {
            archiveOrDeleteNote($(this).parent().data('id'), 'activate');
        } else {
            archiveOrDeleteNote($(this).parent().data('id'), 'archive');            
        }
    });
    //EDIT button
    $('#notes-list').on('click', '.change', function() {
        //put the text into the textarea
        $('#note-textarea').val($(this).parent().find('p').html());
        //set the textarea data-id attr. to the id of the note
        $('#note-textarea').data('id', $(this).parent().data('id'));
    });
}

//function to add or update a note
function addOrUpdateNote(id, method) {
    //clear previous message text
    $('#message-text').html('');
    //get current timestamp
    var time = new Date().getTime();
    //get text from textarea
    var text = $('#note-textarea').val();
    //validate password first
    $.post(`${domain}/site/php/passvalid.php`, {pass: $('#password').val()}, function(response){
        if (response == 1) {
            //send POST request to server
            $.post(`${domain}/start/php/notes.php`,
                {
                    method: method,
                    id: id,
                    added: time,
                    text: text
                },
                function(response) {
                    if (response == 1) {
                        if (method == 'insert') {
                            $('#message-text').html('New note has been saved.');
                        } else if (method == 'update') {
                            $('#message-text').html('Note is updated.');
                        } 
                        fetchNotes();
                    } else {
                        $('#message-text').html('Sorry, something went wrong, please try again later.');
                    }
                }
            );
        } else {
            $('#message-text').html('Sorry, the password is incorrect. Please try again!');
        }
        $('#message').modal('show');
    });
}

//function to arhive, activate or delete a note
function archiveOrDeleteNote(id, method) {
    //clear previous message text
    $('#message-text').html('');
    //validate password first
    $.post(`${domain}/site/php/passvalid.php`, {pass: $('#password').val()}, function(response){
        if (response == 1) {
            //send POST request to server
            $.post(`${domain}/start/php/notes.php`,
                {
                    method: method,
                    id: id
                },
                function(response) {
                    if (response == 1) {
                        if (method == 'archive') {
                            $('#message-text').html('Note has been archived.');
                        } else if (method == 'activate') {
                            $('#message-text').html('Note is changed back to active.');
                        } else if (method == 'delete') {
                            $('#message-text').html('Note has been deleted.');
                        }
                        fetchNotes();
                    } else {
                        $('#message-text').html('Sorry, something went wrong, please try again later.');
                    }
                }
            );
        } else {
            $('#message-text').html('Sorry, the password is incorrect. Please try again!');
        }
        $('#message').modal('show');
    });
}
