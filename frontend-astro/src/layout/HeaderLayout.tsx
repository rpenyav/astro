import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const HeaderLayout: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      {auth?.user && (
        <div>
          <span>Welcome, {auth.user.name}</span>
          <span>Your Zodiac Sign: {auth.user.zodiacSign}</span>
        </div>
      )}
    </header>
  );
};

export default HeaderLayout;
