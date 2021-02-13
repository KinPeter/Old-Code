/*@include: ./modules/ls.js, ./modules/gsheet.js, ./modules/lists.js, ./modules/cards.js, ./modules/page.js @end*/

$('#save-progress, #reset-cards').hide();
$('.container, .footer').hide();

$(document).ready(() => {

    ls.startUp();
    
    try {
        const dictPromise = gsheet.fetchDictFile;
        const listPromise = lists.fetchLists;        
        Promise.all([dictPromise, listPromise]).then(() => {
            console.log('Files loaded.');
            lists.currentList = lists.all.base;
            $('.loading').hide();
            $('.container, .footer').fadeIn(500);
            cards.playCards();
        })
        
    } catch(error) {
        console.error(error.message);
        $('.loading').html(error.message);
    }

    page.cardClickListener();
    page.changeListListener();
    page.saveProgressListener();
})