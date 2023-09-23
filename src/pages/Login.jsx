// import Template from "../components/Auth/Template";
import loginImg from "../assets/login.png"

import { Template } from "../Componant/Template-LoginSignup";

function Login({ SetIsLoggedin }) {

  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formtype="login"
      SetIsLoggedin={SetIsLoggedin}
    />
      );
}

export default Login;
