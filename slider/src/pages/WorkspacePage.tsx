// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import MyProjects from "../components/custom/MyProjects";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useContext } from "react";
import { UserDetailContext } from "./../../context/UserDetailContext";
import { Outlet, useLocation } from "react-router-dom";

const WorkspacePage = () => {
  const { user, isLoaded } = useUser();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const location = useLocation();

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  const CreateNewUser = async () => {
    if (user) {
      // Если пользователь уже существует
      const docRef = doc(
        firebaseDb,
        "users",
        user?.primaryEmailAddress?.emailAddress ?? "",
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserDetail(docSnap.data());
      } else {
        const data = {
          fullName: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          createdAt: new Date(),
        };
        //Новый пользователь
        await setDoc(
          doc(
            firebaseDb,
            "users",
            user.primaryEmailAddress?.emailAddress ?? "",
          ),
          {
            ...data,
          },
        );
        setUserDetail(data);
      }
    }
  };

  if (!user && isLoaded) {
    return (
      <div>
        <p>Пожалуйста зарегистрируйся</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

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
