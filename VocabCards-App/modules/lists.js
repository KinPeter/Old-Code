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