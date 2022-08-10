let search = ''

$('#links-tab-btn').click(() => {
    search = 'links'
    $('.tab-btn').removeClass('active-tab')
    $('#links-tab-btn').addClass('active-tab')
})
$('#dict-tab-btn').click(() => {
    search = 'dict'
    $('.tab-btn').removeClass('active-tab')
    $('#dict-tab-btn').addClass('active-tab')
})
$('#google-tab-btn').click(() => {
    search = 'google'
    $('.tab-btn').removeClass('active-tab')
    $('#google-tab-btn').addClass('active-tab')
})
$('.tab-btn').hover(function() {
    $(this).css("cursor", "pointer");
})

//Search
$('#search-input').keypress(function (e) {
    var key = e.which
    if (key == 13) {
        //initiate search depending on tab choice
        if (search === 'links') {
            searchFromAPI($('#search-input').val())
        } else if (search === 'dict') {
            wordLookup($('#search-input').val())
            $('#links-status').html('')
        } else if (search === 'google') {
            window.location = `https://www.google.com/search?q=${$('#search-input').val()}`
        }
    }
})