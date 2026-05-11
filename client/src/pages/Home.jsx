import { useEffect, useState } from 'react';
import { products } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  const loadProducts = async (query = '') => {
    setLoading(true);
    try {
      const response = await products.list(query);
      setCatalog(response.data);
    } catch (err) {
      setError('Could not load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    loadProducts(search);
  };

  return (
    <section>
      <header className="page-actions">
        <div>
          <h1 className="page-title">Shop the catalog</h1>
          <p>Browse products, add items to your cart, and place orders securely.</p>
        </div>
        <form onSubmit={handleSearch} className="form-card" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
          />
          <button className="button-primary" type="submit">Search</button>
        </form>
      </header>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading products…</div>
      ) : (
        <div className="grid grid-3">
          {catalog.map((product) => (
            <ProductCard key={product._id} product={product} onAdd={addItem} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
