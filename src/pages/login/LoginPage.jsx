import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { auth, googleProvider } from "../../services/firebase"
import { signInWithPopup } from "firebase/auth"
import AuthLayout from "../../components/features/Auth/AuthLayout";
import AuthInput from "../../components/features/Auth/AuthInput";
import PasswordInput from "../../components/features/Auth/PasswordInput";
import GoogleAuthButton from "../../components/features/Auth/GoogleAuthButton";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import "../register/RegisterPage.css"

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      })

      // Simpan token dari response backend
      localStorage.setItem("token", res.data.data.accessToken)
      const decodeToken = jwtDecode(res.data.data.accessToken)
      localStorage.setItem("role", decodeToken.role)
      toast.success('Login berhasil! Mengalihkan...');


      if (decodeToken.role == "ADMIN") {
        setTimeout(() => {
          navigate("/admin/catalog");
        }, 1500);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || "Email atau password salah");
      } else {
        toast.error("Terjadi kesalahan pada server. Coba lagi nanti.");
      }
    }
  }

  // ===== LOGIN GOOGLE =====
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()

      const res = await axios.post("http://localhost:3000/auth/google/login", { token })

      const accessToken = res.data?.data?.accessToken;
      if (!accessToken) {
        throw new Error("Token tidak diterima dari server.");
      }

      localStorage.setItem("token", res.data.data.accessToken)
      const decodeToken = jwtDecode(res.data.data.accessToken)
      localStorage.setItem("role", decodeToken.role)
      toast.success('Login berhasil! Mengalihkan...');

      if (decodeToken.role == "ADMIN") {
        setTimeout(() => {
          navigate("/admin/catalog");
        }, 1500);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      console.error("Detail Error Google Login:", err);

      if (err.code === 'auth/popup-closed-by-user') {
        toast.info("Proses login dengan Google dibatalkan.");
      } else if (err.response) {
        toast.error(err.response.data.message || "Gagal login dengan Google.");
      } else {
        toast.error("Gagal login dengan Google. Coba lagi nanti.");
      }
    }
  }

  return (
    // 3. Bungkus semuanya dengan AuthLayout
    <AuthLayout>
      <div className="auth-header">
        <h1>Selamat Datang</h1>
        <p>Masuk ke akun anda</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">

        {/* 4. Ganti input biasa dengan komponen AuthInput dan PasswordInput */}
        <AuthInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="supplier.buah@gmail.com"
          required
        />
        <PasswordInput
          label="Kata Sandi"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Minimal 6 karakter"
          required
        />

        <div className="form-options">
          <label className="checkbox-container">
            <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} />
            <span className="checkmark"></span>
            Ingat saya
          </label>
          <Link to="/forgot-password" className="forgot-password">
            Lupa kata sandi?
          </Link>
        </div>

        <button type="submit" className="auth-submit-btn">
          Masuk
        </button>

        <div className="auth-divider">
          <span>atau</span>
        </div>

        {/* 5. Ganti tombol Google dengan komponen GoogleAuthButton */}
        <GoogleAuthButton onClick={handleGoogleLogin}>
          Masuk dengan Google
        </GoogleAuthButton>

        <div className="auth-footer">
          <span>Belum punya akun? </span>
          <Link to="/register" className="auth-link">
            Buat akun
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
