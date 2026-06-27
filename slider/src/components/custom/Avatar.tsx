import { signOut, type User } from "firebase/auth";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/FirebaseConfig";
import { Button } from "../ui/button";
import { Logout } from "pixelarticons/react";

interface AvatarProps {
  user: User | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setIsOpen(false);
    } catch (err) {
      console.error("Ошибка при выходе: ", err);
    }
  };

  const getInitials = () => {
    if (user?.displayName) {
      const name = user.displayName.split(" ");
      return name[0][0].toUpperCase();
    }

    return user?.email?.[0]?.toUpperCase() || "U";
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-slider-green cursor-pointer text-black text-2xl hover:scale-100"
        size={"icon-lg"}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="avatar" className="object-cover" />
        ) : (
          <div className="w-8 h-8 flex items-center justify-center">
            {getInitials()}
          </div>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-white p-4 text-lg min-w-64">
          <div className="mb-3 pb-2 border-b border-gray-400 flex flex-col">
            <p className="text-4xl font-var2">
              {user.displayName || "Пользователь"}
            </p>
            <p className="text-lg text-slider-dark">{user.email}</p>
          </div>
          <Button
            className="flex items-center cursor-pointer"
            onClick={handleSignOut}
          >
            <Logout />
            <span>Выйти</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
