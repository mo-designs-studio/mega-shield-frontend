import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

type NavLinkProps = {
  children: ReactNode
  to: string
  className?: string
}

const NavLink = ({
  children,
  to,
  className = "",
}: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "relative text-slate-200 transition-colors duration-500 font-bold text-lg hover:text-primary font-arabic before:content-[''] before:absolute before:w-full before:h-1 before:bg-primary before:-bottom-2 before:duration-500 before:transition-transform before:scale-y-0 hover:before:scale-y-100 before:origin-top",
        className
      )}
    >
      {children}
    </Link>
  )
}
export default NavLink
