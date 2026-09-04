// CartItems รับ props และส่งต่อให้ CartItem
import CardPage from "../pages/CardPage";
import CartItem from "./CartItem";

export default function CartItems({
  items,
  onIncrease,
  onDecrease,
  onRemove
}) {
  return (
    <section className="cart-items">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
}
