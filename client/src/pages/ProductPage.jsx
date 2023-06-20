import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import ProductBox from "../components/ProductBox"

const Center = styled.div`
  margin-top: 3rem;
  padding: 2rem 7%;
`;

const Title = styled.h2`
    font-weight: 700;
    color: gray;
    font-size: 2rem;
`

const ProductPage = () => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        const {data,status} = await axios.get('/product/all');
        if(status === 200){
            setProducts(data)
        }
    }
    useEffect(() => {
        getProducts()
    }, [])
  return (
    <div>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductGrid>
            {products.length > 0 && products.map(product => (
                <ProductBox {...product} />
            ))}
        </ProductGrid>
      </Center>
    </div>
  );
};

export default ProductPage;
