// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Header from "../components/custom/Header";
import PromptBox from "../components/custom/PromptBox";
import MyProjects from "../components/custom/MyProjects";

const WorkspacePage = () => {
  // const navigate = useNavigate();
  // const [text, setText] = useState("");

  // const handleGenerate = () => {
  //   if (text.trim()) {
  //     navigate("/generate", { state: { text } });
  //   }
  // };

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
