import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
 
// import "../styles/Home.css";
import "../module/Home.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import EmployeeManagementApp from "../Components/EmployeeManagementApp";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <div className="header">
      <img src="./DealsDry.png" alt="Logo" className="logo" />
      <div className="user-info">
        <h1>{loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ToastContainer />

     
    </div>
<div>
<EmployeeManagementApp/>
</div>
    </>
  );
}

export default Home;
