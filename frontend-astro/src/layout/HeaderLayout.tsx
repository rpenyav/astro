import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { zodiacSignLiterals, ZodiacSignCode } from "../interfaces/signos.enum";

const HeaderLayout: React.FC = () => {
  const auth = useContext(AuthContext);
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
          {auth?.user?.role === "admin" && (
            <li>
              <Link to="/backoffice">Backoffice</Link>
            </li>
          )}
        </ul>
      </nav>
      {auth?.user && (
        <div>
          <span>Welcome, {auth.user.name}</span>
          <span>
            Your Zodiac Sign:{" "}
            {zodiacSignLiterals[auth.user.zodiacSignCode as ZodiacSignCode][
              language
            ] || auth.user.zodiacSignCode}
          </span>
        </div>
      )}
    </header>
  );
};

export default HeaderLayout;
