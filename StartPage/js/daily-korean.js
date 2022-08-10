let card, cardFront, cardBack
const dailyWords = new Set()
const limit = 48
const max = hun.length

$('#reload-korean').hover(function() {
    $(this).css("cursor", "pointer");
}).click(() => {
    loadDailyKorean()
})

function loadDailyKorean() {
    $('.cards-wrapper').html('')
    let randoms = generateThreeRandoms()
    for (const r of randoms) {
        cardFront = kor[r]
        cardBack = hun[r]
        if (cardFront.length > 48) {
            cardFront = trimWord(cardFront)
        }
        if (cardBack.length > 48) {
            cardBack = trimWord(cardBack)
        }
        card = makeCard(cardFront, cardBack)
        $('.cards-wrapper').append(card)
        dailyWords.add(r)
    }
}

function generateThreeRandoms() {
    let rnd1, rnd2, rnd3
    do {
        rnd1 = Math.floor( 1000 * Math.random() )
    } while (dailyWords.has(rnd1)) 
    do {
        rnd2 = Math.floor( 1000 * Math.random() + 1000 )
    } while (dailyWords.has(rnd2)) 
    do {
        rnd3 = Math.floor( (max - 2000) * Math.random() + 2000 )
    } while (dailyWords.has(rnd3)) 
    return [rnd1, rnd2, rnd3]
}

function makeCard(cardFront, cardBack) {
    return `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <div class="card-text-wrapper">
                        <div class="card-text card-front-text">${cardFront}</div> 
                    </div>                                    
                </div>
                <div class="flip-card-back">
                    <div class="card-text-wrapper">
                        <div class="card-text card-back-text">${cardBack}</div>
                    </div>   
                </div>
            </div>
        </div>`
}

function trimWord(word) {
    word = word.slice(0, 48)
    word += '...'
    return word
}