$(document).ready(() => {

    /*
    *   GENERAL BEHAVIOR
    */
    page.showCookieWarning()
    $('#accept-cookie-btn').on('click', page.hideCookieWarning)
    page.collapseListener()
    page.formListener()    
    ls.init()

    /*
    *   USER LOGIN & SIGNUP
    */
    user.checkLoginOnStartUp()
    $('#signup-btn').on('click', user.processSignup)
    $('#login-btn').on('click', user.processLogin)    
    $('#logout-btn').on('click', user.processLogOut)
    $('#delete-user-btn').on('click', user.deleteAccount)

    /*
    *   COUNTDOWNS 
    */
    page.createDatePicker()
    page.addOpionsToHhMmSelect()
    $('#set-new-cd-btn').on('click', cd.createNewCd)
    $('#cdowns-list').on('click', '.delete-cd-btn', function() {
        page.deleteThisCd($(this).parent().parent().parent().parent().data('cdownid'))
    })


    
})






