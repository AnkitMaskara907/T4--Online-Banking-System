import axios from "axios"


class UserService{
  static getUserByEmail(email){
    try{
        return axios.get('http://localhost:8085/obs/api/users/email' + '/'+ email);
    }
    catch(error){
        console.error('Login error: ', error);
    }
  }
  // static getUserById(id){
  //   try{
  //       return axios.get('http://localhost:8085/obs/api/users' + '/' + id);
  //   }
  //   catch(error){
  //       console.error('Login error: ', error);
  //   }
  // }
}

export default UserService