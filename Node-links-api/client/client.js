const cors = 'https://cors-anywhere.herokuapp.com/';
// ${cors}

/***************************************************************
 * EVENT LISTENERS FOR BUTTONS
 */
$(document).ready(function() {
    $('#list-table').html('List a table or start a search.');

    //LIST TABLE buttons
    $('.btn-group').on('click', 'button', function() {
        let category = $(this).attr('data-cat');
        console.log(category);
        fillListFromAPI(category);
    });

    //SEARCH LINK button
    $('#search-btn').on('click', function() {
        let text = $('#search-input').val();
        console.log(text);
        if (text !== '') {
            searchFromAPI(text);
            $('#search-input').val('');
        }
    });

    //to use enter key same as click on input
    $("#search-input").keypress(function (e) {
        let key = e.which;
        if (key == 13) {$("#search-btn").click();}
    });  

    //ADD NEW LINK button
    $('#add-btn').on('click', function(){
        let selected = $('#cat-input option:selected'); 
        let category = selected.data('cat');
        let name = $('#name-input').val();
        let link = $('#link-input').val();
        let password = $('#password-input').val();
        console.log(category, name, link);
        if (!name || !link) {
            return alert('All fields are mandatory!');
        }
        //first validate password
        $.post(`${cors}http://ptkin.net/site/php/passvalid.php`, {pass: password}, function(response){
            if (response == 1) {
                //send POST request to server
                $.post('https://ptkin-link-api.herokuapp.com/insert',
                    {
                        category: category,
                        name: name,
                        link: link
                    },
                    function(data) {
                        if (data === 'done') {
                            fillListFromAPI(category);
                            alert('Link added successfully.');
                            $('#name-input').val('');
                            $('#link-input').val('');
                        }
                    }
                );
            } else {
                alert('Sorry, the password is incorrect. Please try again!');
            }
        });
    });
    
    //UPDATE LINK button
    $('#mod-btn').on('click', function(){
        let selected = $('#mod-cat-input option:selected'); 
        let category = selected.data('cat');
        let name = $('#mod-name-input').val();
        let link = $('#mod-link-input').val();
        let id = $('#mod-id-input').val();
        let password = $('#password-input').val();
        console.log(category, id, name, link);
        //first validate password
        if (!id || !name || !link) {
            return alert('All fields are mandatory!');
        }
        $.post(`${cors}http://ptkin.net/site/php/passvalid.php`, {pass: password}, function(response){
            if (response == 1) {
                //send POST request to server
                $.post('https://ptkin-link-api.herokuapp.com/update',
                    {
                        category: category,
                        id: id,
                        name: name,
                        link: link
                    },
                    function(data) {
                        if (data === 'done') {
                            fillListFromAPI(category);
                            alert('Link updated successfully.');
                            $('#mod-name-input').val('');
                            $('#mod-link-input').val('');
                            $('#mod-id-input').val('');
                        }
                    }
                );
            } else {
                alert('Sorry, the password is incorrect. Please try again!');
            }
        });
    });

    //DELETE LINK button
    $('#delete-btn').on('click', function(){
        let selected = $('#del-cat-input option:selected'); 
        let category = selected.data('cat');
        let id = $('#delete-input').val();
        let password = $('#password-input').val();
        console.log(id, category);
        if (!id) {
            return alert('All fields are mandatory!');
        }
        //first validate password
        $.post(`${cors}http://ptkin.net/site/php/passvalid.php`, {pass: password}, function(response){
            if (response == 1) {
                //send POST request to server
                $.post('https://ptkin-link-api.herokuapp.com/delete',
                    {
                        category: category,
                        id: id
                    },
                    function(data) {
                        if (data === 'done') {
                            fillListFromAPI(category);
                            alert('Link deleted successfully.');
                            $('#delete-input').val('')
                        }
                    }
                );
            } else {
                alert('Sorry, the password is incorrect. Please try again!');
            }
        });
    });

    //DOWNLOAD button
    $('#download-btn').on('click', function() {
        window.open('https://ptkin-link-api.herokuapp.com/backup', '_blank');
    });
});


/***************************************************************
 * UI FUNCTIONS
 */

//fills the table 
function fillTheTable(data) {
    const domElement = '#list-table';
    //clear 'loading' text
    $(domElement).html('');
    //fill up the list
    data.forEach(link => {
        $(domElement).append(`
        <tr>
            <th scope="row">${link.id}</th>
            <td>${link.category}</td>
            <td>${link.name}</td>
            <td><a href="${link.link}" target="_blank">${link.link}</a></td>
        </tr>
        `);
    });
}

/***************************************************************
 * DATABASE FUNCTIONS
 */
//get a whole table from the database
function fillListFromAPI(category) {
    $('#list-table').html('Loading...');
    $.getJSON(`https://ptkin-link-api.herokuapp.com/cat/${category}`, (data) => {
        fillTheTable(data);
    }).fail((xhr, status, message) => {
        $('#list-table').html(status + ': ' + message);
    });
}

//search from the node API
function searchFromAPI(text) {
    $('#list-table').html('Loading...');
    $.getJSON(`https://ptkin-link-api.herokuapp.com/search/${text}`, (data) => {
        fillTheTable(data);
    }).fail((xhr, status, message) => {
        $('#list-table').html(status + ': ' + message);
    });
}
