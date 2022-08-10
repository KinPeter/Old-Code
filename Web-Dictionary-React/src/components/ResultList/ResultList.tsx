import React from 'react';
import ResultData from '../../interfaces/ResultData';
import Result from './Result/Result';

type Props = {
    results: ResultData[];
}

const ResultList = (props: Props): React.ReactElement => {
    
    const results = props.results.map((result, index) => {
        return <Result key={index} result={result} index={index} />;
    })

    return (
        <div className="results-wrapper">
            {results}
        </div>
    );
};

export default ResultList;