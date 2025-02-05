import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Contacts Manager</h1>
      <p>Manage your contacts easily with our app.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-success mx-2">Register</Link>
      </div>
    </div>
  );
};

export default Home;
