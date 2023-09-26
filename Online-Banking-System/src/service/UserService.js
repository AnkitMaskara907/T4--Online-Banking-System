import axios from "axios"
const USER_REST_API_URL = "http://localhost:8085/obs/api/accountDetails";

class UserService{
  static getUsers() {
    try {
      return axios.get(USER_REST_API_URL);
    } catch (error) {
      console.error("Login Error : ", error);
    }
  }
  static getUserByEmail(email){
    try{
        return axios.get('http://localhost:8085/obs/api/users/email' + '/'+ email);
    }
    catch(error){
        console.error('Login error: ', error);
    }
  }
  static getUserById1(id){
    try{
        return axios.get('http://localhost:8085/obs/api/users' + '/' + id);
    }
    catch(error){
        console.error('Login error: ', error);
    }
  }
  static updateUser(user, userId) {
    return axios.put(USER_REST_API_URL + "/" + user, userId);
  }

  // static getUserById(id){
  //   try{
  //       return axios.get('http://localhost:8085/obs/api/users' + '/' + id);
  //   }
  //   catch(error){
  //       console.error('Login error: ', error);
  //   }
  // }
  static getAccountById(userId) {
    try{
      return axios.get(USER_REST_API_URL + "/ID/" + userId);
    }
    catch(error){
      console.log("Error getting account details using userId:",error);
    }
  }
  static getAccountByEmail(email){
    try{
        return axios.get('http://localhost:8085/obs/api/AccountDetails/'+email);
    }
    catch(error){
      console.error('Error Getting Account by email:', error);
    }
  }
  static deleteUser(userId) {
    return axios.delete(USER_REST_API_URL + "/" + userId);
  }
  static async searchUserByName(name) {
    try {
      const response = await axios.get(
        `${USER_REST_API_URL}/search?name=${name}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching for user: ", error);
    }
  }
}

export default UserService