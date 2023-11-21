import { ArrowLeftCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

type OptionCardProps = {
  img: string
  title: string
  serviceTitle: string
  idx: number
}

const ServiceOptionCard = ({
  img,
  title,
  serviceTitle,
  idx,
}: OptionCardProps) => {
  return (
    <motion.div
      className="h-[450px] overflow-hidden relative group"
      initial={{ opacity: 0, y: -15 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: 0.4 * idx },
      }}
    >
      <div
        className={`${img} bg-cover bg-no-repeat bg-center h-[450px] p-4
        transition-all duration-300
      group-hover:scale-[1.05] group-hover:blur-sm ring-1`}
      >
        <div className="absolute inset-0 bg-black/50 z-0" />
      </div>
      <div className="absolute bottom-8 right-1/2 translate-x-1/2 text-center font-arabic z-50">
        <span>{serviceTitle}</span>
        <h1 className="text-2xl text-primary my-3">
          {title}
        </h1>
        <Link to={"/description/protect-film"}>
          <button className="group flex items-center gap-[3px] justify-center mx-auto w-fit">
            <span>المزيد</span>
            <ArrowLeftCircle
              size={30}
              color="#d80032"
              className="transition-transform duration-150 group-hover:-translate-x-[5px]"
            />
          </button>
        </Link>
      </div>
    </motion.div>
  )
}
export default ServiceOptionCard
