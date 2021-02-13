/*
* included file: ./modules/ls.js
*/

const ls = {
    hash: 'a74f6d8762fea7c8f3f2a6681832edd9cb556d6624f9ad940d79ef29b443f92c',
    loggedIn: false,

    startUp() {
        if (!localStorage.getItem('vocabUser')) {
            const pass = prompt('Please log in to save your progress.');
            const hash = this.hashPass(pass);
            if (hash === this.hash) {
                localStorage.setItem('vocabUser', 'Peti');
                this.loggedIn = true;
            }
        } else {
            this.loggedIn = true;
        }
    },

    hashPass(pass) {
        return CryptoJS.SHA256(pass).toString()
    },
}


/*
* included file: ./modules/gsheet.js
*/

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



/*
* included file: ./modules/lists.js
*/

const lists = {
    all: {
        base: [],
        visited: [],
        difficult: []
    },

    loaded: false,
    currentList: null,

    fetchLists: new Promise ((resolve, reject) => {
        $.get('./indexes.json')
            .done((result) => {
                lists.all = result;
                lists.loaded = true;
                resolve();
            })
            .fail((error) => {
                throw new Error(error.status + ': Error loading lists file.');        
            })
    }),

    updateLists() {
        if (ls.loggedIn) {
            $.post('./php/cards.php', {text: JSON.stringify(lists.all)})
                .done((result) => {
                    console.log(result);
                })
                .fail((error) => {
                    page.showUpdateError();
                    throw new Error(error.status + ': Error updating lists file.');
                })
        }
    },

    resetLists() {
        $.get('./indexes-orig.json')
            .done((result) => {
                lists.all = result;
                lists.updateLists();
            })
            .fail((error) => {
                throw new Error(error.status + ': Error loading lists file.');        
            })
    },

    putBaseToVisited(value) {
        const index = lists.all.base.indexOf(value);
        if (lists.all.base.includes(value)) {
            lists.all.base.splice(index, 1);
            if (!lists.all.visited.includes(value)) {
                lists.all.visited.push(value);
            }
        }
    },
    putBaseToDifficult(value) {
        const index = lists.all.base.indexOf(value);
        if (lists.all.base.includes(value)) {
            lists.all.base.splice(index, 1);
            if (!lists.all.difficult.includes(value)) {
                lists.all.difficult.push(value);
            }
        }
    },
    putDifficultToVisited(value) {
        const index = lists.all.difficult.indexOf(value);
        if (lists.all.difficult.includes(value)) {
            lists.all.difficult.splice(index, 1);
            if (!lists.all.visited.includes(value)) {
                lists.all.visited.push(value);
            }
        }
    },
    pickIndex() {
        const list = this.currentList; 
        if (list.length === 1) {
            return list[0];
        } else if (list.length > 1) {
            return list[Math.floor(list.length * Math.random())];
        } else {
            return null;
        }
    },
    changeCurrentList() {
        if (this.currentList === this.all.base) {
            this.currentList = this.all.difficult;
        } else {
            this.currentList = this.all.base;
        }
        cards.playCards();
    },
    
}


/*
* included file: ./modules/cards.js
*/

const cards = {
    current: null,
    counter: 0,

    getWordsForCards() {
        const index = lists.pickIndex();
        if (index) {
            const wordPair = gsheet.getWordPair(index);
            const card = {
                index,
                hun: wordPair.hun,
                cards: [wordPair.kor, ...gsheet.findOtherWords(wordPair.kor)]
            }
            return cards.current = card;
        } 
        return cards.current = {index: -1, hun: '', cards:['','','','']};
    },

    checkAnswer(choice) {
        if (choice == page.correctChoice) {
            page.showCorrect();
            if (lists.currentList === lists.all.base) {
                lists.putBaseToVisited(cards.current.index);
            } else {
                lists.putDifficultToVisited(cards.current.index);
            }
            return true;
        } else {
            page.showWrong(choice);
            if (lists.currentList === lists.all.base) {
                lists.putBaseToDifficult(cards.current.index);
            } 
            return false;
        }
    },

    playCards() {
        cards.getWordsForCards();
        page.fillCards();
        page.showCounters();
        console.log(page.correctChoice);
        if (this.counter++ === 10) {
            lists.updateLists();
            this.counter = 0;
        }
        return; 
    }
}



/*
* included file: ./modules/page.js
*/

const page = {
    correctChoice: null,

    fillCards() {
        $('#hun-word').html(cards.current.hun);
        $('.mycard').removeClass('correct-card').removeClass('wrong-card');
        const correctWord = cards.current.cards[0];
        const korCards = this.shuffle(cards.current.cards);
        this.correctChoice = korCards.indexOf(correctWord);
        korCards.forEach((card, i) => {
            $(`#card${i}`).html(card);
        });
    },

    cardClickListener() {
        $('.mycard').click(function() {
            const choice = $(this).children().attr('id').charAt(4);
            const correct = cards.checkAnswer(choice);
            const timeOut = correct ? 1000 : 3000;
            setTimeout(() => {
                return cards.playCards();
            }, timeOut);
        })
    },

    showCorrect() {
        $(`#card${page.correctChoice}`).parent().addClass('correct-card');
        $(`#card${page.correctChoice}`).html('Correct!');
    },
    showWrong(cardId) {
        $(`#card${page.correctChoice}`).parent().addClass('correct-card');
        $(`#card${cardId}`).parent().addClass('wrong-card');
        $(`#card${cardId}`).html('Wrong :(');
    },

    shuffle(array) {
        // Fisher-Yates (aka Knuth) Shuffle
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {      
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;        
        }      
        return array;
    },

    showCounters() {
        let card, total;
        if (lists.currentList === lists.all.base) {
            card = lists.all.visited.length;
            total = gsheet.hun.length;
        } else {
            card = '-';
            total = lists.all.difficult.length;
        }
        $('.list-counter').html(`<span id="counter-card">${card}</span> / <span id="counter-total">${total}</span>`);
        
        $('#difficult-counter').html(lists.all.difficult.length)
    },
    changeListListener() {
        $('#change-list').click(() => {
            const html = lists.currentList === lists.all.base ? 'All words' : `Difficult words (<span id="difficult-counter">${lists.all.difficult.length}</span>)`;
            lists.changeCurrentList();
            $('#change-list').html(html);
        });
    },
    saveProgressListener() {
        if (ls.loggedIn) {
            $('#save-progress').show().click(() => lists.updateLists());
            $('#reset-cards').show().click(() => lists.resetLists());
        }
    },

    showUpdateError() {
        $('#error-container').css('display', 'flex');
        setTimeout(() => {
            $('#error-container').css('display', 'none');
        }, 5000);
    }

}


/*
* MAIN file:
*/

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