import React from 'react';
import axios from 'axios';

import './App.scss';
import Dictionary from '../dictionary-control/Dictionary';
import Autocomplete from './Autocomplete/Autocomplete';
import ResultData from '../interfaces/ResultData';
import ResultList from './ResultList/ResultList';
import ErrorAlert from './ErrorAlert/ErrorAlert';


const dictUrl: string = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv';

type AppState = {
    wordList: {
        kor: string[],
        hun: string[]
    },
    searchTerm: string,
    results: ResultData[],
    error: string | null
}

class App extends React.Component {
    state: AppState;

    constructor(props: any) {
        super(props)
        this.state = {
            wordList: {
                kor: [],
                hun: []
            },
            searchTerm: '',
            results: [],
            error: null
        }
    }

    componentDidMount() {
        const korList: string[] = [];
        const hunList: string[] = [];
        axios.get(dictUrl).then((result: any) => {
            const lines = result.data.split(/\r\n/);
            lines.forEach((line: string) => {
                const pair = line.split(/\t/);
                korList.push(pair[0]);
                hunList.push(pair[1]);
            });
            this.setState({wordList: {kor: korList, hun: hunList}});
        }).catch((reason) => {
            this.setState({
                wordList: {hun: ['error'], kor: ['error']}, // to avoid typeError 
                error: 'Sorry, couldn\'t load dictionary file due to an error. Please try again later.'
            });
        });
    }

    performSearch = (searchTerm: string): void => {
        this.setState({results: [], error: null});
        if (searchTerm) {
            const results = Dictionary.wordLookup(searchTerm, this.state.wordList.hun, this.state.wordList.kor);
            if (results.length === 0) {
                this.setState({ error: 'Sorry, no matches.'});
                return;
            }
            if (results.length > 100) {
                this.setState({ error: 'Too many results, please narrow your search.' });
                return;
            }
            this.setState({results: results});
        }
    }

    render() {
        return (
            <div className="App">
                <div id="dict-wrapper" className="container text-center">
                    <header className="title">Korean - Hungarian dictionary</header>
                    <Autocomplete 
                        wordlist={[...this.state.wordList.hun, ...this.state.wordList.kor]}
                        placeholder="Enter a Korean or Hungarian word here"
                        buttonText="Search"
                        onSubmitted={this.performSearch} />

                    {this.state.error ? <ErrorAlert message={this.state.error} /> : null}

                    <ResultList 
                        results={this.state.results} />
                </div>
                <footer className="footer">
                    with &#x1F495; from <a href="https://www.p-kin.com">p-kin.com</a>
                </footer> 
            </div>
        );
    }
}

export default App;
