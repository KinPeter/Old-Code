import { useState } from 'react'

const ratingOptions = [
  { id: 7.5, name: 7.5 },
  { id: 8, name: 8 },
  { id: 8.5, name: 8.5 },
  { id: 9, name: 9 },
  { id: 9.5, name: 9.5 },
  { id: 10, name: 10 },
]

const languageOptions = [
  { id: 'GR', name: 'Greek' },
  { id: 'EN', name: 'English' },
  { id: 'RU', name: 'Russian' },
  { id: 'PO', name: 'Polish' },
]

export const useMoviesStates = () => {
  const [keyword, setKeyword] = useState('')
  const [year, setYear] = useState(0)
  const [results, setResults] = useState([])
  const [genreOptions, setGenreOptions] = useState([])
  const [totalCount, setTotalCount] = useState(0)

  const clearResults = () => {
    setResults([])
    setTotalCount(0)
  }

  return {
    keyword,
    setKeyword,
    year,
    setYear,
    results,
    setResults,
    genreOptions,
    setGenreOptions,
    totalCount,
    setTotalCount,
    ratingOptions,
    languageOptions,
    clearResults,
  }
}
