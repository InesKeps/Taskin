import { MdDashboard } from "react-icons/md";
import logo from '../assets/images/taskinrbg.png';
import { MdLogout } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
    return(
        <>
           <div className="flex flex-col justify-between items-center bg-[#212845] h-dvh">
                <img src={logo} className="pl-4 w-[200px]" alt="" />

                <div className="text-[#fff] pl-4 pb-32 w-[100%]">
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2 px-8 py-2 border-l-4 border-[#212845]"><MdDashboard />Dashboard</li>
                        <li className="flex items-center gap-2 px-8 py-2 border-l-4 bg-[#ed6d8b]/10 border-[#ed6d8b]"><FaTasks />My Tasks</li>
                        <li className="flex items-center gap-2 px-8 py-2 border-l-4 border-[#212845]"><MdGroups />Team</li>
                        <li className="flex items-center gap-2 px-8 py-2 border-l-4 border-[#212845]"><IoMdSettings />Settings</li>
                        <li className="flex items-center gap-2 px-8 py-2 border-l-4 border-[#212845]"><CgProfile />Profile</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2 pl-4 text-[#fff] py-6">
                    <MdLogout className="text-xl"/>
                    <p>Se déconnecter</p>
                </div>
           </div>
        </>
    )
}

export default Sidebar;