import { useState } from "react";
import products from "../data/product";
import ProductCard from "../components/ProductCard";

// หน้า Product: นำข้อมูลสินค้าจาก product.js มาวางแสดงเป็น Grid
export default function Product(){
    // state สำหรับค้นหา/กรอง/เรียงลำดับ
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");

    return (
        <div className="p-6">
            {/* แถบเครื่องมือ: ค้นหา, หมวดหมู่, เรียงลำดับ */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={function(e) { setSearch(e.target.value); }}
                    className="border border-gray-300 rounded-lg px-4 py-2 flex-1 bg-white"
                />

                <select
                    value={category}
                    onChange={function(e) { setCategory(e.target.value); }}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                >
                    <option value="all">All Categories</option>
                </select>

                <select
                    value={sort}
                    onChange={function(e) { setSort(e.target.value); }}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                >
                    <option value="default">Sort by</option>
                    <option value="az">Name A-Z</option>
                    <option value="za">Name Z-A</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                </select>
            </div>

            {/* Grid สินค้าที่ผ่านการกรองแล้ว */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TODO: ใช้ products จาก product.js
                    1. ใช้ products.filter() เพื่อกรองตามคำค้นหา (search) และหมวดหมู่ (category)
                    2. ใช้ .sort() เพื่อเรียงลำดับตามค่าของ sort
                    3. ใช้ .map() เพื่อแสดงผลเป็น <ProductCard> ลงใน Grid นี้ */}
            </div>
        </div>
    )
}
