import ResultData from './ResultData';

interface PreResults {
    exact: ResultData[],
    onOwn: ResultData[],
    startsWith: ResultData[],
    inParentheses: ResultData[],
    partial: ResultData[]
}

export default PreResults;