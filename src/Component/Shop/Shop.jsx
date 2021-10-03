import React, { useState } from 'react';
import { useEffect } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0, 10);
    const [products, setProducts] = useState(firstTen)
    const [cart, setCart] = useState([])


    useEffect(() => {
       const savedCart = getDatabaseCart();
       const productKeys = Object.keys(savedCart);
       const previousCart = productKeys.map(pdKey =>{
           const product = fakeData.find(pd => pd.key === pdKey);
           product.quantity = savedCart[pdKey];
           return product;
       })
       setCart(previousCart);
    },[])


    const handleAddProduct = (product) => {
        // console.log('product added',product);
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
             count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const remaining = cart.filter(pd => pd.key !== product.key);
            newCart = [...remaining, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    products.map(pb => <Product handleAddProduct={handleAddProduct} product={pb} key={pb.key} showAddToCart={true} />)
                }

            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                 <Link to="/review"> <button className="cart-button">Review Order</button> </Link>
                 </Cart>
              

                
            </div>
        </div>
    );
};

export default Shop;