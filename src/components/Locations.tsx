import { MapPin } from "lucide-react"
import { motion } from "framer-motion"

const Locations = () => {
  return (
    <section className="cut-viewport overflow-hidden bg-map bg-cover bg-center flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <motion.div className="block m-auto  w-full cut-viewport relative" />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className=" flex flex-col absolute z-[60] items-center justify-center gap-5">
        <div className=" text-3xl font-arabic text-primary font-bold">
          موقعنا
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden hover:scale-125  transition-transform duration-200"
        >
          <a href="https://maps.google.com?q=%D9%85%D9%8A%D8%AC%D8%A7%D8%B4%D9%8A%D9%84%D8%AF%20Mega%20shield%D8%8C%20%D8%B7%D8%B1%D9%8A%D9%82%20%D8%B3%D9%84%D8%B7%D8%A7%D9%86%D8%A9%D8%8C%20%D8%A7%D9%84%D8%B1%D8%A7%D9%8A%D8%A9%D8%8C%20%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9%20%D8%A7%D9%84%D9%85%D9%86%D9%88%D8%B1%D8%A9%2042312&ftid=0x15bdbfa38f9e6d15:0xc7a62cd862b59af4&hl=ar-SA&gl=sa&entry=gps&lucs=,47083423,47071704&g_st=iw">
            <MapPin color="#d80032" size={70} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
export default Locations
