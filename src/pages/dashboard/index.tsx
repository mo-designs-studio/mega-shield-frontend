import { useGetMeQuery } from "@/app/api/AuthApiSlice"
import { toggleAuth } from "@/app/features/AuthSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { DashboardLinkProps } from "@/types"
import { useEffect } from "react"
import {
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import Products from "./nested-pages/Products"
import Services from "./nested-pages/Services"
import logo from "/logo.png"
import { BeatLoader } from "react-spinners"
import {
  IsSidebarOpenSelector,
  toggleSidebar,
} from "@/app/features/ProductSlice"
import { Menu, X } from "lucide-react"

const Dashboard = () => {
  const { data, error, isLoading } = useGetMeQuery("")
  const dispatch = useAppDispatch()

  const isSidebarOpen = useAppSelector(
    IsSidebarOpenSelector
  )

  useEffect(() => {
    if (error) {
      dispatch(toggleAuth(true))
    } else if (data?.user) {
      dispatch(toggleAuth(false))
    }
  }, [error, data])
  return (
    <div className="flex min-h-screen relative items-stretch">
      {isLoading && (
        <div className="absolute bg-slate-400/20 backdrop-blur-lg z-[150] inset-0 grid place-content-center">
          <BeatLoader
            color="#E22D48"
            size={40}
            className="rotate-90"
          />
        </div>
      )}
      <div
        className={`basis-[240px] shrink-0 border-e border-solid border-primary md:static h-screen w-[240px] bg-black absolute z-[40] transition-transform duration-300 ${
          isSidebarOpen
            ? "translate-x-0"
            : "max-md:translate-x-full"
        }`}
      >
        <div className="relative">
          <X
            className="absolute top-2 left-2 cursor-pointer text-primary sm:hidden block"
            onClick={() => dispatch(toggleSidebar(false))}
          />
          <div className="p-5">
            <img src={logo} alt="logo" />
          </div>
          <DashboardLink
            to={"/dash/services"}
            activeKey={"services"}
          >
            الخدمات
          </DashboardLink>
          <DashboardLink
            to={"/dash/products"}
            activeKey={"products"}
          >
            المنتجات
          </DashboardLink>
        </div>
      </div>
      <div className="flex-1 p-5 h-screen overflow-y-scroll">
        <Menu
          className="text-primary sm:hidden block cursor-pointer"
          onClick={() => dispatch(toggleSidebar(true))}
          size={25}
        />
        <div className="">
          <Routes>
            <Route
              path="products/*"
              element={<Products />}
            />
            <Route
              path="services/*"
              element={<Services />}
            />
          </Routes>
        </div>
      </div>
    </div>
  )
}

const DashboardLink = ({
  to,
  children,
  activeKey,
}: DashboardLinkProps) => {
  const pathname = useLocation().pathname
  return (
    <Link
      to={to}
      className={`block w-full py-3 px-5 font-arabic text-xl ${
        pathname.includes(activeKey)
          ? "bg-slate-400/20 backdrop-blur-lg text-primary"
          : ""
      } transition-colors duration-300`}
    >
      {children}
    </Link>
  )
}

export default Dashboard
