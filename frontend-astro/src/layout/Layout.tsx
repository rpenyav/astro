import React from "react";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderLayout />
      <main>{children}</main>
      <FooterLayout />
    </div>
  );
};

export default Layout;
