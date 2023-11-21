import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

type DialogProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: string
}

const MoreDialog = ({
  isOpen,
  setIsOpen,
  content,
}: DialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="bg-slate-400/20 backdrop-blur-lg border-none shadow-xl"
        dir="rtl"
      >
        <DialogHeader>
          <DialogDescription
            className="text-white text-base text-right font-arabic"
            dir="rtl"
          >
            <p dir="rtl" className="leading-8">
              {content}
            </p>
          </DialogDescription>
          <div className="flex items-center gap-3 mb-5 mt-10 justify-center">
            <Button
              onClick={() => setIsOpen(false)}
              className="font-arabic min-w-[100px]"
            >
              تم
            </Button>
            <Button asChild>
              <Link
                to={"/service"}
                className="font-arabic min-w-[100px]"
              >
                احجز الآن
              </Link>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default MoreDialog
