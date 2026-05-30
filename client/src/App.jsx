import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showTracking, setShowTracking] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    axios
      .get("https://ecommere-app.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      {/* NAVBAR */}

      <div className="navbar">
<div className="logo">LOCAL STORE E-COMMERCE</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Cart ({cart.length})</a>
        </div>
      </div>

      {/* PRODUCTS */}

      <div className="main-layout">
        <section className="products-section">
          <div className="top-bar">
            <h2>Featured Products</h2>

            <input
              type="text"
              placeholder="Search products..."
            />
          </div>

          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="product-card"
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name}
                />

                <div className="product-details">
                  <h3 className="product-name">
                    {product.name}
                  </h3>

                  <div className="rating">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <p className="product-description">
  {product.description}
</p>

                  <p className="product-price">
                    ₹{product.price}
                  </p>

                  <div className="card-buttons">
                    <button
                      className="add-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>

                    <button
                      className="track-btn"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowTracking(true);
                      }}
                    >
                      Order Tracking
                    </button>

                    <button
                      className="review-btn"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowReviews(true);
                      }}
                    >
                      User Reviews
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ORDER TRACKING MODAL */}

      {showTracking && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Tracking</h2>

            <p>
              <strong>Product:</strong>{" "}
              {selectedProduct.name}
            </p>

            <p>
              <strong>Status:</strong> Shipped
            </p>

            <p>
              <strong>Current Location:</strong>{" "}
              Bhubaneswar Hub
            </p>

            <p>
              <strong>Expected Delivery:</strong>{" "}
              2-3 Days
            </p>

            <button
              onClick={() => setShowTracking(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* USER REVIEWS MODAL */}

      {showReviews && selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {selectedProduct.name} Reviews
            </h2>

            <p>⭐⭐⭐⭐⭐ Excellent Product</p>
            <p>⭐⭐⭐⭐ Good Quality</p>
            <p>⭐⭐⭐⭐⭐ Worth the Price</p>

            <button
              onClick={() => setShowReviews(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}

      <footer className="footer">
        © 2026 NovaMart. All rights reserved.
      </footer>
    </div>
  );
}