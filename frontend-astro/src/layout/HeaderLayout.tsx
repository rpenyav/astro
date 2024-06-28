// HeaderLayout.tsx

import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { zodiacSignLiterals, ZodiacSignCode } from "../interfaces/signos.enum";

const HeaderLayout: React.FC = () => {
  const { user, logout } = useLogout();
  const language = "es"; // Puedes cambiar el idioma según tus necesidades o hacerlo dinámico

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
            <Link to="/carta-astral">Carta Astral</Link>
          </li>
          <li>
            <Link to="/compatibilidad">Compatibilidad</Link>
          </li>
          <li>
            <Link to="/contents">Contents</Link>
          </li>
          {user?.role === "admin" && (
            <li>
              <Link to="/backoffice">Backoffice</Link>
            </li>
          )}
        </ul>
      </nav>
      {user && (
        <div>
          <span>Welcome, {user.name}</span>
          <span>
            Your Zodiac Sign:{" "}
            {zodiacSignLiterals[user.zodiacSignCode as ZodiacSignCode][
              language
            ] || user.zodiacSignCode}
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default HeaderLayout;
