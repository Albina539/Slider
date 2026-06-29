// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import MyProjects from "../components/custom/MyProjects";
import { auth, firebaseDb } from "./../../config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useContext, useState } from "react";
import { UserDetailContext } from "./../../context/UserDetailContext";
import { Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const WorkspacePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Если пользователь уже существует
        const docRef = doc(firebaseDb, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserDetail(docSnap.data());
        } else {
          const data = {
            uid: user.uid,
            fullName: user.displayName || user.email?.split("@")[0],
            email: user?.email,
            createdAt: new Date(),
          };
          //Новый пользователь
          await setDoc(doc(firebaseDb, "users", user.uid), data);
          setUserDetail(data);
        }
      }
    };

    fetchUserData();
  }, [user, setUserDetail]);

  if (loading) {
    return (
      <div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p>Пожалуйста зарегистрируйся</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {location.pathname === "/workspace" && (
        <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8">
          <PromptBox />
          <MyProjects />
        </main>
      )}
      <Outlet />
    </div>
  );
};

export default WorkspacePage;
