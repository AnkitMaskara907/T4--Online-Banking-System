import "./Login.css";


function Login() {
   
    return (
    <div class="bgpicture"  style={{
        minHeight:"100vh", backgroundImage: "url(https://img.freepik.com/premium-photo/online-banking-digital-money-technology-conceptual_31965-22271.jpg?w=1060)",
        backgroundSize: "250vh"        
      }}>
       <div class = "parent">
            <div class="heading">
                <h2>Login</h2>
                <hr/>
            </div>
 
        <form>
        <div class="email">
            <h4>Email</h4>
            <input type="email"  class="user-box" id="email" placeholder="example@xyz.com"/>
        </div>
        <br></br>
        <div class="password">
            <h4>Password</h4>
            <input type="password"  class="user-box" id="password" placeholder="Enter Password"/>
        </div>
        <div class="btn">
            <button type="submit" class="btn-grp">Login</button>
        </div>
        </form>
        </div>
    </div>
    );
  }
  
  export default Login;