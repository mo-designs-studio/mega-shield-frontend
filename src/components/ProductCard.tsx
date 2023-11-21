import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

type ProductCardProps = {
  name: string
  img: string
  category: string
}

const ProductCard = ({
  name,
  img,
  category,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border border-solid border-primary rounded-lg">
      <img src={img} alt={img} className="max-w-[220px]" />
      <div className="flex items-center gap-2">
        <h1 className="font-arabic text-xl font-bold my-3">
          {name}
        </h1>
        <Badge className="text-lg font-semibold">
          {category}
        </Badge>
      </div>
      <Button className="font-arabic text-lg font-semibold mt-3">
        أضف ألي السلة 🤩
      </Button>
    </div>
  )
}
export default ProductCard
