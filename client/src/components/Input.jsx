import React from 'react'
import { css, styled } from "styled-components";
const InputElement = styled.input`
 width: 100%;
 padding: 15px;
 margin-bottom: 10px;
 border: 1px solid #ccc;
 border-radius: 5px;
 box-sizing: border-box;
`

const Input = (props) => {
  return (
    <InputElement {...props} />
  )
}

export default Input