import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo & Deskripsi */}
          <div className="footer-section">
            <div className="footer-logo">
                <span className="logo-text">ANS</span>
            </div>
            <p className="footer-description">
              Menjaga Kualitas Buah Segar Berkualitas untuk Kebutuhan Pelanggan
              Setiap Hari
            </p>
          </div>

          {/* Produk */}
          <div className="footer-section">
            <h4>Produk</h4>
            <ul>
              <li><a href="#">Buah Segar Lokal</a></li>
              <li><a href="#">Sayuran</a></li>
              <li><a href="#">Layanan Konsultasi</a></li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="footer-section">
            <h4>Perusahaan</h4>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Karir</a></li>
              <li><a href="#">Kontak</a></li>
            </ul>
          </div>

          {/* Dukungan */}
          <div className="footer-section">
            <h4>Dukungan</h4>
            <ul>
              <li><a href="#">Pusat Bantuan</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bawah */}
        <div className="footer-bottom">
          <p>&copy; 2025 Kang Buah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
