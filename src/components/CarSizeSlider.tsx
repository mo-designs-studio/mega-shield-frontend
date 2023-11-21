import useCarousel from "@/hooks/useCarousel"
import car from "/hero.png"
import { ChevronLeft, ChevronRight } from "lucide-react"

const CarSizeSlider = () => {
  const { next, prev, page } = useCarousel({
    autoPlay: false,
    pages: 3,
    time: 0,
  })
  return (
    <div className="w-[300px] px-4 relative">
      <button
        className="absolute top-1/2 -translate-y-1/2 right-8 z-50"
        onClick={next}
        type="button"
      >
        <ChevronRight size={40} color="#d80032" />
      </button>
      <button
        onClick={prev}
        type="button"
        className="absolute top-1/2 -translate-y-1/2 left-8 z-50"
      >
        <ChevronLeft size={40} color="#d80032" />
      </button>
      <h1 className="w-fit mx-auto text-xl text-primary mb-4 font-arabic">
        اختر حجم السيارة
      </h1>
      {page === 1 ? (
        <Slide width="w-[80px]" content="صغيرة" />
      ) : page === 2 ? (
        <Slide width="w-[110px]" content="متوسطة" />
      ) : page === 3 ? (
        <Slide width="w-[140px]" content="كبيرة" />
      ) : (
        ""
      )}
    </div>
  )
}

const Slide = ({
  content,
  width,
}: {
  content: string
  width: string
}) => {
  return (
    <>
      <div className={` mx-auto h-[100px]`}>
        <img
          src={car}
          alt="car-size"
          className={`${width} aspect-square block mx-auto`}
        />
      </div>
      <h2 className="mt-4 text-xl text-primary w-fit mx-auto font-arabic">
        {content}
      </h2>
    </>
  )
}

export default CarSizeSlider
