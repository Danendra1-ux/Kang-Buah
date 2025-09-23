"use client"

import { useState } from "react"
import "./Catalog.css"

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  const products = {
    vegetables: [
      { id: 1, name: "Cabe Merah Keriting", image: "public/red-chili-peppers.jpg" },
      { id: 2, name: "Cabe Merah Besar", image: "public/large-red-chili-peppers.jpg" },
      { id: 3, name: "Cabe Rawit Merah", image: "public/small-red-chili-peppers.jpg" },
      { id: 4, name: "Paprika Merah/Kuning", image: "public/red-and-yellow-bell-peppers.jpg" },
      { id: 5, name: "Kentang", image: "public/fresh-potatoes.png" },
      { id: 6, name: "Wortel Berastagi", image: "public/fresh-carrots.png" },
      { id: 7, name: "Kol Putih", image: "public/white-cabbage.jpg" },
      { id: 8, name: "Brokoli Impor", image: "public/fresh-broccoli.png" },
      { id: 9, name: "Kembang Kol Impor", image: "public/fresh-cauliflower.jpg" },
      { id: 10, name: "Jamur Champignon/Jamur Kancing", image: "public/white-button-mushrooms.png" },
    ],
    fruits: [
      { id: 11, name: "Semangka Non Biji", image: "public/seedless-watermelon.jpg" },
      { id: 12, name: "Melon Sky Rocket", image: "public/cantaloupe-melon.png" },
      { id: 13, name: "Melon Rock", image: "public/rock-melon-cantaloupe.jpg" },
      { id: 14, name: "Pepaya Kalifornia", image: "public/california-papaya-fruit.jpg" },
      { id: 15, name: "Nanas Sunpride", image: "public/fresh-pineapple.jpg" },
      { id: 16, name: "Pisang Sunpride", image: "public/fresh-bananas.jpg" },
      { id: 17, name: "Jeruk Medan", image: "public/medan-oranges.jpg" },
      { id: 18, name: "Mangga Harumanis", image: "public/harumanis-mango.jpg" },
      { id: 19, name: "Salak Pondoh", image: "public/salak-snake-fruit.jpg" },
      { id: 20, name: "Buah Naga", image: "public/vibrant-dragon-fruit.png" },
    ],
    special: [
      { id: 21, name: "Beras", image: "public/white-rice-grains.jpg" },
      { id: 22, name: "Minyak", image: "public/cooking-oil-bottle.png" },
      { id: 23, name: "Ayam Boiler", image: "public/fresh-chicken.png" },
      { id: 24, name: "Telur Ayam Negeri", image: "public/fresh-chicken-eggs.jpg" },
    ],
  }

  const categories = [
    { id: "all", name: "Semua Produk", icon: "🌟" },
    { id: "vegetables", name: "Sayur Segar", icon: "🥬" },
    { id: "fruits", name: "Buah Segar", icon: "🍎" },
    { id: "special", name: "Permintaan Khusus", icon: "⭐" },
  ]

  const getFilteredProducts = () => {
    if (activeCategory === "all") {
      return [...products.vegetables, ...products.fruits, ...products.special]
    }
    return products[activeCategory] || []
  }

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case "vegetables":
        return "Sayur Segar Lokal dan Impor"
      case "fruits":
        return "Buah Segar Lokal dan Impor"
      case "special":
        return "Permintaan Khusus"
      default:
        return "Semua Produk Kami"
    }
  }

  return (
    <section className="catalog-section">
      <div className="catalog-background">
        <div className="organic-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="container">
        <div className="catalog-header">
          <h2 className="catalog-title">PRODUK DAN LAYANAN</h2>
          <p className="catalog-subtitle">Produk segar berkualitas untuk kebutuhan Anda</p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-text">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="category-title-container">
          <h3 className="category-title">{getCategoryTitle()}</h3>
        </div>

        <div className="products-grid">
          {getFilteredProducts().map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="product-btn">Lihat Detail</button>
                </div>
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="catalog-footer">
          <p className="catalog-note">*Keadaan produk dapat sedikit berbeda dengan gambar saat diterima</p>
          <p className="catalog-note">*Kondisi dapat bervariasi sesuai dengan musim dan kondisi alam</p>
        </div>
      </div>
    </section>
  )
}

export default Catalog
