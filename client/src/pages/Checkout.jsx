import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orders } from '../services/api';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const orderPayload = {
        products: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
      };
      await orders.create(orderPayload);
      clearCart();
      setMessage('Order placed successfully.');
      setTimeout(() => navigate('/orders'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not place the order.');
    } finally {
      setLoading(false);
    }
  };

  if (!items.length) {
    return (
      <section>
        <h1 className="page-title">Checkout</h1>
        <div className="form-card">
          <p>Your cart is empty.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Checkout</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="grid wide-grid">
        <div className="form-card">
          <h2>Shipping details</h2>
          <p>Use your account information during checkout. Admins cannot checkout here.</p>
          <p>Cart items: {items.length}</p>
          <p>Total price: ${total.toFixed(2)}</p>
        </div>
        <aside className="summary-card">
          <h2>Review order</h2>
          <button className="button-primary" onClick={handleCheckout} disabled={loading}>
            {loading ? 'Placing order…' : 'Place order'}
          </button>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;
