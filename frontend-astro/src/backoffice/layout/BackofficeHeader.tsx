// BackofficeHeader.tsx

import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const BackofficeHeader: React.FC = () => {
  const { logout } = useLogout();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/backoffice/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/backoffice/predictions">Manage Predictions</Link>
          </li>
          <li>
            <Link to="/backoffice/astral-charts">Manage Astral Charts</Link>
          </li>
          <li>
            <Link to="/backoffice/contents">Manage Contents</Link>
          </li>
        </ul>
      </nav>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default BackofficeHeader;
