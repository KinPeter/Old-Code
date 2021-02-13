const cd = {
    timestamp: null,

    createNewCd() {
        cd.createCdTimestamp()
        let descr = page.getNewCdInput().descr
        let timestamp = cd.timestamp
        let userid = user.currentId
        descr = page.validator.parseInput(descr)  

        try {
            ls.createCd(timestamp, descr, userid)
            page.showNotifyTop('Success!', 'Countdown added successfully.')
            page.hideAllCollapses()
            page.clearCdInputFields()
            cd.fetchCdsForUser()
        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
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
        try {
            let cds = ls.getCdsOfUser(id)
            cds = cds.sort((a, b) => a.timestamp - b.timestamp)
            page.listUsersCds(cds)
        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
    },
    deleteCd(cdownid) {
        try {
            ls.removeCd(cdownid)
            page.showNotifyTop('', 'Countdown has been deleted.')
        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
    },
    deleteAllCds(userid) {
        try {
            ls.removeAllCds(userid)
        } catch (err) {
            page.showErrorTop('Error:', err.message)
        }
    }
}