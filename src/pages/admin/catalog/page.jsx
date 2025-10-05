"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin-catalog.css";

const defaultProducts = [
  {
    id: 1,
    name: "Wortel 1kg",
    category: "vegetables",
    price: 15000,
    unit: "1kg",
    image: "/fresh-carrots.png",
  },
  {
    id: 2,
    name: "Semangka Non Biji",
    category: "fruits",
    price: 25000,
    unit: "1 buah",
    image: "/seedless-watermelon.jpg",
  },
  {
    id: 3,
    name: "Beras Premium 5kg",
    category: "special",
    price: 85000,
    unit: "5kg",
    image: "/white-rice-grains.jpg",
  },
];

export default function AdminCatalogPage() {
  const router = useNavigate();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "fruits",
    price: "",
    unit: "",
    image: "",
  });

  // Guard route for admin only
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const role = localStorage.getItem("role");
    if (!loggedIn) router("/login", { replace: true });
    else if (role !== "admin") router("/catalog", { replace: true });
  }, [router]);

  // Load products from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("adminProducts");
    if (raw) {
      try {
        setProducts(JSON.parse(raw));
      } catch {
        setProducts(defaultProducts);
      }
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  const saveProducts = (next) => {
    setProducts(next);
    localStorage.setItem("adminProducts", JSON.stringify(next));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", category: "fruits", price: "", unit: "", image: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, category, price, unit, image } = form;
    if (!name.trim()) return;
    if (editingId) {
      const next = products.map((p) =>
        p.id === editingId
          ? { ...p, name, category, price: Number(price), unit, image }
          : p
      );
      saveProducts(next);
    } else {
      const next = [
        ...products,
        {
          id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
          name,
          category,
          price: Number(price),
          unit,
          image,
        },
      ];
      saveProducts(next);
    }
    resetForm();
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      unit: p.unit,
      image: p.image || "",
    });
  };

  const onDelete = (id) => {
    if (!confirm("Hapus produk ini?")) return;
    const next = products.filter((p) => p.id !== id);
    saveProducts(next);
    if (editingId === id) resetForm();
  };

  const filtered = useMemo(() => {
    return products
      .filter((p) => (filter === "all" ? true : p.category === filter))
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, query, filter]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    router("/login", { replace: true });
  };

  return (
    <div className="admin-cat-page">
      <header className="admin-cat-header">
        <div className="maxw">
          <div className="hdr-row">
            <Link to="/" className="logo-ans">
              ANS
            </Link>
            <nav className="admin-nav">
              <Link to="/admin/catalog" className="nav-item active">
                Katalog Admin
              </Link>
              <Link to="/admin/chat" className="nav-item">
                Chat Admin
              </Link>
            </nav>
            <div className="right">
              <button className="logout" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="admin-cat-main">
        <div className="maxw">
          <div className="toolbar">
            <input
              className="search"
              placeholder="Cari produk..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              <option value="fruits">Buah-buahan</option>
              <option value="vegetables">Sayuran</option>
              <option value="special">Permintaan Khusus</option>
            </select>
          </div>

          <div className="grid">
            <section className="form-card">
              <h3>{editingId ? "Ubah Produk" : "Tambah Produk"}</h3>
              <form onSubmit={onSubmit} className="form">
                <label>
                  Nama
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                </label>
                <label>
                  Kategori
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    <option value="fruits">Buah-buahan</option>
                    <option value="vegetables">Sayuran</option>
                    <option value="special">Permintaan Khusus</option>
                  </select>
                </label>
                <label>
                  Harga
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    required
                  />
                </label>
                <label>
                  Satuan
                  <input
                    value={form.unit}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, unit: e.target.value }))
                    }
                    required
                  />
                </label>
                <label>
                  URL Gambar
                  <input
                    value={form.image}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, image: e.target.value }))
                    }
                    placeholder="/fresh-carrots.png"
                  />
                </label>
                <div className="actions">
                  <button type="submit" className="save">
                    {editingId ? "Simpan Perubahan" : "Tambah"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="cancel"
                      onClick={resetForm}
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="table-card">
              <h3>Daftar Produk</h3>
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Gambar</th>
                      <th>Nama</th>
                      <th>Kategori</th>
                      <th>Harga</th>
                      <th>Satuan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.image ? (
                            <img
                              src={p.image || "/placeholder.svg"}
                              alt={p.name}
                              className="thumb"
                            />
                          ) : (
                            <span className="noimg">—</span>
                          )}
                        </td>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{formatPrice(p.price)}</td>
                        <td>{p.unit}</td>
                        <td className="actions-td">
                          <button className="edit" onClick={() => onEdit(p)}>
                            Ubah
                          </button>
                          <button
                            className="del"
                            onClick={() => onDelete(p.id)}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="empty">
                          Tidak ada produk
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
