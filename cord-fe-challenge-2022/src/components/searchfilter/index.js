import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
// import { useDebounce } from 'rooks'

import * as colors from '../../colors'
import SearchBar from '../../components/searchbar'
import AccordionFilter from '../accordionfilter'
import Checkbox from '../checkbox'
import { useMediaQuery, WIDTH_LG } from '../../mediaquery'

import SearchIcon from '../../images/search-icon-yellow.png'
import YearIcon from '../../images/year-icon.png'
import FiltersIcon from '../../images/filter-icon.png'
import { useDebounce } from '../../debounce'

export default function SearchFilters({ genres, ratings, languages, onSearch }) {
  const [keyWord, setKeyWord] = useState('')
  const [year, setYear] = useState('')
  const onTypeKeyWord = useDebounce(setKeyWord, 1000)

  const isDesktop = useMediaQuery(WIDTH_LG)
  const [allVisible, setAllVisible] = useState(false)

  useEffect(() => {
    setAllVisible(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    onSearch(keyWord, year)
  }, [keyWord, year])

  const onTypeYear = value => {
    if (!value || value.length !== 4 || Number(value) < 1900 || Number(value) > 2100) return
    setYear(value)
  }

  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont" marginBottom>
        <div className="first_row">
          <SearchBar
            id="keyword_search_input"
            type="text"
            icon={{ src: SearchIcon, alt: 'Magnifying glass' }}
            placeholder="Search for movies"
            onChange={onTypeKeyWord}
          />
          <button onClick={() => setAllVisible(!allVisible)} aria-label="Toggle filters">
            <img src={FiltersIcon} alt="filters" />
          </button>
        </div>
        {allVisible && (
          <SearchBar
            id="year_search_input"
            type="number"
            icon={{ src: YearIcon, alt: 'Calendar icon' }}
            placeholder="Year of release"
            onChange={onTypeYear}
          />
        )}
      </SearchFiltersCont>
      {allVisible && (
        <SearchFiltersCont>
          <CategoryTitle>Movies</CategoryTitle>
          <AccordionFilter label="Select genre(s)">
            {genres?.length
              ? genres.map(({ id, name }) => <Checkbox id={id} label={name} key={id} />)
              : null}
          </AccordionFilter>
          <AccordionFilter label="Select min.vote">
            {ratings?.length
              ? ratings.map(({ id, name }) => <Checkbox id={id} label={name} key={id} />)
              : null}
          </AccordionFilter>
          <AccordionFilter label="Select language">
            {languages?.length
              ? languages.map(({ id, name }) => <Checkbox id={id} label={name} key={id} />)
              : null}
          </AccordionFilter>
        </SearchFiltersCont>
      )}
    </FiltersWrapper>
  )
}

const FiltersWrapper = styled.div`
  position: relative;
`

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  .search_bar_wrapper:first-child {
    margin-bottom: 15px;
  }

  .first_row {
    display: flex;
    align-items: center;
    gap: 15px;

    div {
      flex-grow: 1;
    }

    button {
      border: none;
      border-bottom: 2px solid ${colors.primaryColor};
      background: none;
      cursor: pointer;
      box-sizing: border-box;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;

      @media (min-width: ${WIDTH_LG}) {
        display: none;
      }
    }
  }

  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: 15px;
    `}
`

const CategoryTitle = styled.h3`
  margin: 0 0 15px 0;
`
