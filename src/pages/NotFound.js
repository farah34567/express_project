import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-danger">404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
