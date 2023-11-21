import useCarousel from "@/hooks/useCarousel"
import { For } from "@dev-amr/react-sugartax"
import { useEffect, useRef, useState } from "react"
import {
  useGetAllMainServicesQuery,
  useGetSubServicesQuery,
} from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"

type ServicesProps = {
  setSubServiceID: React.Dispatch<
    React.SetStateAction<string>
  >
  subServiceID: string
}

const ServicesSlider = ({
  setSubServiceID,
  subServiceID,
}: ServicesProps) => {
  const [filteredMainServices, setFilteredMainServices] =
    useState<MainService[]>([])
  const { data: mainServices } =
    useGetAllMainServicesQuery("")

  const { next, page, prev } = useCarousel({
    time: 3000,
    pages: filteredMainServices.length,
    autoPlay: false,
  })

  useEffect(() => {
    if (mainServices) {
      const filtered = mainServices.mainServices.filter(
        item => !item.isAdditional
      )

      setFilteredMainServices(filtered)
    }
  }, [mainServices])

  return (
    <div className="relative">
      <div className="h-screen flex overflow-hidden no-scroll">
        <div
          className="h-screen flex w-full transition-all duration-500"
          style={{
            translate: `${100 * (page - 1)}%`,
          }}
        >
          {mainServices && (
            <For each={filteredMainServices}>
              {(item, i) => (
                <Slide
                  setSubServiceID={setSubServiceID}
                  subServiceID={subServiceID}
                  key={i}
                  service={item}
                />
              )}
            </For>
          )}
        </div>
        <button
          onClick={prev}
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
          onClick={next}
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
    </div>
  )
}
export default ServicesSlider

type SlideProps = {
  service: MainService
  setSubServiceID: React.Dispatch<
    React.SetStateAction<string>
  >
  subServiceID: string
}

const Slide = ({
  service,

  setSubServiceID,
  subServiceID,
}: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { data: subServices } = useGetSubServicesQuery({
    id: service._id,
  })

  useEffect(() => {
    if (subServices && subServices.services.length) {
      setSubServiceID(subServices?.services[0]._id)
    }
  }, [subServices])
  return (
    <div
      className={`transition-all duration-500 rounded-s-lg p-5 flex flex-col items-center justify-center h-full
      grow-0 w-full shrink-0 bg-center bg-no-repeat bg-cover slider-child`}
      style={{
        backgroundImage: `url("${service.photo}")`,
        backgroundRepeat: "no-repeat",
      }}
      ref={ref}
    >
      <h1 className="w-fit mx-auto text-5xl font-arabic font-bold">
        {service.name}
      </h1>
      <div className="my-5 flex flex-wrap flex-col gap-2 p-5">
        {subServices && (
          <For each={subServices?.services}>
            {(item, i) => (
              <div
                className={
                  "font-arabic text-xl px-4 py-3 border border-solid border-primary rounded-lg relative overflow-hidden cursor-pointer group z-[250]"
                }
                key={i}
                onClick={() => setSubServiceID(item._id)}
              >
                <div
                  className={`absolute w-full h-full -z-10 bg-primary inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${
                    item._id === subServiceID
                      ? "translate-x-0"
                      : "-translate-x-full"
                  }`}
                />
                {item.name}
              </div>
            )}
          </For>
        )}
      </div>
    </div>
  )
}
