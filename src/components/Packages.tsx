import React, { useState } from "react"
import { ServicesSlider } from "."
import ServicePackageCard from "./ServicePackageCard"
import { useGetSubServicePackagesQuery } from "@/app/api/ServicesApiSlice"

type PackagesProps = {
  packages: { title: string; price: number }[]
  setPackages: React.Dispatch<
    React.SetStateAction<{ title: string; price: number }[]>
  >
  carSize: 0 | 1 | 2
}

const Packages = ({
  setPackages,
  packages,
  carSize,
}: PackagesProps) => {
  const [subServiceID, setSubServiceID] = useState("")

  const { data: subServicePackages } =
    useGetSubServicePackagesQuery({
      id: subServiceID,
    })

    console.log(useGetSubServicePackagesQuery({
      id: subServiceID,
    }))
  return (
    <div className="text-center">
      <ServicesSlider
        setSubServiceID={setSubServiceID}
        subServiceID={subServiceID}
      />

      <div className="grid grid-columns px-2 py-8 max-w-[1100px] mx-auto place-items-center">
        {subServicePackages &&
          subServicePackages.count > 0 &&
          subServicePackages.packages.map(
            (packagely, i) => (
              <ServicePackageCard
                packages={packages}
                setPackages={setPackages}
                key={i}
                title={packagely.name}
                features={packagely.description}
                price={
                  carSize === 0
                    ? packagely.smallPrice
                    : carSize === 1
                    ? packagely.mediumPrice
                    : packagely.bigPrice
                }
              />
            )
          )}
      </div>
    </div>
  )
}
export default Packages
