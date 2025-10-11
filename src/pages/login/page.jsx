"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, googleProvider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { decodeJwt } from "../../utils/decode";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ===== LOGIN EMAIL & PASSWORD =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data?.data?.accessToken;
      if (!token) throw new Error("Token tidak ditemukan di respons");

      const decoded = decodeJwt(token);
      console.log("Decoded token:", decoded);

      const role = decoded?.role;

      const storage = formData.rememberMe ? localStorage : sessionStorage;
      storage.setItem("accessToken", token);
      storage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin/catalog");
      } else {
        navigate("/catalog");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  // ===== LOGIN GOOGLE =====
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const res = await axios.post("http://localhost:3000/auth/google/login", {
        token,
      });

      const accessToken = res.data?.data?.accessToken;
      if (!accessToken) throw new Error("Access token tidak ditemukan di respons");

      const decoded = decodeJwt(accessToken);
      const role = decoded?.role ;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin/catalog");
      } else {
        navigate("/catalog");
      }
    } catch (err) {
      console.error("Google Login error:", err);
      alert(err.response?.data?.message || "Gagal login dengan Google, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="organic-shape shape-1"></div>
        <div className="organic-shape shape-2"></div>
        <div className="organic-shape shape-3"></div>
        <div className="organic-shape shape-4"></div>
      </div>

      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1>Selamat Datang</h1>
            <p>Masuk ke akun anda</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="supplier.buah@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Ingat saya
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Loading..." : "Masuk"}
            </button>

            <div className="auth-divider">
              <span>atau</span>
            </div>

            <button
              type="button"
              className="google-auth-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Masuk dengan Google
            </button>

            <div className="auth-footer">
              <span>Belum punya akun? </span>
              <Link to="/register" className="auth-link">
                Buat akun
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
