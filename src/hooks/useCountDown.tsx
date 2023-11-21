import { useEffect, useState } from "react"

const useCountDown = ({
  countDownDate,
}: {
  countDownDate: Date | number
}) => {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const counter = setInterval(() => {
      const dateNow = new Date().getTime()

      let dateDiff: number

      if (countDownDate instanceof Date) {
        dateDiff = countDownDate.getTime() - dateNow
      } else {
        dateDiff = countDownDate - dateNow
      }

      setDays(Math.trunc(dateDiff / (1000 * 60 * 60 * 24)))
      setHours(
        Math.floor(
          (dateDiff % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        )
      )
      setMinutes(
        Math.floor(
          (dateDiff % (1000 * 60 * 60)) / (1000 * 60)
        )
      )
      setSeconds(
        Math.floor((dateDiff % (1000 * 60)) / 1000)
      )

      if (dateDiff <= 0) {
        clearInterval(counter)
      }
    }, 1000)

    return () => clearInterval(counter)
  }, [])

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}
export default useCountDown
