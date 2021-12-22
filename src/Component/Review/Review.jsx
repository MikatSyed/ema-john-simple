import React from 'react';
import { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from './../Cart/Cart';
import { useHistory } from 'react-router';
import Spinner from './../Spinner/Spinner';

const Review = () => {
    const [cart, setCart] = useState([])
    console.log("cart",cart);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    document.title = "Ema John/Review"
    const handleProceedCheckOut = () => {
      history.push('./shipment')
    }

    const removeProduct = (productKey) => {
        console.log('remove done!',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cartdata
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

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
    }, [])

    
    return (
        <>

            <div className="shop-container">
                <div className="product-container"> 
                
                    {
                        cart.map(pb => <ReviewItem product={pb} removeProduct={removeProduct} key={pb.key} />)
                    }
                   
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className="cart-button"  onClick={handleProceedCheckOut}>Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
            );
        </>
    );
};

export default Review;