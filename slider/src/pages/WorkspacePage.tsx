// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import MyProjects from "../components/custom/MyProjects";
import { firebaseDb } from "./../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-react"
import {doc, getDoc, setDoc} from "firebase/firestore"
import React, { useEffect, useContext } from "react"
import { UserDetailContext } from "./../../context/UserDetailContext";

const WorkspacePage = () => {
  // const navigate = useNavigate();
  // const [text, setText] = useState("");

  // const handleGenerate = () => {
  //   if (text.trim()) {
  //     navigate("/generate", { state: { text } });
  //   }
  // };

    const { user, isLoaded } = useUser();

    const {userDetail, setUserDetail} = useContext(UserDetailContext);

    useEffect(() =>{
        user && CreateNewUser();
    }, [user])

    const CreateNewUser = async() => {
        if (user) {
            // Если пользователь уже существует
            const docRef = doc(firebaseDb, "users", user?.primaryEmailAddress?.emailAddress??'');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUserDetail(docSnap.data());
            } else {

                const data = {
                   fullName:user?.fullName,
                   email:user?.primaryEmailAddress?.emailAddress,
                   createdAt:new Date()
                }
                //Новый пользователь
                await setDoc(doc(firebaseDb, "users", user.primaryEmailAddress?.emailAddress??''),
                {
                    ...data
                })
                setUserDetail(data);
            }
        }
    }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />

      <main className="flex-1 w-full mx-auto md:px-25 px-8 py-8">
        <PromptBox />
        <MyProjects />
      </main>
    </div>
  );
};

export default WorkspacePage;
