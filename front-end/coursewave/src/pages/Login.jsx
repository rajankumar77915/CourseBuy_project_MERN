// import Template from "../components/Auth/Template";
import loginImg from "../assets/login.png"

import { Template } from "../Componant/Auth/Template-LoginSignup";

function Login() {

  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formtype="login"
      
    />
      );
}

export default Login;
