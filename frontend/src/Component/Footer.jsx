import React from "react";

const Footer = () => {
  return (
    <footer style={{background: "#27374D", color: "#fff", padding: "2rem 0 0 0"}}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        {/* Company Info */}
        <div style={{flex: "1 1 250px", minWidth: "220px", marginBottom: "1.5rem"}}>
          <h2 style={{color: "#F5F5F5"}}>GharBazaar</h2>
          <p>Find your dream home with us.</p>
          <p>© {new Date().getFullYear()} GharBazaar. All rights reserved.</p>
        </div>
        {/* Quick Links */}
        <div style={{flex: "1 1 160px", minWidth: "160px", marginBottom: "1.5rem"}}>
          <h4 style={{color: "#F5F5F5"}}>Quick Links</h4>
          <ul style={{listStyle: "none", padding: 0, margin: 0}}>
            <li><a href="/buy" style={{color: "#fff", textDecoration: "none"}}>Buy</a></li>
            <li><a href="/rent" style={{color: "#fff", textDecoration: "none"}}>Rent</a></li>
            <li><a href="/sell" style={{color: "#fff", textDecoration: "none"}}>Sell</a></li>
            <li><a href="/contact" style={{color: "#fff", textDecoration: "none"}}>Contact</a></li>
          </ul>
        </div>
        {/* Contact Info */}
        <div style={{flex: "1 1 200px", minWidth: "200px", marginBottom: "1.5rem"}}>
          <h4 style={{color: "#F5F5F5"}}>Contact Us</h4>
          <p><strong>Email:</strong> vipulmth1@gmail.com</p>
          <p><strong>Phone:</strong> +91-6204252002</p>
          <p><strong>Address:</strong> 123 Chhatauni, Motihari, India</p>
        </div>
        {/* Social Links */}
        <div style={{flex: "1 1 140px", minWidth: "140px", marginBottom: "1.5rem"}}>
          <h4 style={{color: "#F5F5F5"}}>Follow Us</h4>
          <div style={{display: "flex", gap: "1rem"}}>
            <a href="https://www.linkedin.com/in/vip-coder/" style={{color: "#fff"}} aria-label="Facebook">
              <i className="fab fa-facebook-f"></i> LinkedIn
            </a>
            <a href="https://www.instagram.com/vipulzii8/" style={{color: "#fff"}} aria-label="Instagram">
              <i className="fab fa-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>
      <div style={{
        textAlign: "center",
        background: "#222e3a",
        padding: "0.75rem",
        marginTop: "1rem",
        fontSize: "0.95rem"
      }}>
        Made with ❤️ by the Vipul Kumar
      </div>
    </footer>
  );
};

export default Footer;