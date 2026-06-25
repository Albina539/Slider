import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkspacePage from "./pages/WorkspacePage.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { UserDetailContext } from "./../context/UserDetailContext.tsx";
import { useState } from "react";
import ProjectOutline from "./pages/ProjectOutline.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/workspace",
    element: <WorkspacePage />,
    children: [
      { path: "project/:projectId/outline", element: <ProjectOutline /> },
    ],
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable key");
}

export function Root() {
  const [userDetail, setUserDetail] = useState();
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <RouterProvider router={router} />
      </UserDetailContext.Provider>
    </ClerkProvider>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
