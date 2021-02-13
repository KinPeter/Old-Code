
//Primary domain:
const domain = "https://www.p-kin.com"
// const domain = "https://cors-anywhere.herokuapp.com/https://www.p-kin.com"
// ${domain}

/***************************************************************
 * EVENT LISTENERS FOR BUTTONS
 */
$(document).ready(function () {
    $('#list-table').html('List by tag or start a search.');

    //LIST BY TAG buttons
    $('.tag-buttons').on('click', 'button', function () {
        let tag = $(this).attr('data-tag');
        console.log(tag);
        fillListFromAPI(tag);
    });

    //SEARCH LINK button
    $('#search-btn').on('click', function () {
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
        if (key == 13) { $("#search-btn").click(); }
    });

    //GET TAGS button
    $('#gettags-btn').on('click', function () {
        let linkid = $('#gettags-id-input').val();
        getTagsFromAPI(linkid);
    });

    //ADD NEW LINK button
    $('#add-btn').on('click', function () {
        let name = $('#name-input').val();
        let link = $('#link-input').val();
        let password = $('#password-input').val();
        console.log(name, link);
        if (!name || !link) {
            return alert('All fields are mandatory!');
        }
        sendAddLinkRequest(name, link, password);
    });

    //ADD NEW TAG button
    $('#addtag-btn').on('click', function () {
        let selected = $('#addtag-tag-input option:selected');
        let tag = selected.data('tag');
        let id = $('#addtag-id-input').val();
        let name = $('#addtag-name-input').val();
        let password = $('#password-input').val();
        console.log(id, tag);
        if (!tag || !name || !id) {
            return alert('All fields are mandatory!');
        }
        sendAddTagRequest(id, tag, password, name);
    });

    //UPDATE LINK button
    $('#mod-btn').on('click', function () {
        let name = $('#mod-name-input').val();
        let link = $('#mod-link-input').val();
        let id = $('#mod-id-input').val();
        let password = $('#password-input').val();
        console.log(id, name, link);
        if (!id || !name || !link) {
            return alert('All fields are mandatory!');
        }
        sendUpdateLinkRequest(id, name, link, password);
    });

    //DELETE LINK button
    $('#delete-btn').on('click', function () {
        let id = $('#delete-input').val();
        let password = $('#password-input').val();
        console.log(id);
        if (!id) {
            return alert('All fields are mandatory!');
        }
        sendDeleteLinkRequest(id, password);
    });

    //DELETE ALL TAGS button
    $('#delete-tags-btn').on('click', function () {
        let id = $('#delete-tags-input').val();
        let password = $('#password-input').val();
        console.log(id);
        if (!id) {
            return alert('All fields are mandatory!');
        }
        sendDeleteTagConnectionsRequest(id, password);
    });

    //CLEAR button
    $('#clear-btn').on('click', function () {
        clearFields();
    });

    //DOWNLOAD button
    $('#download-btn').on('click', function () {
        window.open(`${domain}/dbadmin/server/download.php`, '_blank');
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
            <th scope="row">${link.link_id}</th>
            <td>${link.link_name}</td>
            <td><a href="${link.link_url}" target="_blank">${link.link_url}</a></td>
        </tr>
        `);
    });
}

//puts the values of the clicked table row into the input fields
$('#list-table').on('click', 'tr', function () {
    $('#mod-id-input, #delete-input, #delete-tags-input, #gettags-id-input, #addtag-id-input').val($(this).find("th")[0].innerHTML);
    $('#mod-name-input, #gettags-name-input, #addtag-name-input').val($(this).find('td')[0].innerHTML);
    $('#mod-link-input').val($(this).find('td').find('a')[0].href);
    $('#gettag-tags').html('');
})

//clear all input fields
function clearFields() {
    $('#cat-input, #mod-cat-input, #del-cat-input').val('0');
    $('input').val('');
    $('#gettag-tags').html('');
}



/***************************************************************
 * DATABASE "GET" FUNCTIONS
 */
//get all links by tag from the database
function fillListFromAPI(tag) {
    $('#list-table').html('Loading...');
    $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=tag&tag=${tag}`, (data) => {
        fillTheTable(data);
    }).fail((xhr, status, message) => {
        $('#list-table').html(status + ': ' + message);
    });
}
//search by name
function searchFromAPI(text) {
    $('#list-table').html('Loading...');
    $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=sr&name=${text}`, (data) => {
        fillTheTable(data);
    }).fail((xhr, status, message) => {
        $('#list-table').html(status + ': ' + message);
    });
}
// list all tags for a link
function getTagsFromAPI(linkid) {
    $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=gettags&linkid=${linkid}`, (data) => {
        if (data.length < 1) {
            $('#gettag-tags').append('No tags found.');
        }
        data.forEach((tag) => {
            $('#gettag-tags').append(`<div class="mb-1 mr-1 btn btn-info text-white border border-dark">${tag.tag_name}</div>`);
        });
    }).fail((xhr, status, message) => {
        $('#list-table').html(status + ': ' + message);
    });
}

/***************************************************************
 * DATABASE "POST" FUNCTIONS
 */
// add a new link
function sendAddLinkRequest(name, link, password) {
    $.post(`${domain}/dbadmin/server/linkserver.php`,
        {
            method: 'insert',
            name: name,
            link: link,
            pass: password
        },
        function (response) {
            if (response == 1) {
                searchFromAPI(name);
                alert('Link added successfully.');
                clearFields();
            } else {
                alert('Sorry, something went wrong, please try again later. ' + response);
            }
        }
    );
}
// add a tag to a link
function sendAddTagRequest(id, tag, password, name) {
    $.post(`${domain}/dbadmin/server/linkserver.php`,
        {
            method: 'addtag',
            linkid: id,
            tagname: tag,
            pass: password
        },
        function (response) {
            if (response == 1) {
                searchFromAPI(name);
                alert('Tag added successfully.');
                clearFields();
            } else {
                alert('Sorry, something went wrong, please try again later. ' + response);
            }
        }
    );
}
// update a link 
function sendUpdateLinkRequest(id, name, link, password) {
    $.post(`${domain}/dbadmin/server/linkserver.php`,
        {
            method: 'update',
            id: id,
            name: name,
            link: link,
            pass: password
        },
        function (response) {
            if (response == 1) {
                searchFromAPI(name);
                alert('Link updated successfully.');
                clearFields();
            } else {
                alert('Sorry, something went wrong, please try again later. ' + response);
            }
        }
    );
}
// delete a link
function sendDeleteLinkRequest(id, password) {
    $.post(`${domain}/dbadmin/server/linkserver.php`,
        {
            method: 'delete',
            id: id,
            pass: password
        },
        function (response) {
            if (response == 1) {
                alert('Link deleted successfully.');
                clearFields();
            } else {
                alert('Sorry, something went wrong, please try again later. ' + response);
            }
        }
    );
}
// delete all connections for a link
function sendDeleteTagConnectionsRequest(id, password) {
    $.post(`${domain}/dbadmin/server/linkserver.php`,
        {
            method: 'deletetags',
            linkid: id,
            pass: password
        },
        function (response) {
            if (response == 1) {
                alert('Link-tag connections deleted successfully.');
                clearFields();
            } else {
                alert('Sorry, something went wrong, please try again later. ' + response);
            }
        }
    );
}