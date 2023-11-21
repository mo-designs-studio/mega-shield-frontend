import { useEffect, useState } from "react"
import { CircularProgress } from "."

type DotsGroupProps = {
  page: number
  percentage: number
  go: (num: number) => void
  setPercentage: React.Dispatch<
    React.SetStateAction<number>
  >
  count: number
}

const DotsGroup = ({
  page,
  percentage,
  go,
  setPercentage,
  count,
}: DotsGroupProps) => {
  const [nums, setNums] = useState([1])

  useEffect(() => {
    if (count !== nums.at(-1)) {
      setNums(prev => [...prev, prev.at(-1)! + 1])
    }
  }, [count])
  return (
    <div className="flex items-center justify-center w-fit">
      {nums.map(num => {
        return page === num ? (
          <div
            className="w-[30px] h-[30px] flex items-center justify-center"
            key={num}
          >
            <CircularProgress
              aspectWidth="30px"
              percentage={percentage}
            />
          </div>
        ) : (
          <div
            className="w-[30px] h-[30] flex items-center justify-center"
            key={num}
          >
            <div
              className="w-2 h-2 bg-white rounded-full aspect-square cursor-pointer"
              onClick={() => {
                setPercentage(0)
                go(num)
              }}
            ></div>
          </div>
        )
      })}
    </div>
  )
}
export default DotsGroup
