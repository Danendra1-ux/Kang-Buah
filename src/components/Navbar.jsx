import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { decodeJwt } from "../utils/decode";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef();

  // cek token di localStorage/sessionStorage saat pertama load
  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const role =
      localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && token !== "undefined" && token !== "null") {
      try {
        const decoded = decodeJwt(token);
        if (decoded) {
          setUser({ ...decoded, role, token });
        }
      } catch (err) {
        console.error("Token invalid:", err.message);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("role");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = !!user;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">ANS</span>
        </div>

        {/* ===== MENU BERDASARKAN ROLE ===== */}
        <div className="nav-menu">
          {!isLoggedIn && (
            <>
              <Link to="/Home" className="nav-link">Beranda</Link>
              <Link to="/catalog" className="nav-link">Layanan</Link>
              <Link to="#" className="nav-link">AI</Link>
              <Link to="#" className="nav-link">Tentang Kami</Link>
            </>
          )}

          {isLoggedIn && user?.role === "admin" && (
            <>
              <Link to="/admin/catalog" className="nav-link">Katalog</Link>
              <Link to="/admin/chat" className="nav-link">Chat</Link>
              <Link to="#" className="nav-link">Pemesanan</Link>
              <Link to="#" className="nav-link">Riwayat Pemesanan</Link>
            </>
          )}

          {isLoggedIn && user?.role !== "admin" && (
            <>
              <Link to="/Home" className="nav-link">Beranda</Link>
              <Link to="/catalog" className="nav-link">Layanan</Link>
              <Link to="#" className="nav-link">AI</Link>
              <Link to="#" className="nav-link">Tentang Kami</Link>
            </>
          )}
        </div>

        {/* ===== BUTTON / DROPDOWN KANAN ===== */}
        <div className="nav-buttons">
          {isLoggedIn ? (
            <div className="profile-menu" ref={menuRef}>
              <img
                src="/profile.png"
                alt="profile"
                className="profile-icon"
                onClick={() => setShowMenu(!showMenu)}
              />
              <div className={`dropdown-menu ${showMenu ? "show" : ""}`}>
                <Link to="#" className="dropdown-item">Profile</Link>
                <Link to="#" className="dropdown-item">Riwayat Pemesanan</Link>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  Logout
                </button>
              </div>

            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
