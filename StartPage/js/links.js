/**
 *  LINK SEARCH functions
 */

//get search results from the database and call the "filling" function
function searchFromAPI(text) {
    $('#links-status').html('Searching...');
    $.getJSON(`${domain}/dbadmin/server/linkserver.php?met=sr&name=${text}`, (data) => {
        console.log(data);
        fillLinksModal(data);
    }).fail((xhr, status, message) => {
        $('#links-status').html('Sorry, something went wrong.');
    });
}
//fill up the results modal
function fillLinksModal(data) {
    //clear 'searching' text
    $('#links-status').html('');
    //clear results table
    $('#results-table').html('');
    //clear input field
    $('#search-input').val('');
    //fill up the list
    data.forEach(link => {
        $('#results-table').append(`
        <tr>
            <th scope="row"><a href="${link.link_url}" target="_blank">${link.link_name}</a></th>
        </tr>
        `);
    });
    //show the results modal
    $('#modal').modal('show');
}