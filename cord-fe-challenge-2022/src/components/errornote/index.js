import styled from 'styled-components'
import TextButton from '../textbutton'

export default function ErrorNote({ message }) {
  const reload = () => {
    window.location.reload()
  }

  return (
    <ErrorWrapper>
      <h1>{message}</h1>
      <TextButton onClick={reload}>{"Let's try again!"}</TextButton>
    </ErrorWrapper>
  )
}

const ErrorWrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 3rem;

  h1 {
    font-size: 1.2rem;
  }
`
