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
            return page.showErrorTop('Please use a valid email address', '')
        }
        if (!page.validator.validatePassword(pass)) {
            return page.showErrorTop('Please use a longer password<br>', '(minimum 8 characters)')
        }
        name = page.validator.parseInput(name)
        email = page.validator.parseInput(email)
        $.post(`${url}/signup`, 
            { name, email, pass },
            function(res) {
                if (res === 'done') {
                    page.showNotifyTop('Success!','User added successfully. <br>You can now log in.')
                    page.clearSignupFields()
                    page.hideAllCollapses()
                } else if (res.includes('UNIQUE')) {
                    page.showErrorTop('That email address is already registered!', 'Please try an other one.')
                } else {
                    page.showErrorTop('Something went wrong...<br>', res)
                }
            }
        )
    },

    processLogin() {
        const {email, pass} = page.getLoginInputs()
        if (!email || !pass) {
            return page.showErrorTop('All fields are mandatory!', '')
        }
        if (!page.validator.validateEmail(email)) {
            return page.showErrorTop('Please use a valid email address', '')
        }
        $.post(`${url}/login`, 
            { email, pass },
            function(res) {
                if (res === 'error') {
                    user.deleteUserCookie()
                    page.showErrorTop('Error', 'Unable to authorize.')
                } else {
                    if (!user.getUserCookie()) {
                        user.deleteUserCookie()
                        user.setUserCookie(res, 2)
                    }
                    user.getUserById(res)
                    user.isLoggedIn = true
                    user.currentId = res
                    page.clearLoginFields()
                    page.setNavAsLoggedIn()
                    page.hideAllCollapses()
                    cd.fetchCdsForUser()
                }
            }
        )
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
        }
    },

    getUserById(id) {
        $.getJSON(`${url}/finduser/${id}`, (userById) => {
            console.log(userById[0])
            page.setLoggedInName(userById[0].name)
            page.showNotifyTop('Logged in as:', userById[0].name)
        }).fail((xhr, status, message) => {
            page.showErrorTop(status, message)
        })
    },

    deleteAccount() {
        console.log(user.currentId)
        let isSure = confirm('Are you sure? This operation cannot be undone!')
        if (!isSure) {
            return 
        }
        $.post(`${url}/deleteuser`, 
            { id: user.currentId },
            function(res) {
                if (res === 'done') {
                    cd.deleteAllCds()
                    page.showNotifyTop('User deleted', '')
                    user.processLogOut()
                } else {
                    page.showErrorTop('Sorry,', 'something went wrong...')
                }
            }
        )
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
