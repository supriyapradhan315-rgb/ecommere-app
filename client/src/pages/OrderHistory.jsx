import { useEffect, useState } from 'react';
import { orders } from '../services/api';

const OrderHistory = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const response = await orders.myOrders();
        setOrderItems(response.data);
      } catch (err) {
        setError('Could not load order history.');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  return (
    <section>
      <h1 className="page-title">My orders</h1>
      {loading ? (
        <div>Loading orders…</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orderItems.length === 0 ? (
        <div className="form-card">No orders found.</div>
      ) : (
        <div className="grid">
          {orderItems.map((order) => (
            <div key={order._id} className="order-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <h2>Order #{order._id.slice(-6)}</h2>
                  <p>Status: <span className={`status-badge status-${order.status}`}>{order.status}</span></p>
                </div>
                <div>
                  <strong>Total: </strong>${order.totalPrice.toFixed(2)}
                </div>
              </div>
              <hr />
              <div>
                {order.products.map((item) => (
                  <div key={item.product._id} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                    <img src={item.product.imageUrl} alt={item.product.name} />
                    <div>
                      <p>{item.product.name}</p>
                      <p>{item.quantity} x ${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
