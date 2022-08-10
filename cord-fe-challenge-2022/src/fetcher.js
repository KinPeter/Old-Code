import axios from 'axios'
import { useState } from 'react'

// eslint-disable-next-line no-undef
const apiKeyQueryString = `?api_key=${process.env.REACT_APP_API_KEY}`
const baseUrl = 'https://api.themoviedb.org/3'
const requestType = {
  POPULAR: 0,
  SEARCH: 1,
}

export const useFetcher = () => {
  const [lastRequestType, setLastRequestType] = useState(requestType.POPULAR)
  const [pages, setPages] = useState(0)
  const [lastPage, setLastPage] = useState(0)

  const fetchFromApi = async ({ path, query }) => {
    return (await axios.get(`${baseUrl}${path}${apiKeyQueryString}${query ? `&${query}` : ''}`))
      .data
  }

  const getGenres = async () => {
    return (await fetchFromApi({ path: '/genre/movie/list' })).genres
  }

  const getPopularMovies = async page => {
    const res = await fetchFromApi({ path: '/movie/popular', query: page ? `&page=${page}` : '' })
    setLastRequestType(requestType.POPULAR)
    setPages(res['total_pages'])
    setLastPage(res.page)
    return {
      movies: res.results,
      totalCount: res['total_results'],
    }
  }

  const getSearchResults = async ({ keyword, year, page }) => {
    if (!keyword) return
    const res = await fetchFromApi({
      path: '/search/movie',
      query: `query=${encodeURI(keyword)}${year ? `&year=${encodeURI(year)}` : ''}${
        page ? `&page=${page}` : ''
      }`,
    })
    setLastRequestType(requestType.SEARCH)
    setPages(res['total_pages'])
    setLastPage(res.page)
    return {
      movies: res.results,
      totalCount: res['total_results'],
    }
  }

  const getMore = async ({ keyword, year }) => {
    if (lastRequestType === requestType.SEARCH && lastPage < pages) {
      return getSearchResults({ keyword, year, page: lastPage + 1 })
    } else if (lastRequestType === requestType.POPULAR && lastPage < pages) {
      return getPopularMovies(lastPage + 1)
    }
  }

  return {
    getGenres,
    getPopularMovies,
    getSearchResults,
    getMore,
    pages,
    lastPage,
  }
}
