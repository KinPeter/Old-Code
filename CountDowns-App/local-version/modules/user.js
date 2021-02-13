const user = {
    isLoggedIn: false,
    currentId: null,

    processSignup() {
        let {name, email, pass, passConf} = page.getSignupInputs()
        if (!name || !email || !pass || !passConf) {
            return page.showErrorTop('All fields are mandatory!', '')
        }
        if (pass !== passConf) {
            return page.showErrorTop('Passwords do not match!', '')
        }
        if (!page.validator.validateEmail(email)) {
            return page.showErrorTop('Please use a valid email address.', '')
        }
        if (!page.validator.validatePassword(pass)) {
            return page.showErrorTop('Please use a longer password<br>', '(minimum 8 characters)')
        }
        name = page.validator.parseInput(name)
        email = page.validator.parseInput(email)

        try {
            ls.createUser(name, email, pass)
            page.showNotifyTop('Success!','User added successfully. <br>You can now log in.')
            page.clearSignupFields()
            page.hideAllCollapses()
        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
    },

    processLogin() {
        const {email, pass} = page.getLoginInputs()
        if (!email || !pass) {
            return page.showErrorTop('All fields are mandatory!', '')
        }
        if (!page.validator.validateEmail(email)) {
            return page.showErrorTop('Please use a valid email address.', '')
        }

        try {
            const currentUser = ls.findUserByEmail(email)
            if (!currentUser) {
                return page.showErrorTop('Error:', 'User not found.')
            }
            if (!user.checkPassword(currentUser, pass)) {
                user.deleteUserCookie()
                return page.showErrorTop('Error:', 'Unable to authorize.')
            } else {
                if (!user.getUserCookie()) {
                    user.deleteUserCookie()
                    user.setUserCookie(currentUser.userid, 2)
                }
                user.getUserById(currentUser.userid)
                user.isLoggedIn = true
                user.currentId = currentUser.userid
                page.clearLoginFields()
                page.setNavAsLoggedIn()
                page.hideAllCollapses()
                cd.fetchCdsForUser()
            }

        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
    },

    checkPassword(userObj, enteredPass) {
        const hash = ls.hashPass(enteredPass + userObj.userid)
        return hash === userObj.pass
    },

    processLogOut() {
        user.deleteUserCookie()
        this.isLoggedIn = false
        this.currentId = null
        location.reload()
    },

    checkLoginOnStartUp() {
        idInCookie = this.getUserCookie()
        if (idInCookie) {
            this.currentId = idInCookie
            this.isLoggedIn = true
            this.getUserById(this.currentId)
            page.setNavAsLoggedIn()
            cd.fetchCdsForUser()
        } else {
            page.setNavAsNotLoggedIn()
            page.createDemoCd()
            page.showHelpCollapse()
        }
    },

    getUserById(id) {
        const currentUser = ls.findUserById(id)
        page.setLoggedInName(currentUser.name)
        page.showNotifyTop('Logged in as:', currentUser.name)
    },

    deleteAccount() {
        console.log(user.currentId)
        let isSure = confirm('Are you sure? This operation cannot be undone!')
        if (!isSure) {
            return 
        }
        try {
            ls.removeUser(user.currentId)
            cd.deleteAllCds(user.currentId)
            page.showNotifyTop('User deleted', '')
            user.processLogOut()
        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
    },

    getUserCookie() {
        let value = document.cookie.match('(^|;) ?userid=([^;]*)(;|$)')
        return value ? value[2] : null;
    }, 
    setUserCookie(value, days) {
        let date = new Date
        date.setTime(date.getTime() + 24*60*60*1000*days)
        document.cookie = "userid=" + value + ";path=/;expires=" + date.toGMTString()
    },
    deleteUserCookie() { user.setUserCookie('', -1); }
}
