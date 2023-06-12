import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Featured from '../components/Featured'
import axios from 'axios';

const Home = () => {
    const [product, setProduct] = useState([])
    const id = "64805908c1ff6163b3be78da";
    const getProduct = async () => {
        const {data, status} = await axios.get('/product/edit', {params: {id}})
        if(status === 200){
            setProduct(data)
        }
    }
    useEffect(() => {
        getProduct()
    }, [])  
  return (
    <div>
        <Header />
        <Featured product={product} />
    </div>
  )
}

export default Home