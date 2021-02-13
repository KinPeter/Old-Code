// const dictUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv';
const dictUrl = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv';

const gsheet = {    
    kor: [],
    hun: [],
    loaded: false,

    fetchDictFile: new Promise((resolve, reject) => {
        $.get(dictUrl)
            .done((result) => {
                let lines = result.split(/\r\n/);
                lines.forEach(line => {
                    let pair = line.split(/\t/);
                    gsheet.kor.push(pair[0]);
                    gsheet.hun.push(pair[1]);
                })
                gsheet.loaded = true;
                resolve();
            })
            .fail((error) => {
                throw new Error(error.status + ': Error loading dictionary file.');
            })
    }),
    
    getWordPair(index) {
        return {
            kor: this.kor[index],
            hun: this.hun[index]
        }
    },

    getFirstChar(word) {
        if (word.charAt(0) === '"' || word.charAt(0) === '~' || word.charAt(0) === '(') {
            return word.charAt(1);
        } else {
            return word.charAt(0);
        }
    },

    findWordsStartingWith(original) {
        const char = this.getFirstChar(original);
        const words = [];
        this.kor.forEach(word => {
            if (word.startsWith(char) && word !== original) {
                words.push(word)
            }
        });
        if (words.length > 3) {
            const spliced = [];
            do {
                const random = Math.floor(words.length * Math.random());
                spliced[spliced.length] = words.splice(random, 1)[0];
            } while (spliced.length < 3);
            return spliced;
        }
        return words;
    },

    findRandomWords(original, array, needed) {
        let i = 0;
        while (i < needed) {
            const random = Math.floor(this.kor.length * Math.random());
            if (array.includes(this.kor[random]) || this.kor[random] === original) {
                break;
            } else {
                array.push(this.kor[random]);
                i++;
            }
        }
        return array;
    },

    findOtherWords(word) {
        let words = [];
        const similars = this.findWordsStartingWith(word);
        words = words.concat(similars);
        if (words.length < 3) {
            const needed = 3 - words.length;
            return this.findRandomWords(word, words, needed);
        } else if (words.length > 3) {
            return words.slice(0, 3);
        } 
        return words;
    }
}
