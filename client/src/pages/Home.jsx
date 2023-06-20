import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Featured from '../components/Featured';
import NewProduct from "../components/NewProduct"
import axios from 'axios';

const Home = () => {
    const [product, setProduct] = useState([])
    const [newproduct, setNewProduct] = useState([])
    const id = "648e225e8a07786b8ab68ab0";
    const getProduct = async () => {
        const {data, status} = await axios.get('/product/one',  {params: {id}})
        if(status === 200){
            setProduct(data)
        }
    }
    const getAllProduct = async () => {
        const { data, status } = await axios.get("/product/all");
        setNewProduct(data)
    }
    useEffect(() => {
        getProduct()
        getAllProduct()
    }, [])  
  return (
    <div>
      <Header />
      <Featured product={product} />
      <NewProduct product={newproduct} />
    </div>
  );
}

export default Home