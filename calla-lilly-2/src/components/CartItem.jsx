import React from "react";
import "./CartItem.css";

const CartItem = ({
  name,
  price,
  image,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const itemTotal = price * quantity;

  return (
    <article className="cart-item">
      <div className="cart-item__image-wrapper">
        <img
          src={image}
          alt={name}
          className="cart-item__image"
        />
      </div>

      <div className="cart-item__details">
        <h3 className="cart-item__name">{name}</h3>

        <p className="cart-item__price">
          ${price.toFixed(2)}
        </p>

        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button
              type="button"
              onClick={onDecrease}
              disabled={quantity <= 1}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={onIncrease}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-item__remove"
            onClick={onRemove}
          >
            Remove
          </button>
        </div>
      </div>

      <p className="cart-item__total">
        ${itemTotal.toFixed(2)}
      </p>
    </article>
  );
};

export default CartItem;
