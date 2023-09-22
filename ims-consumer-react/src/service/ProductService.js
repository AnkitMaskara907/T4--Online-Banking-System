import axios from "axios";

const PRODUCT_REST_API_URL="http://localhost:8085/ims/api/products";

class ProductService{
    static getProducts()
    {   
        try{
            return axios.get(PRODUCT_REST_API_URL);
        }
        catch(error){
            console.error('Login Error : ', error);
        }
    }

    static createProduct(product){
        return axios.post(PRODUCT_REST_API_URL,product);
    }

    static getProductById(productId){
        return axios.get(PRODUCT_REST_API_URL+'/'+productId);
    }

    static updateProduct(product, productId){
        return axios.put(PRODUCT_REST_API_URL+'/'+productId,product);
    }

    static deleteProduct(productId){
        return axios.delete(PRODUCT_REST_API_URL+'/'+productId);
    }

    static async searchProductByName(name){
        try{
            const response = await axios.get(`${PRODUCT_REST_API_URL}/search?pname=${name}`)
            return response.data;
        }
        catch(error)
        {
            console.error('Error searching for products: ', error)
        }
    }
}


export default ProductService