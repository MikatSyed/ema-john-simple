import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();

    const [product,setProduct] = useState({})
    useEffect(()=>{
    fetch('http://localhost:6700/product/'+productKey)
    .then(response => response.json())
    .then(data => setProduct(data))
    },[productKey])
    return (
        <>
            
            <Product product={product} showAddToCart={false}/>
        </>
    );
};

export default ProductDetails;