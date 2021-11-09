import React from 'react';



const Invertory = () => {
  document.title ="Ema John/Inventory";
    const handleAddProduct =()=>{
        const product = {}
        fetch('http://localhost:6700/addProduct',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
}

    return (
        <div>
          <form>
          <p><span>Name:</span><input type="text" /></p>
          <p><span>Price:</span><input type="text" /></p>
          <p><span>Quantity:</span><input type="text" /></p>
          <p><span>Product Image</span><input type="file" /></p>
          <button onClick={handleAddProduct}>add product</button>
          </form>
        </div>
    );
};

export default Invertory;