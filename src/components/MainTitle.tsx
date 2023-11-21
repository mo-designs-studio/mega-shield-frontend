import { motion } from "framer-motion"
import { ReactNode } from "react"

type MainTitleProps = {
  children: ReactNode
}

const MainTitle = ({ children }: MainTitleProps) => {
  return (
    <div className=" flex items-center justify-center gap-2 mx-3">
      <div className="flex-1 h-5">
        <motion.span
          className="h-5 bg-primary origin-right block rounded-md"
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      <motion.h1
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        className="text-primary text-2xl font-bold font-arabic origin-right"
      >
        {children}
      </motion.h1>
    </div>
  )
}
export default MainTitle
