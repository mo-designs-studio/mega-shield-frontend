import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { motion } from "framer-motion"

type ProgressProps = {
  aspectWidth: string
  percentage: number
}

const CircularProgress = ({
  aspectWidth,
  percentage,
}: ProgressProps) => {
  return (
    <motion.div
      initial={{ height: 0, width: 0 }}
      animate={{ height: aspectWidth, width: aspectWidth }}
      transition={{ duration: 0.4 }}
      style={{ width: aspectWidth, height: aspectWidth }}
    >
      <CircularProgressbar
        value={percentage}
        className="text-primary"
      />
    </motion.div>
  )
}
export default CircularProgress
