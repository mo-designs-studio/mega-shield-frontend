import RootLayout from "@/layouts/RootLayout"
import Contact from "@/pages/contact"
import Dashboard from "@/pages/dashboard"
import Home from "@/pages/home"
import Insurance from "@/pages/insurance"
import Shopping from "@/pages/shopping"
import Who from "@/pages/us"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/*",
        element: <Home />,
      },
      {
        path: "/shopping",
        element: <Shopping />,
      },
      {
        path: "/who",
        element: <Who />,
      },
      {
        path: "/dash/*",
        element: <Dashboard />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/insurance",
        element: <Insurance />,
      },
    ],
  },
])

export default router
