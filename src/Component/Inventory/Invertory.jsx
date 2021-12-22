import React from 'react';
import fakeData from '../../fakeData'
import { Button } from 'react-bootstrap';


const Invertory = () => {
    document.title = "Ema John/Inventory";
    const handleAddProduct = () => {
        // const product = {}
        fetch('http://localhost:6700/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
    }

    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text" /></p>
                <p><span>Price:</span><input type="text" /></p>
                <p><span>Quantity:</span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>
         
                <div class="d-flex justify-content-center">
                    <Button variant="success" onClick={handleAddProduct}>Add Product</Button>
                </div>
            </form>
        </div>
    );
};

export default Invertory;