const page = {
    /*
    *   USER RELATED ELEMENTS
    */
    getSignupInputs () {
        return {
            name: $('#name-input').val().trim(),
            email: $('#email-input').val().trim(),
            pass: $('#pass-input').val().trim(),
            passConf: $('#pass-conf-input').val().trim(),
        }
    },
    clearSignupFields() {
        $('#name-input, #email-input, #pass-input, #pass-conf-input').val('')
    },
    getLoginInputs () {
        return {
            email: $('#login-email-input').val().trim(),
            pass: $('#login-pass-input').val().trim()
        }
    },
    clearLoginFields() {
        $('#login-email-input, #login-pass-input').val('')
    },
    setLoggedInName(name) {
        $('#logged-in-name').html( name === "" ? 'Not logged in.' : 'Logged in as: ' + name)
    },
    setNavAsLoggedIn() {
        $('#login-nav, #signup-nav').hide()
        $('#logout-nav, #account-nav, #create-cd-nav').show()
    },
    setNavAsNotLoggedIn() {
        $('#login-nav, #signup-nav').show()
        $('#logout-nav, #account-nav, #create-cd-nav').hide()
    },


    /*
    *   COUNTDOWN RELATED ELEMENTS
    */
    createDatePicker() {
        let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4',
            minDate: today,
            weekStartDay: 1
        }).on('keypress', (e) => {
            e.preventDefault()
        })
    },
    addOpionsToHhMmSelect() {
        for (let i = 0; i < 24; i++) {
            let number = i < 10 ? "0" + i : i
            $('#hh-select').append(`<option value="${i}">${number}</option>`)            
        }
        for (let i = 0; i < 60; i+=5) {
            let number = i < 10 ? "0" + i : i
            $('#mm-select').append(`<option value="${i}">${number}</option>`)            
        }
    },
    getNewCdInput() {
        const descr = $('#descr-input').val()
        const date = $('#datepicker').val()
        const hh = $('#hh-select').val()
        const mm = $('#mm-select').val()
        if (!descr || !date || hh == 'na' || mm == 'na' ) {
            return page.showErrorTop('All fields are necessary!', '')
        }
        if (!moment(date).isValid()) {
            return page.showErrorTop('Date is not valid.<br>', 'Please use the date picker.')
        }
        return {
            descr,
            date,
            hh,
            mm
        }
    },
    listUsersCds(cdArray) {
        $('#cdowns-list').html('')
        for (let i = 0; i < cdArray.length; i++) {
            let cd = cdArray[i]
            let presetDate = moment(cd.timestamp*1000).format('ddd, YYYY MMM. DD. HH:mm')
            let html = `
            <div data-cdownid="${cd.cdownid}" class="alert alert-light timer-wrapper">
                <div class="row">
                    <div class="col-md-4">
                        <div class="timer-descr"><strong>${cd.descr}</strong></div>  
                        <div>${presetDate}</div>                        
                    </div>
                    <div class="col-md-7">
                        <div class="timer" id="timer${i}"> </div>                        
                    </div>
                    <div class="col-md-1">
                            <span style="float:right"><a href="" class="delete-cd-btn">&times;</a></span>
                    </div>
                </div>
            </div>
            `
            $('#cdowns-list').append(html)
            let domId = `timer${i}`            
            page.timer.createTimer(cd.timestamp, $('#' + domId))
        }
    },
    deleteThisCd(id) {
        console.log('deleteThisCd(id): ', id)
        cd.deleteCd(id)
        cd.fetchCdsForUser()
    },
    createDemoCd() {
        page.listUsersCds([{cdownid: "n/a", timestamp: 1577833200, descr: "Something Really Important", userid: 0}])
    },

    /*
    *   TIMER DISPLAY
    */
    timer: {
        createTimer(timestamp, domElement) {
            const timer = setInterval(() => {
                let distanceTimestamp = page.timer.calculateDistance(timestamp)
                let dist = page.timer.convertDistance(distanceTimestamp)
                let html
                if (dist.d > 365) {
                    let y = Math.floor(dist.d / 365)
                    let d = dist.d - y*365
                    html = `
                    <span class="timer-dd">${y}</span><span class="timer-dhms">y</span> 
                    <span class="timer-dd">${d}</span><span class="timer-dhms">d</span> 
                    <span class="timer-hh">${dist.h}</span><span class="timer-dhms">h</span>
                    <span class="timer-mm">${dist.m}</span><span class="timer-dhms">m</span>
                    <span class="timer-ss">${dist.s}</span><span class="timer-dhms">s</span>
                    `
                } else {
                    html = `
                    <span class="timer-dd">${dist.d}</span><span class="timer-dhms">d</span> 
                    <span class="timer-hh">${dist.h}</span><span class="timer-dhms">h</span>
                    <span class="timer-mm">${dist.m}</span><span class="timer-dhms">m</span>
                    <span class="timer-ss">${dist.s}</span><span class="timer-dhms">s</span>
                    `
                }
                domElement.html(html)

                if (distanceTimestamp < 0) {
                clearInterval(timer)
                domElement.html('<span class="timer-dd">EXPIRED</span>')
                }
            }, 1000)
        },
        calculateDistance(timestamp) {
            let now = Math.floor((new Date().getTime())/1000)
            return timestamp - now
        },
        convertDistance(distance) {
            let hh = Math.floor((distance % (60 * 60 * 24)) / (60 * 60))
            let mm = Math.floor((distance % (60 * 60)) / 60)
            let ss = Math.floor(distance % 60)
            return {
                d: Math.floor(distance / (60 * 60 * 24)),
                h: hh < 10 ? "0" + hh : hh,
                m: mm < 10 ? "0" + mm : mm,
                s: ss < 10 ? "0" + ss : ss
            }
        }
    },

    /*
    *   GENERAL PAGE BEHAVIOR
    */
    showNotifyTop(strong, message){
        $('#notify-top-message').html(`<strong>${strong}</strong> ${message}`)
        $("#notify-top").show()
        setTimeout(function(){
          $("#notify-top").hide()
        }, 2000)
    },

    showErrorTop(strong, message){
        $('#error-top-message').html(`<strong>${strong}</strong> ${message}`)
        $("#error-top").show()
        setTimeout(function(){
          $("#error-top").hide()
        }, 5000)
    },
    showCookieWarning() {
        if (!page.getVisitedCookie()) {
            $('.cookiewarning').show()
        }
    },
    hideCookieWarning() {
        $('.cookiewarning').hide()
        page.setVisitedCookie()
    },
    getVisitedCookie() {
        let value = document.cookie.match('(^|;) ?visited=([^;]*)(;|$)')
        return value ? value[2] : null;
    }, 
    setVisitedCookie() {
        let date = new Date
        date.setTime(date.getTime() + 24*60*60*1000*30)
        document.cookie = "visited=true;path=/;expires=" + date.toGMTString()
    },

    hideAllCollapses() {
        $('.collapse').collapse('hide')
    },
    collapseListener() {
        $('.collapse').on('hide.bs.collapse', () => {
            $('.nav-link').removeClass('active-link')
        })
        $('#signup-collapse').on('show.bs.collapse', () => {
            $('#signup-nav > a').addClass('active-link')
        })
        $('#account-collapse').on('show.bs.collapse', () => {
            $('#account-nav > a').addClass('active-link')
        })
        $('#create-cd-collapse').on('show.bs.collapse', () => {
            $('#create-cd-nav > a').addClass('active-link')
        })
        $('#login-collapse').on('show.bs.collapse', () => {
            $('#login-nav > a').addClass('active-link')
        })
        $('.nav-link').on('click', page.hideAllCollapses)
    }, 
    formListener() {
        $('#login-collapse').on('keypress', 'input', (e) => {
            if (e.which == 13) {
                $('#login-btn').click()
            }
        })
        $('#signup-collapse').on('keypress', 'input', (e) => {
            if (e.which == 13) {
                $('#signup-btn').click()
            }
        })
    },

    /*
    *   INPUT PARSERS AND VALIDATORS
    */
    validator: {
        parseInput(input) {
            input = input.replace('&','&amp;')
            input = input.replace('<','&lt;')
            input = input.replace('>','&gt;')
            input = input.replace('"','&quot;')
            input = input.replace("'",'&#x27;')
            input = input.replace('/','&#x2F;')
            return input
        },
        validateEmail(email) {
            const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
            return regex.test(email)
        },
        validatePassword(pass) {
            return pass.length > 7
        }
    }
}
