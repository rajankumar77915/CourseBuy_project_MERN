import { Route,Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NavBar from "./Componant/NavBar";
import { useState } from "react";


function App() {
  const [isLoggedin,SetIsLoggedin]=useState(false);
  return <div className="bg-richblack-900  min-h-screen w-screen font-inter">
    <NavBar  isLoggedin={isLoggedin} SetIsLoggedin={SetIsLoggedin}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup SetIsLoggedin={SetIsLoggedin}/>}/>
      <Route path="/login" element={<Login SetIsLoggedin={SetIsLoggedin}/>}/>
      <Route path="/dashBord" element={<Dashboard/>}/>
    </Routes>
  </div>;
}

export default App;
