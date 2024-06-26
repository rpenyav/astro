import React from "react";
import BackofficeHeader from "./BackofficeHeader";

interface BackofficeLayoutProps {
  children: React.ReactNode;
}

const BackofficeLayout: React.FC<BackofficeLayoutProps> = ({ children }) => {
  return (
    <div>
      <BackofficeHeader />
      <main>{children}</main>
    </div>
  );
};

export default BackofficeLayout;
