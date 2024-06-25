import React from "react";

const FooterLayout: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
    </footer>
  );
};

export default FooterLayout;
