const cd = {
    timestamp: null,

    createNewCd() {
        cd.createCdTimestamp()
        let descr = page.getNewCdInput().descr
        let timestamp = cd.timestamp
        let userid = user.currentId
        descr = page.validator.parseInput(descr)  

        $.post(`${url}/createcd`, 
            { timestamp, descr, userid },
            function(res) {
                if (res === 'done') {
                    page.showNotifyTop('Success!', 'Countdown added successfully.')
                    page.hideAllCollapses()
                    cd.fetchCdsForUser()
                    // page.clearSignupFields()
                } else {
                    page.showErrorTop('Something went wrong...\n', res)
                }
            }
        )
    },
    createCdTimestamp() {
        cdInput = page.getNewCdInput()
        cdString = cdInput.date + ' ' + cdInput.hh + ':' + cdInput.mm
        cdTimestamp = moment(cdString, 'MM/DD/YYYY HH:mm').unix()
        this.timestamp = cdTimestamp
        console.log(cdInput)
        console.log(cdString)        
        console.log(cdTimestamp)
    },    
    fetchCdsForUser() {
        const id = user.currentId
        $.getJSON(`${url}/fetchcds/${id}`, (cds) => {
            console.log(cds)
            cds = cds.sort((a, b) => a.timestamp - b.timestamp)
            if (cds.length > 0) {
                page.listUsersCds(cds)
            }
        }).fail((xhr, status, message) => {
            page.showErrorTop('No countdowns found.', '')
        })
    },
    deleteCd(cdownid) {
        console.log('cd.deleteCd(id): ', cdownid)
        $.post(`${url}/deletecd`, 
            { cdownid },
            function(res) {
                if (res === 'done') {
                    page.showNotifyTop('', 'Countdown has been deleted.')
                } else {
                    page.showErrorTop('Sorry,', 'something went wrong...')
                }
            }
        )
    },
    deleteAllCds() {
        $.post(`${url}/deleteallcds`, 
            { id: user.currentId },
            function(res) {
                if (res === 'done') {
                    console.log('All countdowns have been deleted for user', user.currentId)
                } else {
                    page.showErrorTop('Sorry,', 'something went wrong...')
                }
            }
        )
    }
}