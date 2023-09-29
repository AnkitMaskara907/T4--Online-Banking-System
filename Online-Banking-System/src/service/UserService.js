import axios from "axios"
// import { type } from "os";
const USER_REST_API_URL = "http://localhost:8085/obs/api/accountDetails";

class UserService{
  static getUsers() {
    try {
      return axios.get(USER_REST_API_URL);
    } catch (error) {
      console.error("Login Error : ", error);
    }
  }
  static createAccount(user){
    try{
    return axios.post(USER_REST_API_URL,user);
    }catch(error){
      console.error("Error:", error);
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
  static changePassword(userId, oldPassword, newPassword){
    const requestData = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    
    axios.post('http://localhost:8085/obs/api/users/'+userId+'/changePassword', requestData)
      .then(response => {
        console.log('Password change response:', response.data);
      })
      .catch(error => {
        console.error('Error changing password:', error);
      });
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