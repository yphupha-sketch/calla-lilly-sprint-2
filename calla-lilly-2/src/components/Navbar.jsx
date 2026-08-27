import React from "react";
import "./Navbar.css";

const Navbar = ({ cartCount = 0 }) => {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">
          Calla Lily
        </a>

        <div className="navbar__links">
          <a href="/" className="navbar__link">
            Shop
          </a>

          <a href="/collections" className="navbar__link">
            Collections
          </a>

          <a href="/about" className="navbar__link">
            About
          </a>
        </div>

        <a href="/cart" className="navbar__cart">
          <span>Cart</span>

          {cartCount > 0 && (
            <span className="navbar__cart-count">
              {cartCount}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
