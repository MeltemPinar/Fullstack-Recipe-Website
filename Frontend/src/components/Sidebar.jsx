import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdExplore } from "react-icons/md";
import { IoHeartCircle } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { IoCreate } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div className=" flex flex-col h-screen justify-between items-center bg-[#f4edd3] p-3 max-md:p-2 max-md:justify-normal max-md:gaap-20 lg:p-10">
      <img
        className="w-[150px] max-md:w-[90px]"
        src="/recipe_logo.jpg"
        alt="recipelogo"
      />
      <div className="flex flex-col gap-20">
        <NavLink
          to={"/"}
          className="flex gap-4 items-center text-lg text-[#3b2901]"
        >
          <i>
            <IoHome className=" max-md:text-2xl" />
          </i>
          <span className=" max-md:hidden">Anasayfa</span>
        </NavLink>
        <NavLink
          to={"/add"}
          className="flex gap-4 items-center text-lg text-[#3b2901]"
        >
          <i>
            <IoCreate className=" max-md:text-2xl" />
          </i>
          <span className=" max-md:hidden">Oluştur</span>
        </NavLink>
        <NavLink
          to={"/discover"}
          className="flex gap-4 items-center text-lg text-[#3b2901]"
        >
          <i>
            <MdExplore className=" max-md:text-2xl" />
          </i>
          <span className=" max-md:hidden">Keşfet</span>
        </NavLink>
        <NavLink
          to={"/likes"}
          className="flex gap-4 items-center text-lg text-[#3b2901]"
        >
          <i>
            <IoHeartCircle className=" max-md:text-2xl" />
          </i>
          <span className=" max-md:hidden">Favoriler</span>
        </NavLink>
        <NavLink
          to={"/settings"}
          className="flex gap-4 items-center text-lg text-[#3b2901]"
        >
          <i>
            <IoMdSettings className=" max-md:text-2xl" />
          </i>
          <span className=" max-md:hidden">Ayarlar</span>
        </NavLink>
      </div>
      <div className=" flex flex-col gap-2 max-md:hidden">
        <p className=" font-semibold">Günlük haberleri al</p>
        <button className=" bg-[#3b2901] p-2 rounded-lg text-[#f4edd3] hover:bg-[#f26d28]">
          Abone Ol
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
