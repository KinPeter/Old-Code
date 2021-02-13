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