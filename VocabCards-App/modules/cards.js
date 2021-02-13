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
