// import { UserButton, useUser } from "@clerk/clerk-react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  // const { user } = useUser();
  return (
    <div className="py-4 px-6 flex justify-between items-center bg-[#11002F]">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo slider" width={50} height={50} />
          <span className="text-4xl font-medium text-white">Slider</span>
        </div>
      </Link>

      {/* {user ? <UserButton /> : <></>} */}
    </div>
  );
};

export default Header;
