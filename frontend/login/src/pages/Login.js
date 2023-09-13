import Header from "../components/Header";
import Login from "../components/Login"

export default function LoginPage(){
    return(
        <>
        <Header
            heading="Login to your account"
            paragraph="Don't have an account? "
            linkName="Sign up"
            linkUrl="/signup"
        />
        <Login/>
    </>
    )
}