import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import AuthLinkedin from "./components/AuthLinkedin";
import AuthTwitter from "./components/AuthTwitter";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainpage />,
  },
  {
    path: "/linkedin",
    element: <AuthLinkedin />,
  },
  {
    path: "/twitter",
    element: <AuthTwitter />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
