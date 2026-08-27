import React from "react";
import Button from "./Button";
import "./ProductCard.css";

const ProductCard = ({
  name,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={image}
          alt={name}
          className="product-card__image"
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>

        <p className="product-card__price">
          ${price.toFixed(2)}
        </p>

        <Button
          name="Add to Cart"
          onClick={onAddToCart}
        />
      </div>
    </article>
  );
};

export default ProductCard;
