import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {

  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {

    axios
      .get("https://ecommere-app.onrender.com/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));

  }, []);

  // ADD TO CART

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>

      {/* NAVBAR */}

      <div className="navbar">

        <div className="logo">
          NovaMart
        </div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Products</a>

          <a href="#">
            Cart ({cart.length})
          </a>
        </div>

      </div>

      {/* HERO */}

      <section className="hero">

        <div className="hero-left">

          <span className="small-text">
            LOCAL STORE ECOMMERCE
          </span>

          <h1>
            Premium Shopping <br />
            Experience
          </h1>

          <p>
            Buy modern fashion, gadgets and premium
            collections with fast delivery and beautiful UI.
          </p>

          <div className="hero-features">

            <div>✔ Order Tracking</div>

            <div>✔ User Reviews</div>

            <div>✔ Customer Support</div>

          </div>

          <button className="hero-btn">
            Shop Now
          </button>

        </div>

        <div className="hero-right">

          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt=""
          />

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt=""
          />

        </div>

      </section>

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

                    <button className="track-btn">
                      Order Tracking
                    </button>

                    <button className="review-btn">
                      User Reviews
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

      {/* FOOTER */}

      <footer className="footer">
        © 2026 NovaMart. All rights reserved.
      </footer>

    </div>
  );
}