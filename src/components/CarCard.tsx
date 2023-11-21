import { motion } from "framer-motion"
import { Link } from "react-router-dom"

type CarCardProps = {
  img: string
  text: string
  index: number
  path: string
}

const CarCard = ({
  img,
  text,
  index,
  path,
}: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -25 }}
      whileInView={{
        opacity: 1,
        translateY: 0,
        transition: { duration: 1, delay: 0.5 * index },
      }}
      viewport={{ once: true, amount: 0.25 }}
      className={`relative h-[380px] overflow-hidden rounded-lg shadow-md group
      ${img} bg-cover bg-no-repeat bg-center`}
    >
      <div className="absolute inset-0 bg-opaque-gradient transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
        <div className="flex flex-col gap-3 justify-center">
          <Link to={`/more/${path}`}>
            <button
              className="flex items-center justify-center text-3xl font-bold font-arabic h-20 w-[220px] bg-white mx-auto        border-4 border-solid border-transparent text-black
          transition-colors hover:bg-transparent hover:border-white"
            >
              المزيد
            </button>
          </Link>
          <Link
            to={`/more/${path}`}
            className="flex items-center justify-center text-3xl font-bold font-arabic h-20 w-[220px] bg-primary mx-auto
          border-4 border-solid border-transparent
          transition-colors hover:bg-transparent hover:border-primary"
          >
            <button>احجز الان</button>
          </Link>
        </div>
      </div>
      <div
        className="absolute z-50 w-full h-20 bg-red-500 transition-all duration-300 bottom-0
      text-center font-arabic text-xl pt-5"
      >
        {text}
      </div>
    </motion.div>
  )
}
export default CarCard
