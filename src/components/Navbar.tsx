import { MenuSheet, NavLink } from "@/components"

import logo from "/logo.png"
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <>
      <nav className="sm:flex hidden items-center justify-center gap-6">
        <div className="h-14 grid place-content-center">
          <NavLink to="/">الرئيسية</NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink
            to="/insurance"
            className="relative text-slate-200 transition-colors duration-500 font-bold text-lg hover:text-primary font-arabic before:content-[''] before:absolute
      before:w-full before:h-1 before:bg-primary before:-bottom-2 before:duration-500 before:transition-transform before:scale-y-0 hover:before:scale-y-100 before:origin-top"
          >
            الضمان
          </NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/who">من نحن</NavLink>
        </div>

        <motion.div
          initial={{ y: "-220%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-[120px] sm:block hidden"
        >
          <img src={logo} alt="logo" />
        </motion.div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/contact">تواصل</NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/shopping">التسوق</NavLink>
        </div>

        <div className="h-14 grid place-content-center">
          <NavLink to="/service" children="الحجز" />
        </div>
      </nav>
      <MenuSheet />
    </>
  )
}

export default Navbar
