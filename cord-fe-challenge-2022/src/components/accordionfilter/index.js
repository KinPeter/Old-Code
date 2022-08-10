import { useState } from 'react'
import styled from 'styled-components'

import PlusIcon from '../../images/add-icon.png'
import MinusIcon from '../../images/remove-icon.png'

export default function AccordionFilter({ label, children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <HeaderButton
        onClick={() => setOpen(!open)}
        className={open ? 'open' : ''}
        $image={open ? MinusIcon : PlusIcon}
      >
        {label}
      </HeaderButton>
      {open ? <div>{children}</div> : null}
    </>
  )
}

const HeaderButton = styled.button`
  margin-bottom: 1rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  cursor: pointer;
  user-select: none;
  color: inherit;

  ::before {
    content: '';
    width: 20px;
    height: 20px;
    margin-right: 0.2rem;
    background-image: url('${({ $image }) => $image}');
    background-position: center;
  }
`
