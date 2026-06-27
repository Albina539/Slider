import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/FirebaseConfig";
import Avatar from "./Avatar";

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);
  return (
    <div className="py-4 px-6 flex justify-between items-center bg-[#11002F]">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo slider" width={50} height={50} />
          <span className="text-4xl font-medium text-white">Slider</span>
        </div>
      </Link>

      <Avatar user={user} />
    </div>
  );
};

export default Header;
