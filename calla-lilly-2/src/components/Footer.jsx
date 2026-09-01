export default function Footer() {
  return (
    <footer className="flex flex-col w-full h-52 overflow-hidden bg-[#9B151D] text-white">
      <div className="container-top flex flex-row justify-between flex-1">
        <div className="flex flex-col p-5">
          <h3 className="font-semibold mb-2">Shop</h3>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">All Products</a>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">Skin Care</a>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">Fragrance</a>
        </div>
        <div className="flex flex-col p-5">
          <h3 className="font-semibold mb-2">Account</h3>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">My Account</a>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">Order History</a>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">Track Order</a>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">My Cart</a>
        </div>
        <div className="flex flex-col p-5">
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <a href="#" className="text-[#E8BFB5] hover:text-white transition-colors duration-300">Email: hello@callalily.com</a>
          <p className="text-[#E8BFB5]">Phone: 02-123-4567</p>
          <p className="text-[#E8BFB5]">Bangkok, Thailand</p>
        </div>
      </div>
      <div className="container-butom mt-auto self-center m-4">
        <p>&copy; 2026 Calla Lily. All rights reserved.</p>
      </div>
    </footer>
  );
}
