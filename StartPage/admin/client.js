const cors = 'https://cors-anywhere.herokuapp.com/';
// ${cors}

//Primary domain:
const domain = "https://www.p-kin.com"
// ${domain}

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

    // //SEARCH LINK button
    // $('#search-btn').on('click', function() {
    //     let text = $('#search-input').val();
    //     console.log(text);
    //     if (text !== '') {
    //         searchFromAPI(text);
    //         $('#search-input').val('');
    //     }
    // });

    // //to use enter key same as click on input
    // $("#search-input").keypress(function (e) {
    //     let key = e.which;
    //     if (key == 13) {$("#search-btn").click();}
    // });  

    //ADD NEW LINK button
    $('#add-btn').on('click', function(){
        let selected = $('#cat-input option:selected'); 
        let category = selected.val();
        let name = $('#name-input').val();
        let link = $('#link-input').val();
        let icon = $('#icon-input').val();
        let prio = $('#prio-input').val();
        let password = $('#password-input').val();
        console.log(category, name, link, icon, prio);
        if (!category || !name || !link || !icon || !prio) {
            return alert('All fields are mandatory!');
        }
        //first validate password
        $.post(`${domain}/site/php/passvalid.php`, {pass: password}, function(response){
            if (response == 1) {
                //send POST request to server
                $.post(`${domain}/start/php/server.php`,
                    {
                        method: 'insert',
                        category: category,
                        name: name,
                        link: link, 
                        icon: icon,
                        prio: prio
                    },
                    function(response) {
                        if (response == 1) {
                            fillListFromAPI(category);
                            alert('Link added successfully.');
                            clearFields();
                        } else {
                            alert('Sorry, something went wrong, please try again later.');
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
        let category = selected.val();
        let name = $('#mod-name-input').val();
        let link = $('#mod-link-input').val();
        let id = $('#mod-id-input').val();
        let icon = $('#mod-icon-input').val();
        let prio = $('#mod-prio-input').val();
        let password = $('#password-input').val();
        console.log(category, id, name, link, icon, prio);
        //first validate password
        if (!category || !id || !name || !link || !icon || !prio) {
            return alert('All fields are mandatory!');
        }
        $.post(`${domain}/site/php/passvalid.php`, {pass: password}, function(response){
            if (response == 1) {
                //send POST request to server
                $.post(`${domain}/start/php/server.php`,
                    {
                        method: 'update',
                        category: category,
                        id: id,
                        name: name,
                        link: link,
                        icon: icon,
                        prio: prio
                    },
                    function(response) {
                        if (response == 1) {
                            fillListFromAPI(category);
                            alert('Link updated successfully.');
                            clearFields();
                        } else {
                            alert('Sorry, something went wrong, please try again later.');
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
        let category = selected.val();
        let id = $('#delete-input').val();
        let password = $('#password-input').val();
        console.log(id, category);
        if (!category || !id) {
            return alert('All fields are mandatory!');
        }
        //first validate password
        $.post(`${domain}/site/php/passvalid.php`, {pass: password}, function(response){
            if (response == 1) {
                //send POST request to server
                $.post(`${domain}/start/php/server.php`,
                    {
                        method: 'delete',
                        category: category,
                        id: id
                    },
                    function(response) {
                        if (response == 1) {
                            fillListFromAPI(category);
                            alert('Link deleted successfully.');
                            clearFields();
                        } else {
                            alert('Sorry, something went wrong, please try again later.');
                        }
                    }
                );
            } else {
                alert('Sorry, the password is incorrect. Please try again!');
            }
        });
    });
    
    //CLEAR button
    $('#clear-btn').on('click', function() {
        clearFields();
    });

    //DOWNLOAD button
    $('#download-btn').on('click', function() {
        window.open(`${domain}/start/php/download.php`, '_blank');
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
            <td><a href="${link.link}" target="_blank">Link</a></td>
            <td>${link.icon}</td>
            <td>${link.priority}</td>
        </tr>
        `);
    });
}

//puts the values of the clicked table row into the update and delete fields
$('#list-table').on('click', 'tr', function() {
    $('#mod-id-input, #delete-input').val($(this).find("th")[0].innerHTML);
    $('#mod-cat-input, #del-cat-input').val($(this).find('td')[0].innerHTML);
    $('#mod-name-input').val($(this).find('td')[1].innerHTML);
    $('#mod-link-input').val($(this).find('td').find('a')[0].href);
    $('#mod-icon-input').val($(this).find('td')[3].innerHTML);
    $('#mod-prio-input').val($(this).find('td')[4].innerHTML);
})

//clear all input fields
function clearFields() {
    $('#cat-input, #mod-cat-input, #del-cat-input').val('0');
    $('input').val('');
}



/***************************************************************
 * DATABASE FUNCTIONS
 */
//get a whole table from the database
function fillListFromAPI(category) {
    $('#list-table').html('Loading...');
    $.getJSON(`${domain}/start/php/server.php?met=all&cat=${category}`, (data) => {
        fillTheTable(data);
    }).fail((xhr, status, message) => {
        $('#list-table').html(status + ': ' + message);
    });
}

//search from the node API
// function searchFromAPI(text) {
//     $('#list-table').html('Loading...');
//     $.getJSON(`${domain}/dbadmin/server/server.php?met=sr&name=${text}`, (data) => {
//         fillTheTable(data);
//     }).fail((xhr, status, message) => {
//         $('#list-table').html(status + ': ' + message);
//     });
// }
