import { useEffect, useState } from "react"

const useCarousel = ({
  time,
  pages,
  autoPlay,
}: {
  time: number
  pages: number
  autoPlay: boolean
}) => {
  const [page, setPage] = useState(1)

  const canScrollNext = page < pages
  const canScrollPrev = page > 1

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (page < pages) {
          setPage(prev => prev + 1)
        } else {
          setPage(1)
        }
      }, time)

      return () => clearInterval(interval)
    }
  }, [page])

  function next() {
    if (canScrollNext) {
      setPage(prev => prev + 1)
    } else {
      setPage(1)
    }
  }

  function prev() {
    if (canScrollPrev) {
      setPage(prev => prev - 1)
    } else {
      setPage(pages)
    }
  }

  function go(num: number) {
    setPage(num)
  }

  return {
    page,
    next,
    prev,
    go,
  }
}
export default useCarousel
