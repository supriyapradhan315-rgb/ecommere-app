import { useEffect, useState } from 'react';
import { products, orders } from '../services/api';

const AdminDashboard = () => {
  const [catalog, setCatalog] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '', stock: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [productsResponse, ordersResponse] = await Promise.all([products.list(), orders.list()]);
      setCatalog(productsResponse.data);
      setOrderList(ordersResponse.data);
    } catch (err) {
      setError('Could not load admin data.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddProduct = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await products.create({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        imageUrl: form.imageUrl,
        stock: parseInt(form.stock, 10),
      });
      setMessage('Product created successfully.');
      setForm({ name: '', description: '', price: '', imageUrl: '', stock: '' });
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not create product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await products.remove(id);
      setMessage('Product deleted successfully.');
      loadData();
    } catch (err) {
      setError('Could not delete product.');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await orders.updateStatus(orderId, status);
      setMessage('Order status updated.');
      loadData();
    } catch (err) {
      setError('Could not update order status.');
    }
  };

  return (
    <section>
      <h1 className="page-title">Admin dashboard</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="grid wide-grid">
        <div className="admin-card">
          <h2>Create new product</h2>
          <form className="form-card" onSubmit={handleAddProduct}>
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows="3" />
            <label>Price</label>
            <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <label>Image URL</label>
            <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} required />
            <label>Stock</label>
            <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <button className="button-primary" type="submit">Create product</button>
          </form>
        </div>

        <div className="admin-card">
          <h2>Products</h2>
          {catalog.length === 0 ? (
            <p>No products created yet.</p>
          ) : (
            <div className="grid">
              {catalog.map((product) => (
                <div key={product._id} className="order-card">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price.toFixed(2)} • Stock: {product.stock}</p>
                  <button className="button-secondary" onClick={() => handleDelete(product._id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Orders</h2>
        {orderList.length === 0 ? (
          <div className="form-card">No orders have been placed yet.</div>
        ) : (
          <div className="grid">
            {orderList.map((order) => (
              <div key={order._id} className="order-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <h3>#{order._id.slice(-6)}</h3>
                    <p>User: {order.user?.name} ({order.user?.email})</p>
                  </div>
                  <span className={`status-badge status-${order.status}`}>{order.status}</span>
                </div>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <div>
                  <label>Status</label>
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default AdminDashboard;
