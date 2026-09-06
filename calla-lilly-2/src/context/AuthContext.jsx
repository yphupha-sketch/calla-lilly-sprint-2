// ============================================================
// AuthContext: จัดการระบบบัญชีผู้ใช้ (สมัคร/เข้าสู่ระบบ/ออกจากระบบ)
// - ข้อมูลถูกเก็บใน localStorage (key: calla-users และ
//   calla-current-user) ใช้แทน backend
// - มีฟังก์ชัน: login, register, logout, updateProfile,
//   changePassword และ validatePassword
// ============================================================
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import seedUser from "../data/user";
import adminUser from "../data/admin";

const USERS_KEY = "calla-users";
const CURRENT_KEY = "calla-current-user";

// ดึงรายชื่อผู้ใช้ทั้งหมดจาก localStorage
// - ถ้ายังไม่มีข้อมูล ให้ใช้บัญชีลูกค้าตั้งต้นแทน
// - ถ้าหา admin ไม่เจอ ให้เพิ่ม adminUser เข้าไปเสมอ
function loadUsers() {
  let stored = null;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch {
    // ignore corrupted data
  }
  const base = Array.isArray(stored) ? stored : [seedUser];
  if (base.some((u) => u.role === "admin")) return base;
  return [...base, adminUser];
}

// ดึงผู้ใช้ที่เข้าสู่ระบบอยู่ (จาก localStorage) ถ้าไม่มีให้คืน null
function loadCurrent() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const AuthContext = createContext(null);

// Provider หลักของระบบ auth: เก็บ state ผู้ใช้ทั้งหมด + ผู้ใช้ปัจจุบัน
// - useEffect สองตัวทำหน้าที่บันทึกข้อมูลลง localStorage
//   อัตโนมัติทุกครั้งที่ state เปลี่ยน
export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadCurrent);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_KEY);
    }
  }, [currentUser]);

  // เข้าสู่ระบบ: หาผู้ใช้จาก email + password
  // - ไม่พบให้คืน { error } เพื่อแสดงข้อผิดพลาดที่หน้า Login
  // - พบให้ตั้งเป็น currentUser แล้วคืน { user }
  function login(email, password) {
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );
    if (!found) return { error: "Invalid email or password" };
    setCurrentUser(found);
    return { user: found };
  }

  // สมัครสมาชิกใหม่: ตรวจสอบว่า email ซ้ำหรือไม่
  // - สร้างผู้ใช้ใหม่ (role customer, ใส่ memberSince)
  // - แล้วล็อกอินให้ทันที
  function register({ name, email, phone, address, city, zip, password }) {
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (exists) return { error: "An account with this email already exists" };

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      zip: zip.trim(),
      password,
      memberSince: new Date().toISOString(),
      role: "customer",
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { user: newUser };
  }

  // ออกจากระบบ: ล้าง currentUser (รองรับด้วย useEffect ด้านบน)
  function logout() {
    setCurrentUser(null);
  }

  // อัปเดตข้อมูลผู้ใช้ปัจจุบันทั้งในลิสต์ users และ currentUser พร้อมกัน
  // (ใช้ร่วมกันโดย updateProfile และ changePassword)
  function applyUserChanges(changes) {
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...changes } : u))
    );
    setCurrentUser((cur) => (cur ? { ...cur, ...changes } : cur));
  }

  // แก้ไขโปรไฟล์ (ชื่อ/อีเมล/เบอร์/ที่อยู่/เมือง/รหัสไปรษณีย์)
  // - ตรวจสอบอีกครั้งว่า email ใหม่ไปชนกับคนอื่นหรือไม่
  function updateProfile({ name, email, phone, address, city, zip }) {
    const targetEmail = email.trim().toLowerCase();
    const exists = users.some(
      (u) => u.id !== currentUser.id && u.email.toLowerCase() === targetEmail
    );
    if (exists) return { error: "An account with this email already exists" };

    const changes = {
      name: name.trim(),
      email: targetEmail,
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      zip: zip.trim(),
    };
    applyUserChanges(changes);
    return { user: { ...currentUser, ...changes } };
  }

  // เปลี่ยนรหัสผ่าน: ต้องใส่รหัสเดิมให้ถูก และรหัสใหม่ต้อง 8-14 ตัว
  // - สำเร็จ = บันทึก แล้วรักษาสถานะล็อกอินไว้ (ไม่หลุดออกจากระบบ)
  function changePassword(currentPassword, newPassword) {
    if (currentUser.password !== currentPassword) {
      return { error: "Current password is incorrect" };
    }
    const pwError = validatePassword(newPassword);
    if (pwError) return { error: pwError };

    applyUserChanges({ password: newPassword });
    return { user: { ...currentUser, password: newPassword } };
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ตรวจสอบความแข็งแรงของรหัสผ่าน: ต้องยาว 8-14 ตัวอักษร
// - ผ่าน => คืน null, ไม่ผ่าน => คืนข้อความแสดงข้อผิดพลาด
export function validatePassword(password) {
  if (!password || password.length < 8 || password.length > 14) {
    return "Password must be 8-14 characters";
  }
  return null;
}

// Hook สำหรับเรียกใช้ context จากหน้า/คอมโพเนนต์ต่างๆ
// เช่น const { login, currentUser } = useAuth()
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}