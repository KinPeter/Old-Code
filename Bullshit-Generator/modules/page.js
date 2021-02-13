const page = {

    lang: 'hun',

    processFileLoading() {
        try {
            const fileName = this.getFileName()
            data.readFile(fileName)
        } catch(error) {
            page.showErrorTop('Error: ', error.message)
        }
    },

    processBullshitGeneration() {
        $('#text').html('')
        try {
            const bsInput = this.getBullshitInputs()
            const bullshit = bs.generateBullshit(bsInput.firstWord, bsInput.length)
            $('#text').html(bullshit)
        } catch(error) {
            page.showErrorTop('Error: ', error.message)
        }
    },

    getFileName() {
        const lan = page.lang === 'hun' ? hun : eng
        const radioValue = $("input[name='file-radios']:checked").val()
        if (!radioValue) {
            throw new Error(lan.error.fileNameError)
        }
        return radioValue
    },

    getBullshitInputs() {
        let firstWord = $('#bullshit-first-word').val().trim().toLowerCase()
        if (firstWord.split(' ').length > 1) {
            const lan = page.lang === 'hun' ? hun : eng
            throw new Error(lan.error.oneWordOnly)
        }
        return {
            length: $('#bullshit-length').val(),
            firstWord
        }
    },

    fillUpHtmlText() {
        const lan = page.lang === 'hun' ? hun : eng
        $('#filelist-btn').html(lan.btn.fileList)
        $('#load-file-btn').html(lan.btn.loadFile)
        $('#first-word-label').text(lan.label.firstWord)
        $('#not-mandatory').text(lan.label.notMandatory)
        $('#bullshit-first-word').attr('placeholder', lan.btn.placeHolder)
        $('#length-label').text(lan.label.bsLength)
        $('#generate-btn').html(lan.btn.generate)
        $('#lang-btn').html(lan.btn.lang)
        $('#text').html(lan.note.chooseFile)
        this.fillUpFileList()
    },

    fillUpFileList() {
        const lan = page.lang === 'hun' ? hun : eng
        $('.file-list').html('')
        for (let i = 0; i < lan.files.length; i++) {
            let html =`
            <div class="form-check">
                <input class="form-check-input" type="radio" name="file-radios" id="file${i}" value="${lan.files[i][1]}">
                <label class="form-check-label" for="file${i}">${lan.files[i][0]}</label>
            </div>
            `
            $('.file-list').append(html)
        }
        $('#file0').prop('checked', true)
    },

    langListener() {
        $('#lang-btn').click(() => {
            page.lang = page.lang === 'hun' ? 'eng' : 'hun'
            page.fillUpHtmlText()
            data.clearData()
        })
    },
    pointerListener() {
        $("button, #lang-btn, .form-check-label").hover(function() {
            $(this).css("cursor", "pointer");
        })
    },
    wordInputListener() {
        $('#form-id, #bullshit-first-word').keydown((e) => {
            if (e.keyCode == 13) {
                e.preventDefault()
                if (!data.isLoaded) {
                    return
                }
                $('#generate-btn').click()
            }
        })
    },

    enableGenerate() {
        $('#generate-btn').prop('disabled', false).removeClass('inactive-btn')
    },
    disableGenerate() {
        $('#generate-btn').prop('disabled', true).addClass('inactive-btn')
    },

    hideCollapse() {
        $('.collapse').collapse('hide')
    },

    rangeListener() {
        let val = $('#bullshit-length').val()
        $('#length-value').html(val)
        $('#bullshit-length').on('change', function() {
            val = $('#bullshit-length').val()
            page.updateLengthText(val)
        })
    },
    updateLengthText(val) {
        $('#length-value').html(val)
    },

    showNotifyTop(strong, message){
        $('#notify-top-message').html(`<strong>${strong}</strong> ${message}`)
        $("#notify-top").show()
        setTimeout(function(){
          $("#notify-top").hide()
        }, 2000)
    },

    showErrorTop(strong, message){
        $('#error-top-message').html(`<strong>${strong}</strong> ${message}`)
        $("#error-top").show()
        setTimeout(function(){
          $("#error-top").hide()
        }, 5000)
    },


}