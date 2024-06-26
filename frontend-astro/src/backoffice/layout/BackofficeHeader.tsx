import React from "react";
import { Link } from "react-router-dom";

const BackofficeHeader: React.FC = () => {
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
    </header>
  );
};

export default BackofficeHeader;
