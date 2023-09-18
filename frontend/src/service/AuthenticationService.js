import axios from "axios"

// Service class interacts with rest api in Spring Boot
/*
  Axios, which is a popular library is mainly used to send asynchronous 
  HTTP requests(GET,POST,PUT,DELETE) to REST endpoints. 
This library is very useful to perform CRUD operations.
This popular library is used to communicate with the backend. 
Axios supports the Promise API, native to JS ES6.
Using Axios we make API requests in our application. 
Once the request is made we get the data in Return, and then we use this data in our React APPL. 

> npm install axios

*/
class AuthenticationService{

    static async login(dealer){
        try{
            const response=await axios.post('http://localhost:8085/ims/api/loginDealer',dealer);
            if(response.data=== true){
                return true;
            }
            return false;
        }
        catch(error){
            console.error('Login Error :', error);
        }
    }
    static async registerDealer(dealer){
        try{
            const response=await axios.post('http://localhost:8085/ims/api/register',dealer);
            return response.data;
        }
        catch(error){
            console.error('Login Error :', error);
        }
    }
}
export default AuthenticationService;