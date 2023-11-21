import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger
        className="w-12 h-12 aspect-square rounded-full border border-solid border-slate-200
        flex justify-center items-center"
      >
        <ShoppingCart size={30} color="#d80032" />
      </SheetTrigger>
      <SheetContent className="bg-[#333] z-[5000000000000000]">
        <SheetHeader>
          <SheetTitle className="text-primary text-2xl font-arabic mx-auto w-fit">
            أكمل حجز طلباتك الان
          </SheetTitle>
          <div className="flex flex-col">المنتجات</div>
          <button
            className="flex items-center justify-center text-3xl font-bold font-arabic h-16 w-[160px] bg-primary mx-auto my-5
          border-4 border-solid border-transparent
          transition-colors hover:bg-transparent hover:border-primary"
          >
            اطلب
          </button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default Cart
