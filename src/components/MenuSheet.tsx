import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NavLink } from "."
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { useInView } from "framer-motion"

const MenuSheet = () => {
  const ref = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) ref?.current?.click()
  }, [location.pathname])

  return (
    <Sheet>
      <SheetTrigger className="sm:hidden block" ref={ref}>
        <Menu size={25} color="#d80032" />
      </SheetTrigger>
      <SheetContent className="bg-[#333] text-slate-200 z-[5000000000000000]">
        <SheetHeader>
          <SheetDescription>
            <nav className="flex flex-col items-center justify-center gap-6">
              <NavLink to="/">الرئيسية</NavLink>
              <NavLink to="/insurance">الضمان</NavLink>
              <NavLink to="/who">من نحن</NavLink>
              <NavLink to="/contact">تواصل معنا</NavLink>
              <NavLink to="/shopping">التسوق</NavLink>
              <NavLink to="/service">الحجز</NavLink>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
export default MenuSheet
