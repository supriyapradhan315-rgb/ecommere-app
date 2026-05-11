import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAdd }) => {
  return (
    <article className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="product-details">
        <Link to={`/product/${product._id}`} className="product-name">{product.name}</Link>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-stock">Stock: {product.stock}</p>
        <button className="button-primary" disabled={product.stock === 0} onClick={() => onAdd(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
