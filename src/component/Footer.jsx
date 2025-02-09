import React from "react";
import "./Footer.css"; // Import CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <p>
        Made with ❤️ by Pawan - &copy; {new Date().getFullYear()} All Rights
        Reserved
      </p>
    </footer>
  );
}

export default Footer;
