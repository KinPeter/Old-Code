import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import * as colors from '../../colors'
import { WIDTH_MD } from '../../mediaquery'

export default function MovieItem({ movie, genres }) {
  const [genreList, setGenreList] = useState('')

  if (!movie || !genres) return null

  const {
    title,
    genre_ids: genreIds,
    overview,
    vote_average: rating,
    poster_path: imgSrc,
    release_date: releaseDate,
  } = movie

  useEffect(() => {
    const names = genreIds.map(id => genres.find(genre => genre.id === id)?.name ?? '')
    setGenreList(names.join(' | '))
  }, [movie])

  return (
    <MovieItemWrapper>
      <LeftCont>
        <img src={`https://image.tmdb.org/t/p/w200${imgSrc}`} alt={title} />
      </LeftCont>
      <RightCont>
        <TopRow>
          <Title>{title}</Title>
          <Rating>{rating ?? '-'}</Rating>
        </TopRow>
        <GenreList>{genreList}</GenreList>
        <Overview>{overview}</Overview>
        <ReleaseDate>{releaseDate}</ReleaseDate>
      </RightCont>
    </MovieItemWrapper>
  )
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin: 15px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: ${WIDTH_MD}) {
    flex-direction: row;
  }
`

const LeftCont = styled.div`
  margin-right: 20px;
  height: 100%;

  img {
    width: 150px;
  }
`

const RightCont = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.25rem;
`

const GenreList = styled.label`
  font-size: 0.8rem;
  color: ${colors.primaryColor};
  font-weight: bold;
  margin: 0;
`

const Overview = styled.p`
  height: 100%;
  flex-grow: 1;
`

const ReleaseDate = styled.p`
  font-size: 0.8rem;
  color: ${colors.primaryColor};
  font-weight: lighter;
  position: absolute;
  bottom: 8px;
`

const Rating = styled.span`
  background-color: ${colors.primaryColor};
  color: white;
  font-weight: bold;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
`
