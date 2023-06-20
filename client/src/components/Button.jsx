import React from "react";
import { css, styled } from "styled-components";

const ButtonStyled = styled.button`
  display: inline-flex;
  background-color: #5542f6;
  color: #fff;
  padding: 10px 20px;
  margin-right: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2rem;
  svg {
    height: 20px;
    margin: 0 5px;
    
  }
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      color: #fff;
    `} 
   ${(props) =>
    props.white &&
    css`
      background-color: #fff;
      color: #000;
    `}
    ${props => props.block && css`
      display: block;
      width: 100%;
      background: green
    `}
`;

const Button = ({ children, ...rest }) => {
  return <ButtonStyled {...rest}>{children}</ButtonStyled>;
};

export default Button;
