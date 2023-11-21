import { Description } from "@/components"
import { insuranceTerms } from "@/constants"

const Insurance = () => {
  return (
    <div className="mt-[80px] bg-black">
      <Description
        title="شروط الضمان"
        content={insuranceTerms}
      />
    </div>
  )
}
export default Insurance
