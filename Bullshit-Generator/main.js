/*@include: ./modules/bullshitGenerator.js, ./modules/dataProcessor.js, ./modules/lang.js, ./modules/page.js, ./modules/ss.js @end*/

$(document).ready(() => {

    page.fillUpHtmlText()
    page.disableGenerate()
    page.rangeListener()
    page.langListener()
    page.wordInputListener()
    page.pointerListener()
    $('#load-file-btn').click(() => page.processFileLoading())
    $('#generate-btn').click(() => page.processBullshitGeneration())


})

