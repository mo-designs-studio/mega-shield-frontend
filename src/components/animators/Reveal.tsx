import { useEffect, useRef } from "react"
import {
  motion,
  useInView,
  useAnimation,
} from "framer-motion"

interface Props {
  children: JSX.Element
  width?: "fit-content" | "100%"
  delay?: number
  className?: string
  once?: boolean
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay,
  className,
  once = true,
}: Props) => {
  const mainControls = useAnimation()
  const slideControls = useAnimation()

  function delaySum(n: number) {
    if (delay) return n + delay
    return n
  }

  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible")
      mainControls.start("visible")
    } else {
      slideControls.start("hidden")
      mainControls.start("hidden")
    }
  }, [isInView, mainControls, slideControls])

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.5,
          delay: delaySum(0.25),
        }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: delaySum(0),
        }}
        className="rounded-lg"
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: "#E34569",
          zIndex: 20,
        }}
      />
    </div>
  )
}
