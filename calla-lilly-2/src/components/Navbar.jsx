import React from "react";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext"

const Navbar = ({ cartCount = 0 }) => {
  const { user, logout } = useAuth();

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

        <div className="navbar__account">
          {user ? (
            <>
              <a href="/account">Hi, {user.name}</a>

              <button
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/signup">Sign Up</a>
            </>
          )}
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
