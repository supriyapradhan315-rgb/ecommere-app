import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await products.get(id);
        setProduct(response.data);
      } catch (err) {
        setError('Product could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div>Loading product…</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <article className="form-card wide-grid">
      <div>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', borderRadius: '1rem' }} />
      </div>
      <div>
        <h1 className="page-title">{product.name}</h1>
        <p>{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-stock">Stock: {product.stock}</p>

        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <button className="button-primary" disabled={product.stock === 0} onClick={() => addItem(product, quantity)}>
            Add to cart
          </button>
          <button className="button-secondary" onClick={() => navigate('/cart')}>View cart</button>
        </div>
      </div>
    </article>
  );
};

export default ProductDetails;
