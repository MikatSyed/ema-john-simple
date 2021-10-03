import React from 'react';
import { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import fakeData from './../../fakeData/index';
import Cart from './../Cart/Cart';
import Image from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckOut = () => {
      history.push('./shipment')
    }

    const removeProduct = (productKey) => {
        // console.log('remove done!',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cartdata
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    }, [])

    let happyImage;
    if(orderPlaced){
       happyImage = <img src={Image} alt=""/>
    }
    return (
        <>

            <div className="shop-container">
                <div className="product-container"> 
                    {
                        cart.map(pb => <ReviewItem product={pb} removeProduct={removeProduct} key={pb.key} />)
                    }
                    { 
                        happyImage
                    }
                </div>

                <div className="cart-container">
                    <Cart cart={cart}>
                        <button className="cart-button" onClick={handleProceedCheckOut}>Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
            );
        </>
    );
};

export default Review;