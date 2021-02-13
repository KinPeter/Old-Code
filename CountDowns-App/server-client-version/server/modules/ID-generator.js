function generateUserId() {
    const now = Math.floor((Date.now()/1000)).toString()
    const salt = Math.floor((Math.random()*900)+100).toString()
    return now+salt
}

function generateCdId() {
    const now = Math.floor((Date.now()/1000)).toString()
    const salt = Math.floor((Math.random()*90)+10).toString()
    return 'cd' + now + salt
}

// const id = generateUserId()

// console.log(id)


module.exports = {
    generateUserId,
    generateCdId
}