import React from 'react';

const ReviewItem = (props) => {
    console.log(props); 
    const{name,quantity,key,price} = props.product;

    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    
    return (
        <div style={reviewItemStyle}>
            <h5 className="product-name">{name}</h5>
            <p>Quantity: {quantity}</p>
            <p>$ {price}</p>
            <button className="cart-button" onClick={() =>props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;