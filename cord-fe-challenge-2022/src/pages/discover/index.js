import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import SearchFilters from '../../components/searchfilter'
import MovieList from '../../components/movielist'
import ErrorNote from '../../components/errornote'
import TextButton from '../../components/textbutton'
import { useFetcher } from '../../fetcher'
import { useMoviesStates } from './useMoviesStates'
import { WIDTH_LG } from '../../mediaquery'
import * as colors from '../../colors'

export default function Discover() {
  const {
    keyword,
    setKeyword,
    year,
    setYear,
    genreOptions,
    setGenreOptions,
    languageOptions,
    ratingOptions,
    totalCount,
    setTotalCount,
    results,
    setResults,
    clearResults,
  } = useMoviesStates()
  const { getGenres, getPopularMovies, getSearchResults, getMore, pages, lastPage } = useFetcher()
  const [hasApiError, setHasApiError] = useState(false)

  useEffect(() => {
    if (!genreOptions?.length) {
      loadGenres()
    }
    if (!results?.length) {
      loadPopularMovies()
    }
    return () => {
      clearResults()
      setHasApiError(false)
    }
  }, [])

  const loadGenres = async () => {
    try {
      const genres = await getGenres()
      setGenreOptions(genres)
    } catch (error) {
      console.log({ loadGenres: error })
      setHasApiError(true)
    }
  }

  const loadPopularMovies = async () => {
    try {
      const { movies, totalCount } = await getPopularMovies()
      setTotalCount(totalCount)
      setResults(movies)
    } catch (error) {
      console.log({ loadPopularMovies: error })
      setHasApiError(true)
    }
  }

  const searchMovies = async (keyword, year) => {
    if (!keyword) {
      loadPopularMovies()
      return
    }
    try {
      setKeyword(keyword)
      setYear(year)
      const response = await getSearchResults({ keyword, year })
      setTotalCount(response?.totalCount ?? 0)
      setResults(response?.movies ?? [])
    } catch (error) {
      console.log({ searchMovies: error })
      setHasApiError(true)
    }
  }

  const loadMore = async () => {
    try {
      const response = await getMore({ keyword, year })
      setResults(response?.movies ? [...results, ...response.movies] : [])
    } catch (error) {
      console.log({ loadMore: error })
      setHasApiError(true)
    }
  }

  if (hasApiError) {
    return <ErrorNote message="Sorry, something went wrong during your request..." />
  }

  return (
    <DiscoverWrapper>
      <MobilePageTitle>Discover</MobilePageTitle>
      <TotalCount>{totalCount} results</TotalCount>
      <DiscoverContent>
        <MovieFilters>
          <SearchFilters
            genres={genreOptions}
            ratings={ratingOptions}
            languages={languageOptions}
            onSearch={searchMovies}
          />
        </MovieFilters>
        <MovieResults>
          <MovieList movies={results || []} genres={genreOptions || []} />
          {results?.length && lastPage < pages ? (
            <LoadMore>
              <TextButton onClick={loadMore}>Load more...</TextButton>
            </LoadMore>
          ) : null}
        </MovieResults>
      </DiscoverContent>
    </DiscoverWrapper>
  )
}

const DiscoverWrapper = styled.main`
  padding: 80px 20px;

  @media (min-width: ${WIDTH_LG}) {
    padding: 35px;
  }
`

const DiscoverContent = styled.div`
  display: block;

  @media (min-width: ${WIDTH_LG}) {
    display: flex;
    flex-direction: row-reverse;
    gap: 15px;
  }
`

const MovieResults = styled.div`
  display: inline-block;
  width: 100%;

  @media (min-width: ${WIDTH_LG}) {
    width: calc(100% - 295px);
  }
`

const MovieFilters = styled.div`
  width: 100%;
  margin-top: 15px;

  @media (min-width: ${WIDTH_LG}) {
    width: 295px;
  }
`

const MobilePageTitle = styled.h1`
  display: block;
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  margin: 0;
  padding: 23px 0 0 78px;
  background-color: ${colors.lightBackground};

  @media (min-width: ${WIDTH_LG}) {
    display: none;
  }
`

const TotalCount = styled.strong`
  display: block;
`

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem auto;
`
