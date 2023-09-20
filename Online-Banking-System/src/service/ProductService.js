import axios from "axios";

const PRODUCTS_REST_API_URL='http://localhost:8085/ims/api/products';

class ProductService{

    static getProducts(){
        try{
            return axios.get(PRODUCTS_REST_API_URL);
        }
        catch(error){
            console.error("Login Error", error);
        }
        
    }
}
export default ProductService;

