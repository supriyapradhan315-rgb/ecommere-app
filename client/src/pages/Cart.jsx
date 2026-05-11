import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, updateItem, removeItem, total } = useCart();
  const navigate = useNavigate();

  return (
    <section>
      <h1 className="page-title">Shopping cart</h1>
      {items.length === 0 ? (
        <div className="form-card">
          <p>Your cart is empty.</p>
          <Link to="/" className="button-primary">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid wide-grid">
          <div className="form-card">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <img src={item.imageUrl} alt={item.name} />
                      <div>{item.name}</div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, Math.max(1, Number(e.target.value)))}
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="button-secondary" onClick={() => removeItem(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="summary-card">
            <h2>Order summary</h2>
            <p>Total items: {items.length}</p>
            <p className="product-price">Total: ${total.toFixed(2)}</p>
            <button className="button-primary" onClick={() => navigate('/checkout')}>
              Proceed to checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
