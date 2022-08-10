/**
 *  DICTIONARY SEARCH functions
 */
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv'

const kor = []
const hun = []

// fetch word lists from Google Sheet published .TSV file
function fetchDictFromGoogleSheet(url, kor, hun) {
    $.get(url)
        .done((result) => {
            let lines = result.split(/\r\n/)
            lines.forEach(line => {
                let pair = line.split(/\t/)
                kor.push(pair[0])
                hun.push(pair[1])
            })
            // load daily Korean words only if fetching is done
            loadDailyKorean()
        })
        .fail((error) => {
            alert(error.status + ": Error loading file.")
            console.log(error)
        })
}

fetchDictFromGoogleSheet(url, kor, hun)

//search for a word and call the display function passing the results
function wordLookup(word) {

    word = word.trim().toLowerCase();
    // const regex = new RegExp('\\b' + word + '\\b') // does not work with korean :(
    const regexOnOwn = new RegExp('(?:^|\\s|-|\'|~)' + word +  '(?:$|\\s|,|-|\'|~)')
    const regexInParentheses = new RegExp('(?:\\()' + word +  '(?:\\))')

    const preResults = {
        "exact" : [], 
        "onOwn" : [],
        "startsWith" : [], 
        "inParentheses" : [],
        "partial" : []  
    };

    for (let i = 0; i < hun.length; i++) {

        //check for exact match        
        if ( word == hun[i].toLowerCase() ) {
            preResults.exact.push([hun[i], kor[i]]);
        } else if ( word == kor[i].toLowerCase() ) {
            preResults.exact.push([kor[i], hun[i]]);
        }
    
        //check for word on it's own in the entry
        else if (regexOnOwn.test(hun[i].toLowerCase())) {
            preResults.onOwn.push([hun[i], kor[i]])
        } else if (regexOnOwn.test(kor[i])) {
            preResults.onOwn.push([kor[i], hun[i]])
        }

        //check for match starting with word
        else if ( hun[i].toLowerCase().startsWith(word) ) {
            preResults.startsWith.push([hun[i], kor[i]]);
        } else if ( kor[i].toLowerCase().startsWith(word) ) {
            preResults.startsWith.push([kor[i], hun[i]]);
        }  
    
        //check for word on it's own but in parentheses
        else if (regexInParentheses.test(hun[i].toLowerCase())) {
            preResults.inParentheses.push([hun[i], kor[i]])
        } else if (regexInParentheses.test(kor[i])) {
            preResults.inParentheses.push([kor[i], hun[i]])
        }
        //check for match including word anywhere
        else if ( hun[i].toLowerCase().includes(word) ) {
            preResults.partial.push([hun[i], kor[i]]);
        } else if ( kor[i].toLowerCase().includes(word) ) {
            preResults.partial.push([kor[i], hun[i]]);
        }  
    }

    combineResults(preResults);
    // return preResults;
}

function combineResults(preResults) {
    // finalize results array
    let results = [];
    results = results.concat(preResults.exact, preResults.onOwn, preResults.startsWith, preResults.inParentheses, preResults.partial)
    showDictResults(results);
    // return results;
}


//display the results
function showDictResults(results) {
    //clear results table
    $('#results-table').html('');
    //clear input field
    $('#search-input').val('');
    //fill up the list
    results.forEach((pair) => {
        $('#results-table').append(`
        <tr>
            <th scope="row">${pair[0]} = ${pair[1]}</th>
        </tr>
        `);
    });
    //show the results modal
    $('#modal').modal('show');
}
