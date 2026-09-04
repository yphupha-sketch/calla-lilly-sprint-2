// หน้าหลักสำหรับเรนเดอร์ CartItems และ OrderSummary
// คอยควบคุม useState
// เพิ่ม-ลด-ลบ สินค้า

import CartItems from "../components/CartItems"

// สร้าง useState ให้ cartItems ด้วยข้อมูลเริ่มต้น(ตัวอย่างข้อมูลใช้ชั่วคราว)
export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Luxury Jasmine Soap",
      brand: "Siam Cheerful",
      size: "100g",
      image: "/images/luxury-soap.jpg",
      price: 12,
      quantity: 2,
    },
    {
      id: 2,
      name: "Rose Clay Soap",
      brand: "Siam Cheerful",
      size: "100g",
      image: "/images/rose-soap.jpg",
      price: 10,
      quantity: 1,
    },
  ]);

  // increase, decrease, remove...
  // ใส่ function เพิ่ม-ลด จำนวนสินค้า ตรงนี้

  return (
    <main>
      <CartItems
        items={cartItems}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />

      <OrderSummary items={cartItems} />
    </main>
  );
}
