import React from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
const ReviewItem = (props) => {
    const savedCart = getDatabaseCart();
    console.log(savedCart);
   
    const productQuantity = (keys)=>{
        console.log("called",keys);
        const newCart = Object.keys(savedCart).find(bd =>{
            
            return bd === keys
        })
        console.log(newCart);
        return savedCart[newCart]; 
        
    }

   
  
    const{name,key,price} = props.product;

    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    
    
    return (
        <div style={reviewItemStyle}>
            <h5 className="product-name">{name}</h5>
            <p>Quantity:{productQuantity(key)} </p>
            <p>$ {price}</p>
            <button className="cart-button" onClick={() =>props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;