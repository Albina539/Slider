// App.tsx
import { Suspense, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkspacePage from "./pages/WorkspacePage";
import ProjectOutline from "./pages/ProjectOutline";
import { UserDetailContext } from "../context/UserDetailContext";
import MainPage from "./pages/MainPage";
import SignUp from "./components/custom/auth/SignUp";
import SignIn from "./components/custom/auth/SignIn";
import Project from "./pages/Project";
import Pitch from "./pages/Pitch";
import SlideContentPage from "./pages/SlideContentPage";

function App() {
  const [userDetail, setUserDetail] = useState(null);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <BrowserRouter>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/workspace" element={<WorkspacePage />}>
              <Route
                path="project/:projectId/content"
                element={<SlideContentPage />}
              />
              <Route
                path="project/:projectId/outline"
                element={<ProjectOutline />}
              />
              <Route path="project/:projectId/finish" element={<Project />} />
              <Route path="project/:projectId/pitch" element={<Pitch />} />
            </Route>
          </Routes>
        </UserDetailContext.Provider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
