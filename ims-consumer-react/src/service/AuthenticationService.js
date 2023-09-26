import axios from 'axios'

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

//Service Class interacts with REST API - Spring Boot

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenicatedUser";
class AuthenticationService{

    //service method for performing a login
    static async login(dealer){
        try{
            const response = await axios.post('http://localhost:8085/ims/api/loginDealer', dealer);
            if(response.data === true){return true;}
            else{return false;}
        }
        catch(error){
            console.error('Login Error : ', error);
        }
    }

    static async registerDealer(dealer){
        try{
            const response = await axios.post('http://localhost:8085/ims/api/loginDealer', dealer);
            return response.data;
        }
        catch(error){
            console.error('Registration Error : ', error);
        }
    }
    //Service method to fetch REST API of dealers list
    static async getDealerInfo(){
            return axios.get('http://localhost:8085/ims/api/dealers').then((response) => response.data).catch((error)=>{
            console.log('Error fetching dealer info :', error);
        });
    }

    //Session Storage is used to store data in browser memory in key/value pairs
    static registerSuccessfullLogin(userName){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName);
        console.log(userName);
    }

    static isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null) return false;
            return true;
    }

    static getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user === null) return '';
            return user;
    }

    static logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

}
export default AuthenticationService