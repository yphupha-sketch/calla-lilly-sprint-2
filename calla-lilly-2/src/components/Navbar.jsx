import { Link } from "react-router-dom"
export default function Navbar (){
    return(
        <div className="flex w-full h-16 bg-white justify-between items-center sticky top-0 z-50 shadow-md">
            <Link to="/" className="p-4 font-bold text-lg tracking-wide text-[#9B151D]">Calla Lily</Link>
            <div className="flex items-center h-full">
                <Link to="/" className="px-6 h-full flex items-center font-semibold text-[#9B151D] hover:bg-[#9B151D]/10 transition-colors duration-300">Home</Link>
                <Link to="/Product" className="px-6 h-full flex items-center font-semibold text-[#9B151D] hover:bg-[#9B151D]/10 transition-colors duration-300">Product</Link>
            </div>
        </div>
    )
}