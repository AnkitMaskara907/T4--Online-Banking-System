import axios from "axios"

const USER_REST_API_URL = "http://localhost:8085/obs/api/accountDetails";

class UserService {
  static getUsers() {
    try {
      return axios.get(USER_REST_API_URL);
    } catch (error) {
      console.error("Error : ", error);
    }
  }
  static createAccount(user){
    try{
    return axios.post(USER_REST_API_URL,user);
    }catch(error){
      console.error("Error:", error);
    }
  }

  static getUserByEmail(email) {
    try {
      return axios.get(
        "http://localhost:8085/obs/api/users/email" + "/" + email);
    } catch (error) {
      console.error("Login error: ", error);
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

  static getUserById(userId) {
    return axios.get(USER_REST_API_URL + "/" + userId);
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