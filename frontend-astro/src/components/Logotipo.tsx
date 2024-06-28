import React from "react";
import logo from "../assets/logo/logotipo-astro.png";

interface LogotipoProps {
  size: "mini" | "small" | "middle" | "big";
}

const sizeMap = {
  mini: "30px",
  small: "50px",
  middle: "100px",
  big: "150px",
};

const Logotipo: React.FC<LogotipoProps> = ({ size }) => {
  const logoSize = sizeMap[size];

  return (
    <img
      src={logo}
      alt="Logotipo"
      style={{ width: logoSize, height: logoSize }}
    />
  );
};

export default Logotipo;
