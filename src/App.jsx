// App.jsx
import { Routes, Route } from "react-router-dom"
import HomePage from "/src/HomePage"
import LoginPage from "/app/login/page"
import RegisterPage from "/app/register/page"
import CatalogPage from "/app/catalog/page"
import AdminCatalogPage from "/app/admin/catalog/page"
import AdminChatPage from "/app/admin/chat/page"

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/HomePage" element={<HomePage />} />

      {/* Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/admin/catalog" element={<AdminCatalogPage />} />
      <Route path="/admin/chat" element={<AdminChatPage />} />
    </Routes>
  )
}
