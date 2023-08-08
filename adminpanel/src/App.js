import Home from "./pages/Home";
import List from "./pages/List";
import New from "./pages/New";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom"
import { useContext } from "react";
import Newcourses from "./pages/Newcourses";
import Newinstructors from "./pages/Newinstructors"
import SingleStudents from "./pages/SingleStudents";
import SingleInstructors from "./pages/SingleInstructors";
import Courseslist from "./pages/Courseslist";
import Chapters from "./pages/Chapters";
import { AuthContext } from "./context/Authcontext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import InstructorList from "./pages/InstructorList"
import ChangePsd from "./pages/ChangePsd";


function App() {


  const queryClient = new QueryClient()

  const ProtectedRoute = ({ children }) => {

    const {currentUser} = useContext(AuthContext)
    
    if (currentUser === null) {
      return <Navigate to="/login" />

    }
    return children
  }

  const customCss = {
    height: "calc(100vh - 67px)",
  }

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="flex w-full h-fit text-xs">
          <Sidebar />
          <div className="flex-[4] w-[80%] h-full">
            <Navbar />
            <div style={customCss} className="overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    );
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: (<ProtectedRoute>
        <Layout />
      </ProtectedRoute>),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/students",
          element: <List />
        },
        {
          path: "/students/:studentId",
          element: <SingleStudents />
        },
        {
          path: "/students/newstudent",
          element: <New />
        },
        {
          path: "/courses",
          element: <Courseslist />
        },
        {
          path: "/courses/:courseid",
          element: <Chapters />
        },
        {
          path: "/courses/new",
          element: <Newcourses/>
        },
        {
          path: "/instructors",
          element: <InstructorList/>
        },
        {
          path: "/instructors/:id",
          element: <SingleInstructors/>
        },
        {
          path: "/instructors/new",
          element: <Newinstructors/>
        },
        {
          path: "/changepsd",
          element: <ChangePsd/>
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
