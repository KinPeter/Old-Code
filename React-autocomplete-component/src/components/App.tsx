import React from "react";
import "./App.scss";
import Autocomplete from './Autocomplete/Autocomplete';
import { dummyWordList } from '../dummy-word-list/word-list';

type State = {
    wordList: string[],
    result: string
}

class App extends React.Component {
    state: State

    constructor(props: any) {
        super(props);
        this.state = {
            wordList: dummyWordList,
            result: ''
        }
    }

    // componentDidMount() {
    //     let list: string[] = [];
    //     fetch(
    //         "https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vST-KJ2L6WJJLRw9phcMslOIumSFrjPXY9UUnzw3X9Urq1vwRrDoVhlTiGwuPSda8XRJPolPR65XBD7/pub?gid=0&single=true&output=tsv"
    //     )
    //     .then(response => {
    //         return response.text();
    //     })
    //     .then((result: any) => {
    //         const lines = result.split(/\r\n/);
    //         lines.forEach((line: string) => {
    //             const pair = line.split(/\t/);
    //             list.push(pair[0]);
    //             list.push(pair[1]);
    //         });
    //         this.setState({wordList: list});
    //     });
    // }
    
    /**
     * Do anything with the result value here
     * @param value is the word which is searched for
     */
    handleSubmission(value: string): void {
        this.setState({result: value});
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h1>Try Autocomplete</h1>
                </header>

                {/***** AUTOCOMPLETE COMPONENT ******/}
                <Autocomplete 
                    wordlist={this.state.wordList}
                    placeholder="Enter text here" 
                    buttonText="Search"
                    onSubmitted={(value) => {this.handleSubmission(value)}}/>
                {/***** AUTOCOMPLETE COMPONENT ******/}

                {this.state.result ? <h3>And the winner is: <br/>{this.state.result}</h3> : null}
            </div>
        );
    }
};

export default App;
