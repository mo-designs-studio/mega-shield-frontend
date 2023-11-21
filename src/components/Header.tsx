import { Navbar } from "."
import logo from "/logo.png"
import { motion } from "framer-motion"

const Header = () => {
  return (
    <header className="h-20 bg-[#333]/70 fixed inset-x-0 top-0 z-[10000000]">
      <div className="container mx-auto h-20 flex items-center sm:justify-center justify-between">
        <motion.div
          initial={{ y: "-100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-[120px] sm:hidden block"
        >
          <img src={logo} alt="logo" />
        </motion.div>
        <Navbar />
      </div>
    </header>
  )
}
export default Header
