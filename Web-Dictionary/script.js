const url = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv';

const kor = [];
const hun = [];

const page = {
    init() {
        dict.init().then(() => {
            this.searchListener();
            this.enterListener();
            this.toTopListener();
        });
    },
    searchListener() {
        $('#dict-submit').click(() => {
            const html = this.getResultHtml( dict.wordLookup( $('#dict-input').val() ) );
            $('#search-results').html(html);
            $('#dict-input').val('');
            $(document).focus();
            $('#dict-input').autocomplete( 'close' );
        })
    },
    enterListener() {
        //to use enter key same as click on input
        $('#dict-input').keypress((e) => {
            if (e.which == 13) {$('#dict-submit').click()};
        }); 
    },
    toTopListener() {
        $('#back-to-top').click(() =>$('html, body').animate({ scrollTop: 0}, 1000));
        $(window).scroll(() => {
            let scroll = $(window).scrollTop();
            if (scroll >= 200) $('#back-to-top').fadeIn(500);
            else $('#back-to-top').fadeOut(500);
        });
    },
    getResultHtml(result) {   
        let resultHtml = `<div class="results-wrapper">`;        
        //IF there is no result
        if (result.length < 1) {
            resultHtml += '<div class="result-box"><div class="result-row row-two text-danger">Sorry, no matches.</div></div>';
        //IF there are too many results
        } else if (result.length > 100) {
            resultHtml += '<div class="result-box"><div class="result-row row-two text-danger">Too many results, please narrow your search.</div></div>';
        //IF there are normal results
        } else {
            result.forEach((pair, i) => {
                resultHtml += `
                <div class="result-box">
                    <div class="result-row row-one">
                        <sup>${i+1}</sup>${pair[0]}
                    </div>
                    <div class="result-row row-two">${pair[1]}</div>
                </div>
                `;
            });
        }
        resultHtml += '</div>';
        return resultHtml;
    },
    showLoadingError() {
        $('#search-results').html(`
        <div class="results-wrapper">
        <div class="result-box"><div class="result-row row-two text-danger">Sorry, couldn't load dictionary file due to an error. Please try again later.</div></div></div>
        `);
    }
}

const dict = {
    init() {
        return new Promise((resolve) => {
            this.fetchDictFromGoogleSheet(url, kor, hun).then(() => {
                autocomplete.init();
                resolve();
            });
        }); 
    },
    fetchDictFromGoogleSheet(url, kor, hun) {
        return new Promise((resolve, reject) => {
            $.get(url)
                .done((result) => {
                    let lines = result.split(/\r\n/);
                    lines.forEach(line => {
                        let pair = line.split(/\t/);
                        kor.push(pair[0]);
                        hun.push(pair[1]);
                    });
                    console.log('Dictionary loaded.');
                    resolve();
                })
                .fail((error) => {
                    page.showLoadingError();
                    console.error(error);
                    reject();
                });
        });
    },
    wordLookup(word) {
        word = word.trim().toLowerCase();
        // const regex = new RegExp('\\b' + word + '\\b') // does not work with korean :(
        const regexOnOwn = new RegExp('(?:^|\\s|-|\'|~)' + word +  '(?:$|\\s|,|-|\'|~)');
        const regexInParentheses = new RegExp('(?:\\()' + word +  '(?:\\))');
    
        const preResults = {
            'exact' : [], 
            'onOwn' : [],
            'startsWith' : [], 
            'inParentheses' : [],
            'partial' : []  
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
                preResults.onOwn.push([hun[i], kor[i]]);
            } else if (regexOnOwn.test(kor[i])) {
                preResults.onOwn.push([kor[i], hun[i]]);
            }
    
            //check for match starting with word
            else if ( hun[i].toLowerCase().startsWith(word) ) {
                preResults.startsWith.push([hun[i], kor[i]]);
            } else if ( kor[i].toLowerCase().startsWith(word) ) {
                preResults.startsWith.push([kor[i], hun[i]]);
            }  
        
            //check for word on it's own but in parentheses
            else if (regexInParentheses.test(hun[i].toLowerCase())) {
                preResults.inParentheses.push([hun[i], kor[i]]);
            } else if (regexInParentheses.test(kor[i])) {
                preResults.inParentheses.push([kor[i], hun[i]]);
            }
            //check for match including word anywhere
            else if ( hun[i].toLowerCase().includes(word) ) {
                preResults.partial.push([hun[i], kor[i]]);
            } else if ( kor[i].toLowerCase().includes(word) ) {
                preResults.partial.push([kor[i], hun[i]]);
            }  
        }
        return this.combineResults(preResults);
    },
    combineResults(preResults) {
        // finalize results array
        let results = [];
        results = results.concat(preResults.exact, preResults.onOwn, preResults.startsWith, preResults.inParentheses, preResults.partial);
        return results;
    }
}

const autocomplete = {
    init() {
        this.preLoad();
        this.toggleListener();
        //set max width of autocomplete field depending on input field
        $('.ui-autocomplete').css('max-width', $('#dict-input').width() + 25);
    },
    preLoad() {
        //initiate autocomplete on load if checkbox is checked
        if ($('#autocomplete-check').attr('checked')) {
            $('#dict-input').autocomplete({source: hun.concat(kor)});
        }
    },
    toggleListener() {
        //toggle autocomplete with checkbox
        $('#autocomplete-check').click(() => {
            if ($('#autocomplete-check').is(':checked')) {
                $('#dict-input').autocomplete('enable');    
            } else {
                $('#dict-input').autocomplete('disable'); 
            }     
        });
    }
}

page.init();


