import {
  motion,
  useAnimation,
  useInView,
} from "framer-motion"
import { useEffect, useRef } from "react"
import cutCar from "/black-car.jpg"

const Welcome = () => {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView])
  return (
    <section
      id="welcome"
      className="cut-viewport md:py-8 flex justify-center md:flex-row flex-col gap-5 relative overflow-hidden bg-black backdrop-blur-lg"
      ref={ref}
    >
      <motion.img
        variants={{
          visible: { x: 0 },
          hidden: { x: "-220%" },
        }}
        initial={"hidden"}
        animate={controls}
        transition={{
          bounce: 0.7,
          delay: 0.5,
          duration: 0.7,
        }}
        src={cutCar}
        className="max-md:hidden md:ms-8 rounded-md overflow-hidden w-[250px] flex-1 relative"
      />
      <div className="z-10 text-center flex-1 flex justify-center flex-col relative">
        <div className="absolute inset-0 bg-gray-800/20 sm:hidden" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="z-40 text-4xl text-primary font-arabic"
        >
          مرحبا فى ميجا شيلد
        </motion.div>
        <motion.p
          initial={{ translateX: 25, opacity: 0 }}
          whileInView={{
            translateX: 0,
            opacity: 1,
            transition: { duration: 0.3, delay: 0.9 },
          }}
          viewport={{ amount: 0.25, once: true }}
          className="font-arabic font-semibold text-md text-slate-300 max-w-[600px]
           text-center sm:px-0 px-3 mx-auto my-5 z-40"
        >
          نحن فريق من المحترفين المتخصصين في تقديم أفضل
          أفلام تظليل النوافذ للسيارات والشركات والمنازل في
          المملكة. نحن نقدم حلولًا مبتكرة وجودة عالية
          لعملائنا في قطاع الأعمال والفردية.
        </motion.p>
        <motion.p
          initial={{ translateX: -25, opacity: 0 }}
          whileInView={{
            translateX: 0,
            opacity: 1,
            transition: { duration: 0.3, delay: 1.5 },
          }}
          viewport={{ amount: 0.25, once: true }}
          className="font-arabic font-semibold text-md text-slate-300 max-w-[600px]
          text-center sm:px-0 px-3 mx-auto my-5 z-40"
        >
          لقد اصبحنا شريكا موثوقا به للعديد من العملاء و
          الشركات ف المملكة. نحن نفتخر بتقدسم منتجات ذات
          جودة عالية و خدمة عملاء نحن نهدف الي بناء علاقات
          مستدامة و موثوقة لعملائنا و تلبية احتياجاتهم
          المحددة
        </motion.p>
        <motion.p
          initial={{ translateX: 25, opacity: 0 }}
          whileInView={{
            translateX: 0,
            opacity: 1,
            transition: { duration: 0.3, delay: 1.8 },
          }}
          viewport={{ amount: 0.25, once: true }}
          className="font-arabic font-semibold text-md text-slate-300 max-w-[600px]
          text-center sm:px-0 px-3 mx-auto my-5 z-40"
        >
          انضم الينا اليوم واستمتع بفوائد الحماية المتقدمة و
          المظهر الجمالي لنوافذ سيارتك و المباني الخاصة بك.
        </motion.p>
      </div>
    </section>
  )
}
export default Welcome
