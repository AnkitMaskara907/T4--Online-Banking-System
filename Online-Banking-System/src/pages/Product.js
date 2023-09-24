import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import ProductService from '../service/ProductService'

/*
    The useNavigate() hook is introduced in the React Router v6 
    to replace the useHistory() hook.
    the React Router’s new navigation API provides a useNavigate() 
    hook which is an imperative version to perform the navigation actions 
    with better compatibility. 

    The useNavigate hook lets you navigate programmatically within your React code.
*/

function Product() {
    const history=useNavigate();
    const [products, setProducts] = useState([]);
    // state management suing useState React hook
    const fetchProducts=()=>{
        ProductService.getProducts().then((response)=>{
            setProducts(response.data);
        });
    }
    useEffect(()=>{
        fetchProducts();
    },[]);
  return (
    <>
    <div>Product</div>
    <div>
    <br/>
    {/* <div className="container">Welcome {user}</div> */}
    <h1 className="text-warning">Products List</h1>
    <br/>
        <div className = "row justify-content-center">
            
        </div>
    <br/>
    <div className="row justify-content-center" >
        <table className="table table-success w-auto">
         <thead>
            <tr className="table-danger">
                <th> Product Id</th>
                <th> Product Name</th>
                <th> Brand</th>
                <th> MadeIn</th>
                <th> Price</th>
                <th> Actions</th>
            </tr>
        </thead>
        <tbody>
                {products.map(
                        prod => 
                        <tr key={prod.id}>
                            <td> {prod.pid} </td>
                            <td> {prod.name} </td>
                            <td> {prod.brand} </td>
                            <td> {prod.madein} </td>
                            <td> {prod.price} </td>
                            <td>
                          
                            </td> 
                        </tr>
                    )
                }
        </tbody>
        </table>
    </div>
   
</div>
</>
)
}

export default Product