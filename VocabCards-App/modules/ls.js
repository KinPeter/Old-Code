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