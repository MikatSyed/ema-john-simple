import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData'
import Product from '../Product/Product';

const ProductDetails = () => {
    const { productKey } = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    console.log('product',product);
    return (
        <>
            <h2>Your Product Deatils Loading...</h2>
            <Product product={product} showAddToCart={false}/>
        </>
    );
};

export default ProductDetails;