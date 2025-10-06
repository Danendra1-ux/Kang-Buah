// App.jsx
import { Routes, Route } from "react-router-dom"
import HomePage from "./HomePage"
import LoginPage from "./pages/login/page"
import RegisterPage from "./pages/register/page"
import CatalogPage from "./pages/catalog/page"
import AdminCatalogPage from "./pages/admin/catalog/page"
import AdminChatPage from "./pages/admin/chat/page"
import Home from "./pages/Home"

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Main Pages */}
      <Route path="/Home" element={<Home />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/admin/catalog" element={<AdminCatalogPage />} />
      <Route path="/admin/chat" element={<AdminChatPage />} />
    </Routes>
  )
}
