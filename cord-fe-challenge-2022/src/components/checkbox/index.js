import React from 'react'
import styled from 'styled-components'
import * as colors from '../../colors'

export default function Checkbox({ id, name, checked, label, onChange }) {
  return (
    <CheckboxCont>
      <label htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={e => onChange && onChange(e.target.checked)}
        ></input>
        <span />
        {label}
      </label>
    </CheckboxCont>
  )
}

const CheckboxCont = styled.div`
  position: relative;
  margin-bottom: 0.5rem;

  input {
    //margin-right: 16px;
    //transform: scale(1.4);
    display: none;

    :checked ~ span:after {
      display: block;
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 1px solid ${colors.fontColor};
    border-radius: 4px;

    ::after {
      content: '';
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }

  label {
    font-weight: lighter;
    margin-left: 36px;
  }
`
