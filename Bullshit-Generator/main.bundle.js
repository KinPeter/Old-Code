/*
* included file: ./modules/bullshitGenerator.js
*/

const bs = {
    wordList: [],

    generateBullshit(firstWord, maxLength) {
        const ignoreList = page.lang === "hun" ? hun.ignored : eng.ignored
        const bullshit = []
        let ignoredCounter = 0

        if (firstWord === '') {
            firstWord = this.getRandomFromList()
        }
        if (!this.wordList.includes(firstWord)) {
            const lang = page.lang === 'hun' ? hun : eng
            throw new Error(lang.error.wordNotInList)
        }
        bullshit.push(firstWord)

        for (let i = 1; i < maxLength; i++) {
            const nextWords = this.getTenMostFrequentNextWords(firstWord)
            for (let word of nextWords) {
                if (!bullshit.includes(word) && !ignoreList.has(word)) {
                    if (word) {
                        bullshit.push(word)
                    } 
                    firstWord = word
                    break
                } else if (ignoreList.has(word) && ignoredCounter > 15) {
                    bullshit.push(word)
                    firstWord = word
                    ignoredCounter = 0
                    break
                } else {
                    do {
                        word = this.getRandomFromList()
                    } while (ignoreList.has(word))
                    bullshit.push(word)
                    firstWord = word
                    break
                }
            }
            ignoredCounter++
        }
        console.log(bullshit)
        return this.generateStringFromBullshitArray(bullshit)
    },

    getTenMostFrequentNextWords(word) {
        const nextWords = this.findAndCountAllNextWords(word)
        const sorted = new Map( [...nextWords.entries()].sort((a, b) => b[1] - a[1]) )
        const words = [...sorted.keys()]
        const topTen = []
        const len = sorted.length < 10 ? sorted.length : 10
        for (let i = 0; i < len; i++) { topTen.push(words[i]) }
        return topTen
    },

    findAndCountAllNextWords(word) {
        const nextWords = new Map()
        for (let i = 0; i < this.wordList.length-1; i++) {
            if (this.wordList[i] === word) {
                const nextWord = this.wordList[i+1]
                if (nextWords.has(nextWord)) {
                    value = nextWords.get(nextWord)
                    nextWords.set(nextWord, value+1)
                } else {
                    nextWords.set(nextWord, 0)
                }
            }
        }
        return nextWords
    },

    getRandomFromList() {
        const r = Math.floor((Math.random()*this.wordList.length))
        return this.wordList[r]
    },

    generateStringFromBullshitArray(array) {
        let bullshit = "<p>"
        const wordsForCommas = page.lang === "hun" ? hun.wordsForCommas : eng.wordsForCommas
        let newSentenceLength = Math.floor( Math.random()*5 +6 )
        let sentenceCounter = 0
        let newParagraphLength = Math.floor( Math.random()*30 +60 )
        let paragraphCounter = 0
        
        for (let i = 0; i < array.length; i++) {

            let word = array[i]

            if (i == 0) {
                word = this.capitalize(word)
            }
            //----
            if (wordsForCommas.has(word)) {
                bullshit += ', '
                sentenceCounter = 3
            } else if (sentenceCounter === newSentenceLength) {
                const ending = this.getRandomSentenceEnding()
                bullshit += ending + ' '
                if (paragraphCounter > newParagraphLength) {
                    bullshit += '<\p>\n<p>'
                    newParagraphLength = Math.floor( Math.random()*30 +60 )
                    paragraphCounter = 0
                }
                word = this.capitalize(word)
                newSentenceLength = Math.floor( Math.random()*5 +6 )
                sentenceCounter = 0
            } else if (i !== 0) {
                bullshit += ' '
            }
            //----
            if (i === array.length-1) {
                word += '.<\p>'
            }

            bullshit += word
            sentenceCounter++
            paragraphCounter++
        }
        return bullshit
    },

    capitalize(word) {
        return word.length > 1 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toUpperCase()
    },

    getRandomSentenceEnding() {
        let rnd = Math.random()
        if (rnd < 0.8) {
            return '.'
        } else if (rnd < 0.9) {
            return '!'
        } else {
            return '?'
        }
    }


}



/*
* included file: ./modules/dataProcessor.js
*/

const data = {
    trimRegEx: /(\B[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]|[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]\B)/gi,
    numberRegEx: RegExp(/^[0-9]*$/),
    isLoaded: false,

    readFile(filename) {
        const lang = page.lang === 'hun' ? hun : eng
        $.get(`./text/${filename}`)
            .done((result) => {
                const array = result.split(/\s/)
                const trimmedArray = data.createTrimmedArray(array)
                ss.save(trimmedArray)
                data.loadData()
            })
            .fail((error) => {
                page.showErrorTop(lang.error.fileNotFound, error.status + ' ' + error.statusText)
            })
    },

    loadData() {
        const lang = page.lang === 'hun' ? hun : eng
        const data = ss.get()
        if (data.length > 10) {
            bs.wordList = data
            this.isLoaded = true
            page.showNotifyTop(lang.note.fileLoaded[0], lang.note.fileLoaded[1])
            page.enableGenerate()
            page.hideCollapse()
        } else {
            page.showErrorTop('Error: ', lang.error.fileNotLoaded)
        }
    },

    clearData() {
        ss.clear()
        this.isLoaded = false
        page.disableGenerate()
    },

    trimAndParse(word) {
        word = word.toLowerCase()
        word = word.replace(this.trimRegEx, '')
        word = word.replace(this.trimRegEx, '')
        return this.numberRegEx.test(word) ? '' : word
    },
    
    createTrimmedArray(array) {
        const trimmedArray = []
        array.forEach(word => {
            const trimmed = data.trimAndParse(word)
            if (trimmed !== '') {
                trimmedArray.push(trimmed)
            }
        })
        return trimmedArray
    }
}


/*
* included file: ./modules/lang.js
*/

const hun = {

    wordsForCommas: new Set([
        "de", "hogy", "viszont", "pedig", "s", "és", "persze",
        "szólott", "mondta", "mondotta", "hanem", "ami", "amit",
        "amelyet", "mely", "amely", "azt", "ezt", "mert", "ezért", 
        "azért", "amilyen", "amikor", "ahol", "hol", "mint",
        "mikor", "ezzel", "azzal", "arra", "erre", "tehát", "ha",
        "kérdezte", "kiáltott", "szólt"
    ]),

    ignored: new Set([
        "a", "az", "és", "s", "van", "volt", "nem", "is", "csak", "azt", "de"
    ]),

    error: {
        wordNotInList: 'Ezzel a szóval sajnos nem tudunk bullshitet generálni, nem szerepel a szövegben.',
        fileNotFound: 'A fájl nem található.',
        fileNotLoaded: 'A fájl nem töltődött be megfelelően...',
        oneWordOnly: 'Csak egy szót írj be!',
        fileNameError: 'Válassz egy forrásfájlt!'
    },

    note: {
        fileLoaded: ['Szuper!', 'A fájl betöltve.'],
        chooseFile: `<i class="fas fa-angle-double-right"></i> Válassz egy forrásfájlt 
                 <br><i class="fas fa-angle-double-right"></i> Töltsd be a fájlt 
                 <br><i class="fas fa-angle-double-right"></i> Ha szeretnéd, adj meg egy kezdőszót 
                 <br><i class="fas fa-angle-double-right"></i> Állítsd be a bullshit hosszát 
                 <br><i class="fas fa-angle-double-right"></i> Generálj!`
    },

    btn: {
        lang: 'In English <span><i class="fas fa-language"></i></span>',
        fileList: 'Forrásfájlok listája <i class="fas fa-caret-down"></i>',
        loadFile: 'Fájl betöltése',
        placeHolder: 'Írj be egy szót',
        generate: 'Bullshit generálása <i class="far fa-play-circle"></i>'
    },

    label: {
        firstWord: 'Kezdőszó:',
        notMandatory: 'Nem kötelező',
        bsLength: 'Bullshit hossza:'
    },

    files: [
        ['Tolsztoj: Háború és béke, I.kötet', 'haboru-es-beke.txt'],
        ['Osho: Az egész a változásról szól', 'osho.txt'],
        ['Rejtő Jenő: Piszkos Fred közbelép', 'rejto-piszkos-fred.txt'],
        ['Gaal György: Magyar népmesék gyűjteménye', 'magyar-nepmesek.txt'],
        ['Kristóf Miklós UFO Magazin cikkei', 'ufo.txt']
    ]
}

const eng = {

    wordsForCommas: new Set([
        "but", "therefore", "so", "like", "said", "thus", "asked"
    ]),

    ignored: new Set([
        "the", "and", "is", "are", "was", "were", "no", "not", "too", "only", "but", 
        "this", "that", "mr", "mrs", "ms"
    ]),

    error: {
        wordNotInList: 'Cannot use this word, it does not exist in the source file.',
        fileNotFound: 'File not found.',
        fileNotLoaded: 'File is not loaded properly...',
        oneWordOnly: 'Please enter only one word!',
        fileNameError: 'Please choose source file!'
    },

    note: {
        fileLoaded: ['Great!', 'File loaded successfully.'],
        chooseFile: `<i class="fas fa-angle-double-right"></i> Choose a source file 
                 <br><i class="fas fa-angle-double-right"></i> Load the file
                 <br><i class="fas fa-angle-double-right"></i> Set a starting word, if you like
                 <br><i class="fas fa-angle-double-right"></i> Set the length of the bullshit
                 <br><i class="fas fa-angle-double-right"></i> Generate!`
    },

    btn: {
        lang: 'Magyarul <span><i class="fas fa-language"></i></span>',
        fileList: 'Source files <i class="fas fa-caret-down"></i>',
        loadFile: 'Load file',
        placeHolder: 'Enter a word',
        generate: 'Generate Bullshit <i class="far fa-play-circle"></i>'
    },

    label: {
        firstWord: 'Starting word:',
        notMandatory: 'Not mandatory',
        bsLength: 'Bullshit length:'
    },

    files: [
        ['Tolstoy: War and Peace', 'war-and-peace.txt'],
        ['Osho: Beyond Enlightment', 'osho_en.txt'],
        ['Bram Stoker: Dracula\'s Guest', 'draculas-guest.txt'],
        ['The Brothers Grimm: Grimms\' Fairy Tales', 'grimm.txt'],
        ['The Constitution and Bill of Rights of the USA', 'usa.txt']
    ]
}


/*
* included file: ./modules/page.js
*/

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


/*
* included file: ./modules/ss.js
*/

const ss = {
    
    save(array) {
        const string = JSON.stringify(array)
        sessionStorage.setItem('bsGenArr', string)
    },

    get() {
        return ss.parse( sessionStorage.getItem('bsGenArr') )
    },

    parse(value) {
        return JSON.parse(value)
    },

    clear() {
        sessionStorage.removeItem('bsGenArr')
    }



}


/*
* MAIN file:
*/

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

