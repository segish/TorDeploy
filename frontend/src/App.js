import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Course from "./pages/Course";
import AboutUs from "./pages/AboutUs";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { useContext, useRef, useState } from "react";
import InstructDetail from "./pages/InstructDetail";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import OTPBox from "./components/OTPBox";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
axios.defaults.withCredentials = true;


const Layout = () => {

  const queryClient = new QueryClient()
  const { loginPage, refreshLogin } = useContext(AuthContext)

  const [register, setRegister] = useState(false)
  const [forgot, setForgot] = useState(false)

  const parentRef = useRef(null);

  const handle = (e) => {

    const clickedElement = e.target;
    const desiredElement = parentRef.current;

    if (!desiredElement || (clickedElement !== desiredElement && desiredElement.contains(clickedElement))) {
      return;
    }
    refreshLogin(false)
    setRegister(false)
    setForgot(false)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full dark:bg-black">
        <NavBar setRegister={setRegister} />
        {loginPage && <div onClick={handle} ref={parentRef} className='fixed top-0 bottom-0 w-[100%] z-[999999999999] bg-black bg-opacity-80'><Login setRegister={setRegister} setForgot={setForgot} style={{ opacity: "1" }} /></div>}
        {register && <div onClick={handle} ref={parentRef} className='fixed top-0 bottom-0 w-[100%] z-[999999999999] bg-black bg-opacity-80'><Register setRegister={setRegister} style={{ opacity: "1" }} /></div>}
        {forgot && <div onClick={handle} ref={parentRef} className='fixed top-0 bottom-0 w-[100%] z-[999999999999] bg-black bg-opacity-80'><ForgotPassword setForgot={setForgot} style={{ opacity: "1" }} /></div>}

        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Course/:id",
        element: <Course />
      },
      {
        path: "/AboutUs",
        element: <AboutUs />
      },
      {
        path: "/Instructor/:id",
        element: <InstructDetail />
      },
      {
        path: "/otp",
        element: <OTPBox />
      },
      {
        path: "/register",
        element: <Register />
      },
    ]
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;