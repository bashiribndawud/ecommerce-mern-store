import React from "react";
import styled from "styled-components";

const TableElement = styled.table`
  width: 100%;
  thead {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.8rem;
  }
   
`;
const Table = (props) => {
  return <TableElement {...props} />;
};

export default Table;
