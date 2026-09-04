//

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove
}) {

  return (
    <article className="cart-item">

      <img
        src={item.image}
        alt={item.name}
      />

      <div className="product-info">
        <h2>{item.name}</h2>
        <p className="brand">{item.brand}</p>
        <p className="size">{item.size}</p>
      </div>

      <div className="quantity-control">
        <button onClick={() => onDecrease(item.id)}>
          −
        </button>

        <span>{item.quantity}</span>

        <button onClick={() => onIncrease(item.id)}>
          +
        </button>
      </div>

      <div className="item-price">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <button
        className="remove-button"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>

    </article>
  );
}
