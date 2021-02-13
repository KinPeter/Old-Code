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