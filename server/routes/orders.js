const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { products } = req.body;
    if (!products || !products.length) {
      return res.status(400).json({ error: 'Order must include products.' });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ error: 'Product not found.' });
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.name}.` });
      }
      product.stock -= item.quantity;
      await product.save();
      totalPrice += product.price * item.quantity;
      orderItems.push({ product: product._id, quantity: item.quantity });
    }

    const order = await Order.create({
      user: req.user._id,
      products: orderItems,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/my', requireAuth, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
