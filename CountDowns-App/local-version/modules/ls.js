const ls = {

    // create empty users and countdowns storage items if not exists
    init() {
        if (!localStorage.getItem('users')) {
            users = []
            countdowns = []
            ls.save('users', users)
            ls.save('countdowns', countdowns)
        }
    },

    /*
    *   USER RELATED FUNCTIONS
    */
    createUser(name, email, pass) {
        const users = ls.listUsers()
        if (ls.findUserByEmail(email)) {
            throw new Error('Email already registered, please try an other one.')
        } else {
            let id = ls.generateUserId()
            const user = {
                userid: id,
                name: name,
                email: email,
                pass: ls.hashPass(pass + id)
            }
            users.push(user)
            ls.save('users', users)
            return user
        }
    },

    findUserByEmail(email) {
        const users = ls.listUsers()
        for (const user of users) {
            if (user.email === email) {
                return user
            }
        }
        return false
    },

    findUserById(id) {
        const users = ls.listUsers()
        for (const user of users) {
            if (user.userid === id) {
                return user
            }
        }
        return false
    },

    removeUser(id) {
        const users = ls.listUsers()
        let removeIndex = null
        for (let i = 0; i < users.length; i++) {
            if (users[i].userid === id) {
                removeIndex = i
            }
        }
        if (removeIndex === null) {
            throw new Error('User not found.')
        } else {
            users.splice(removeIndex, 1)
            ls.save('users', users)
            return id
        }
    },

    /*
    *   COUNTDOWN RELATED FUNCTIONS
    */
    createCd(timestamp, descr, userid) {
        const countDowns = ls.listCds()
        const currentCd = {
            cdownid: ls.generateCdId(),
            timestamp,
            descr,
            userid
        }
        countDowns.push(currentCd)
        ls.save('countdowns', countDowns)
        return currentCd        
    },
    getCdsOfUser(userid) {
        const cds = ls.listCds()
        const userCds = cds.filter(cd => cd.userid === userid)
        if (userCds.length < 1) {
            throw new Error('No countdowns found.')
        } else {
            return userCds
        }
    },
    removeCd(id) {
        const cds = ls.listCds()
        let removeIndex = null
        for (let i = 0; i < cds.length; i++) {
            if (cds[i].cdownid === id) {
                removeIndex = i
            }
        }
        if (removeIndex === null) {
            throw new Error('Countdown not found.')
        } else {
            cds.splice(removeIndex, 1)
            ls.save('countdowns', cds)
            return id
        }
    },
    removeAllCds(userid) {
        const cds = ls.listCds()
        const cdsAfterRemove = cds.filter(cd => cd.userid !== userid)
        ls.save('countdowns', cdsAfterRemove)
    },

    /*
    *   GENERIC FUNCTIONS
    */
    save(key, array) {
        const string = JSON.stringify(array)
        localStorage.setItem(key, string)
    },

    parse(value) {
        return JSON.parse(value)
    },

    listUsers() {
        return ls.parse( localStorage.getItem('users') )
    },
    listCds() {
        return ls.parse( localStorage.getItem('countdowns') )
    },

    hashPass(pass) {
        return CryptoJS.SHA256(pass).toString()
    },

    generateUserId() {
        const now = Math.floor((Date.now()/1000)).toString()
        const salt = Math.floor((Math.random()*900)+100).toString()
        return now+salt
    },    
    generateCdId() {
        const now = Math.floor((Date.now()/1000)).toString()
        const salt = Math.floor((Math.random()*90)+10).toString()
        return 'cd' + now + salt
    }
}