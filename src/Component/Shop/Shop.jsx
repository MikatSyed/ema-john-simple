import React, { useState } from 'react';
import { useEffect } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import Spinner from './../Spinner/Spinner';

const Shop = () => {

    const [products, setProducts] = useState([])
    console.log(products);
    const [cart, setCart] = useState([])
    const[search, setSearch] = useState('')
    document.title = "Ema John/Shop"
     

   useEffect(() => {
    fetch('http://localhost:6700/products?search='+search)
    .then(res => res.json())
    .then(data => setProducts(data))
   },[search])



    useEffect(() => {
       const savedCart = getDatabaseCart();
       const productKeys = Object.keys(savedCart);
     
       fetch('http://localhost:6700/productsByKeys',{
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(response => response.json())
        .then(data => setCart(data))
      
    },[])


    const handleAddProduct = (product) => {
        console.log('product added',product);
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

    const handleSearch = event =>{
        setSearch(event.target.value);
    }


    return (
        <>
        
        <div className="shop-container">
            <div className="product-container">
            <input type="text" onBlur={handleSearch} placeholder="search product"/>
            { products.length === 0 && <Spinner/>}
                {
                    products.map((pb,index) => <Product handleAddProduct={handleAddProduct} product={pb} key={index} showAddToCart={true} />)
                }

            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                 <Link to="/review"> <button className="cart-button">Review Order</button> </Link>
                 </Cart>
              

                
            </div>
        </div>
        </>
    );
};

export default Shop;