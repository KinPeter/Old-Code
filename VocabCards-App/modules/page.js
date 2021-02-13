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