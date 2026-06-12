import { FaSearch } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import me from '../assets/images/me.jpg'


const Header = () => {
    return(
        <>
           <div className="flex justify-between items-center my-4">
                <div className="flex items-center justify-between text-white bg-[#fff]/15 px-4 py-2 ml-4 rounded-full w-[50%]">
                    <input type="text" placeholder="Search" className="outline-none " />
                    <FaSearch />
                </div>
                <div className="w-[30%] flex justify-center mr-8">
                    <button className="bg-[#fff]/15 px-2 py-1 rounded-l-lg"><MdLightMode className="text-[#fff]"/></button>
                    <button className="bg-[#ed6d8b] px-2 py-1 rounded-r-lg"><MdDarkMode className="text-[#212845]" /></button>
                </div>
                <div className="w-[20%] flex items-center gap-3 text-white/80">
                    <p>Ines Keps</p>
                    <img src={me} className="rounded-full w-[40px] h-[40px]" alt="" />
                </div>
           </div>
        </>
    )
}

export default Header;