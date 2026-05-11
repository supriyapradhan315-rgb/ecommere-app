import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://ecommere-app.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">
          NovaMart
        </h1>

        <div className="flex gap-8 text-lg">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>

          <a href="#products" className="hover:text-gray-300">
            Products
          </a>

          <a href="#" className="hover:text-gray-300">
            Cart
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white text-center py-24 px-6">
        <h2 className="text-6xl font-extrabold mb-6 leading-tight">
          Discover Premium Fashion & Tech
        </h2>

        <p className="text-gray-300 text-xl max-w-2xl mx-auto">
          Explore trending products, modern styles, and exclusive
          collections designed for your lifestyle.
        </p>

        <button className="mt-10 bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transition duration-300 shadow-xl">
          Shop Now
        </button>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Featured Products
          </h2>

          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-xl px-4 py-2 w-64 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {loading ? (
          <div className="text-center text-2xl font-semibold py-20">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div
                key={product._id || product.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                <img
                  src={
                    product.image ||
                    "https://via.placeholder.com/400x300?text=Product"
                  }
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="text-3xl font-bold text-black mt-3">
                    ₹{product.price}
                  </p>

                  <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8 mt-12">
        <p className="text-lg">
          © 2026 NovaMart. All rights reserved.
        </p>
      </footer>
    </div>
  );
}