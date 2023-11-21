import { Cart, ProductCard } from "@/components"
import { CATEGORIES } from "@/constants"

const Shopping = () => {
  return (
    <div className="mt-[80px] relative">
      <div className="absolute bg-slate-400/20 backdrop-blur-md inset-0 z-30"></div>
      <div
        className="absolute h-52 aspect-square flex place-items-center justify-center text-center text-5xl text-primary font-bold rounded-full border-4 z-40 border-solid border-primary
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        Coming <br /> Soon
      </div>
      <div className="flex px-4 items-center justify-between">
        <Cart />
      </div>
      <div className="grid grid-columns p-4">
        <ProductCard
          name="بطارية"
          category={CATEGORIES.batteries}
          img="/battery.png"
        />
        <ProductCard
          name="زيت"
          category={CATEGORIES.oil}
          img="/oil.png"
        />
        <ProductCard
          name="إطار"
          category={CATEGORIES.wheels}
          img="/wheel.png"
        />
      </div>
    </div>
  )
}
export default Shopping
