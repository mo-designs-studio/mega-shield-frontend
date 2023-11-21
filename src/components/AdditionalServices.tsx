import { useGetAllMainServicesQuery } from "@/app/api/ServicesApiSlice"
import { MainService } from "@/types"
import { For } from "@dev-amr/react-sugartax"
import { useEffect, useState } from "react"
import AdditionalServiceCard from "./AdditionalServiceCard"

type PackagesProps = {
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  carSize: 0 | 1 | 2
}

const AdditionalServices = ({
  packages,
  setPackages,
  carSize,
}: PackagesProps) => {
  const [additionalServices, setAdditionalServices] =
    useState<MainService[]>([])

  const { data: mainServices, isLoading } =
    useGetAllMainServicesQuery("")

  useEffect(() => {
    if (mainServices) {
      const filtered = mainServices.mainServices.filter(
        item => item.isAdditional
      )

      setAdditionalServices(filtered)
    }
  }, [mainServices])

  if (isLoading) return "loading..."

  return (
    <section className="min-h-screen">
      <h1 className="text-primary font-arabic font-bold text-2xl my-5">
        الخدمات الاضافية
      </h1>
      <div className="flex justify-center gap-4 flex-col">
        <For each={additionalServices}>
          {(item, i) => (
            <AdditionalServiceCard
              carSize={carSize}
              packages={packages}
              setPackages={setPackages}
              mainService={item}
              key={i}
            />
          )}
        </For>
      </div>
    </section>
  )
}
export default AdditionalServices
