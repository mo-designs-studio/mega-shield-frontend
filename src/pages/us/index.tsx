import { Description, SliderNodes } from "@/components"
import { whoAreWeContent } from "@/constants"
import { useEffect, useState } from "react"

const Who = () => {
  const [num, setNum] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const int = setInterval(() => {
      setNum(prev => {
        if (!isHovered) {
          if (prev === 3) return 0
          return prev + 1
        } else {
          return prev
        }
      })
    }, 5000)

    return () => clearInterval(int)
  }, [num])
  return (
    <div className="bg-who bg-center bg-no-repeat min-h-[100vh] grid place-content-center relative">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="w-[70vw] mx-auto mt-[80px] overflow-hidden min-h-[50vh] mb-[40px]">
        <div
          className="flex mx-auto transition-all duration-500"
          style={{
            translate: `${100 * num}%`,
          }}
          onMouseEnter={() => {
            setIsHovered(true)
          }}
          onMouseLeave={() => {
            setIsHovered(false)
          }}
        >
          <Description
            title="من نحن"
            content={whoAreWeContent[0]}
          />
          <hr className="bg-primary my-8" />
          <Description
            title="لماذا نحن"
            content={whoAreWeContent[1]}
          />
          <hr className="bg-primary my-8" />
          <Description
            title="هدفنا"
            content={whoAreWeContent[2]}
          />
          <hr className="bg-primary my-8" />
          <Description
            title="الرسالة"
            content={whoAreWeContent[3]}
          />
        </div>
        <button
          onClick={() => {
            if (num !== 3) {
              setNum(prev => prev + 1)
            } else {
              setNum(0)
            }
          }}
          className="absolute z-[150] top-1/2 -translate-y-1/2 left-5 rotate-90"
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <svg
              width="40"
              height="15"
              viewBox="0 0 40 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                fill="#fff"
              ></path>
            </svg>
            <svg
              width="40"
              height="15"
              viewBox="0 0 40 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                style={{ animationDelay: "0.5s" }}
                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </button>
        <button
          onClick={() => {
            if (num !== 0) {
              setNum(prev => prev - 1)
            } else {
              setNum(3)
            }
          }}
          className="absolute z-[150] top-1/2 -translate-y-1/2 right-5 -rotate-90"
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <svg
              width="40"
              height="15"
              viewBox="0 0 40 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                fill="#fff"
              ></path>
            </svg>
            <svg
              width="40"
              height="15"
              viewBox="0 0 40 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="arrow"
            >
              <path
                style={{ animationDelay: "0.5s" }}
                d="M20 9L0 0l16.182 13.35a6 6 0 0 0 7.636 0L40 0 20 9z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </button>
      </div>
      <div className="w-fit mx-auto relative z-50">
        <SliderNodes step={num} />
      </div>
    </div>
  )
}
export default Who
