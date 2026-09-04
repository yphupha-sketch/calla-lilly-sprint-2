//

function OrderSummary({ items }) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 3;
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <aside className="cart-summary">
      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <span>${discount.toFixed(2)}</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <a href="/checkout" className="checkout-button">
        Proceed to Checkout
      </a>
    </aside>
  );
}
