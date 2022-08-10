import React from 'react';
import ResultData from '../../../interfaces/ResultData';

type Props = {
    result: ResultData;
    index: number;
}

const Result = (props: Props): React.ReactElement => {
    return (
        <div className="result-box">
            <div className="result-row row-one">
                <sup>{props.index + 1}</sup>{props.result.word}
            </div>
            <div className="result-row row-two">
                {props.result.translate}
            </div>            
        </div>
    );
};

export default Result;