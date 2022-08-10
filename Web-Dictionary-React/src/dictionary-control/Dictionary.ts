import ResultData from '../interfaces/ResultData';
import PreResults from '../interfaces/PreResults';

const Dict = {
    wordLookup(word: string, hun: string[], kor: string[]): ResultData[] {
        word = word.trim().toLowerCase();
        // const regex = new RegExp('\\b' + word + '\\b') // does not work with korean :(
        const regexOnOwn = new RegExp('(?:^|\\s|-|\'|~)' + word + '(?:$|\\s|,|-|\'|~)');
        const regexInParentheses = new RegExp('(?:\\()' + word + '(?:\\))');

        const preResults: PreResults = {
            exact: [],
            onOwn: [],
            startsWith: [],
            inParentheses: [],
            partial: []
        };

        for (let i = 0; i < hun.length; i++) {

            //check for exact match        
            if (word === hun[i].toLowerCase()) {
                preResults.exact.push({ word: hun[i], translate: kor[i] });
            } else if (word === kor[i].toLowerCase()) {
                preResults.exact.push({ word: kor[i], translate: hun[i] });
            }

            //check for word on it's own in the entry
            else if (regexOnOwn.test(hun[i].toLowerCase())) {
                preResults.onOwn.push({ word: hun[i], translate: kor[i] });
            } else if (regexOnOwn.test(kor[i])) {
                preResults.onOwn.push({ word: kor[i], translate: hun[i] });
            }

            //check for match starting with word
            else if (hun[i].toLowerCase().startsWith(word)) {
                preResults.startsWith.push({ word: hun[i], translate: kor[i] });
            } else if (kor[i].toLowerCase().startsWith(word)) {
                preResults.startsWith.push({ word: kor[i], translate: hun[i] });
            }

            //check for word on it's own but in parentheses
            else if (regexInParentheses.test(hun[i].toLowerCase())) {
                preResults.inParentheses.push({ word: hun[i], translate: kor[i] });
            } else if (regexInParentheses.test(kor[i])) {
                preResults.inParentheses.push({ word: kor[i], translate: hun[i] });
            }
            //check for match including word anywhere
            else if (hun[i].toLowerCase().includes(word)) {
                preResults.partial.push({ word: hun[i], translate: kor[i] });
            } else if (kor[i].toLowerCase().includes(word)) {
                preResults.partial.push({ word: kor[i], translate: hun[i] });
            }
        }
        return this.combineResults(preResults);
    },
    combineResults(preResults: PreResults): ResultData[] {
        // finalize results array
        let results: ResultData[] = [];
        results = results.concat(preResults.exact, preResults.onOwn, preResults.startsWith, preResults.inParentheses, preResults.partial);
        return results;
    }
}

export default Dict;