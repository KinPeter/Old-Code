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
