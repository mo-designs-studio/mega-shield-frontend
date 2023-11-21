import { CATEGORIES } from "@/constants"

const Categories = () => {
  return (
    <div className="flex items-center gap-5 justify-center my-5">
      <CategoryCard category={CATEGORIES.batteries} />
      <CategoryCard category={CATEGORIES.oil} />
      <CategoryCard category={CATEGORIES.wheels} />
    </div>
  )
}

const CategoryCard = ({
  category,
}: {
  category: string
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={category}
        id={category}
        className="h-5 w-5 aspect-square accent-primary"
      />
      <label
        htmlFor={category}
        className="text-xl font-bold"
      >
        {category}
      </label>
    </div>
  )
}

export default Categories
