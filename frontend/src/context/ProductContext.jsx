// ============================================================
// ProductContext: จัดการข้อมูลสินค้าทั้งหมด (CRUD)
// - เริ่มต้นจาก seed ใน data/product.js แล้วบันทึกลง
//   localStorage (key: calla-products)
// - ใช้ร่วมกับหน้า Home, Products, ProductDetail และหน้า Admin
// - ฟังก์ชัน: addProduct, updateProduct, deleteProduct
// ============================================================
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import seedProducts from "../data/products";

const PRODUCTS_KEY = "calla-products";

// อ่านสินค้าจาก localStorage; ถ้ายังไม่มี/เสียหาย ใช้ seed แทน
function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupted data
  }
  return seedProducts;
}

const ProductContext = createContext(null);

// Provider สินค้า: auto-save ลง localStorage ทุกครั้งที่ข้อมูลเปลี่ยน
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  // เพิ่มสินค้าใหม่: หา id ใหม่จาก id สูงสุดเดิม + 1 แล้วต่อท้ายลิสต์
  function addProduct(data) {
    const id = products.length
      ? Math.max(...products.map((p) => p.id)) + 1
      : 1;
    const product = { ...data, id };
    setProducts((prev) => [...prev, product]);
    return product;
  }

  // แก้ไขสินค้าตาม id (เช่น ลด stock หลังขาย, แก้ราคา)
  function updateProduct(id, data) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
  }

  // ลบสินค้าตาม id (ใช้ในหน้า Admin)
  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Hook สำหรับเรียกใช้สินค้า เช่น const { products } = useProducts()
export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within a ProductProvider");
  return ctx;
}