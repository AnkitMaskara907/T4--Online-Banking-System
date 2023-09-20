import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import ProductService from '../service/ProductService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*
    The useNavigate() hook is introduced in the React Router v6 
    to replace the useHistory() hook.
    the React Router’s new navigation API provides a useNavigate() 
    hook which is an imperative version to perform the navigation actions 
    with better compatibility. 

    The useNavigate hook lets you navigate programmatically within your React code.
*/

const Product = () => {
    const history = useNavigate();

    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    //react hook to manage lifecycle of a component
    useEffect(() => {
        fetchProducts();  //invokes fetch products method when component is rendered
    }, []);

    const fetchProducts = () => {
        ProductService.getProducts().then((response) => {
            setProducts(response.data);
        })
    } 

    const addProduct = () => {
        history('/addProduct/_add');   //Navigate to CreateProduct component and pass '_add' as parameter
    }

    const editProduct = (id) => {
        history(`/addProduct/${id}`);  //use back quote operator to evaluate the jsx expression
    }

    const viewProduct = (id) => {
        history(`/viewProduct/${id}`);  //use back quote operator to evaluate the jsx expression
    }

    const deleteProduct = (id) => {
        ProductService.deleteProduct(id).then(() => {
           // setProducts(products.filter(product => product.id !== id));
           fetchProducts(); // Refresh products list
            setMessage('Product deleted successfully.'); 
             // Clear the message after 2 seconds
             setTimeout(() => {
                setMessage('');
            }, 2000);
        });
    };

  return (
    <div>
    <br/>
    <div className="container"></div>
    <h1 className="text-warning">Products List</h1>
    <br/>
        <div className = "row justify-content-center">
            <button className="btn-btn-info w-auto" onClick={addProduct}>Add Product</button>
        </div>
    <br/>
    <div className="row justify-content-center" >
        <table className="table table-success w-50">
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
                                   <button className='btn btn-success' onClick = {() => editProduct(prod.pid)}>
                                        <span>
                                            <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
                                        </span>
                                   </button> 
                                   &nbsp;
                                   <button className='btn btn-danger' onClick = {() => deleteProduct(prod.pid)}>
                                        <span>
                                            <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
                                        </span>
                                   </button>
                                   &nbsp;
                                   <button className='btn btn-primary' onClick = {() => viewProduct(prod.pid)}>
                                        <span>
                                            <FontAwesomeIcon icon="list"></FontAwesomeIcon>
                                        </span>
                                   </button>
                            </td> 
                        </tr>
                    )
                }
        </tbody>
        </table>
    </div>
    {message && <div className="alert alert-success">{message}</div>}
</div>
)

}

export default Product